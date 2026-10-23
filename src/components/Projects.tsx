import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import GlowCard from './GlowCard';
import SectionHead from './SectionHead';

const featured = {
  title: 'Meet_Chat_bot',
  type: 'Full-stack AI chat app',
  github: 'https://github.com/Sk7440/Meet_Chat_bot',
  points: [
    'A provider registry routes each request to Anthropic, any OpenAI-compatible API or a local Ollama model, with Auto, Local and Cloud modes and a cloud fallback when no local model is running.',
    'Streaming replies rendered as Markdown in a Next.js, TypeScript, Tailwind and Radix UI, with chat history kept in the browser.',
    'FastAPI on Python 3.13 (uv, ruff, pytest). Frontend and backend run together with Docker Compose, and Claude Agent Skills handle scaffolding and checks.',
  ],
  stack: ['Python 3.13', 'FastAPI', 'Next.js', 'TypeScript', 'Tailwind', 'Radix', 'Docker', 'Anthropic', 'Ollama'],
};

const roadmap = [
  { tag: 'Building next', title: 'RAG over real documents', text: 'Question answering over a real document set, with an evaluation of answer quality, not just a demo prompt.' },
  { tag: 'Planned', title: 'Tool-using AI agent', text: 'An agent that calls real tools to finish a multi-step task, deployed publicly with a README and demo video.' },
];

// `deploy` is optional: projects without a live site only show the GitHub link.
const frontend: { title: string; type: string; description: string; stack: string[]; github: string; deploy?: string }[] = [
  {
    title: 'TaskSpace',
    type: 'Role-based task management',
    description: 'Admin and Employee dashboards with role-based login and protected views. Admins assign tasks and track team metrics; auth and task state live in a Context API provider and persist in localStorage.',
    stack: ['React', 'Context API', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Sk7440/EMS-Employee-Managment-System-',
    deploy: 'https://ems-eight-ruby.vercel.app/',
  },
  {
    title: 'Wander-Lust',
    type: 'Tour booking app',
    description: 'Client-side routing between tour listings and booking views, shared booking state, and a modal that recalculates the price live as options change, with validation before submit.',
    stack: ['React 19', 'React Router', 'Context API', 'Tailwind CSS'],
    github: 'https://github.com/Sk7440/Wander-Lust',
    deploy: 'https://wander-lust-alpha-olive.vercel.app/',
  },
  {
    title: 'Spendly',
    type: 'Personal finance dashboard',
    description: 'Income and expense tracking with instant totals, filters and localStorage persistence, plus scroll and text animations built with GSAP (ScrollTrigger, SplitText) and Anime.js.',
    stack: ['JavaScript', 'Tailwind CSS', 'GSAP', 'Anime.js'],
    github: 'https://github.com/Sk7440/Spendly',
    deploy: 'https://spendly-eight-flax.vercel.app/',
  },
];

const Node = ({ label, sub, accent = false }: { label: string; sub: string; accent?: boolean }) => (
  <div className={`border bg-bg/70 px-3.5 py-3 ${accent ? 'border-accent/40' : 'border-line'}`}>
    <p className="text-[13px] font-bold">{label}</p>
    <p className="mt-0.5 font-mono text-[10px] text-[#8a8c93]">{sub}</p>
  </div>
);

// Connector with a pulsing dot, standing in for a request moving through the system.
const Wire = () => (
  <div className="relative flex h-6 items-center justify-center md:h-auto md:w-8" aria-hidden="true">
    <span className="h-full w-px bg-line md:h-px md:w-full" />
    <span className="absolute size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)] motion-safe:animate-ping" />
  </div>
);

const linkClass = 'mt-5 flex items-center justify-between border-t border-line pt-4 text-xs font-extrabold transition-colors hover:text-accent';

export default function Projects() {
  return (
    <section id="projects" className="border-t border-line bg-surface py-[clamp(72px,10vw,115px)]">
      <div className="wrap">
        <SectionHead num="04" title="AI projects" />

        <GlowCard data-reveal accent surface="var(--color-surface2)" className="p-5 sm:p-7 lg:p-10">
          <div className="pointer-events-none absolute -top-40 -right-40 size-[420px] rounded-full bg-glow/10 blur-[100px]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            <div className="min-w-0">
              <p className="font-mono text-[11px] font-medium tracking-[1.7px] text-accent uppercase">Featured · {featured.type}</p>
              <h3 className="mt-2 text-[clamp(30px,2vw+20px,44px)] leading-[1.05] font-extrabold tracking-[-0.04em]">{featured.title}</h3>
              <ul className="mt-6 space-y-3.5 text-[15px] text-muted">
                {featured.points.map(p => (
                  <li key={p} className="flex gap-3">
                    <ArrowRight size={16} className="mt-1 shrink-0 text-accent" /> <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-1.75">
                {featured.stack.map(t => <span className="bg-[#1f2228] px-2 py-1.5 font-mono text-[10px] text-[#c4c5c8]" key={t}>{t}</span>)}
              </div>
              <a
                className="group mt-7 inline-flex items-center gap-2 rounded-[5px] bg-accent px-4.5 py-3 text-[13px] font-extrabold text-bg transition-[translate] hover:-translate-y-0.5"
                href={featured.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={17} /> View the code <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Architecture diagram */}
            <div className="min-w-0 self-center">
              <p className="mb-4 font-mono text-[10px] tracking-[1.6px] text-[#777] uppercase">How a message flows</p>
              <div data-stagger="0.12" className="flex flex-col md:flex-row md:items-center">
                <Node label="Next.js UI" sub="TS · Tailwind · Radix" />
                <Wire />
                <Node label="FastAPI" sub="provider registry" accent />
                <Wire />
                <div className="grid gap-2">
                  <Node label="Anthropic" sub="cloud" />
                  <Node label="OpenAI-compatible" sub="cloud" />
                  <Node label="Ollama" sub="local first" accent />
                </div>
              </div>
              <p className="mt-5 font-mono text-[10.5px] text-[#8a8c93]">
                mode: <span className="text-accent">auto</span> → try local model → fall back to cloud → stream tokens back to the UI
              </p>
            </div>
          </div>
        </GlowCard>

        <div data-stagger="0.12" className="mt-3.5 grid gap-3.5 md:grid-cols-2">
          {roadmap.map(r => (
            <div key={r.title} className="border border-dashed border-glow/35 bg-bg/40 p-5 sm:p-6">
              <p className="font-mono text-[10.5px] tracking-[1.5px] text-glow uppercase">{r.tag}</p>
              <h3 className="mt-2 text-xl font-bold tracking-[-0.02em]">{r.title}</h3>
              <p className="mt-2 text-sm text-muted">{r.text}</p>
            </div>
          ))}
        </div>

        {/* Earlier web projects. On large screens animations.js pins this block and slides the
            track sideways as you scroll; elsewhere (and with reduced motion) it's a normal grid. */}
        <div data-hscroll className="group/h mt-[clamp(64px,9vw,110px)]">
          <div data-reveal className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] font-medium tracking-[1.7px] text-accent">BEFORE AI</p>
              <h3 className="mt-2 text-[clamp(24px,1.5vw+16px,32px)] font-bold tracking-[-0.035em]">Earlier web projects</h3>
            </div>
            <p className="max-w-[360px] text-sm text-muted">Why my AI apps come with interfaces people actually enjoy using.</p>
          </div>

          <div
            data-hscroll-track
            className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 group-data-[on]/h:flex group-data-[on]/h:w-max"
          >
            {frontend.map((p, i) => (
              <article
                className="flex flex-col border border-line bg-surface2 p-5 transition-[border-color] duration-300 hover:border-[#41464f] sm:p-6 group-data-[on]/h:w-[480px] group-data-[on]/h:p-8"
                key={p.title}
              >
                <div className="flex justify-between font-mono text-xs text-[#777]">
                  <span>0{i + 1}</span>
                  <a className="text-[#aaa] hover:text-white" href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`}>
                    <Github size={20} />
                  </a>
                </div>
                <div className="flex-1">
                  <p className="mt-4 font-mono text-[11px] font-medium tracking-[1.7px] text-accent uppercase">{p.type}</p>
                  <h4 className="mt-1 mb-3 text-[clamp(24px,1vw+18px,30px)] font-bold tracking-[-1.2px]">{p.title}</h4>
                  <p className="text-sm text-muted">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-1.75">
                    {p.stack.map(t => <span className="bg-[#1f2228] px-2 py-1.5 font-mono text-[10px] text-[#c4c5c8]" key={t}>{t}</span>)}
                  </div>
                </div>
                {p.deploy && (
                  <a className={linkClass} href={p.deploy} target="_blank" rel="noopener noreferrer">
                    View live project <ExternalLink size={16} />
                  </a>
                )}
                <a className={linkClass} href={p.github} target="_blank" rel="noopener noreferrer">
                  View on GitHub <ExternalLink size={16} />
                </a>
              </article>
            ))}
            <a
              href="https://github.com/Sk7440"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-line bg-bg/40 p-6 transition-colors hover:border-accent/50 sm:col-span-2 lg:col-span-3 group-data-[on]/h:w-[360px] group-data-[on]/h:p-8"
            >
              <Github size={28} className="text-accent" />
              <span className="mt-8 flex items-center justify-between text-xl font-bold">
                Everything else on GitHub <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
