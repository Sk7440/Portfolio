import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import cvFile from '../assets/Muhammad_Sultan_Khalid  (1).pdf';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-md">
      <div className="nav bg-white dark:bg-gray-900 shadow-md rounded-lg p-2 md:p-4 w-full max-w-6xl mx-auto">
        <a className="logo text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-1" href="#home">MSK<span>.</span></a>
        <button className="menu focus:outline-none md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={`navLinks ${open ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 md:gap-6`}>
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, i) => (
            <a key={i} href={'#' + item.toLowerCase()} onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors duration-300">
              {item}
            </a>
          ))}
          <a className="navBtn bg-accent text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors duration-300" href={cvFile} download="Muhammad_Sultan_Khalid_CV.pdf">
            Hire me <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;