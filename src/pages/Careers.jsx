import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiBriefcase, FiX } from 'react-icons/fi';
import PageHeader from '../components/PageHeader.jsx';
import CareerCard from '../components/CareerCard.jsx';
import { careers, categories } from '../data/careers.js';
import { KEYS, loadData } from '../utils/storage.js';

export default function Careers() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const assessment = useMemo(() => loadData(KEYS.assessment), []);
  const topId = assessment?.topId;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = careers.filter((career) => {
      const inCategory = category === 'All' || career.category === category;
      const haystack = [career.title, career.category, career.summary, ...career.skills, ...career.qualifications].join(' ').toLowerCase();
      return inCategory && (!q || haystack.includes(q));
    });
    // Recommended career first
    return [...list].sort((a, b) => (b.id === topId) - (a.id === topId));
  }, [query, category, topId]);

  const reset = () => {
    setQuery('');
    setCategory('All');
  };

  return (
    <>
      <PageHeader
        icon={<FiBriefcase size={28} />}
        title="Career Recommendations"
        subtitle="Explore careers, required skills, qualifications and learning roadmaps. Search by name, skill or qualification."
      />
      <section className="section">
        <div className="container">
          {!assessment && (
            <div className="alert alert--info">
              <div>
                Want personalised picks? <Link to="/assessment">Take the career assessment</Link> and your best match will be highlighted here.
              </div>
            </div>
          )}

          <div className="filter-bar">
            <div className="search-box">
              <FiSearch />
              <input
                type="search"
                placeholder="Search careers, skills or qualifications (e.g. Python, B.Tech, design)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search careers"
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Clear search"><FiX /></button>
              )}
            </div>
            <div className="chip-list" role="group" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`chip chip--select ${category === cat ? 'is-active' : ''}`}
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p className="result-count">
            Showing <strong>{filtered.length}</strong> of {careers.length} careers
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid--3 grid--top">
              {filtered.map((career) => (
                <CareerCard key={career.id} career={career} recommended={career.id === topId} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No careers match your search</h3>
              <p>Try a different keyword or reset the filters to see all careers.</p>
              <button className="btn btn--primary" onClick={reset}>Reset filters</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
