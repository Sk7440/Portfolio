import { ArrowUpRight, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

const btn = 'inline-flex items-center justify-center gap-2 rounded-[5px] px-4.5 py-3.5 text-[13px] font-extrabold transition-[translate,scale,border-color] hover:-translate-y-0.5 active:scale-[0.97]';

// Each headline line slides up from behind its own overflow-hidden mask.
const Line = ({ children }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <span className="block" data-hero="line">{children}</span>
  </span>
);

const Hero = () => {
  return (
    <section
      id="home"
      className="wrap grid items-center gap-10 pt-11 pb-18 sm:pt-14 lg:min-h-[calc(100svh-76px)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pt-16 lg:pb-20 xl:gap-18"
    >
      <div className="min-w-0">
        <p data-hero="eyebrow" className="font-mono text-[11px] font-medium tracking-[1.7px] text-accent">
          FRONTEND DEVELOPER (REACT)
        </p>
        <h1 className="mt-4 mb-6 text-[clamp(38px,6.5vw+8px,79px)] leading-[1.03] font-extrabold tracking-[-0.05em]">
          <Line>Building clean, modern</Line>
          <Line><em className="text-accent not-italic">React experiences.</em></Line>
        </h1>
        <p data-hero="item" className="max-w-[630px] text-[clamp(15px,0.5vw+13px,17px)] text-muted">
          I’m Muhammad Sultan Khalid, a frontend developer in Lahore building responsive web apps with React, Next.js, TypeScript and Tailwind CSS.
        </p>
        <div data-hero="item" className="my-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a className={`${btn} group bg-accent text-bg`} href="#projects">
            View my work <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a className={`${btn} border border-line hover:border-[#41464f]`} href="#contact">
            Let’s talk <Mail size={17} />
          </a>
        </div>
        <div data-hero="item" className="flex flex-wrap gap-5 text-xs text-[#888b92]">
          <a className="flex items-center gap-2 transition-colors hover:text-white" href="https://github.com/Sk7440" target="_blank" rel="noopener noreferrer">
            <Github size={19} /> GitHub
          </a>
          <a className="flex items-center gap-2 transition-colors hover:text-white" href="https://www.linkedin.com/in/sultan-khalid-203841284/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={19} /> LinkedIn
          </a>
        </div>
      </div>

      <div data-hero="card" className="min-w-0" aria-hidden="true">
        <div data-hero="float" className="rounded-[9px] border border-[#25282e] bg-[#101216] shadow-[0_25px_70px_#0008] lg:rotate-2">
          <div className="flex gap-1.5 border-b border-[#25282e] px-4 py-3.5">
            <i className="size-2 rounded-full bg-[#383b42]"></i>
            <i className="size-2 rounded-full bg-[#383b42]"></i>
            <i className="size-2 rounded-full bg-[#383b42]"></i>
          </div>
          <pre className="m-0 overflow-auto px-4.5 pt-4.5 pb-6 font-mono text-[12.5px] leading-[2] text-[#d9dae0] sm:px-6 sm:pt-6 sm:pb-8 sm:text-sm"><code><span className="text-[#d3a6ff]">const</span>{' developer = {\n  name: '}<span className="text-accent">"Sultan Khalid"</span>{',\n  role: '}<span className="text-accent">"Frontend Developer"</span>{',\n  stack: ['}<span className="text-accent">"React"</span>{', '}<span className="text-accent">"Next.js"</span>{', '}<span className="text-accent">"TS"</span>{'],\n  basedIn: '}<span className="text-accent">"Lahore"</span>{'\n};'}<span className="ml-1 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent motion-safe:animate-blink" /></code></pre>
        </div>
      </div>
    </section>
  );
};

export default Hero;
