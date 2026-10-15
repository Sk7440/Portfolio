const SectionHead = ({ num, title }) => (
  <div data-head className="mb-[clamp(32px,5vw,55px)] flex items-center gap-3.5 sm:gap-5">
    <span data-head-num className="border border-[#30352a] px-2.5 py-1.5 font-mono text-xs text-accent">{num}</span>
    <h2 className="m-0 overflow-hidden pb-[0.08em] text-[clamp(30px,3vw+16px,43px)] leading-[1.1] font-bold tracking-[-0.045em]">
      <span data-head-line className="block">{title}</span>
    </h2>
  </div>
);

export default SectionHead;
