# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Requires Node.js 20+ and Python 3.12+. Backend deps live in `.venv` (`uv venv .venv && uv pip install --python .venv -r requirements-dev.txt`).

- `npm run dev`: Next.js dev server at http://localhost:3000
- `npm run dev:api`: FastAPI on :8000 with reload, reading `.env.local` (activate `.venv` first so `python` finds uvicorn)
- `npm run dev:all`: both together
- `npm run build` / `npm run start`: production build and serve
- `npm run lint`: ESLint (flat config in `eslint.config.mjs`)
- `npm run test:api`: pytest for the backend. A single test: `.venv/Scripts/python -m pytest tests/test_api.py -k rate_limit` (`.venv/bin/python` on macOS/Linux). The Ollama call is faked, so tests are offline and free.

Verify frontend changes with `npm run build` and `npm run lint` (no frontend tests), and check phone, tablet and desktop widths. Deployed on Vercel (https://skportfolio-sigma.vercel.app/).

## Architecture

A single-page portfolio for Muhammad Sultan Khalid, positioned as an aspiring AI engineer: AI work leads, earlier web projects are shown as background. Don't describe him as a frontend developer (the Appverse internship's frontend track stays as a fact, not an identity). Next.js 16 App Router + React 19 + TypeScript, with a FastAPI backend in the same repo.

- `src/app/page.tsx` composes the sections in order: Navbar, Hero, About, Journey, Skills, Projects, AskAI, Contact, Footer, all inside `MotionRoot`. Sections are server components unless they need state (`Navbar`, `AskAI`); interactive pieces are small client components (`HeroCanvas`, React Bits components).
- `MotionRoot.tsx` is the only page-level client wrapper. It runs `animatePortfolio` via `useGSAP` (scoped to its root div) and Lenis smooth scrolling driven by GSAP's ticker.
- Navigation is anchor links to section `id`s; Lenis handles them with a -76px offset for the sticky header. A new section needs an `id` and an entry in `links` in `Navbar.tsx`.
- Content is hard-coded as constants at the top of each section file (`featured`/`roadmap`/`frontend` in `Projects.tsx`, `skillGroups` in `Skills.tsx`, `education` in `About.tsx`, `steps` in `Journey.tsx`). Keep it that way; no CMS.
- Don't overstate experience. Skills still being learned go in `learning` (dashed chips), unbuilt projects in `roadmap` labelled "Building next"/"Planned". Don't invent clients, results or seniority, on the page or in the assistant's knowledge.
- `src/components/reactbits/` holds React Bits components copied from reactbits.dev (TS + Tailwind variant), kept close to upstream; local edits are noted in each file's header. Lint rules from the React Compiler preset are relaxed for that folder only. Wrap them rather than editing (e.g. `GlowCard.tsx` themes `SpotlightCard`, `SectionHead.tsx` uses `SplitText`).
- The hero is full-bleed: the canvas fills the section from `lg` up (the top block on phones) with gradient scrims for contrast, the copy on top, and mono labels framing the edges. ThreeUI (threeui.com) is the visual reference.
- `NeuralField.tsx` is the hero's three.js scene (a noise-displaced particle sphere in a `ShaderMaterial`, an orbit ring and tokens streaming in; scrolling scatters the sphere), loaded client-only through `HeroCanvas.tsx` (`next/dynamic`, `ssr: false`), which also waits for `requestIdleCallback` so WebGL setup doesn't block first paint. It caps pixel ratio at 1.25 (no MSAA on high-DPI), renders only while on screen, repaints after resize when no loop is running, draws one static frame under reduced motion and disposes everything on unmount; keep those properties.
- "Hire me" downloads `public/Muhammad_Sultan_Khalid_CV.pdf`. To replace the CV, keep the file name.

## Backend ("Ask my AI")

- `api/index.py` is the FastAPI app. All routes live under `/api/py/` (`/chat`, `/health`, `/docs`). `next.config.ts` rewrites `/api/py/*` to `127.0.0.1:8000` in development and to the Vercel Python function (`/api/`) in production; FastAPI still sees the original `/api/py/...` path.
- Helpers are in `api/_portfolio/` (the underscore keeps Vercel from treating them as functions; `index.py` adds its own folder to `sys.path`): `knowledge.py` (the only facts the assistant knows, as `Chunk`s with optional search `keywords`), `retrieval.py` (dependency-free BM25; the `CORE` chunk is always included, weak matches under half the top score are dropped), `chat.py` (system prompt and the streaming Ollama call).
- The model runs on Ollama: `OLLAMA_MODEL` (default `gemma4:31b-cloud`) via Ollama's native `/api/chat` streaming (NDJSON), called with `httpx` (no Anthropic SDK). The host is local Ollama (`http://localhost:11434`) unless `OLLAMA_API_KEY` is set (then `https://ollama.com` with a Bearer key, needed on Vercel) or `OLLAMA_HOST` overrides it. Requests send `num_predict` 2048 and temperature 0.3. Only `message.content` is streamed; a thinking model's `message.thinking` is dropped.
- The system prompt is static so it can be prompt-cached; retrieved context goes in the latest user turn inside `<context>`. Keep anything per-request out of `SYSTEM_PROMPT`.
- `/api/py/chat` streams `text/plain` and returns retrieved chunk titles in an `X-Sources` header. Errors before streaming are JSON `{error}` with 400/429/503 (503 on Vercel when neither `OLLAMA_API_KEY` nor `OLLAMA_HOST` is set); errors mid-stream become a friendly sentence in the stream. The rate limit is in-memory per serverless instance, a speed bump rather than a guarantee.
- The frontend sends only plain `{role, content}` turns (max 12, starting with a user turn, failed exchanges dropped); see `toHistory` in `AskAI.tsx`. The message list has `data-lenis-prevent` so it scrolls natively.

## Styling

- Tailwind CSS v4 through `@tailwindcss/turbopack` (configured in `next.config.ts`; no `tailwind.config.js`). Tokens live in the `@theme` block of `src/app/globals.css`: `bg-bg`, `bg-surface`, `bg-surface2`, `text-text`, `text-muted`, `border-line`, `text-accent`/`bg-accent`, `text-glow`/`bg-glow` (violet, for AI accents), `animate-blink`, `animate-marquee`. Fonts come from `next/font` in `layout.tsx` (Manrope 400/700/800 as `font-sans`, DM Mono 400/500 as `font-mono`); add weights there if you need new ones.
- Dark theme (`#0b0c0e`), lime accent (`#c7f36b`), violet glow (`#8f86ff`). Contact inverts it (dark text on accent).
- `globals.css` also defines `grid-bg` (faded hero grid) and `wrap` (centred max-width 1120px container) utilities, imports Lenis's CSS, and sets `scroll-margin-top: 76px` on `section[id]`. Don't add `scroll-behavior: smooth`; it fights Lenis.
- Mobile-first with Tailwind's default breakpoints; the mobile menu shows below `md`. All styling is Tailwind classes in TSX; no component CSS files.

## Gotchas

- `MotionRoot`'s div has `overflow-x-clip`: the marquee and the pinned horizontal strip are wider than the viewport. Don't remove it.
- Grid children holding wide content need `min-w-0`, or they push the page wider than the viewport on mobile.
- Don't put Tailwind's catch-all `transition` class on elements GSAP or Magnet animate; it fights per-frame inline transforms. List properties instead, e.g. `transition-[scale,border-color]`.
- A hydration warning listing `bis_skin_checked` or similar attributes comes from a browser extension, not the app.
- Don't use `backdrop-blur` on the sticky header or on anything over the WebGL canvas: it re-blurs every frame and was the main cause of dropped frames. Near-opaque fills (`bg-bg/95`) look the same.
- `GlowCard` passes `proximity={0}` so only the card under the pointer animates; with a proximity radius every card runs its rAF loop on each mouse move.

## Animation

- GSAP 3 + ScrollTrigger. Page-level animation lives in `src/lib/animations.ts`; sections mark elements with data attributes documented at the top of that file: `data-progress`, `data-anim="header"`, `data-hero="…"` (eyebrow, line, item, card, float), `data-parallax`, `data-head`/`data-head-num`, `data-reveal`, `data-stagger`, `data-trace`/`data-trace-line`, `data-hscroll`/`data-hscroll-track`. Prefer adding an attribute over new GSAP code.
- React Bits components animate themselves: `SplitText` (section titles, hero line 1), `ScrollReveal` (About statement), `ShinyText` (hero "end to end."), `TextType` (hero chat card), `Magnet` (hero buttons), `SpotlightCard` (via `GlowCard`), `LatticeLoader` (chat "thinking" state).
- `data-hscroll` pins only at `(min-width: 1024px) and (min-height: 700px)`; elsewhere the track is a normal grid. While active it sets `data-on` on the wrapper, which the track's `group-data-[on]/h:` classes use. The pin adds scroll distance, so it's created first and has `refreshPriority: 1`; triggers below it (including ones React Bits components create before `MotionRoot` runs) then measure correctly.
- Everything except the progress bar respects `prefers-reduced-motion` (GSAP `matchMedia`, the React Bits components' own checks, Lenis disabled, `motion-safe:` for CSS motion).
- Masked reveals need an `overflow-hidden` wrapper with `pb-[0.08em]` so descenders aren't clipped.

## Performance

- Main bundle: React + GSAP/ScrollTrigger (+ SplitText plugin) + Lenis; three.js (~120 KB gzip) is a separate client-only chunk. Don't add Framer Motion or another animation library; pick React Bits components that depend only on GSAP or nothing (the registry at `https://reactbits.dev/r/registry.json` lists each component's dependencies).
