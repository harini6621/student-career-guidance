import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiTrendingUp, FiStar, FiMap } from 'react-icons/fi';
import Icon from './Icon.jsx';

export default function CareerCard({ career, recommended = false }) {
  const [open, setOpen] = useState(false);
  const { roadmap } = career;

  const overview = [
    { label: 'Foundation', text: roadmap.foundation[0] },
    { label: 'Core skills', text: roadmap.core[0] },
    { label: 'Project', text: roadmap.projects[0] },
    { label: 'Certification', text: roadmap.certifications[0] },
  ];

  return (
    <article className={`career-card ${recommended ? 'career-card--recommended' : ''}`}>
      {recommended && (
        <span className="career-card__badge"><FiStar size={14} /> Best match for you</span>
      )}
      <div className="career-card__top">
        <span className="career-card__icon"><Icon name={career.icon} size={26} /></span>
        <div>
          <h3>{career.title}</h3>
          <span className="tag tag--soft">{career.category}</span>
        </div>
      </div>

      <p className="career-card__summary">{career.summary}</p>

      <div className="career-card__meta">
        <span><FiTrendingUp /> Demand: <strong>{career.demand}</strong></span>
        <span>Salary: <strong>{career.salary}</strong></span>
      </div>

      <div className="tag-list">
        {career.skills.slice(0, 4).map((skill) => (
          <span className="tag" key={skill}>{skill}</span>
        ))}
      </div>

      <button
        className="career-card__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? 'Hide details' : 'View details'}
        <FiChevronDown className={open ? 'rotate' : ''} />
      </button>

      {open && (
        <div className="career-card__details">
          <h4>About this career</h4>
          <p>{career.description}</p>

          <h4>Required skills</h4>
          <div className="tag-list">
            {career.skills.map((skill) => (
              <span className="tag" key={skill}>{skill}</span>
            ))}
          </div>

          <h4>Qualifications</h4>
          <ul className="check-list">
            {career.qualifications.map((q) => <li key={q}>{q}</li>)}
          </ul>

          <h4>Learning roadmap at a glance</h4>
          <ol className="mini-roadmap">
            {overview.map((step) => (
              <li key={step.label}>
                <strong>{step.label}</strong>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <Link className="btn btn--primary btn--block" to={`/roadmap?career=${career.id}`}>
        <FiMap /> View full roadmap
      </Link>
    </article>
  );
}
