import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiExternalLink, FiPlayCircle, FiCheckSquare } from 'react-icons/fi';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import { technicalSkills, softSkills } from '../data/skills.js';
import { KEYS, loadData } from '../utils/storage.js';

export default function Skills() {
  const [tab, setTab] = useState('technical');
  const profile = useMemo(() => loadData(KEYS.profile), []);
  const list = tab === 'technical' ? technicalSkills : softSkills;

  return (
    <>
      <PageHeader
        icon={<FiBookOpen size={28} />}
        title="Skills Development"
        subtitle="Build the technical and soft skills employers look for, with suggested courses, free resources and practice activities."
      />
      <section className="section">
        <div className="container">
          {profile?.skills?.length > 0 && (
            <div className="your-skills">
              <strong>Skills you already have:</strong>
              <div className="chip-list">
                {profile.skills.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
            </div>
          )}

          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'technical'} className={`tabs__btn ${tab === 'technical' ? 'is-active' : ''}`} onClick={() => setTab('technical')}>
              Technical skills ({technicalSkills.length})
            </button>
            <button role="tab" aria-selected={tab === 'soft'} className={`tabs__btn ${tab === 'soft' ? 'is-active' : ''}`} onClick={() => setTab('soft')}>
              Soft skills ({softSkills.length})
            </button>
          </div>

          <div className="grid grid--2 grid--top">
            {list.map((skill) => (
              <article className="skill-card" key={skill.id}>
                <header className="skill-card__head">
                  <span className="skill-card__icon"><Icon name={skill.icon} size={24} /></span>
                  <div>
                    <h3>{skill.title}</h3>
                    <span className="tag tag--soft">{skill.level}</span>
                  </div>
                </header>
                <p>{skill.description}</p>

                <h4><FiPlayCircle /> Suggested courses</h4>
                <ul className="bullet-list">
                  {skill.courses.map((c) => <li key={c}>{c}</li>)}
                </ul>

                <h4><FiExternalLink /> Learning resources</h4>
                <div className="link-list">
                  {skill.resources.map((r) => (
                    <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="link-pill">
                      {r.name} <FiExternalLink size={13} />
                    </a>
                  ))}
                </div>

                <h4><FiCheckSquare /> Practice activities</h4>
                <ul className="bullet-list">
                  {skill.practice.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <div className="cta-banner cta-banner--small">
            <div>
              <h2>Know which skills you need?</h2>
              <p>Pick a career to see a full learning plan with projects and certifications.</p>
            </div>
            <Link to="/roadmap" className="btn btn--light">Open career roadmap</Link>
          </div>
        </div>
      </section>
    </>
  );
}
