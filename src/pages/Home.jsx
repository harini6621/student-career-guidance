import { Link } from 'react-router-dom';
import { FiArrowRight, FiUser, FiTarget, FiCompass, FiTrendingUp, FiUsers, FiBookOpen, FiAward } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle.jsx';
import Icon from '../components/Icon.jsx';
import { careers } from '../data/careers.js';
import '../styles/home.css';

const steps = [
  { icon: <FiUser size={24} />, title: 'Create your profile', text: 'Tell us your education, skills and interests.', to: '/profile' },
  { icon: <FiTarget size={24} />, title: 'Take the assessment', text: 'Answer 10 quick questions about how you think and work.', to: '/assessment' },
  { icon: <FiCompass size={24} />, title: 'Explore careers', text: 'Compare careers, salaries and required skills.', to: '/careers' },
  { icon: <FiTrendingUp size={24} />, title: 'Follow your roadmap', text: 'Get a step-by-step plan with projects and certifications.', to: '/roadmap' },
];

const stats = [
  { value: '7', label: 'Career paths explored' },
  { value: '10', label: 'Assessment questions' },
  { value: '12', label: 'Skill tracks with free resources' },
  { value: '5', label: 'Roadmap stages per career' },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__bg hero__bg--one" />
        <div className="hero__bg hero__bg--two" />
        <div className="container hero__grid">
          <div className="hero__text">
            <span className="hero__pill"><FiAward size={16} /> Free guidance for every student</span>
            <h1>Student Career Guidance Portal</h1>
            <p className="hero__lead">
              Welcome! Not sure what to study or which career suits you? Share your interests and
              skills, take a short assessment and get a personalised career path with a clear roadmap.
            </p>
            <div className="hero__actions">
              <Link to="/profile" className="btn btn--light btn--lg">
                Get Started <FiArrowRight />
              </Link>
              <Link to="/careers" className="btn btn--ghost btn--lg">Browse careers</Link>
            </div>
            <ul className="hero__points">
              <li><FiUsers /> Built for school and college students</li>
              <li><FiBookOpen /> Free learning resources</li>
            </ul>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="match-card">
              <div className="match-card__head">
                <span className="match-card__avatar">AR</span>
                <div>
                  <strong>Sample result</strong>
                  <small>B.Tech · Computer Science</small>
                </div>
              </div>
              <p className="match-card__label">Your top career matches</p>
              {[
                { name: 'AI Engineer', pct: 92 },
                { name: 'Data Scientist', pct: 81 },
                { name: 'Software Developer', pct: 74 },
              ].map((m, i) => (
                <div className="match-bar" key={m.name}>
                  <div className="match-bar__row"><span>{m.name}</span><strong>{m.pct}%</strong></div>
                  <div className="match-bar__track">
                    <div className="match-bar__fill" style={{ '--w': `${m.pct}%`, '--d': `${0.5 + i * 0.25}s` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="float-chip float-chip--one"><Icon name="code" size={18} /> Python</div>
            <div className="float-chip float-chip--two"><Icon name="shield" size={18} /> Security</div>
            <div className="float-chip float-chip--three"><Icon name="pen" size={18} /> Design</div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats__grid">
          {stats.map((s) => (
            <div key={s.label} className="stats__item">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            title="Career opportunities at a glance"
            subtitle="A quick look at popular paths. Open any card to see skills, qualifications and a learning roadmap."
          />
          <div className="grid grid--3">
            {careers.map((career) => (
              <Link to={`/roadmap?career=${career.id}`} className="overview-card" key={career.id}>
                <span className="overview-card__icon"><Icon name={career.icon} size={26} /></span>
                <h3>{career.title}</h3>
                <p>{career.summary}</p>
                <span className="overview-card__foot">
                  <span>{career.salary}</span>
                  <FiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionTitle
            title="How the portal works"
            subtitle="Four simple steps from “I don’t know” to “I have a plan”."
          />
          <div className="steps">
            {steps.map((step, index) => (
              <Link to={step.to} className="step-card" key={step.title}>
                <span className="step-card__number">{index + 1}</span>
                <span className="step-card__icon">{step.icon}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Ready to find your direction?</h2>
              <p>It takes about five minutes to build your profile and take the assessment.</p>
            </div>
            <Link to="/assessment" className="btn btn--light btn--lg">
              Take the assessment <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
