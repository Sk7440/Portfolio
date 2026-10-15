import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ease = 'power4.out';
const onScroll = trigger => ({ trigger, start: 'top 85%', once: true });

// All page animations. Components only mark elements with data attributes:
//   data-progress         scroll progress bar (scaleX 0 → 1)
//   data-anim="header"    header slide-in on load
//   data-hero="…"         hero intro: eyebrow, line (masked headline line), item, card, float
//   data-head             SectionHead wrapper, with data-head-num / data-head-line inside
//   data-reveal="0.15"    fade up on scroll, value = delay in seconds (optional)
//   data-stagger="0.08"   fade up each child on scroll, value = stagger in seconds (optional)
export function animatePortfolio() {
  // The progress bar is feedback rather than decoration, so it runs even with reduced motion.
  gsap.to('[data-progress]', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('[data-anim="header"]', { yPercent: -100, autoAlpha: 0, duration: 0.7, ease });

    gsap.timeline({ defaults: { ease, duration: 0.8 }, delay: 0.15 })
      .from('[data-hero="eyebrow"]', { y: 16, autoAlpha: 0 })
      .from('[data-hero="line"]', { yPercent: 110, duration: 1.1, stagger: 0.12 }, '-=0.55')
      .from('[data-hero="item"]', { y: 24, autoAlpha: 0, stagger: 0.1 }, '-=0.7')
      .from('[data-hero="card"]', { y: 48, scale: 0.96, autoAlpha: 0, duration: 1.2 }, 0.5);

    gsap.to('[data-hero="float"]', { y: -10, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });

    gsap.utils.toArray('[data-head]').forEach(head => {
      gsap.timeline({ defaults: { ease }, scrollTrigger: onScroll(head) })
        .from(head.querySelector('[data-head-num]'), { y: 16, autoAlpha: 0, duration: 0.6 })
        .from(head.querySelector('[data-head-line]'), { yPercent: 110, duration: 1 }, '<0.08');
    });

    gsap.utils.toArray('[data-reveal]').forEach(el => {
      gsap.from(el, {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease,
        delay: Number(el.dataset.reveal) || 0,
        scrollTrigger: onScroll(el),
      });
    });

    gsap.utils.toArray('[data-stagger]').forEach(group => {
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
