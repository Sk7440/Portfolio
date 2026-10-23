import GlowCard from './GlowCard';
import SectionHead from './SectionHead';
import ScrollReveal from './reactbits/ScrollReveal';

const statement =
  'For over two years I worked as an industrial engineer, hunting down slow, repetitive workflows and fixing them. Now I do the same thing with AI: I build LLM-powered apps that automate the boring parts, with an interface people enjoy using.';

const education = [
  { title: 'Applied AI Program (NAVTTC)', place: 'Corvit Systems', meta: 'Since Sep 2026' },
  { title: 'Associate Degree in Computer Science', place: 'Virtual University of Pakistan', meta: '2026 – 2028 · In progress' },
  { title: 'Introduction to Agent Skills', place: 'Anthropic', meta: 'Certificate' },
  { title: 'React · Python (Basic) · JavaScript', place: 'HackerRank', meta: 'Certificates' },
  { title: 'Responsive Web Design', place: 'freeCodeCamp', meta: 'Certificate' },
];

export default function About() {
  return (
    <section id="about" className="wrap py-[clamp(72px,10vw,115px)]">
      <SectionHead num="01" title="About me" />

      {/* React Bits ScrollReveal: words unblur and brighten as the paragraph scrolls past, with a lime glint. */}
      <ScrollReveal
        baseOpacity={0.12}
        baseRotation={0}
        blurStrength={3}
        highlightColor="#c7f36b"
        wordAnimationEnd="bottom 55%"
        containerClassName="m-0 max-w-[980px]"
        textClassName="text-[clamp(23px,1.9vw+13px,40px)] leading-[1.3] font-bold tracking-[-0.03em]"
      >
        {statement}
      </ScrollReveal>

      <div className="mt-[clamp(40px,6vw,64px)] grid gap-6 text-[15px] text-muted md:grid-cols-2 md:gap-12">
        <p data-reveal>
          My edge is that I can ship the whole thing. I wire a FastAPI backend to Anthropic, OpenAI-compatible
          APIs or a local Ollama model, add retrieval and streaming, and put a chat UI on top in Next.js and TypeScript.
        </p>
        <p data-reveal="0.12">
          Right now I’m in Corvit’s Applied AI program, interning at Appverse Technologies,
          and studying Computer Science at Virtual University. Next on my list: RAG with proper answer-quality
          evals, and tool-using agents.
        </p>
      </div>

      <div className="mt-[clamp(48px,7vw,80px)]">
        <p data-reveal className="mb-5 font-mono text-[11px] font-medium tracking-[1.7px] text-accent">
          EDUCATION &amp; CERTIFICATES
        </p>
        <ul data-stagger="0.08" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {education.map(e => (
            <li key={e.title}>
              <GlowCard className="h-full p-5">
                <p className="font-mono text-[10px] tracking-[1px] text-[#777] uppercase">{e.meta}</p>
                <h3 className="mt-2 leading-snug font-bold">{e.title}</h3>
                <p className="mt-1 text-sm text-muted">{e.place}</p>
              </GlowCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
