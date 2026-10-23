import { ArrowUpRight, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="bg-accent py-[clamp(72px,10vw,110px)] text-[#0c0d0e]">
      <div className="wrap grid items-end gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12 lg:gap-18">
        <div data-reveal className="min-w-0">
          <p className="font-mono text-[11px] font-medium tracking-[1.7px] text-[#303b17]">06 — CONTACT</p>
          <h2 className="mt-3 text-[clamp(36px,4vw+18px,57px)] leading-[1.1] font-bold tracking-[-0.045em]">
            Got a workflow that<br /><em className="not-italic">AI should handle?</em>
          </h2>
        </div>
        <div data-reveal="0.15" className="min-w-0 border-t border-[#7f9941] pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-7">
          <p className="mb-3 max-w-[360px] text-sm">Open to junior AI engineer, AI application developer and Python roles, in Lahore or remote.</p>
          <a
            className="group flex items-center justify-between gap-3 border-b border-[#71873d] py-3.5 font-extrabold [overflow-wrap:anywhere]"
            href="mailto:Sultankhalid1007@gmail.com"
          >
            Sultankhalid1007@gmail.com <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            className="group flex items-center justify-between gap-3 border-b border-[#71873d] py-3.5 font-extrabold"
            href="tel:+923480719674"
          >
            0348-0719674 <Phone size={17} className="shrink-0 transition-transform group-hover:-rotate-12" />
          </a>
          <span className="mt-3.5 block font-mono text-[11px]">Lahore, Pakistan</span>
        </div>
      </div>
    </section>
  );
}
