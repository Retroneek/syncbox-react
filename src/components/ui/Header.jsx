import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-logo">SyncBox</div>
        <nav className="site-nav">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
        </nav>
      </div>
    </header>
  );
}
