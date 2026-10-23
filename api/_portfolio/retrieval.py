"""Small BM25 retriever over the knowledge chunks. No embeddings or extra dependencies:
the knowledge base is a dozen chunks, so keyword scoring is fast, cheap and easy to test."""

import math
import re
from collections import Counter

from .knowledge import CHUNKS, CORE, Chunk

_STOP = set(
    "a an and are as at be by can do does did for from has have he her his how i in is it its me my of on "
    "or so tell that the their them they this to was what when where which who why will with you your "
    "about sultan s t".split()
)
_ALIASES = {
    # Map common question words onto words the chunks actually use.
    "job": "role", "jobs": "role", "work": "role", "worked": "role", "experience": "role",
    "hire": "looking", "hiring": "looking", "available": "looking", "open": "looking",
    "study": "education", "studying": "education", "degree": "education", "university": "education",
    "course": "education", "certificate": "certificates", "certification": "certificates",
    "project": "projects", "built": "build", "building": "build", "made": "build",
    "rag": "rag", "agent": "agents", "llm": "llm", "llms": "llm", "ai": "ai",
    "contact": "email", "reach": "email", "mail": "email", "location": "lahore", "based": "lahore",
    "stack": "skills", "tech": "skills", "technologies": "skills", "tools": "skills",
}
K1, B = 1.4, 0.75


def tokenize(text: str) -> list[str]:
    words = re.findall(r"[a-z0-9]+(?:[-_.][a-z0-9]+)*", text.lower())
    out = []
    for w in words:
        if w in _STOP:
            continue
        w = _ALIASES.get(w, w)
        if len(w) > 4 and w.endswith("s"):
            w = w[:-1]
        out.append(w)
    return out


class Retriever:
    def __init__(self, chunks: list[Chunk]):
        self.chunks = chunks
        self.docs = [Counter(tokenize(f"{c.title} {c.title} {c.keywords} {c.text}")) for c in chunks]
        self.lengths = [sum(d.values()) for d in self.docs]
        self.avg = sum(self.lengths) / len(self.lengths)
        df = Counter(t for d in self.docs for t in d)
        n = len(chunks)
        self.idf = {t: math.log(1 + (n - f + 0.5) / (f + 0.5)) for t, f in df.items()}

    def score(self, query: str) -> list[tuple[float, Chunk]]:
        terms = tokenize(query)
        scored = []
        for doc, length, chunk in zip(self.docs, self.lengths, self.chunks):
            s = 0.0
            for t in terms:
                f = doc.get(t, 0)
                if f:
                    s += self.idf[t] * f * (K1 + 1) / (f + K1 * (1 - B + B * length / self.avg))
            scored.append((s, chunk))
        return sorted(scored, key=lambda x: x[0], reverse=True)

    def search(self, query: str, k: int = 4) -> list[Chunk]:
        scored = self.score(query)
        top = scored[0][0] if scored else 0
        # Keep only chunks scoring within reach of the best match; weak keyword overlaps are noise.
        hits = [c for s, c in scored if s > 0 and s >= top * 0.5][:k]
        # Vague questions ("tell me about him") match nothing; fall back to a broad overview.
        if not hits:
            hits = [c for c in self.chunks if c.id in ("looking-for", "meet-chat-bot", "skills-ai", "appverse")]
        return [CORE, *hits]


retriever = Retriever(CHUNKS)
