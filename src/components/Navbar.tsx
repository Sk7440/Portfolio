'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Journey', id: 'journey' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Ask AI', id: 'ask' },
  { label: 'Contact', id: 'contact' },
];

const HireButton = ({ className = '' }: { className?: string }) => (
  <a
    className={`flex items-center justify-center gap-1.5 rounded-[5px] bg-accent px-4 font-extrabold text-[#0c0d0e] transition-transform hover:-translate-y-0.5 active:scale-[0.97] ${className}`}
    href="/Muhammad_Sultan_Khalid_CV.pdf"
    download="Muhammad_Sultan_Khalid_CV.pdf"
  >
    Hire me <ArrowUpRight size={16} />
  </a>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header data-anim="header" className="sticky top-0 z-10 border-b border-white/6 bg-bg/95">
      <div className="wrap flex h-19 items-center justify-between">
        <a className="text-[21px] font-extrabold tracking-[-1px]" href="#home" aria-label="Muhammad Sultan Khalid, home">
          MSK<span className="text-accent">.</span>
        </a>
        <button
          className="-mr-2 flex cursor-pointer p-2 text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className="hidden items-center gap-6 text-[13px] text-[#b8bac0] md:flex" aria-label="Main">
          {links.map(l => (
            <a key={l.id} className="transition-colors hover:text-white" href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
          <HireButton className="py-2.5" />
        </nav>
      </div>

      {/* Animating grid rows 0fr → 1fr opens the menu to its natural height with CSS alone. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-19 grid border-b bg-surface transition-[grid-template-rows,opacity,border-color] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? 'grid-rows-[1fr] border-line opacity-100' : 'grid-rows-[0fr] border-transparent opacity-0'
        }`}
      >
        <nav className="min-h-0 overflow-hidden" aria-label="Mobile">
          <div className="flex max-h-[calc(100svh-76px)] flex-col overflow-y-auto px-5.5 pt-3 pb-5.5 text-[15px] text-[#b8bac0]">
            {links.map(l => (
              <a
                key={l.id}
                className="border-b border-white/6 py-3 hover:text-white"
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <HireButton className="mt-4 py-3.5" />
          </div>
        </nav>
      </div>

      <div data-progress className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent" />
    </header>
  );
}
