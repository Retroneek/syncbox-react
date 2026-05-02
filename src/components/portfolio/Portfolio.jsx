import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import projects from '../../data/projects';
import './portfolio.css';

export default function Portfolio() {
  const [index, setIndex] = useState(0);
  const rowRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(projects.length - 1, i + 1));
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
      if (e.key === 'Home') setIndex(0);
      if (e.key === 'End') setIndex(projects.length - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const el = rowRef.current?.querySelectorAll('.xmb-item')[index];
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [index]);

  return (
    <main className="portfolio-root">
      <section className="portfolio-hero">
        <h1 className="portfolio-title">Projects</h1>
        <p className="portfolio-sub">Use arrow keys or click an icon to browse projects</p>
      </section>

      <section className="xmb-wrapper">
        <div className="xmb-row" ref={rowRef} role="list">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`xmb-item ${i === index ? 'is-active' : ''}`}
              style={{ borderColor: p.color }}
              onClick={() => setIndex(i)}
              aria-label={p.title}
              role="listitem"
            >
              <div className="xmb-icon" style={{ background: p.color }} />
              <div className="xmb-label">{p.title}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="portfolio-preview">
        <div className="preview-card">
          <h2>{projects[index].title}</h2>
          <h3 className="preview-tag">{projects[index].tagline}</h3>
          <p className="preview-desc">{projects[index].description}</p>
          <div className="preview-actions">
            <button className="btn-primary" onClick={() => navigate(`/projects/${projects[index].id}`)}>View details</button>
            {projects[index].repo ? (
              <a className="btn-ghost" href={projects[index].repo} target="_blank" rel="noopener noreferrer">Source</a>
            ) : (
              <button className="btn-ghost" disabled>Source</button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
