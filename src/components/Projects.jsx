import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import SectionHead from './SectionHead';

// `deploy` is optional: projects without a live site only show the GitHub link.
const projects = [
  {
    title: 'TaskSpace',
    type: 'Role-Based Task Management App',
    description: 'Separate Admin and Employee dashboards with role-based login and protected views. Admins create and assign tasks with priority and due dates and track team metrics; employees see their tasks and mark them complete. Auth and task state are shared through Context API and persisted in localStorage.',
    stack: ['React', 'Context API', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Sk7440/EMS-Employee-Managment-System-',
    deploy: 'https://ems-eight-ruby.vercel.app/',
  },
  {
    title: 'Wander-Lust',
    type: 'Tour Booking App',
    description: 'A single-page tour booking app with client-side routing between tour listings and booking views. Booking state is shared across components with Context API, and the booking modal recalculates the price live as options change, with form validation before submit.',
    stack: ['React 19', 'React Router', 'Context API', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Sk7440/Wander-Lust',
    deploy: 'https://wander-lust-alpha-olive.vercel.app/',
  },
  {
    title: 'AI Chat Assistant',
    type: 'Full-Stack AI Chat App',
    description: 'Runs local models through Ollama and falls back to cloud providers (Anthropic, OpenAI, Gemini) when none is available. Auto, Local and Cloud model modes, Markdown replies and in-browser chat history. A Next.js + TypeScript frontend talks to a FastAPI backend, run together with Docker Compose.',
    stack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'FastAPI', 'Docker'],
    github: 'https://github.com/Sk7440/Meet_Chat_bot',
  },
  {
    title: 'Spendly',
    type: 'Personal Finance Dashboard',
    description: 'Add, edit and delete income and expense entries, with balance and totals updating instantly. Filter transactions by type, with data persisted in localStorage. Scroll and text animations built with GSAP (ScrollTrigger, SplitText) and Anime.js on a responsive dark theme.',
    stack: ['JavaScript (ES6+)', 'Tailwind CSS', 'GSAP', 'Anime.js'],
    github: 'https://github.com/Sk7440/Spendly',
    deploy: 'https://spendly-eight-flax.vercel.app/',
  },
];

const linkClass = 'mt-5.5 flex items-center justify-between border-t border-line pt-4 text-xs font-extrabold transition-colors hover:text-accent';

const Projects = () => {
  return (
    <section id="projects" className="wrap py-[clamp(72px,10vw,115px)]">
      <SectionHead num="03" title="Selected projects" />
      <div data-stagger="0.12" className="grid gap-3.5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <article
            className="flex flex-col border border-line bg-surface p-4.5 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-[#41464f] sm:p-5.5 lg:p-7"
            key={p.title}
          >
            <div className="flex justify-between font-mono text-xs text-[#777]">
              <span>0{i + 1}</span>
              <a className="text-[#aaa] hover:text-white" href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`}>
                <Github size={20} />
              </a>
            </div>
            <div className="flex-1">
              <p className="mt-4 font-mono text-[11px] font-medium tracking-[1.7px] text-accent">{p.type}</p>
              <h3 className="mt-1 mb-3.5 text-[clamp(26px,1vw+20px,31px)] font-bold tracking-[-1.5px]">{p.title}</h3>
              <p className="text-sm text-muted">{p.description}</p>
              <div className="mt-5.5 flex flex-wrap gap-1.75">
                {p.stack.map(t => <span className="bg-[#1b1e23] px-2 py-1.5 font-mono text-[10px] text-[#c4c5c8]" key={t}>{t}</span>)}
              </div>
            </div>
            {p.deploy && (
              <a className={linkClass} href={p.deploy} target="_blank" rel="noopener noreferrer">
                View Live Project <ExternalLink size={16} />
              </a>
            )}
            <a className={linkClass} href={p.github} target="_blank" rel="noopener noreferrer">
              View on GitHub <ExternalLink size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
