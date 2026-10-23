import { BrainCircuit, Code2, Container, Server, Sparkles, type LucideIcon } from 'lucide-react';
import GlowCard from './GlowCard';
import SectionHead from './SectionHead';

// `learning` items show with a dashed border so nothing is overstated.
type Group = { title: string; icon: LucideIcon; blurb?: string; items: string[]; learning?: string[]; wide?: boolean };

const skillGroups: Group[] = [
  {
    title: 'AI & LLMs',
    icon: BrainCircuit,
    blurb: 'Wiring models into real products: routing, fallbacks and streaming.',
    items: ['LLM APIs (Anthropic, OpenAI-compatible)', 'Ollama (local models)', 'Provider routing & fallback', 'Streaming responses', 'Claude Agent Skills', 'Generative AI'],
    wide: true,
  },
  { title: 'Learning now', icon: Sparkles, items: [], learning: ['RAG', 'AI agents', 'Evals'] },
  { title: 'Backend', icon: Server, items: ['Python 3.13', 'FastAPI', 'REST APIs', 'uv', 'ruff', 'pytest'] },
  { title: 'Frontend', icon: Code2, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Radix / shadcn/ui', 'GSAP'] },
  { title: 'Ship & tooling', icon: Container, items: ['Docker', 'Docker Compose', 'Git & GitHub', 'Vercel', 'Vite', 'ESLint'] },
];

const marquee = ['Python', 'FastAPI', 'Anthropic', 'OpenAI', 'Ollama', 'RAG', 'Agents', 'Next.js', 'React', 'TypeScript', 'Docker', 'Tailwind'];

const chip = 'px-2 py-1.5 font-mono text-[11px] text-[#c4c5c8]';

export default function Skills() {
  return (
    <section id="skills" className="py-[clamp(72px,10vw,115px)]">
      <div className="wrap">
        <SectionHead num="03" title="Tech stack" />
        <div data-stagger="0.08" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map(({ title, icon: Icon, blurb, items, learning, wide }, i) => (
            <GlowCard
              accent={wide}
              className={`group p-5 sm:p-6 ${wide ? 'sm:col-span-2 lg:row-span-2' : ''}`}
              key={title}
            >
              <div className="mb-4 flex items-center gap-3">
                <Icon size={wide ? 22 : 18} className="text-accent transition-transform duration-300 group-hover:rotate-12" />
                <h3 className={`font-bold ${wide ? 'text-xl' : ''}`}>{title}</h3>
                <small className="ml-auto font-mono text-[10px] text-[#666]">0{i + 1}</small>
              </div>
              {blurb && <p className="mb-5 max-w-[420px] text-sm text-muted">{blurb}</p>}
              <ul className="flex flex-wrap gap-1.75">
                {items.map(item => (
                  <li className={`${chip} bg-[#1b1e23]`} key={item}>{item}</li>
                ))}
                {learning?.map(item => (
                  <li className={`${chip} border border-dashed border-glow/50 text-[#c9c5ff]`} key={item}>{item}</li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>
      </div>

      {/* Infinite marquee: the list is rendered twice and slides by exactly half its width. */}
      <div className="mt-[clamp(48px,7vw,80px)] overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]" aria-hidden="true">
        <div className="flex w-max motion-safe:animate-marquee">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 text-[clamp(22px,2vw+12px,34px)] font-extrabold tracking-[-0.03em] text-[#3a3d44]">
              {t} <span className="size-1.5 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
