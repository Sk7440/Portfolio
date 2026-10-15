import { Code2, Layers, Palette, Database, Sparkles } from 'lucide-react';
import SectionHead from './SectionHead';

const skillGroups = [
  { title: 'Frontend', icon: Code2, items: ['React (hooks, Context API, React Router)', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3 (Flexbox, Grid)'] },
  { title: 'Styling & animation', icon: Palette, items: ['Tailwind CSS', 'shadcn/ui', 'Responsive design', 'GSAP', 'Framer Motion'] },
  { title: 'Tooling', icon: Layers, items: ['Vite', 'Git', 'GitHub', 'ESLint', 'Vercel'] },
  { title: 'Data', icon: Database, items: ['REST APIs', 'JSON', 'localStorage'] },
  { title: 'Also familiar with', icon: Sparkles, items: ['Python', 'FastAPI (basics)', 'Learning Node.js & Express'] },
];

const Skills = () => {
  return (
    <section id="skills" className="border-y border-line bg-surface py-[clamp(72px,10vw,115px)]">
      <div className="wrap">
        <SectionHead num="02" title="Tech stack" />
        <div data-stagger="0.08" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map(({ title, icon: Icon, items }, i) => (
            <div
              className="group border border-line bg-surface2 p-5 transition-colors hover:border-accent/40 sm:p-6"
              key={title}
            >
              <div className="mb-4 flex items-center gap-3">
                <Icon size={18} className="text-accent transition-transform duration-300 group-hover:rotate-12" />
                <h3 className="font-bold">{title}</h3>
                <small className="ml-auto font-mono text-[10px] text-[#666]">0{i + 1}</small>
              </div>
              <ul className="flex flex-wrap gap-1.75">
                {items.map(item => (
                  <li className="bg-[#1b1e23] px-2 py-1.5 font-mono text-[11px] text-[#c4c5c8]" key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
