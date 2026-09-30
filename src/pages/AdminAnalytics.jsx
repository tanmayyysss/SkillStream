import { Link } from 'react-router-dom';
import AdminShell from '../components/AdminShell';
import { courses, inr } from '../data/content';
import { useAppState } from '../context/AppState';

export default function AdminAnalytics() {
  const { enrollments, payments, notifications, goals } = useAppState();
  const revenue = payments.reduce((sum, row) => sum + Number(row.amount), 0);
  const completion = enrollments.length
    ? Math.round(
      enrollments.reduce((sum, item) => {
        const course = courses.find((entry) => entry.id === item.courseId);
        if (!course) return sum;
        return sum + item.completed.length / course.lessonsTotal;
      }, 0) / enrollments.length * 100
    )
    : 0;

  const cards = [
    { label: 'Active enrollments', value: enrollments.length },
    { label: 'Catalog courses', value: courses.length },
    { label: 'Receipts', value: inr(revenue) },
    { label: 'Avg. completion', value: `${completion}%` },
    { label: 'Notifications', value: notifications.length },
    { label: 'Lessons finished today', value: `${goals.lessonsDone}/${goals.lessonsTarget}` },
  ];

  return (
    <AdminShell>
      <div className="dash">
        <h1>Admins Analytics</h1>
        <p className="muted">A live read of this browser’s SkillStream preview.</p>
        <div className="stat-cards">
          {cards.map((card) => (
            <article key={card.label}>
              <small>{card.label}</small>
              <strong>{card.value}</strong>
            </article>
          ))}
        </div>
        <section className="panel">
          <h2>Enrolled courses</h2>
          {enrollments.length === 0 ? (
            <p>No student session is stored yet. Sign in as XYZ on the learner login to load the demo classroom.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Lesson</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((item) => {
                  const course = courses.find((entry) => entry.id === item.courseId);
                  if (!course) return null;
                  return (
                    <tr key={item.courseId}>
                      <td>{course.title}</td>
                      <td>{item.lessonIndex + 1} of {course.lessonsTotal}</td>
                      <td>{item.completed.length}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <Link to="/admin/notifications" className="continue">Open notifications</Link>
        </section>
      </div>
    </AdminShell>
  );
}
