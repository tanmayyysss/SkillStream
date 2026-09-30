import { NavLink } from 'react-router-dom';
import { IconCourses, IconDashboard, IconUser, LogoMark } from './Icons';
import { useAppState } from '../context/AppState';
import { getCourse } from '../data/content';

export default function StudentShell({ children, tab }) {
  const { user, enrollments } = useAppState();
  const classroomId = enrollments[0]?.courseId || 'product-design';
  const course = getCourse(classroomId);
  const initial = (user?.name || 'S').slice(0, 1).toUpperCase();

  return (
    <div className="shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand side-brand">
          <LogoMark />
          <span>SkillStream</span>
        </NavLink>
        <nav className="side-nav">
          <NavLink to="/app" end className={({ isActive }) => (isActive ? 'active' : '')}>
            <IconDashboard /> Dashboard
          </NavLink>
          <NavLink
            to="/app/courses"
            className={({ isActive }) => (isActive || tab === 'classroom' ? 'active' : '')}
          >
            <IconCourses /> My Courses
          </NavLink>
          <NavLink to="/app/profile">
            <IconUser /> Profile & Settings
          </NavLink>
        </nav>
        <div className="side-user">
          <span className="avatar">{initial}</span>
          <div>
            <strong>{user?.name}</strong>
            <small>{user?.plan === 'Pro' ? 'Pro plan' : 'Free plan'}</small>
          </div>
        </div>
      </aside>
      <section className="shell-main">
        <div className="top-tabs">
          <NavLink to="/app" end>Home Dashboard</NavLink>
          <NavLink
            to={`/app/classroom/${course?.id || classroomId}`}
            className={({ isActive }) => (isActive || tab === 'classroom' ? 'active' : '')}
          >
            My Classroom
          </NavLink>
          <NavLink to="/app/profile">Profile & Settings</NavLink>
        </div>
        {children}
      </section>
    </div>
  );
}
