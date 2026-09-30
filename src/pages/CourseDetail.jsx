import { Link, useNavigate, useParams } from 'react-router-dom';
import MarketingNav, { SiteFooter } from '../components/MarketingNav';
import CourseArt from '../components/CourseArt';
import { checkoutBreakdown, getCourse, inr } from '../data/content';
import { useAppState } from '../context/AppState';

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  const { user, enrollments } = useAppState();
  const navigate = useNavigate();
  const enrolled = enrollments.some((item) => item.courseId === courseId);

  if (!course) {
    return (
      <div className="marketing">
        <MarketingNav />
        <section className="band narrow">
          <h1>Course not found</h1>
          <Link to="/courses">Back to courses</Link>
        </section>
      </div>
    );
  }

  const price = checkoutBreakdown(course);

  const onEnroll = () => {
    if (!user) {
      navigate('/login', { state: { from: `/checkout/${course.id}` } });
      return;
    }
    if (enrolled) {
      navigate(`/app/classroom/${course.id}`);
      return;
    }
    navigate(`/checkout/${course.id}`);
  };

  return (
    <div className="marketing">
      <MarketingNav />
      <section className="detail">
        <div>
          <Link to="/courses" className="back-link">← Back to courses</Link>
          <span className="tag">{course.tag}</span>
          <h1>{course.checkoutTitle || course.title}</h1>
          <p className="lede">{course.blurb}</p>
          <p className="byline">By {course.checkoutAuthor || course.instructor} · {course.level} · {course.lessonsTotal} lessons</p>
          <div className="detail-actions">
            <button type="button" className="btn primary" onClick={onEnroll}>
              {enrolled ? 'Continue watching' : `Enroll · ${inr(price.total)}`}
            </button>
            <span className="price-note">★ {course.rating} · {course.students.toLocaleString('en-IN')} students</span>
          </div>
        </div>
        <CourseArt art={course.art} title={course.title} />
      </section>
      <section className="band">
        <h2>Lessons</h2>
        <ol className="lesson-list">
          {course.lessons.map((lesson, index) => (
            <li key={lesson.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{lesson.title}</strong>
                <small>{lesson.minutes} min</small>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <SiteFooter />
    </div>
  );
}
