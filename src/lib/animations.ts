import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ease = 'power4.out';
const onScroll = (trigger: Element) => ({ trigger, start: 'top 85%', once: true });

// Page-level GSAP animations, run once from MotionRoot. Components only mark elements with data attributes
// (React Bits components such as SplitText, ScrollReveal and TextType animate themselves):
//   data-progress         scroll progress bar (scaleX 0 → 1)
//   data-anim="header"    header slide-in on load
//   data-hero="…"         hero intro: eyebrow, line (masked headline line), item, card, float
//   data-parallax         hero canvas wrapper: sinks and fades as the hero scrolls away
//   data-head             SectionHead wrapper; animates its data-head-num badge (the title is a React Bits SplitText)
//   data-reveal="0.15"    fade up on scroll, value = delay in seconds (optional)
//   data-stagger="0.08"   fade up each child on scroll, value = stagger in seconds (optional)
//   data-trace            timeline wrapper; its data-trace-line child is drawn down with scroll
//   data-hscroll          pinned horizontal scroll on large screens; slides its data-hscroll-track.
//                         Sets data-on on the wrapper while active, which the track's
//                         group-data-[on]/h: classes use to switch from grid to a single row.
export function animatePortfolio() {
  // The progress bar is feedback rather than decoration, so it runs even with reduced motion.
  gsap.to('[data-progress]', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });

  const mm = gsap.matchMedia();

  // Created first: the pin adds scroll distance, so triggers further down must measure after it.
  mm.add('(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.utils.toArray<HTMLElement>('[data-hscroll]').forEach(wrap => {
      const track = wrap.querySelector<HTMLElement>('[data-hscroll-track]')!;
      wrap.dataset.on = '';
      const distance = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 100px',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          // Refresh this pin before every other trigger: it adds scroll distance, so anything below it
          // (including React Bits triggers created earlier by child components) must measure after it.
          refreshPriority: 1,
        },
      });
    });
    return () => gsap.utils.toArray<HTMLElement>('[data-hscroll]').forEach(wrap => delete wrap.dataset.on);
  });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('[data-anim="header"]', { yPercent: -100, autoAlpha: 0, duration: 0.7, ease });

    gsap.timeline({ defaults: { ease, duration: 0.8 }, delay: 0.15 })
      .from('[data-hero="eyebrow"]', { y: 16, autoAlpha: 0 })
      .from('[data-hero="line"]', { yPercent: 110, duration: 1.1, stagger: 0.12 }, '-=0.55')
      .from('[data-hero="item"]', { y: 24, autoAlpha: 0, stagger: 0.1 }, '-=0.7')
      .from('[data-hero="card"]', { autoAlpha: 0, scale: 0.94, duration: 1.4 }, 0.4)
      .from('[data-hero="float"]', { y: 40, autoAlpha: 0, duration: 1 }, 1);

    gsap.to('[data-hero="float"]', { y: -10, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.1 });

    // The neural canvas sinks and fades as the hero scrolls away.
    gsap.fromTo('[data-parallax]', { yPercent: 0, opacity: 1 }, {
      yPercent: 14,
      opacity: 0.35,
      ease: 'none',
      scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true },
    });

    gsap.utils.toArray<HTMLElement>('[data-head]').forEach(head => {
      gsap.from(head.querySelector('[data-head-num]'), { y: 16, autoAlpha: 0, duration: 0.6, ease, scrollTrigger: onScroll(head) });
    });

    gsap.utils.toArray<HTMLElement>('[data-trace]').forEach(list => {
      gsap.fromTo(list.querySelector('[data-trace-line]'), { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: list, start: 'top 65%', end: 'bottom 65%', scrub: true },
      });
    });

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
      gsap.from(el, {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease,
        delay: Number(el.dataset.reveal) || 0,
        scrollTrigger: onScroll(el),
      });
    });

    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach(group => {
      gsap.from(group.children, {
        y: 32,
        autoAlpha: 0,
        duration: 0.8,
        ease,
        stagger: Number(group.dataset.stagger) || 0.08,
        scrollTrigger: onScroll(group),
      });
    });
  });

  // Web fonts change text heights, which moves every trigger's start position.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
