import React from 'react';

const projects = [
  { title: 'Mart-O', type: 'E-Commerce Mini Web App', description: 'A dynamic React storefront with client-side routing, product details, reviews, API integration, loading states and error handling.', stack: ['React.js', 'React Router', 'Tailwind CSS', 'REST API'], github: 'https://github.com/Sk7440/Mart-O', deploy: 'https://mart-o.vercel.app/' },
  { title: 'Wanderlust', type: 'Tour Booking Platform', description: 'A responsive React booking experience with global state, persistent reservations, dynamic pricing and booking workflows.', stack: ['React.js', 'React Router v6', 'Context API', 'Tailwind CSS', 'LocalStorage'], github: 'https://github.com/Sk7440/Wander-Lust', deploy: 'https://wander-lust-alpha-olive.vercel.app/' },
  { title: 'Spendly', type: 'Personal Finance Dashboard', description: 'An interactive financial tracker for balances, income and expenses with CRUD functionality, persistence and an animated modern interface.', stack: ['HTML5', 'Tailwind CSS', 'JavaScript', 'GSAP', 'LocalStorage'], github: 'https://github.com/Sk7440/Spendly', deploy: 'https://spendly-git-main-sk-project1.vercel.app/' }
];

const Projects = () => {
  return (
    <section id="projects" className="section bg-white dark:bg-gray-900 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="sectionHead flex items-center gap-2 mb-8">
          <span className="text-gray-500 dark:text-gray-300">03</span>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Selected projects</h2>
        </div>
        <div className="projectGrid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <article key={i} className="project bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="projectTop flex justify-between items-start p-4">
                <span className="text-gray-500 dark:text-gray-400">0{i + 1}</span>
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-blue-600 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.64-3.369-1.64-.216-1.555-1.136-1.666-1.136-1.666-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.984 1.029-2.684-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651-.943.076-2.002 1.029-2.002 1.029-.545 1.31-.21 2.419.1 3.008A10.019 10.019 0 0010 19.983c-4.477 0-8.18-3.707-8.18-8.18C3.04 4.484 4.477 0 8.017 0z" clipRule="evenodd"/></svg>
                </a>
              </div>
              <div className="projectBody p-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{p.type}</p>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{p.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{p.description}</p>
                <div className="tags flex flex-wrap gap-2">
                  {p.stack.map((t, stackIndex) => (
                    <span key={stackIndex} className="bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full text-primary/70 dark:text-primary/70 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="projectFooter flex flex-col sm:flex-row gap-2 p-4">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-blue-600 transition-colors duration-300">
                  View on GitHub <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
                <a href={p.deploy} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-blue-600 transition-colors duration-300">
                  View Live Project <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Projects;