import MotionRoot from '@/components/MotionRoot';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Journey from '@/components/Journey';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import AskAI from '@/components/AskAI';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <MotionRoot>
      <a
        href="#main"
        className="sr-only z-20 rounded-[5px] bg-accent px-4 py-2.5 font-extrabold text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <AskAI />
        <Contact />
      </main>
      <Footer />
    </MotionRoot>
  );
}
