import { Link } from 'react-router-dom';
import MarketingNav, { SiteFooter } from '../components/MarketingNav';
import CourseArt from '../components/CourseArt';
import { courses, faqs, mentors, stats, whyChoose } from '../data/content';

const featured = ['react', 'python', 'sql-excel', 'machine-learning']
  .map((id) => courses.find((course) => course.id === id));

export default function Landing() {
  return (
    <div className="marketing">
      <div className="landing-hero">
        <img className="landing-jelly" src="/jellyfish.png" alt="" />
        <div className="landing-shade" />
        <MarketingNav />
        <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Learn on your schedule</p>
          <h1>Master the skills of tomorrow, at your own pace.</h1>
          <p className="lede">
            Industry mentors, recognised certificates, and a classroom that remembers exactly where you left off.
          </p>
          <div className="hero-actions">
            <Link to="/courses" className="btn primary">Start learning</Link>
            <Link to="/login" className="btn ghost">Sign in</Link>
          </div>
          <ul className="stat-row">
            {stats.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        </section>
      </div>

      <section className="band">
        <div className="section-head">
          <h2>Courses to start this week</h2>
          <Link to="/courses">Explore the catalog</Link>
        </div>
        <div className="card-grid">
          {featured.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="feature-card">
              <CourseArt art={course.art} title={course.title} />
              <span className="tag">{course.tag}</span>
              <h3>{course.title}</h3>
              <p>{course.blurb}</p>
              <div className="meta">
                <span>★ {course.rating}</span>
                <span>{course.students.toLocaleString('en-IN')} students</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="band" id="about">
        <div className="section-head">
          <h2>Why choose us</h2>
          <p>Everything you need to succeed, in one classroom.</p>
        </div>
        <div className="why-grid">
          {whyChoose.map((item) => (
            <article key={item.title} className="why-card">
              <span className="orb" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="section-head">
          <h2>Top mentors</h2>
          <p>Learn from the best in the industry.</p>
        </div>
        <div className="mentor-grid">
          {mentors.map((mentor) => (
            <article key={mentor.name} className="mentor-card">
              <div className="portrait" style={{ background: `linear-gradient(160deg, ${mentor.tone}, #0b1020)` }}>
                <span>{mentor.name.slice(0, 1)}</span>
              </div>
              <h3>{mentor.name}</h3>
              <p>{mentor.role}</p>
              <small>{mentor.years} industry experience</small>
            </article>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="section-head">
          <h2>Questions learners ask</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
