import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="wrap contactInner">
        <div>
          <p className="eyebrow">04 — CONTACT</p>
          <h2>Let’s build something<br /><em>useful together.</em></h2>
        </div>
        <div className="contactBox">
          <p>Open to React frontend opportunities, internships and collaborative projects.</p>
          <a href="mailto:Sultankhalid1007@gmail.com">
            Sultankhalid1007@gmail.com <ArrowUpRight size={18} />
          </a>
          <span>Lahore, Pakistan</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
