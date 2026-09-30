import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MarketingNav, { SiteFooter } from '../components/MarketingNav';
import CourseArt from '../components/CourseArt';
import { IconSearch } from '../components/Icons';
import { categories, courses, inr } from '../data/content';

const spotlight = ['react', 'python', 'sql-excel'].map((id) => courses.find((course) => course.id === id));

export default function CoursesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return courses.filter((course) => {
      const inCategory = category === 'All' || course.category === category;
      const inQuery = !needle
        || course.title.toLowerCase().includes(needle)
        || course.blurb.toLowerCase().includes(needle)
        || course.instructor.toLowerCase().includes(needle);
      return inCategory && inQuery;
    });
  }, [query, category]);

  return (
    <div className="marketing courses-page">
      <MarketingNav />
      <section className="learn-banner">
        <p className="prompt-pill">What do you want to learn today?</p>
        <div className="spotlight">
          {spotlight.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="spot-card">
              <CourseArt art={course.art} title={course.title} />
              <span className="tag">{course.tag}</span>
              <h3>{course.title}</h3>
              <p>{course.blurb}</p>
              <div className="meta">
                <span>★ {course.rating} ({course.students.toLocaleString('en-IN')} students)</span>
                <strong>{inr(course.listPrice || course.price)}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="catalog" id="catalog">
        <div className="catalog-top">
          <div>
            <h1>Explore Courses</h1>
            <p>Find the perfect course to boost your skills</p>
          </div>
          <label className="search">
            <IconSearch />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              aria-label="Search courses"
            />
          </label>
        </div>
        <div className="pills" role="tablist" aria-label="Course categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              className={category === item ? 'pill active' : 'pill'}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="empty">No courses match that search. Try another category.</p>
        ) : (
          <div className="card-grid">
            {filtered.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="feature-card catalog-card">
                <CourseArt art={course.art} title={course.title} />
                <h3>{course.title}</h3>
                <p>{course.blurb}</p>
                <div className="meta">
                  <span>★ {course.rating} ({course.students.toLocaleString('en-IN')} students)</span>
                  <strong>{inr(course.listPrice || course.price)}</strong>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
