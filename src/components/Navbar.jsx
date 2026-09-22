import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import cvFile from "../assets/Muhammad_Sultan_Khalid  (1).pdf";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="nav wrap">
        <a className="logo" href="#home">MSK<span>.</span></a>
        <button className="menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? 'open' : ''}>
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(x => (
            <a key={x} href={'#' + x.toLowerCase()} onClick={() => setOpen(false)}>
              {x}
            </a>
          ))}
          <a
            className="navBtn"
            href={cvFile}
            download="Muhammad_Sultan_Khalid_CV.pdf"
          >
            Hire me <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
