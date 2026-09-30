export function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#1a1440" />
      <path d="M6.2 7.4h3.4L14 16.2l4.4-8.8h3.4L15.7 21h-3.4L6.2 7.4z" fill="#d8ccff" />
    </svg>
  );
}

export function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}

export function IconCourses() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6.5 12 3l8 3.5v2L12 9 4 6.5v-2z" />
      <path d="M4 10.5 12 14l8-3.5V16L12 19.5 4 16v-5.5z" />
    </svg>
  );
}

export function IconUser() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19.2c1.4-3 3.8-4.4 7-4.4s5.6 1.4 7 4.4" />
    </svg>
  );
}

export function IconPlay({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 7.5v9l8-4.5-8-4.5z" />
    </svg>
  );
}

export function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16.5 20 20.5" />
    </svg>
  );
}
