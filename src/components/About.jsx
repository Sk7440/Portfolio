import SectionHead from './SectionHead';

const education = [
  { title: 'Associate Degree in Computer Science', place: 'Virtual University of Pakistan', meta: '2026 – 2028 · In progress' },
  { title: 'Applied AI Course', place: 'Corvit Networks', meta: 'Training' },
  { title: 'JavaScript', place: 'HackerRank', meta: 'Certification' },
  { title: 'Responsive Web Design', place: 'freeCodeCamp', meta: 'Certification' },
];

const About = () => {
  return (
    <section id="about" className="wrap py-[clamp(72px,10vw,115px)]">
      <SectionHead num="01" title="About me" />
      <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-20">
        <p data-reveal className="m-0 text-[clamp(21px,1.2vw+14px,27px)] leading-[1.45]">
          I’m a <strong>frontend developer</strong> who builds responsive web apps in React, JavaScript and Tailwind CSS, with four projects deployed on Vercel.
        </p>
        <div data-reveal="0.15" className="space-y-4 text-[15px] text-muted">
          <p>
            My work ranges from a role-based task manager and a tour booking app built with React Router and Context API, to a full-stack AI chat app built with Next.js and TypeScript.
          </p>
          <p>
            I’m studying Computer Science at Virtual University of Pakistan and looking for a junior React developer role or frontend internship in Lahore.
          </p>
        </div>
      </div>

      <div className="mt-[clamp(48px,7vw,80px)]">
        <p data-reveal className="mb-5 font-mono text-[11px] font-medium tracking-[1.7px] text-accent">EDUCATION &amp; TRAINING</p>
        <ul data-stagger="0.08" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {education.map(e => (
            <li className="border border-line bg-surface p-5" key={e.title}>
              <p className="font-mono text-[10px] tracking-[1px] text-[#777] uppercase">{e.meta}</p>
              <h3 className="mt-2 leading-snug font-bold">{e.title}</h3>
              <p className="mt-1 text-sm text-muted">{e.place}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
