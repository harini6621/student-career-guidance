import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiMap, FiCheck, FiRotateCcw } from 'react-icons/fi';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import { careers, careerById } from '../data/careers.js';
import { KEYS, loadData, saveData } from '../utils/storage.js';
import '../styles/roadmap.css';

const stageConfig = [
  { key: 'foundation', title: 'Build your foundation', label: 'Skills to learn first', duration: 'Months 1–2' },
  { key: 'core', title: 'Learn the core skills', label: 'Skills to learn', duration: 'Months 3–5' },
  { key: 'projects', title: 'Build real projects', label: 'Projects to build', duration: 'Months 4–8' },
  { key: 'certifications', title: 'Earn certifications', label: 'Certifications to consider', duration: 'Months 6–9' },
  { key: 'internship', title: 'Prepare for internships', label: 'Internship preparation', duration: 'Months 8–12' },
];

export default function Roadmap() {
  const [params, setParams] = useSearchParams();
  const assessment = useMemo(() => loadData(KEYS.assessment), []);

  const paramId = params.get('career');
  const initialId = careerById(paramId) ? paramId : assessment?.topId || careers[0].id;
  const [selectedId, setSelectedId] = useState(initialId);
  const [progress, setProgress] = useState(() => loadData(KEYS.roadmapProgress, {}));

  // Keep state in sync when the URL changes (e.g. clicking "View roadmap" from another page)
  useEffect(() => {
    if (paramId && careerById(paramId) && paramId !== selectedId) setSelectedId(paramId);
  }, [paramId]); // eslint-disable-line react-hooks/exhaustive-deps

  const career = careerById(selectedId);
  const done = progress[selectedId] || [];

  const totalTasks = stageConfig.reduce((sum, s) => sum + career.roadmap[s.key].length, 0);
  const percent = Math.round((done.length / totalTasks) * 100);

  const selectCareer = (id) => {
    setSelectedId(id);
    setParams({ career: id });
  };

  const toggle = (taskKey) => {
    const current = progress[selectedId] || [];
    const updated = current.includes(taskKey) ? current.filter((k) => k !== taskKey) : [...current, taskKey];
    const next = { ...progress, [selectedId]: updated };
    setProgress(next);
    saveData(KEYS.roadmapProgress, next);
  };

  const resetProgress = () => {
    const next = { ...progress, [selectedId]: [] };
    setProgress(next);
    saveData(KEYS.roadmapProgress, next);
  };

  return (
    <>
      <PageHeader
        icon={<FiMap size={28} />}
        title="Career Roadmap"
        subtitle="Choose a career and follow a step-by-step plan. Tick tasks as you complete them and your progress is saved."
      />
      <section className="section">
        <div className="container">
          <div className="career-picker" role="tablist" aria-label="Select a career">
            {careers.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={c.id === selectedId}
                className={`picker-btn ${c.id === selectedId ? 'is-active' : ''}`}
                onClick={() => selectCareer(c.id)}
              >
                <Icon name={c.icon} size={18} /> {c.title}
              </button>
            ))}
          </div>

          <div className="roadmap-summary">
            <div className="roadmap-summary__info">
              <span className="roadmap-summary__icon"><Icon name={career.icon} size={30} /></span>
              <div>
                <h2>{career.title} roadmap</h2>
                <p>{career.summary}</p>
              </div>
            </div>
            <div className="roadmap-summary__progress">
              <div className="roadmap-summary__row">
                <span>Your progress</span>
                <strong>{percent}%</strong>
              </div>
              <div className="quiz__bar"><div className="quiz__bar-fill" style={{ width: `${percent}%` }} /></div>
              <div className="roadmap-summary__row roadmap-summary__row--small">
                <span>{done.length} of {totalTasks} tasks done</span>
                <button className="link-btn" onClick={resetProgress}><FiRotateCcw size={13} /> Reset</button>
              </div>
            </div>
          </div>

          <ol className="timeline">
            {stageConfig.map((stage, index) => {
              const tasks = career.roadmap[stage.key];
              const stageDone = tasks.filter((_, i) => done.includes(`${stage.key}-${i}`)).length;
              const complete = stageDone === tasks.length;
              return (
                <li className={`timeline__item ${complete ? 'is-complete' : ''}`} key={stage.key}>
                  <span className="timeline__marker">{complete ? <FiCheck size={18} /> : index + 1}</span>
                  <div className="timeline__card">
                    <div className="timeline__head">
                      <div>
                        <h3>{stage.title}</h3>
                        <span className="timeline__label">{stage.label}</span>
                      </div>
                      <span className="tag tag--soft">{stage.duration}</span>
                    </div>
                    <ul className="task-list">
                      {tasks.map((task, i) => {
                        const id = `${stage.key}-${i}`;
                        const checked = done.includes(id);
                        return (
                          <li key={id}>
                            <label className={checked ? 'is-checked' : ''}>
                              <input type="checkbox" checked={checked} onChange={() => toggle(id)} />
                              <span className="task-list__box"><FiCheck size={14} /></span>
                              <span>{task}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="qualification-box">
            <h3>Recommended qualifications</h3>
            <div className="tag-list">
              {career.qualifications.map((q) => <span className="tag" key={q}>{q}</span>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
