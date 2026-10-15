# Muhammad Sultan Khalid — Portfolio

Personal portfolio of Muhammad Sultan Khalid, a frontend developer (React) based in Lahore, Pakistan.

Live site: https://skportfolio-sigma.vercel.app/

It's a single-page site with About, Tech Stack, Projects and Contact sections, and a downloadable CV. The layout is fully responsive, from small phones up to large desktops.

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) + ScrollTrigger for animations
- [Lucide](https://lucide.dev/) icons

## Getting started

You need [Node.js](https://nodejs.org/) 20 or newer.

```bash
npm install
npm run dev
```

Then open the URL Vite prints, usually http://localhost:5173.

## Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload      |
| `npm run build`   | Build the production site into `dist/`    |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Check the code with ESLint                |

## Project structure

```
src/
├── assets/          CV (PDF)
├── components/      One file per section (Navbar, Hero, About, Skills,
│                    Projects, Contact, Footer) plus shared bits
│                    (SectionHead, Icons)
├── App.jsx          Puts the sections together
├── index.css        Tailwind import and theme colours/fonts
└── main.jsx         Entry point
```

## Editing content

- **Projects:** edit the `projects` array in `src/components/Projects.jsx` (`deploy` is optional; leave it out if there's no live site).
- **Education & training:** edit the `education` array in `src/components/About.jsx`.
- **Skills:** edit the `skillGroups` array in `src/components/Skills.jsx`.
- **CV:** replace `src/assets/Muhammad_Sultan_Khalid_CV.pdf`, keeping the same file name.
- **Colours and fonts:** change the `@theme` block in `src/index.css`.

## Featured projects

- **TaskSpace:** role-based task management app ([live](https://ems-eight-ruby.vercel.app/) · [code](https://github.com/Sk7440/EMS-Employee-Managment-System-))
- **Wander-Lust:** tour booking app ([live](https://wander-lust-alpha-olive.vercel.app/) · [code](https://github.com/Sk7440/Wander-Lust))
- **AI Chat Assistant:** full-stack AI chat app ([code](https://github.com/Sk7440/Meet_Chat_bot))
- **Spendly:** personal finance dashboard ([live](https://spendly-eight-flax.vercel.app/) · [code](https://github.com/Sk7440/Spendly))

## Contact

- Email: [Sultankhalid1007@gmail.com](mailto:Sultankhalid1007@gmail.com)
- Phone: 0348-0719674
- GitHub: [Sk7440](https://github.com/Sk7440)
- LinkedIn: [sultan-khalid](https://www.linkedin.com/in/sultan-khalid-203841284/)
