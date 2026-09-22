import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section bg-white dark:bg-gray-900 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="sectionHead flex items-center gap-2 mb-8">
          <span className="text-gray-500 dark:text-gray-300">04</span>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Get in touch</h2>
        </div>
        <div className="contactBox bg-gray-50 dark:bg-gray-800 rounded-lg p-6 md:p-8">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Let's build something amazing together. Whether you have a project in mind or just want to connect, feel free to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:sk7440@gmail.com" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Me
            </a>
            <a href="#projects" className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300 flex items-center justify-center gap-2">
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;