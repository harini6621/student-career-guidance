import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle, FiClock } from 'react-icons/fi';
import PageHeader from '../components/PageHeader.jsx';
import { KEYS, loadData, saveData } from '../utils/storage.js';
import '../styles/forms.css';

const empty = { name: '', email: '', subject: '', message: '' };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Enter your name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email, for example name@example.com.';
  if (!v.subject.trim()) e.subject = 'Enter a subject.';
  if (!v.message.trim()) e.message = 'Write your message.';
  else if (v.message.trim().length < 10) e.message = 'Message must have at least 10 characters.';
  return e;
}

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field, value) => {
    setValues((p) => ({ ...p, [field]: value }));
    setSent(false);
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    const messages = loadData(KEYS.messages, []);
    saveData(KEYS.messages, [...messages, { ...values, date: new Date().toISOString() }]);
    setValues(empty);
    setSent(true);
  };

  return (
    <>
      <PageHeader
        icon={<FiMail size={28} />}
        title="Contact us"
        subtitle="Have a question or suggestion? Send us a message and a counsellor will get back to you."
      />
      <section className="section">
        <div className="container form-layout">
          <form className="form-card" onSubmit={handleSubmit} noValidate>
            {sent && (
              <div className="alert alert--success" role="status">
                <FiCheckCircle size={20} />
                <div><strong>Message sent.</strong> Thank you! We usually reply within 2 working days.</div>
              </div>
            )}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="c-name">Name *</label>
                <input id="c-name" type="text" className={errors.name ? 'input input--error' : 'input'} placeholder="Your full name" value={values.name} onChange={(e) => update('name', e.target.value)} />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="c-email">Email *</label>
                <input id="c-email" type="email" className={errors.email ? 'input input--error' : 'input'} placeholder="you@example.com" value={values.email} onChange={(e) => update('email', e.target.value)} />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="c-subject">Subject *</label>
              <input id="c-subject" type="text" className={errors.subject ? 'input input--error' : 'input'} placeholder="e.g. Help choosing between two careers" value={values.subject} onChange={(e) => update('subject', e.target.value)} />
              {errors.subject && <p className="error-text">{errors.subject}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="c-message">Message *</label>
              <textarea id="c-message" rows="6" className={errors.message ? 'input input--error' : 'input'} placeholder="Tell us how we can help…" value={values.message} onChange={(e) => update('message', e.target.value)} />
              {errors.message && <p className="error-text">{errors.message}</p>}
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn--primary btn--lg"><FiSend /> Send message</button>
            </div>
          </form>

          <aside className="side-card">
            <h3>Contact details</h3>
            <ul className="contact-list">
              <li><FiMail /><div><strong>Email</strong><span>support@careerguidance.edu</span></div></li>
              <li><FiPhone /><div><strong>Phone</strong><span>+91 98765 43210</span></div></li>
              <li><FiMapPin /><div><strong>Address</strong><span>Tiruchengode, Tamil Nadu, India</span></div></li>
              <li><FiClock /><div><strong>Counselling hours</strong><span>Mon – Sat, 9:00 AM – 5:00 PM</span></div></li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
