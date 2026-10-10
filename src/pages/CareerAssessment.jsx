import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiTarget, FiArrowLeft, FiArrowRight, FiRefreshCw, FiMap, FiCompass, FiAward } from 'react-icons/fi';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';
import { questions } from '../data/questions.js';
import { careers, careerById } from '../data/careers.js';
import { KEYS, loadData, saveData, removeData } from '../utils/storage.js';
import '../styles/assessment.css';

// Highest score each career could possibly earn (used to turn points into a percentage)
const maxPerCareer = careers.reduce((acc, career) => {
  acc[career.id] = questions.reduce((sum, q) => {
    const best = Math.max(...q.options.map((o) => o.scores[career.id] || 0));
    return sum + best;
  }, 0);
  return acc;
}, {});

function calculateResult(answers) {
  const totals = Object.fromEntries(careers.map((c) => [c.id, 0]));
  answers.forEach((optionIndex, qIndex) => {
    const option = questions[qIndex].options[optionIndex];
    Object.entries(option.scores).forEach(([id, points]) => {
      totals[id] += points;
    });
  });
  const ranking = careers
    .map((c) => ({ id: c.id, score: totals[c.id], pct: Math.round((totals[c.id] / maxPerCareer[c.id]) * 100) }))
    .sort((a, b) => b.score - a.score || b.pct - a.pct);
  return { topId: ranking[0].id, ranking, date: new Date().toISOString(), answers };
}

export default function CareerAssessment() {
  const saved = useMemo(() => loadData(KEYS.assessment), []);
  const profile = useMemo(() => loadData(KEYS.profile), []);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(saved && saved.topId ? saved : null);

  const question = questions[current];
  const progress = Math.round(((current + (answers[current] !== null ? 1 : 0)) / questions.length) * 100);
  const isLast = current === questions.length - 1;

  const choose = (optionIndex) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
  };

  const next = () => {
    if (answers[current] === null) return;
    if (isLast) {
      const res = calculateResult(answers);
      saveData(KEYS.assessment, res);
      setResult(res);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const retake = () => {
    removeData(KEYS.assessment);
    setResult(null);
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setStarted(true);
  };

  /* ---------- Result view ---------- */
  if (result) {
    const top = careerById(result.topId);
    const runnersUp = result.ranking.slice(1, 4);
    return (
      <>
        <PageHeader
          icon={<FiTarget size={28} />}
          title="Your assessment result"
          subtitle={profile?.name ? `Here is what your answers say, ${profile.name.split(' ')[0]}.` : 'Here is what your answers say about your best-fit career.'}
        />
        <section className="section">
          <div className="container result">
            <div className="result__main">
              <span className="result__badge"><FiAward size={16} /> Your best match</span>
              <div className="result__title">
                <span className="result__icon"><Icon name={top.icon} size={34} /></span>
                <div>
                  <h2>{top.title}</h2>
                  <span className="tag tag--soft">Category: {top.category}</span>
                </div>
                <div className="result__score"><strong>{result.ranking[0].pct}%</strong><span>match</span></div>
              </div>
              <p className="result__text">
                <strong>Why this fits you: </strong>{top.fit} {top.description}
              </p>
              <div className="tag-list">
                {top.skills.slice(0, 5).map((s) => <span className="tag" key={s}>{s}</span>)}
              </div>
              <div className="result__actions">
                <Link to={`/roadmap?career=${top.id}`} className="btn btn--primary"><FiMap /> See my roadmap</Link>
                <Link to="/careers" className="btn btn--outline"><FiCompass /> Explore careers</Link>
                <button className="btn btn--soft" onClick={retake}><FiRefreshCw /> Retake</button>
              </div>
            </div>

            <aside className="result__side">
              <h3>All career matches</h3>
              {result.ranking.map((item) => {
                const c = careerById(item.id);
                return (
                  <div className="rank" key={item.id}>
                    <div className="rank__row">
                      <span>{c.title}</span><strong>{item.pct}%</strong>
                    </div>
                    <div className="rank__track"><div className="rank__fill" style={{ width: `${item.pct}%` }} /></div>
                  </div>
                );
              })}
              <p className="result__note">
                Runner-ups: {runnersUp.map((r) => careerById(r.id).title).join(', ')}. Your result is saved in this browser.
              </p>
            </aside>
          </div>
        </section>
      </>
    );
  }

  /* ---------- Intro view ---------- */
  if (!started) {
    return (
      <>
        <PageHeader
          icon={<FiTarget size={28} />}
          title="Career Assessment"
          subtitle="Ten quick questions to discover which career category suits your interests and strengths."
        />
        <section className="section">
          <div className="container">
            <div className="intro-card">
              <h2>Before you begin</h2>
              <ul className="check-list check-list--spaced">
                <li>There are no right or wrong answers. Choose what feels most like you.</li>
                <li>It takes about 3 minutes.</li>
                <li>Your result is saved in your browser so you can come back anytime.</li>
              </ul>
              {!profile && (
                <p className="intro-card__tip">
                  Tip: <Link to="/profile">create your student profile</Link> first to personalise your result.
                </p>
              )}
              <button className="btn btn--primary btn--lg" onClick={() => setStarted(true)}>
                Start assessment <FiArrowRight />
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ---------- Question view ---------- */
  return (
    <>
      <PageHeader icon={<FiTarget size={28} />} title="Career Assessment" subtitle="Pick the option that describes you best." />
      <section className="section">
        <div className="container">
          <div className="quiz">
            <div className="quiz__progress">
              <div className="quiz__progress-text">
                <span>Question {current + 1} of {questions.length}</span>
                <span>{progress}% complete</span>
              </div>
              <div className="quiz__bar"><div className="quiz__bar-fill" style={{ width: `${progress}%` }} /></div>
            </div>

            <h2 className="quiz__question">{question.text}</h2>

            <div className="quiz__options" role="radiogroup" aria-label={question.text}>
              {question.options.map((option, index) => (
                <button
                  key={option.text}
                  type="button"
                  role="radio"
                  aria-checked={answers[current] === index}
                  className={`option ${answers[current] === index ? 'is-selected' : ''}`}
                  onClick={() => choose(index)}
                >
                  <span className="option__letter">{String.fromCharCode(65 + index)}</span>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>

            <div className="quiz__nav">
              <button className="btn btn--outline" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
                <FiArrowLeft /> Previous
              </button>
              <button className="btn btn--primary" onClick={next} disabled={answers[current] === null}>
                {isLast ? 'See my result' : 'Next'} <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
