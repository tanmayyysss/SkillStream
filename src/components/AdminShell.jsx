import { NavLink } from 'react-router-dom';
import { LogoMark } from './Icons';
import { useAppState } from '../context/AppState';

export default function AdminShell({ children }) {
  const { user, signOut } = useAppState();
  const initial = (user?.name || 'A').slice(0, 1).toUpperCase();

  return (
    <div className="shell">
      <aside className="sidebar">
        <NavLink to="/admin" className="brand side-brand">
          <LogoMark />
          <span>SkillStream</span>
        </NavLink>
        <p className="side-kicker">Admin</p>
        <nav className="side-nav">
          <NavLink to="/admin" end>Analytics</NavLink>
          <NavLink to="/admin/notifications">Notification</NavLink>
          <NavLink to="/admin/settings">Settings</NavLink>
        </nav>
        <div className="side-user">
          <span className="avatar">{initial}</span>
          <div>
            <strong>{user?.name}</strong>
            <button type="button" className="linkish" onClick={signOut}>Log out</button>
          </div>
        </div>
      </aside>
      <section className="shell-main">{children}</section>
    </div>
  );
}
