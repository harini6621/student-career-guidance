import { Link } from 'react-router-dom';
import { FiCompass, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import '../styles/footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <div className="footer__brand">
            <span className="navbar__logo"><FiCompass size={20} /></span>
            <strong>Student Career Guidance Portal</strong>
          </div>
          <p>
            Helping students discover their strengths, explore careers and follow a clear
            roadmap from classroom to career.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/skills">Skills</Link></li>
          </ul>
        </div>

        <div>
          <h4>Your journey</h4>
          <ul>
            <li><Link to="/profile">Student Profile</Link></li>
            <li><Link to="/assessment">Career Assessment</Link></li>
            <li><Link to="/roadmap">Career Roadmap</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Get in touch</h4>
          <ul className="footer__contact">
            <li><FiMail /> support@careerguidance.edu</li>
            <li><FiPhone /> +91 98765 43210</li>
            <li><FiMapPin /> Tiruchengode, Tamil Nadu</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <span>© {year} Student Career Guidance Portal. All rights reserved.</span>
          <span>Made for students, by educators.</span>
        </div>
      </div>
    </footer>
  );
}
