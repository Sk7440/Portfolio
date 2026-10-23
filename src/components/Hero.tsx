import { ArrowDown, ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import HeroCanvas from './HeroCanvas';
import Magnet from './reactbits/Magnet';
import ShinyText from './reactbits/ShinyText';
import SplitText from './reactbits/SplitText';
import TextType from './reactbits/TextType';

const btn =
  'inline-flex w-full items-center justify-center gap-2 rounded-[5px] px-5 py-3.5 text-[13px] font-extrabold transition-[scale,border-color] active:scale-[0.97] sm:w-auto';

const now = ['Applied AI @ Corvit', 'Intern @ Appverse Technologies', 'Lahore, Pakistan'];

// Full-bleed WebGL hero: the latent-space scene fills the section, the copy sits on top of it,
// and small mono labels frame the edges.
export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-30" />
      <div className="pointer-events-none absolute top-[-15%] right-[-10%] -z-30 size-[680px] rounded-full bg-glow/10 blur-[130px]" />

      {/* Scene: the top block on phones, the whole section from lg up. */}
      <div data-hero="card" className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] sm:h-[640px] lg:inset-0 lg:h-auto">
        <div data-parallax className="size-full">
          <HeroCanvas />
        </div>
      </div>

      {/* Scrims keep the copy readable over the particles. No backdrop-blur: it would re-blur every frame. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-bg/10 via-bg/55 to-bg lg:bg-linear-to-r lg:from-bg lg:via-bg/70 lg:to-bg/0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-bg to-bg/0" />

      <div className="wrap relative flex flex-col justify-center pt-12 pb-16 sm:pt-16 lg:min-h-[calc(100svh-76px)] lg:pt-12 lg:pb-28">
        <p
          data-hero="eyebrow"
          className="absolute top-8 right-0 hidden items-center gap-2 font-mono text-[10.5px] tracking-[1.6px] text-muted lg:flex"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          OPEN TO JUNIOR AI ROLES · REMOTE / LAHORE
        </p>

        <div className="relative z-10 max-w-[780px] min-w-0">
          <p
            data-hero="eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1.5 font-mono text-[11px] font-medium tracking-[1.4px] text-muted"
          >
            <Sparkles size={13} className="text-accent" />
            ASPIRING AI ENGINEER
            <span className="hidden sm:inline">
              <span className="text-accent">·</span> LLM APPS &amp; RAG
            </span>
          </p>

          <h1 className="mt-6 mb-6 text-[clamp(40px,4.6vw+14px,80px)] leading-[0.98] font-extrabold tracking-[-0.055em]">
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

          <p data-hero="item" className="max-w-[560px] text-[clamp(15px,0.5vw+13px,17px)] text-[#b4b6bc]">
            I’m Muhammad Sultan Khalid, an aspiring AI engineer. I build retrieval, streaming chat and
            multi-provider LLM backends with Python, FastAPI and Claude, and ship them with an interface people
            actually want to use.
          </p>

          <div data-hero="item" className="my-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Magnet padding={40} magnetStrength={4} wrapperClassName="w-full sm:w-auto" innerClassName="w-full">
              <a className={`${btn} group bg-accent text-bg`} href="#projects">
                See my AI projects
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnet>
            <Magnet padding={40} magnetStrength={4} wrapperClassName="w-full sm:w-auto" innerClassName="w-full">
              <a className={`${btn} border border-line bg-bg/90 hover:border-[#41464f]`} href="#ask">
                Ask my AI assistant <Sparkles size={16} />
              </a>
            </Magnet>
          </div>

          <ul data-hero="item" className="flex flex-wrap gap-2">
            {now.map(x => (
              <li key={x} className="border border-line bg-surface/80 px-2.5 py-1.5 font-mono text-[10.5px] text-[#b4b6bc]">
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

        {/* Mock chat reply: React Bits TextType types it out like a streaming LLM response. */}
        <div
          data-hero="float"
          className="relative mt-12 w-full max-w-[360px] rounded-[9px] border border-[#2a2d34] bg-[#101216]/95 p-4 shadow-[0_25px_70px_#0009] lg:absolute lg:right-0 lg:bottom-28 lg:mt-0"
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
            ollama · gemma 4 · retrieval · streaming
            <span className="flex items-center gap-1">
              try it <ArrowDown size={12} />
            </span>
          </a>
        </div>

        {/* Bottom frame: scroll cue and location, desktop only. */}
        <div
          data-hero="item"
          className="absolute inset-x-0 bottom-8 hidden items-center justify-between font-mono text-[10.5px] tracking-[1.6px] text-[#77797f] lg:flex"
        >
          <a href="#about" className="group flex items-center gap-3 transition-colors hover:text-accent">
            SCROLL TO EXPLORE
            <span className="relative block h-px w-14 overflow-hidden bg-line">
              <span className="absolute inset-0 bg-accent motion-safe:animate-scroll-cue" />
            </span>
          </a>
          <span>LAHORE, PK · 31.52°N 74.36°E</span>
        </div>
      </div>
    </section>
  );
}
