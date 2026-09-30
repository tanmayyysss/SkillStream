import { Link } from 'react-router-dom';
import StudentShell from '../components/StudentShell';
import { getCourse } from '../data/content';
import { useAppState } from '../context/AppState';

function Ring({ value, color, label, detail }) {
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (Math.min(value, 100) / 100) * circ;
  return (
    <div className="ring">
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r={radius} className="ring-track" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          className="ring-value"
          style={{ stroke: color, strokeDasharray: circ, strokeDashoffset: offset }}
        />
      </svg>
      <strong style={{ color }}>{value}%</strong>
      <span>{label}</span>
      <small>{detail}</small>
    </div>
  );
}

export default function Dashboard() {
  const { user, enrollments, goals, streak } = useAppState();
  const lessonsLeft = Math.max(goals.lessonsTarget - goals.lessonsDone, 0);
  const lessonPct = goals.lessonDisplay ?? Math.round((goals.lessonsDone / goals.lessonsTarget) * 100);
  const watchPct = goals.watchDisplay ?? Math.min(100, Math.round((goals.watchMins / goals.watchTarget) * 100));
  const exercisePct = goals.exerciseDisplay ?? Math.round((goals.exercisesDone / goals.exercisesTarget) * 100);

  return (
    <StudentShell>
      <div className="dash">
        <header className="greet">
          <div>
            <h1>Greetings, {user?.name}! <span aria-hidden="true">👋</span></h1>
            <p>
              {lessonsLeft === 0
                ? 'You hit today’s lesson goal.'
                : `You have ${lessonsLeft} lesson${lessonsLeft === 1 ? '' : 's'} left to hit today’s goal.`}
            </p>
          </div>
          <div className="streak">🔥 {streak}-day streak</div>
        </header>

        <section className="goals">
          <h2>Daily goals</h2>
          <div className="ring-row">
            <Ring value={lessonPct} color="#a78bfa" label="Lessons" detail={`${goals.lessonsDone} of ${goals.lessonsTarget}`} />
            <Ring value={watchPct} color="#34d399" label="Watch Time" detail={`${goals.watchMins} mins`} />
            <Ring value={exercisePct} color="#fb923c" label="Exercises" detail={`${goals.exercisesDone} of ${goals.exercisesTarget}`} />
          </div>
        </section>

        <section>
          <h2 className="section-label">Active courses</h2>
          {enrollments.length === 0 ? (
            <div className="empty-card">
              <p>You have not enrolled yet.</p>
              <Link to="/courses" className="btn primary">Explore courses</Link>
            </div>
          ) : (
            <div className="active-grid">
              {enrollments.map((item) => {
                const course = getCourse(item.courseId);
                if (!course) return null;
                const percent = Math.round((item.completed.length / course.lessonsTotal) * 100);
                const lessonNo = item.lessonIndex + 1;
                const left = Math.max(course.lessonsTotal - item.completed.length, 0);
                return (
                  <article key={course.id} className="active-card">
                    <span className="tag">{course.tag}</span>
                    <h3>{course.title}</h3>
                    <p>Lesson {lessonNo} of {course.lessonsTotal} · Instructor {course.instructor}</p>
                    <div className="bar-line">
                      <span style={{ width: `${percent}%`, background: course.accent }} />
                    </div>
                    <div className="bar-meta">
                      <small>{percent}% complete</small>
                      <small>{left} left</small>
                    </div>
                    <Link to={`/app/classroom/${course.id}`}>▶ Continue watching</Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </StudentShell>
  );
}
