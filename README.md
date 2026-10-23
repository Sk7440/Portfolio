# Muhammad Sultan Khalid — Portfolio

Personal portfolio of Muhammad Sultan Khalid, a frontend developer moving into AI engineering, based in Lahore, Pakistan.

Live site: https://skportfolio-sigma.vercel.app/

A single-page, scroll-animated site with About, Journey, Tech Stack, Projects and Contact sections, a downloadable CV, and an **"Ask my AI" assistant**: a small RAG app that answers visitors' questions about Sultan using Claude.

## Tech stack

- **Frontend:** [Next.js 16](https://nextjs.org/) (App Router) · React 19 · TypeScript · [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion:** [GSAP](https://gsap.com/) + ScrollTrigger · [Lenis](https://lenis.darkroom.engineering/) smooth scroll · [three.js](https://threejs.org/) hero scene · [React Bits](https://reactbits.dev/) components (SplitText, ScrollReveal, ShinyText, TextType, Magnet, SpotlightCard, LatticeLoader)
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python) · [Anthropic Claude](https://docs.claude.com/) with streaming · BM25 retrieval
- **Hosting:** Vercel (Next.js + a Python serverless function)

## How the AI assistant works

1. The chat UI (`src/components/AskAI.tsx`) posts the conversation to `/api/py/chat`.
2. FastAPI (`api/index.py`) validates and rate-limits the request.
3. A BM25 retriever (`api/_portfolio/retrieval.py`) picks the most relevant facts from `api/_portfolio/knowledge.py`.
4. Claude answers from those facts only, and the reply streams back token by token (`api/_portfolio/chat.py`).

## Getting started

You need [Node.js](https://nodejs.org/) 20+ and Python 3.12+.

```bash
npm install

# Python backend (uv shown; python -m venv works too)
uv venv .venv
uv pip install --python .venv -r requirements-dev.txt

# API key for the assistant (never commit this file)
cp .env.example .env.local      # then set ANTHROPIC_API_KEY
```

Run the site and the API together (activate the venv first so `python` finds uvicorn):

```bash
# Windows: .venv\Scripts\activate    macOS/Linux: source .venv/bin/activate
npm run dev:all
```

Open http://localhost:3000. Next.js forwards `/api/py/*` to FastAPI on port 8000. Without an API key the site still works; the assistant just says it's offline.

## Scripts

| Command            | What it does                                            |
| ------------------ | ------------------------------------------------------- |
| `npm run dev`      | Next.js dev server on :3000                             |
| `npm run dev:api`  | FastAPI with reload on :8000 (reads `.env.local`)       |
| `npm run dev:all`  | Both at once                                            |
| `npm run build`    | Production build                                        |
| `npm run start`    | Serve the production build                              |
| `npm run lint`     | ESLint                                                  |
| `npm run test:api` | Backend tests (pytest; the model call is faked, no cost) |

## Deploying to Vercel

1. Import the repo in Vercel (framework: Next.js). `api/index.py` and `requirements.txt` are picked up as a Python function automatically.
2. In **Project Settings → Environment Variables**, add `ANTHROPIC_API_KEY`. Optionally set `CLAUDE_MODEL` (defaults to `claude-opus-5-5`; `claude-haiku-5-5` is much cheaper).
3. Set a monthly spend limit in the [Anthropic Console](https://console.anthropic.com/), since the chat endpoint is public.
4. Check `https://<your-domain>/api/py/health` after deploying.

## Editing content

- **Assistant knowledge:** `api/_portfolio/knowledge.py`. The assistant only knows what's written there.
- **Projects / skills / education / timeline:** the constants at the top of `Projects.tsx`, `Skills.tsx`, `About.tsx` and `Journey.tsx` in `src/components/`.
- **CV:** replace `public/Muhammad_Sultan_Khalid_CV.pdf`, keeping the same file name.
- **Colours:** the `@theme` block in `src/app/globals.css`.

## Contact

- Email: [Sultankhalid1007@gmail.com](mailto:Sultankhalid1007@gmail.com)
- Phone: 0348-0719674
- GitHub: [Sk7440](https://github.com/Sk7440)
- LinkedIn: [sultan-khalid-ai](https://www.linkedin.com/in/sultan-khalid-ai/)
