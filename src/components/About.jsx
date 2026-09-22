import React from 'react';

const About = () => {
  return (
    <section id="about" className="section wrap">
      <div className="sectionHead">
        <span>01</span>
        <h2>About me</h2>
      </div>
      <div className="aboutGrid">
        <p className="bigText">
          I’m a <strong>Computer Science student</strong> and aspiring frontend developer who enjoys turning ideas into polished, responsive interfaces.
        </p>
        <div>
          <p>
            My current focus is React.js, JavaScript, component-based UI development, routing, API integration and state management. I’m actively building projects to strengthen my practical development skills.
          </p>
          <p>
            I'm looking for opportunities where I can contribute to real products, learn professional workflows and grow with an experienced development team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
