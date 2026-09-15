import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

const Hero = () => {
  return (
    <section id="home" className="hero wrap">
      <div className="heroCopy overflow-hidden">
        <p className="eyebrow">REACT FRONTEND DEVELOPER</p>
        <h1>Building clean, modern<br /><em>React experiences.</em></h1>
        <p className="lead">
          I’m Muhammad Sultan Khalid, a Computer Science student focused on building responsive interfaces and practical web applications.
        </p>
        <div className="actions">
          <a className="primary" href="#projects">View my work <ArrowUpRight size={18} /></a>
          <a className="secondary" href="#contact">Let’s talk <Mail size={17} /></a>
        </div>
        <div className="socials">
          <a href="https://github.com/Sk7440" target="_blank" rel="noopener noreferrer">
            <Github size={19} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/sultan-khalid-203841284/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={19} /> LinkedIn
          </a>
        </div>
      </div>
      <div className="codeCard">
        <div className="dots"><i></i><i></i><i></i></div>
        <pre><code><span className="purple">const</span> developer ={'{'}
          name:<span className="green">"Sultan Khalid"</span>,
          role:<span className="green">"React Developer"</span>,
          stack:[<span className="green">"React"</span>, <span className="green">"JS"</span>]
        {'}'}</code></pre>
      </div>
    </section>
  );
};

export default Hero;
