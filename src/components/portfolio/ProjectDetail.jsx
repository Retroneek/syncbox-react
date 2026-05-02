import { useNavigate, useParams } from 'react-router-dom';
import projects from '../../data/projects';
import './portfolio.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="project-detail">
        <div className="project-detail__card">
          <p>Project not found.</p>
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail" role="dialog" aria-modal="true">
      <div className="project-detail__backdrop" onClick={() => navigate(-1)} />
      <div className="project-detail__card">
        <button className="project-detail__close" onClick={() => navigate(-1)} aria-label="Close">✕</button>
        <div className="project-detail__media">
          {project.image ? <img src={project.image} alt={project.title} /> : null}
        </div>
        <h2>{project.title}</h2>
        <h4 className="preview-tag">{project.tagline}</h4>
        <p>{project.description}</p>
        <div style={{ marginTop: 12 }}>
          {project.tags?.map((t) => (
            <span key={t} style={{ marginRight: 8, color: 'rgba(220,230,255,0.8)' }}>#{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          {project.live && (
            <a className="btn-primary" href={project.live} target="_blank" rel="noopener noreferrer">Visit demo</a>
          )}
          {project.repo && (
            <a className="btn-ghost" href={project.repo} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>Repository</a>
          )}
        </div>
      </div>
    </div>
  );
}
