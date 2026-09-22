 const  About = () => {
  return (
    <section id="about" className="section bg-white dark:bg-gray-900 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="sectionHead flex items-center gap-2 mb-6">
          <span className="text-gray-500 dark:text-gray-300">01</span>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">About me</h2>
        </div>
        <div className="aboutGrid grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            I’m a <strong className="text-primary dark:text-primary">Computer Science student</strong> and aspiring frontend developer who enjoys turning ideas into polished, responsive interfaces.
          </p>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              My current focus is React.js, JavaScript, component-based UI development, routing, API integration, and state management. I’m actively building projects to strengthen my practical development skills.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              I'm looking for opportunities where I can contribute to real products, learn professional workflows, and grow with an experienced development team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;