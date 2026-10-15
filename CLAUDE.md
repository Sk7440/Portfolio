# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: Vite dev server at http://localhost:5173
- `npm run build`: production build into `dist/`
- `npm run preview`: serve the production build
- `npm run lint`: ESLint (flat config in `eslint.config.js`)

There is no test suite. Verify changes with `npm run build` and `npm run lint`, and check the layout at phone, tablet and desktop widths.

## Architecture

A single-page personal portfolio for Muhammad Sultan Khalid: React 19 + Vite 8, with no router or state library.

- `src/App.jsx` only composes the page sections in order: Navbar, Hero, About, Skills, Projects, Contact, Footer. Each section lives in its own file in `src/components/`.
- Navigation is anchor links (`#home`, `#about`, …) to the section `id`s. If you add a section, give it an `id` and add it to the list in `Navbar.jsx`.
- Content is hard-coded. The `projects`, `skillGroups` and `education` arrays are constants at the top of `Projects.jsx`, `Skills.jsx` and `About.jsx`, and their content mirrors the CV in `src/assets/`. Keep it that way; don't add a CMS or data fetching.
- `SectionHead.jsx` renders the numbered "01 / Title" heading used by About, Skills and Projects. `Icons.jsx` holds inline GitHub/LinkedIn SVGs, because lucide-react doesn't ship brand icons.
- The navbar's "Hire me" button downloads `src/assets/Muhammad_Sultan_Khalid_CV.pdf`, which is imported as a Vite asset. To replace the CV, keep the same file name.

## Styling

- Tailwind CSS v4 is loaded through `@tailwindcss/vite`. There is no `tailwind.config.js`; theme tokens live in the `@theme` block of `src/index.css`. Use those tokens (`bg-bg`, `bg-surface`, `bg-surface2`, `text-text`, `text-muted`, `border-line`, `text-accent`/`bg-accent`, `font-sans` = Manrope, `font-mono` = DM Mono) rather than new hex values where one fits.
- The design is a dark theme (`#0b0c0e`) with a lime accent (`#c7f36b`). The Contact section inverts it, with dark text on an accent background.
- `index.css` also defines a custom `wrap` utility (the centred max-width 1120px container with side gutters) and sets `scroll-margin-top: 76px` on `section[id]` so anchor jumps clear the sticky 76px (`h-19`) header.
- Styles are mobile-first, using Tailwind's default `sm`/`md`/`lg`/`xl` breakpoints. The mobile menu appears below `md`. Headings and section padding use `clamp()` arbitrary values for fluid sizing.
- All styling is Tailwind classes in JSX. Don't reintroduce component CSS files.

## Gotchas

- Text inside `<pre>` in JSX loses its newlines. The hero code card builds its lines with explicit `{'\n'}` string pieces, so keep that pattern when editing it.
- Grid children holding wide content (like the code card) need `min-w-0`, or they push the page wider than the viewport on mobile.
- Don't put Tailwind's catch-all `transition` class on elements GSAP animates: it also transitions `transform`/`opacity`, which fights GSAP's per-frame inline styles. List only what you need, e.g. `transition-[translate,border-color]`. (Tailwind v4's `translate-*`/`rotate-*`/`scale-*` set the individual CSS properties, so they compose with GSAP's `transform`.)

## Animation

- GSAP 3 + ScrollTrigger, run through `useGSAP` from `@gsap/react`. All animation code is in `src/lib/animations.js`, called once from `App.jsx` with the app root as `scope`, so selectors are scoped and everything is reverted on unmount.
- Components never import GSAP. They mark elements with data attributes, and `animations.js` picks them up. The attribute list is documented at the top of that file: `data-reveal` (fade up on scroll, optional delay value), `data-stagger` (fade up each child), `data-head` (SectionHead), and `data-hero="…"` (hero intro timeline). For a new animated element, add the attribute rather than writing new GSAP code where possible.
- Everything except the scroll progress bar runs inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`, so reduced-motion users see static content. CSS-only motion (the cursor blink, the mobile menu) uses `motion-safe:` / `motion-reduce:` for the same reason.
- Masked text reveals (hero headline, section titles) need an `overflow-hidden` wrapper with `pb-[0.08em]` so descenders aren't clipped.

## Performance

- Fonts load via `<link>` + preconnect in `index.html` (not a CSS `@import`), only in the weights used: Manrope 400/700/800 and DM Mono 400/500. If you use a new weight, add it to that URL.
- The bundle is roughly React (~60 KB gzip) + GSAP/ScrollTrigger (~46 KB). Don't add a second animation library.
