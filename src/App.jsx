import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { animatePortfolio } from './lib/animations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const root = useRef(null);
  // useGSAP scopes every selector to `root` and reverts all tweens/ScrollTriggers on unmount.
  useGSAP(animatePortfolio, { scope: root });

  return (
    <div ref={root}>
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
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
