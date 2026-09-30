import { Link } from 'react-router-dom';
import StudentShell from '../components/StudentShell';
import CourseArt from '../components/CourseArt';
import { getCourse } from '../data/content';
import { useAppState } from '../context/AppState';

export default function MyCourses() {
  const { enrollments } = useAppState();

  return (
    <StudentShell tab="courses">
      <div className="dash">
        <h1>My Courses</h1>
        <p className="muted">Pick up a course or enroll in a new one from the catalog.</p>
        {enrollments.length === 0 ? (
          <div className="empty-card">
            <p>Your classroom is empty.</p>
            <Link to="/courses" className="btn primary">Browse courses</Link>
          </div>
        ) : (
          <div className="card-grid">
            {enrollments.map((item) => {
              const course = getCourse(item.courseId);
              if (!course) return null;
              const percent = Math.round((item.completed.length / course.lessonsTotal) * 100);
              return (
                <article key={course.id} className="feature-card">
                  <CourseArt art={course.art} title={course.title} />
                  <h3>{course.title}</h3>
                  <p>Lesson {item.lessonIndex + 1} · {percent}% complete</p>
                  <Link to={`/app/classroom/${course.id}`} className="continue">▶ Continue watching</Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </StudentShell>
  );
}
