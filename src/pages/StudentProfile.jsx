import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiCheckCircle, FiTrash2, FiArrowRight, FiX } from 'react-icons/fi';
import PageHeader from '../components/PageHeader.jsx';
import { KEYS, loadData, saveData, removeData } from '../utils/storage.js';
import '../styles/forms.css';

const educationLevels = ['High School (10th)', 'Higher Secondary (12th)', 'Diploma', 'Undergraduate (UG)', 'Postgraduate (PG)', 'Other'];
const interestOptions = ['Coding', 'Web & Apps', 'Data & Numbers', 'Artificial Intelligence', 'Cybersecurity', 'Design & Creativity', 'Government Service', 'Entrepreneurship', 'Teaching', 'Research'];

const emptyProfile = {
  name: '',
  email: '',
  education: '',
  department: '',
  skills: [],
  interests: [],
  goal: '',
};

function validate(values, skillText) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Enter your full name.';
  else if (values.name.trim().length < 3) errors.name = 'Name must have at least 3 characters.';
  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Enter a valid email, for example name@example.com.';
  if (!values.education) errors.education = 'Select your education level.';
  if (!values.department.trim()) errors.department = 'Enter your department or stream.';
  if (values.skills.length === 0 && !skillText.trim()) errors.skills = 'Add at least one skill (press Enter after typing).';
  if (values.interests.length === 0) errors.interests = 'Choose at least one interest.';
  if (values.goal.length > 200) errors.goal = 'Keep your goal under 200 characters.';
  return errors;
}

export default function StudentProfile() {
  const [values, setValues] = useState(emptyProfile);
  const [skillText, setSkillText] = useState('');
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = loadData(KEYS.profile);
    if (existing) setValues({ ...emptyProfile, ...existing });
  }, []);

  const update = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const addSkill = () => {
    const parts = skillText.split(',').map((s) => s.trim()).filter(Boolean);
    if (!parts.length) return;
    const next = [...values.skills];
    parts.forEach((p) => {
      if (!next.some((s) => s.toLowerCase() === p.toLowerCase())) next.push(p);
    });
    update('skills', next);
    setSkillText('');
  };

  const removeSkill = (skill) => update('skills', values.skills.filter((s) => s !== skill));

  const toggleInterest = (interest) => {
    const has = values.interests.includes(interest);
    update('interests', has ? values.interests.filter((i) => i !== interest) : [...values.interests, interest]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fold any typed-but-not-added skill into the list
    const pending = skillText.split(',').map((s) => s.trim()).filter(Boolean);
    const skills = [...values.skills];
    pending.forEach((p) => {
      if (!skills.some((s) => s.toLowerCase() === p.toLowerCase())) skills.push(p);
    });
    const finalValues = { ...values, skills, name: values.name.trim(), email: values.email.trim(), department: values.department.trim() };
    const found = validate(finalValues, '');
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    saveData(KEYS.profile, finalValues);
    setValues(finalValues);
    setSkillText('');
    setSaved(true);
  };

  const handleClear = () => {
    removeData(KEYS.profile);
    setValues(emptyProfile);
    setSkillText('');
    setErrors({});
    setSaved(false);
  };

  return (
    <>
      <PageHeader
        icon={<FiUser size={28} />}
        title="Student Profile"
        subtitle="Tell us about yourself. Your details are saved only in this browser."
      />
      <section className="section">
        <div className="container form-layout">
          <form className="form-card" onSubmit={handleSubmit} noValidate>
            {saved && (
              <div className="alert alert--success" role="status">
                <FiCheckCircle size={20} />
                <div>
                  <strong>Profile saved.</strong> Next, take the career assessment to see your best matches.
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full name *</label>
                <input id="name" type="text" className={errors.name ? 'input input--error' : 'input'} placeholder="e.g. Arjun Kumar" value={values.name} onChange={(e) => update('name', e.target.value)} />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address *</label>
                <input id="email" type="email" className={errors.email ? 'input input--error' : 'input'} placeholder="you@example.com" value={values.email} onChange={(e) => update('email', e.target.value)} />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="education">Education level *</label>
                <select id="education" className={errors.education ? 'input input--error' : 'input'} value={values.education} onChange={(e) => update('education', e.target.value)}>
                  <option value="">Select education level</option>
                  {educationLevels.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                {errors.education && <p className="error-text">{errors.education}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="department">Department / stream *</label>
                <input id="department" type="text" className={errors.department ? 'input input--error' : 'input'} placeholder="e.g. Computer Science, Biology, Commerce" value={values.department} onChange={(e) => update('department', e.target.value)} />
                {errors.department && <p className="error-text">{errors.department}</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="skills">Your skills *</label>
              <div className="skill-input">
                <input
                  id="skills"
                  type="text"
                  className={errors.skills ? 'input input--error' : 'input'}
                  placeholder="Type a skill and press Enter (e.g. Python, Drawing)"
                  value={skillText}
                  onChange={(e) => setSkillText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <button type="button" className="btn btn--soft" onClick={addSkill}>Add</button>
              </div>
              {values.skills.length > 0 && (
                <div className="chip-list">
                  {values.skills.map((skill) => (
                    <span className="chip chip--removable" key={skill}>
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}><FiX size={14} /></button>
                    </span>
                  ))}
                </div>
              )}
              {errors.skills && <p className="error-text">{errors.skills}</p>}
            </div>

            <div className="form-group">
              <label>Your interests * <span className="hint">(choose all that apply)</span></label>
              <div className="chip-list">
                {interestOptions.map((interest) => {
                  const active = values.interests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      className={`chip chip--select ${active ? 'is-active' : ''}`}
                      onClick={() => toggleInterest(interest)}
                      aria-pressed={active}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
              {errors.interests && <p className="error-text">{errors.interests}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="goal">Career goal <span className="hint">(optional)</span></label>
              <textarea id="goal" rows="3" className={errors.goal ? 'input input--error' : 'input'} placeholder="e.g. I want to work as a software engineer at a product company." value={values.goal} onChange={(e) => update('goal', e.target.value)} />
              <div className="form-foot"><span>{values.goal.length}/200</span></div>
              {errors.goal && <p className="error-text">{errors.goal}</p>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn--primary btn--lg">Save profile</button>
              <button type="button" className="btn btn--outline" onClick={handleClear}><FiTrash2 /> Clear form</button>
            </div>
          </form>

          <aside className="side-card">
            <h3>Profile summary</h3>
            {values.name ? (
              <>
                <div className="avatar">{values.name.trim().charAt(0).toUpperCase()}</div>
                <strong className="side-card__name">{values.name}</strong>
                <span className="side-card__muted">{values.education || 'Education level not set'}</span>
                {values.department && <span className="side-card__muted">{values.department}</span>}
                <div className="side-card__count">
                  <div><strong>{values.skills.length}</strong><span>Skills</span></div>
                  <div><strong>{values.interests.length}</strong><span>Interests</span></div>
                </div>
              </>
            ) : (
              <p className="side-card__muted">Start filling the form and your summary will appear here.</p>
            )}
            <Link to="/assessment" className="btn btn--primary btn--block">Next: Career assessment <FiArrowRight /></Link>
          </aside>
        </div>
      </section>
    </>
  );
}
