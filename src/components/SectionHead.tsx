import SplitText from './reactbits/SplitText';

// Numbered "01 / Title" heading. The title is React Bits SplitText: letters rise out of a mask on scroll.
export default function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div data-head className="mb-[clamp(32px,5vw,55px)] flex items-center gap-3.5 sm:gap-5">
      <span data-head-num className="border border-[#30352a] px-2.5 py-1.5 font-mono text-xs text-accent">
        {num}
      </span>
      <SplitText
        tag="h2"
        text={title}
        splitType="chars"
        mask
        delay={22}
        duration={0.9}
        textAlign="left"
        rootMargin="-40px"
        className="m-0 pb-[0.08em] text-[clamp(30px,3vw+16px,43px)] leading-[1.1] font-bold tracking-[-0.045em]"
      />
    </div>
  );
}
