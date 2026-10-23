export default function Footer() {
  return (
    <footer className="py-5.5 text-[11px] text-[#777]">
      <div className="wrap flex flex-col gap-1.5 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Muhammad Sultan Khalid</span>
        <span>Python • FastAPI • LLMs • Next.js</span>
      </div>
    </footer>
  );
}
