import { ArrowDown, ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import HeroCanvas from './HeroCanvas';
import Magnet from './reactbits/Magnet';
import ShinyText from './reactbits/ShinyText';
import SplitText from './reactbits/SplitText';
import TextType from './reactbits/TextType';

const btn =
  'inline-flex w-full items-center justify-center gap-2 rounded-[5px] px-4.5 py-3.5 text-[13px] font-extrabold transition-[scale,border-color] active:scale-[0.97] sm:w-auto';

const now = ['Applied AI @ Corvit', 'Frontend Intern @ Appverse', 'Lahore, Pakistan'];

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute top-[-10%] right-[-10%] -z-10 size-[620px] rounded-full bg-glow/12 blur-[120px]" />

      <div className="wrap grid items-center gap-6 pt-11 pb-16 sm:pt-14 lg:min-h-[calc(100svh-76px)] lg:grid-cols-[1.05fr_0.95fr] lg:pt-10 lg:pb-16">
        <div className="relative z-10 min-w-0">
          <p
            data-hero="eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] font-medium tracking-[1.4px] text-muted"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            FRONTEND DEVELOPER <span className="text-accent">→</span> AI ENGINEER
          </p>

          <h1 className="mt-5 mb-6 text-[clamp(36px,4.4vw+12px,68px)] leading-[1.02] font-extrabold tracking-[-0.05em]">
            <span className="block">
              <SplitText
                tag="span"
                text="I build LLM apps,"
                trigger="load"
                splitType="chars"
                mask
                delay={22}
                duration={1}
                textAlign="left"
                className="pb-[0.08em]"
              />
            </span>
            {/* Masked line that slides up in the hero timeline, with a React Bits sheen sweeping across it. */}
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="block" data-hero="line">
                <ShinyText text="end to end." color="#c7f36b" shineColor="#ffffff" speed={2.6} delay={3} shineWidth={30} />
              </span>
            </span>
          </h1>

          <p data-hero="item" className="max-w-[580px] text-[clamp(15px,0.5vw+13px,17px)] text-muted">
            I’m Muhammad Sultan Khalid, an aspiring AI application engineer. I ship LLM features from the
            Python backend to a React interface people actually want to use.
          </p>

          <div data-hero="item" className="my-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Magnet padding={40} magnetStrength={4} wrapperClassName="w-full sm:w-auto" innerClassName="w-full">
              <a className={`${btn} group bg-accent text-bg`} href="#projects">
                See what I’m building
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnet>
            <Magnet padding={40} magnetStrength={4} wrapperClassName="w-full sm:w-auto" innerClassName="w-full">
              <a className={`${btn} border border-line bg-bg hover:border-[#41464f]`} href="#ask">
                Ask my AI assistant <Sparkles size={16} />
              </a>
            </Magnet>
          </div>

          <ul data-hero="item" className="flex flex-wrap gap-2">
            {now.map(x => (
              <li key={x} className="border border-line bg-surface/60 px-2.5 py-1.5 font-mono text-[10.5px] text-[#b4b6bc]">
                {x}
              </li>
            ))}
          </ul>
          <div data-hero="item" className="mt-6 flex flex-wrap gap-5 text-xs text-[#888b92]">
            <a className="flex items-center gap-2 transition-colors hover:text-white" href="https://github.com/Sk7440" target="_blank" rel="noopener noreferrer">
              <Github size={19} /> GitHub
            </a>
            <a className="flex items-center gap-2 transition-colors hover:text-white" href="https://www.linkedin.com/in/sultan-khalid-ai/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={19} /> LinkedIn
            </a>
            <a className="flex items-center gap-2 transition-colors hover:text-white" href="#contact">
              <Mail size={17} /> Email
            </a>
          </div>
        </div>

        <div data-hero="card" className="relative min-w-0">
          <div data-parallax className="h-[400px] sm:h-[440px] lg:h-[580px]">
            <HeroCanvas />
          </div>

          {/* Mock chat reply: React Bits TextType types it out like a streaming LLM response. */}
          <div
            data-hero="float"
            className="absolute right-0 bottom-2 left-0 mx-auto max-w-[360px] rounded-[9px] border border-[#2a2d34] bg-[#101216]/95 p-4 shadow-[0_25px_70px_#0009] sm:left-auto sm:mx-0 lg:right-2 lg:bottom-10"
          >
            <p className="ml-auto w-fit max-w-[85%] rounded-md bg-surface2 px-3 py-2 text-[12.5px] text-[#d9dae0]">
              Explain RAG in one line.
            </p>
            <div className="mt-3 flex gap-2.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-accent text-bg">
                <Sparkles size={13} />
              </span>
              <TextType
                as="p"
                text="Retrieve the most relevant chunks from your own documents, then let the model answer using only them."
                loop={false}
                startOnVisible
                initialDelay={1900}
                typingSpeed={22}
                variableSpeed={{ min: 12, max: 34 }}
                cursorStyle="block"
                cursorClassName="text-accent"
                className="min-h-[3.3em] text-[12.5px] leading-[1.65] text-[#d9dae0]"
              />
            </div>
            <a
              href="#ask"
              className="mt-3 flex items-center justify-between border-t border-line pt-2.5 font-mono text-[10px] text-[#8a8c93] transition-colors hover:text-accent"
            >
              provider: claude · retrieval · streaming
              <span className="flex items-center gap-1">
                try it <ArrowDown size={12} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
