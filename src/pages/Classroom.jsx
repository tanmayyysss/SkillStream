import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentShell from '../components/StudentShell';
import { IconPlay } from '../components/Icons';
import { getCourse } from '../data/content';
import { useAppState } from '../context/AppState';

function formatTime(total) {
  const safe = Math.max(0, Math.floor(total));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const rates = [1, 1.25, 1.5, 2];

export default function Classroom() {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  const { enrollments, setLessonPosition, markLessonDone } = useAppState();
  const enrollment = enrollments.find((item) => item.courseId === courseId);
  const [lessonIndex, setLessonIndex] = useState(enrollment?.lessonIndex || 0);
  const [seconds, setSeconds] = useState(enrollment?.seconds || 0);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [captions, setCaptions] = useState(false);
  const [ended, setEnded] = useState(false);

  const lesson = course?.lessons[lessonIndex];
  const duration = (lesson?.minutes || 1) * 60;
  const done = enrollment?.completed.includes(lessonIndex);
  const savePosition = useRef(setLessonPosition);
  savePosition.current = setLessonPosition;

  useEffect(() => {
    if (!enrollment) return;
    setLessonIndex(enrollment.lessonIndex || 0);
    setSeconds(enrollment.seconds || 0);
    setPlaying(false);
    setEnded(false);
  }, [courseId]);

  useEffect(() => {
    if (!playing || ended) return undefined;
    const id = setInterval(() => {
      setSeconds((current) => {
        const next = current + rate;
        if (next >= duration) {
          setPlaying(false);
          setEnded(true);
          return duration;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, ended, rate, duration]);

  useEffect(() => {
    if (!course) return undefined;
    const id = setTimeout(() => savePosition.current(course.id, lessonIndex, seconds), 400);
    return () => clearTimeout(id);
  }, [seconds, lessonIndex, course]);

  if (!course || !lesson || !enrollment) {
    return (
      <StudentShell tab="classroom">
        <div className="dash">
          <h1>{course?.title || 'Classroom'}</h1>
          <p>Enroll in a course to open a lesson.</p>
          <Link to={course ? `/checkout/${course.id}` : '/courses'} className="btn primary">
            {course ? 'Go to checkout' : 'Explore courses'}
          </Link>
        </div>
      </StudentShell>
    );
  }

  const goTo = (index) => {
    const next = Math.min(Math.max(index, 0), course.lessons.length - 1);
    setLessonIndex(next);
    setSeconds(0);
    setEnded(false);
    setPlaying(false);
    setLessonPosition(course.id, next, 0);
  };

  const onMark = () => {
    markLessonDone(course.id, lessonIndex, lesson.minutes);
  };

  const progress = duration ? (seconds / duration) * 100 : 0;

  return (
    <StudentShell tab="classroom">
      <div className="classroom">
        <div className={`player ${ended ? 'is-ended' : ''} ${playing ? 'is-playing' : ''}`}>
          <button
            type="button"
            className="stage"
            onClick={() => {
              if (ended) {
                setEnded(false);
                setSeconds(0);
                setPlaying(true);
                return;
              }
              setPlaying((value) => !value);
            }}
            aria-label={playing ? 'Pause lesson' : 'Play lesson'}
          >
            {ended ? (
              <div className="end-card">
                <p>End of lesson</p>
                <strong>{lesson.title}</strong>
                <span>Replay or continue to the next lesson</span>
              </div>
            ) : (
              !playing && <span className="big-play"><IconPlay /></span>
            )}
            {captions && !ended && <span className="caption">{lesson.summary}</span>}
          </button>
          <div className="transport">
            <input
              type="range"
              min="0"
              max={duration}
              value={seconds}
              aria-label="Lesson progress"
              onChange={(event) => {
                setSeconds(Number(event.target.value));
                setEnded(false);
              }}
            />
            <div className="transport-row">
              <div className="transport-left">
                <button type="button" onClick={() => setSeconds((s) => Math.max(0, s - 10))} aria-label="Back 10 seconds">⏮</button>
                <button type="button" onClick={() => setPlaying((v) => !v)} aria-label={playing ? 'Pause' : 'Play'}>
                  {playing ? '⏸' : '▶'}
                </button>
                <button type="button" onClick={() => setSeconds((s) => Math.min(duration, s + 10))} aria-label="Forward 10 seconds">⏭</button>
                <span>{formatTime(seconds)} / {formatTime(duration)}</span>
              </div>
              <div className="transport-right">
                <button
                  type="button"
                  onClick={() => setRate(rates[(rates.indexOf(rate) + 1) % rates.length])}
                >
                  {rate.toFixed(rate % 1 ? 2 : 1)}x
                </button>
                <button type="button" className={captions ? 'on' : ''} onClick={() => setCaptions((v) => !v)} aria-pressed={captions}>
                  CC
                </button>
                <button
                  type="button"
                  aria-label="Fullscreen"
                  onClick={() => {
                    const node = document.querySelector('.player');
                    if (document.fullscreenElement) document.exitFullscreen();
                    else node?.requestFullscreen?.();
                  }}
                >
                  ⛶
                </button>
              </div>
            </div>
            <span className="scrub" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="lesson-head">
          <div>
            <h1>{lesson.title}</h1>
            <p>Lesson {lessonIndex + 1} · {course.title} · {course.instructor}</p>
          </div>
          <button type="button" className={`mark ${done ? 'done' : ''}`} onClick={onMark}>
            ✓ Mark as done
          </button>
        </div>
        <div className="lesson-nav">
          <button type="button" disabled={lessonIndex === 0} onClick={() => goTo(lessonIndex - 1)}>← Prev Lesson</button>
          <button type="button" disabled={lessonIndex === course.lessons.length - 1} onClick={() => goTo(lessonIndex + 1)}>
            Next Lesson →
          </button>
        </div>
        <aside className="summary">
          <strong>Summary:</strong>
          <p>{lesson.summary}</p>
        </aside>
      </div>
    </StudentShell>
  );
}
