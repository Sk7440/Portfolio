'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { animatePortfolio } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Client wrapper around the whole page: runs the data-attribute animations and Lenis smooth scroll.
// Sections stay server components; they're passed through as children.
export default function MotionRoot({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  // useGSAP scopes every selector to `root` and reverts all tweens/ScrollTriggers on unmount.
  useGSAP(animatePortfolio, { scope: root });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Lenis also handles #anchor links; the offset clears the sticky 76px header.
    const lenis = new Lenis({ autoRaf: false, anchors: { offset: -76 } });
    lenis.on('scroll', ScrollTrigger.update);
    // Drive Lenis from GSAP's ticker so smooth scroll and ScrollTrigger share one frame loop.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={root} className="overflow-x-clip">
      {children}
    </div>
  );
}
