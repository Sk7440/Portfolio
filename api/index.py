"""FastAPI backend for the portfolio. On Vercel this file is a Python serverless function; Next.js
rewrites /api/py/* here (see next.config.ts). Locally run it with `npm run dev:api` (uvicorn on :8000)."""

import json
import os
import sys
import time
from collections import defaultdict, deque
from typing import Literal

import anthropic
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel, Field

sys.path.insert(0, os.path.dirname(__file__))  # so `_portfolio` imports work on Vercel and locally

from _portfolio.chat import MODEL, stream_answer  # noqa: E402
from _portfolio.retrieval import retriever  # noqa: E402

app = FastAPI(title="Sultan Khalid portfolio API", docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

MAX_TURNS = 12
MAX_CHARS = 1200
RATE_LIMIT = 15  # questions per visitor...
RATE_WINDOW = 10 * 60  # ...per 10 minutes


class Turn(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    messages: list[Turn] = Field(min_length=1, max_length=MAX_TURNS)


# Per-instance memory: serverless instances don't share it, so this is a speed bump against
# casual abuse, not a hard guarantee. Set a monthly spend limit in the Anthropic Console too.
_hits: dict[str, deque[float]] = defaultdict(deque)


def _allowed(ip: str) -> bool:
    now = time.monotonic()
    q = _hits[ip]
    while q and now - q[0] > RATE_WINDOW:
        q.popleft()
    if not q:
        _hits.pop(ip, None)  # forget idle visitors so the dict doesn't grow forever
        q = _hits[ip]
    if len(q) >= RATE_LIMIT:
        return False
    q.append(now)
    return True


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for", "")
    return forwarded.split(",")[0].strip() or (request.client.host if request.client else "unknown")


_client: anthropic.AsyncAnthropic | None = None


def _get_client() -> anthropic.AsyncAnthropic:
    global _client
    if _client is None:
        _client = anthropic.AsyncAnthropic(max_retries=1, timeout=60)
    return _client


@app.get("/api/py/health")
def health():
    return {"ok": True, "model": MODEL, "assistant": bool(os.environ.get("ANTHROPIC_API_KEY"))}


@app.post("/api/py/chat")
async def chat(body: ChatRequest, request: Request):
    turns = body.messages
    if turns[-1].role != "user" or turns[0].role != "user":
        return JSONResponse({"error": "Conversation must start and end with a visitor message."}, status_code=400)
    question = turns[-1].content.strip()
    if len(question) > MAX_CHARS:
        return JSONResponse({"error": f"Please keep questions under {MAX_CHARS} characters."}, status_code=400)
    if not os.environ.get("ANTHROPIC_API_KEY"):
        return JSONResponse({"error": "The assistant is offline right now."}, status_code=503)
    if not _allowed(_client_ip(request)):
        return JSONResponse({"error": "Too many questions. Please try again in a few minutes."}, status_code=429)

    # Retrieve with the previous question too, so follow-ups like "what stack did it use?" still match.
    previous = next((t.content for t in reversed(turns[:-1]) if t.role == "user"), "")
    chunks = retriever.search(f"{previous} {question}" if previous else question)
    history = [{"role": t.role, "content": t.content} for t in turns[:-1]]

    return StreamingResponse(
        stream_answer(_get_client(), history, question, chunks),
        media_type="text/plain; charset=utf-8",
        headers={
            "X-Sources": json.dumps([c.title for c in chunks if c.id != "core"]),
            "Cache-Control": "no-store",
            "X-Accel-Buffering": "no",
        },
    )
