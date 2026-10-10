import { Link } from 'react-router-dom';
import { FiInfo, FiTarget, FiMap, FiSearch, FiHeart, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import PageHeader from '../components/PageHeader.jsx';
import SectionTitle from '../components/SectionTitle.jsx';

const pillars = [
  { icon: <FiSearch size={24} />, title: 'Self-discovery', text: 'Understand your interests, strengths and working style before choosing a course or job.' },
  { icon: <FiTarget size={24} />, title: 'Clear matching', text: 'Our assessment compares your answers with real career profiles and shows your best fits.' },
  { icon: <FiMap size={24} />, title: 'Practical roadmaps', text: 'Every career includes skills to learn, projects to build, certifications and internship preparation.' },
  { icon: <FiHeart size={24} />, title: 'Free and student-first', text: 'No sign-up, no fees. Your data stays in your own browser.' },
];

const helps = [
  'Reduces confusion when choosing a department, course or specialisation',
  'Shows what each career really needs: skills, qualifications and effort',
  'Connects your current skills to the gaps you need to close',
  'Turns big goals into small weekly actions you can track',
  'Introduces both technology careers and government service paths',
];

export default function About() {
  return (
    <>
      <PageHeader
        icon={<FiInfo size={28} />}
        title="About the portal"
        subtitle="Why we built the Student Career Guidance Portal and how it helps you decide."
      />

      <section className="section">
        <div className="container about-intro">
          <div>
            <h2>Our purpose</h2>
            <p>
              Many students pick a career because of pressure, trends or lack of information. The
              Student Career Guidance Portal was created to change that. It gives every student a simple,
              honest way to explore careers that match who they are and where they want to go.
            </p>
            <p>
              Whether you are in school, finishing a diploma or in the final year of college, the
              portal guides you from understanding yourself to planning each step of your journey.
            </p>
            <Link to="/assessment" className="btn btn--primary">
              Start the assessment <FiArrowRight />
            </Link>
          </div>
          <div className="about-panel">
            <h3>How it helps you decide</h3>
            <ul className="check-list check-list--spaced">
              {helps.map((item) => (
                <li key={item}><FiCheckCircle /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle title="What we focus on" subtitle="Four ideas behind every page of the portal." />
          <div className="grid grid--4">
            {pillars.map((p) => (
              <div className="feature-card" key={p.title}>
                <span className="feature-card__icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle title="Your decision journey" subtitle="Follow these stages in order, or jump to any page from the menu." />
          <ol className="journey">
            <li><strong>Profile</strong><span>Record your education, skills and interests.</span></li>
            <li><strong>Assessment</strong><span>Answer questions to reveal your strongest career category.</span></li>
            <li><strong>Careers</strong><span>Search and filter careers to compare options.</span></li>
            <li><strong>Skills</strong><span>Pick courses and practice activities to grow.</span></li>
            <li><strong>Roadmap</strong><span>Follow a step-by-step plan and tick off progress.</span></li>
          </ol>
        </div>
      </section>
    </>
  );
}
