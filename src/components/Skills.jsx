import React from 'react';
import { Code2 } from 'lucide-react';

const skills = ['React.js', 'JavaScript ES6+', 'React Router', 'Context API', 'REST APIs', 'Tailwind CSS', 'HTML5', 'CSS3', 'Git & GitHub'];

const Skills = () => {
  return (
    <section id="skills" className="section alt">
      <div className="wrap">
        <div className="sectionHead">
          <span>02</span>
          <h2>Tech stack</h2>
        </div>
        <div className="skillGrid">
          {skills.map((s, i) => (
            <div className="skill" key={s}>
              <Code2 size={18} />
              <span>{s}</span>
              <small>0{i + 1}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
