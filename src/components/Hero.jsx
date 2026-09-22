import { ArrowUpRight, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

const Hero = () => {
  return (
    <section id="home" className="hero bg-gray-100 rounded-lg p-6 md:p-8 shadow-md">
      <div className="heroCopy overflow-hidden bg-white dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-2">REACT FRONTEND DEVELOPER</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Building clean, modern<br /><em className="text-accent">React experiences.</em></h1>
        <p className="lead text-gray-600 dark:text-gray-300 mb-6">
          I’m Muhammad Sultan Khalid, a Computer Science student focused on building responsive interfaces and practical web applications.
        </p>
        <div className="actions flex gap-4 mt-6">
          <a className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300" href="#projects">View my work <ArrowUpRight size={18} /></a>
          <a className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300" href="#contact">Let’s talk <Mail size={17} /></a>
        </div>
        <div className="socials flex gap-4 mt-4">
          <a href="https://github.com/Sk7440" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300">
            <Github size={19} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/sultan-khalid-203841284/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300">
            <Linkedin size={19} /> LinkedIn
          </a>
        </div>
      </div>
      <div className="codeCard bg-gray-900 rounded-lg p-4 mt-6">
        <div className="dots flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        </div>
        <pre className="text-white text-sm overflow-x-auto"><code><span className="text-purple-400">const</span> developer ={'{'}
          name:<span className="text-green-400">"Sultan Khalid"</span>,
          role:<span className="text-green-400">"React Developer"</span>,
          stack:[<span className="text-green-400">"React"</span>, <span className="text-green-400">"JS"</span>]
        {'}'}</code></pre>
      </div>
    </section>
  );
};

export default Hero;