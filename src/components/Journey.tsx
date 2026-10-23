import SectionHead from './SectionHead';

const steps: { when: string; title: string; place: string; text: string; next?: boolean }[] = [
  {
    when: 'Dec 2023 – Apr 2026',
    title: 'Industrial Engineer Officer',
    place: 'Kamal Limited',
    text: 'Process optimization, quality control and logistics. Learned to spot wasted effort in a workflow and remove it.',
  },
  {
    when: 'Self-taught',
    title: 'Learning to build',
    place: 'React · Next.js · TypeScript',
    text: 'Taught myself to build for the web and shipped a task manager, a tour booking app and a finance dashboard on Vercel.',
  },
  {
    when: 'Sep 2026 – now',
    title: 'Applied AI Program',
    place: 'Corvit Systems (NAVTTC)',
    text: 'Hands-on training in applied AI, alongside my own LLM projects in Python and FastAPI.',
  },
  {
    when: 'Oct 2026 – now',
    title: 'Developer Intern',
    place: 'Appverse Technologies · Remote · Frontend track',
    text: 'Web foundations and JavaScript in production: BEM, design tokens, CSS variables, ES6+ data pipelines and accessible UI.',
  },
  {
    when: 'Next',
    title: 'AI Engineer',
    place: 'The goal',
    text: 'Shipping LLM features end to end. Building a RAG app with answer-quality evals and a tool-using agent, both deployed publicly.',
    next: true,
  },
];

export default function Journey() {
  return (
    <section id="journey" className="border-y border-line bg-surface py-[clamp(72px,10vw,115px)]">
      <div className="wrap">
        <SectionHead num="02" title="The switch" />

        <ol data-trace className="relative ml-1 grid gap-10 pl-9 sm:pl-12 md:gap-14">
          {/* Static rail, plus the accent line that animations.js draws down as you scroll. */}
          <span className="absolute top-2 bottom-2 left-[5px] w-px bg-line" aria-hidden="true" />
          <span
            data-trace-line
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-linear-to-b from-accent via-accent to-glow"
            aria-hidden="true"
          />

          {steps.map(s => (
            <li data-reveal key={s.title} className="relative grid gap-2 md:grid-cols-[200px_1fr] md:gap-10">
              <span
                className={`absolute top-1.5 -left-9 size-[11px] rounded-full border-2 sm:-left-12 ${
                  s.next ? 'border-glow bg-glow/30 shadow-[0_0_18px_var(--color-glow)]' : 'border-accent bg-bg'
                }`}
                aria-hidden="true"
              />
              <p className={`font-mono text-[11px] tracking-[1.4px] uppercase ${s.next ? 'text-glow' : 'text-accent'}`}>{s.when}</p>
              <div>
                <h3 className="text-[clamp(21px,1vw+16px,26px)] leading-tight font-bold tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-1 text-sm text-[#b4b6bc]">{s.place}</p>
                <p className="mt-3 max-w-[560px] text-[15px] text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
