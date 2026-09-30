import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppState } from './context/AppState';
import Landing from './pages/Landing';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import Classroom from './pages/Classroom';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminNotifications from './pages/AdminNotifications';
import AdminSettings from './pages/AdminSettings';

function RequireStudent({ children }) {
  const { user } = useAppState();
  if (!user || user.role !== 'student') return <Navigate to="/login" replace />;
  return children;
}

function RequireAdmin({ children }) {
  const { user } = useAppState();
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />;
  return children;
}

function GuestOnly({ children, admin = false }) {
  const { user } = useAppState();
  if (user?.role === 'student' && !admin) return <Navigate to="/app" replace />;
  if (user?.role === 'admin' && admin) return <Navigate to="/admin" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
      <Route path="/signup" element={<GuestOnly><Signup /></GuestOnly>} />
      <Route path="/checkout/:courseId" element={<RequireStudent><Checkout /></RequireStudent>} />

      <Route path="/app" element={<RequireStudent><Dashboard /></RequireStudent>} />
      <Route path="/app/courses" element={<RequireStudent><MyCourses /></RequireStudent>} />
      <Route path="/app/classroom/:courseId" element={<RequireStudent><Classroom /></RequireStudent>} />
      <Route path="/app/profile" element={<RequireStudent><Profile /></RequireStudent>} />

      <Route path="/admin/login" element={<GuestOnly admin><AdminLogin /></GuestOnly>} />
      <Route path="/admin" element={<RequireAdmin><AdminAnalytics /></RequireAdmin>} />
      <Route path="/admin/notifications" element={<RequireAdmin><AdminNotifications /></RequireAdmin>} />
      <Route path="/admin/settings" element={<RequireAdmin><AdminSettings /></RequireAdmin>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
