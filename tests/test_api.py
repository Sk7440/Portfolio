"""Backend tests. The Anthropic call is faked, so these run offline and cost nothing:
    .venv/Scripts/python -m pytest      (Windows)
    .venv/bin/python -m pytest          (macOS/Linux)
"""

import json
import os
import sys

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "api"))

import index  # noqa: E402
from _portfolio import chat as chat_mod  # noqa: E402
from _portfolio.retrieval import retriever  # noqa: E402


def ids(query: str) -> list[str]:
    return [c.id for c in retriever.search(query)]


@pytest.mark.parametrize(
    "query, expected",
    [
        ("What did he build with FastAPI and Ollama?", "meet-chat-bot"),
        ("Where does he work now?", "appverse"),
        ("Is he open to remote AI engineer jobs?", "looking-for"),
        ("What is he studying?", "education"),
        ("What was his job before?", "kamal"),
        ("Tell me about the tour booking app", "wander-lust"),
    ],
)
def test_retrieval_finds_the_right_chunk(query, expected):
    assert expected in ids(query)


def test_core_profile_always_included_and_vague_questions_get_an_overview():
    got = ids("hmm")
    assert got[0] == "core"
    assert len(got) > 1


@pytest.fixture
def client(monkeypatch):
    monkeypatch.setenv("ANTHROPIC_API_KEY", "test-key")
    index._hits.clear()
    calls = []

    async def fake_stream(_client, history, question, chunks):
        calls.append({"history": history, "question": question, "chunks": [c.id for c in chunks]})
        for piece in ["Sultan ", "built ", "Meet_Chat_bot."]:
            yield piece

    monkeypatch.setattr(index, "stream_answer", fake_stream)
    c = TestClient(index.app)
    c.calls = calls
    return c


def ask(client, *messages):
    turns = [{"role": "user" if i % 2 == 0 else "assistant", "content": m} for i, m in enumerate(messages)]
    return client.post("/api/py/chat", json={"messages": turns})


def test_chat_streams_text_and_lists_sources(client):
    r = ask(client, "What has he built with LLMs?")
    assert r.status_code == 200
    assert r.text == "Sultan built Meet_Chat_bot."
    assert "Project: Meet_Chat_bot (full-stack AI chat app)" in json.loads(r.headers["x-sources"])


def test_follow_up_questions_reuse_the_previous_question_for_retrieval(client):
    ask(client, "Tell me about Meet_Chat_bot", "It is a chat app.", "What stack did it use?")
    call = client.calls[-1]
    assert "meet-chat-bot" in call["chunks"]
    assert call["history"][0] == {"role": "user", "content": "Tell me about Meet_Chat_bot"}


def test_rejects_bad_conversations(client):
    assert client.post("/api/py/chat", json={"messages": []}).status_code == 422
    bad = {"messages": [{"role": "user", "content": "hi"}, {"role": "assistant", "content": "hello"}]}
    assert client.post("/api/py/chat", json=bad).status_code == 400
    assert ask(client, "x" * 1300).status_code == 400


def test_rate_limit(client):
    for _ in range(index.RATE_LIMIT):
        assert ask(client, "hi").status_code == 200
    assert ask(client, "hi").status_code == 429


def test_offline_without_api_key(client, monkeypatch):
    monkeypatch.delenv("ANTHROPIC_API_KEY")
    assert ask(client, "hi").status_code == 503


def test_request_options_only_add_fallbacks_for_models_that_support_them(monkeypatch):
    monkeypatch.setattr(chat_mod, "MODEL", "claude-opus-5-5")
    assert chat_mod._request_options()["fallbacks"] == "default"
    monkeypatch.setattr(chat_mod, "MODEL", "claude-haiku-5-5")
    assert "fallbacks" not in chat_mod._request_options()


def test_user_turn_wraps_context():
    turn = chat_mod.build_user_turn("Who is he?", retriever.search("who"))
    assert turn.startswith("<context>") and turn.endswith("Visitor question: Who is he?")
