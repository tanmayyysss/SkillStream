import { Link, NavLink } from 'react-router-dom';
import { LogoMark } from './Icons';
import { useAppState } from '../context/AppState';

export default function MarketingNav({ variant = 'dark' }) {
  const { user, signOut } = useAppState();
  return (
    <header className={`m-nav ${variant}`}>
      <Link to="/" className="brand">
        <LogoMark />
        <span>SkillStream</span>
      </Link>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <a href="/#about">About</a>
      </nav>
      <div className="m-nav-actions">
        {user?.role === 'student' ? (
          <>
            <Link to="/app" className="ghost-link">Dashboard</Link>
            <button type="button" className="text-btn" onClick={signOut}>Log out</button>
          </>
        ) : (
          <Link to="/login" className="login-link">Login / Signup</Link>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>SkillStream</strong>
        <p>© 2026 SkillStream. All rights reserved.</p>
      </div>
      <div className="footer-links">
        <Link to="/courses">Courses</Link>
        <a href="/#about">About</a>
        <Link to="/admin/login">Admin</Link>
      </div>
    </footer>
  );
}
