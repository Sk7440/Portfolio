import React from 'react';
const skills = ['React.js', 'JavaScript ES6+', 'React Router', 'Context API', 'REST APIs', 'Tailwind CSS', 'HTML5', 'CSS3', 'Git & GitHub'];

const Skills = () => {
  return (
    <section id="skills" className="section bg-white dark:bg-gray-900 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="sectionHead flex items-center gap-2 mb-8">
          <span className="text-gray-500 dark:text-gray-300">02</span>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tech stack</h2>
        </div>
        <div className="skillGrid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {skills.map((s, i) => (
            <div key={i} className="skill p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary dark:bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">⚛</span>
                </div>
                <span className="font-medium text-gray-800 dark:text-gray-200">{s}</span>
              </div>
              <small className="text-gray-500 dark:text-gray-400 mt-1 block">Skill #{i + 1}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Skills;