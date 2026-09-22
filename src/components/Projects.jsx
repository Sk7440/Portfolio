import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';

const projects = [
  { title: 'Mart-O', type: 'E-Commerce Mini Web App', description: 'A dynamic React storefront with client-side routing, product details, reviews, API integration, loading states and error handling.', stack: ['React.js', 'React Router', 'Tailwind CSS', 'REST API'], github: 'https://github.com/Sk7440/Mart-O',deploy:"https://mart-o.vercel.app/" },
  { title: 'Wanderlust', type: 'Tour Booking Platform', description: 'A responsive React booking experience with global state, persistent reservations, dynamic pricing and booking workflows.', stack: ['React.js', 'React Router v6', 'Context API', 'Tailwind CSS', 'LocalStorage'], github: 'https://github.com/Sk7440/Wander-Lust',deploy:"https://wander-lust-alpha-olive.vercel.app/" },
  { title: 'Spendly', type: 'Personal Finance Dashboard', description: 'An interactive financial tracker for balances, income and expenses with CRUD functionality, persistence and an animated modern interface.', stack: ['HTML5', 'Tailwind CSS', 'JavaScript', 'GSAP', 'LocalStorage'], github: 'https://github.com/Sk7440/Spendly',deploy:"https://spendly-git-main-sk-project1.vercel.app/" }
];

const Projects = () => {
  return (
    <section id="projects" className="section wrap">
      <div className="sectionHead">
        <span>03</span>
        <h2>Selected projects</h2>
      </div>
      <div className="projectGrid">
        {projects.map((p, i) => (
          <article className="project" key={p.title}>
            <div className="projectTop">
              <span>0{i + 1}</span>
              <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
            <div className="projectBody">
              <p className="type">{p.type}</p>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="tags">
                {p.stack.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
            <a className="projectLink" href={p.github} target="_blank" rel="noopener noreferrer">
              View on GitHub <ExternalLink size={16} />
            </a>
            <a className="projectLink" href={p.deploy} target="_blank" rel="noopener noreferrer">
              View Live Project <ExternalLink size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
