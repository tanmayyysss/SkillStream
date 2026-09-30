export default function CourseArt({ art, title }) {
  return (
    <div className={`art art-${art}`} role="img" aria-label={title}>
      {art === 'python' && (
        <svg aria-hidden="true" viewBox="0 0 80 80">
          <path d="M40 10c-12 0-12 6-12 8v6h12v3H22c-8 0-12 6-12 14s4 14 12 14h6v-8c0-6 4-8 10-8h12c6 0 8-3 8-8V18c0-6-4-8-12-8H40z" fill="#3776ab" />
          <path d="M40 70c12 0 12-6 12-8v-6H40v-3h18c8 0 12-6 12-14s-4-14-12-14h-6v8c0 6-4 8-10 8H30c-6 0-8 3-8 8v11c0 6 4 8 12 8h6z" fill="#ffd343" />
          <circle cx="32" cy="20" r="2.4" fill="#fff" />
          <circle cx="48" cy="60" r="2.4" fill="#1a1a1a" />
        </svg>
      )}
      {art === 'react' && (
        <svg aria-hidden="true" viewBox="0 0 80 80">
          <ellipse cx="40" cy="40" rx="22" ry="8" fill="none" stroke="#61dafb" strokeWidth="2" />
          <ellipse cx="40" cy="40" rx="22" ry="8" transform="rotate(60 40 40)" fill="none" stroke="#61dafb" strokeWidth="2" />
          <ellipse cx="40" cy="40" rx="22" ry="8" transform="rotate(120 40 40)" fill="none" stroke="#61dafb" strokeWidth="2" />
          <circle cx="40" cy="40" r="4" fill="#61dafb" />
        </svg>
      )}
      {art === 'analytics' && (
        <svg aria-hidden="true" viewBox="0 0 120 70">
          <rect x="8" y="18" width="46" height="36" rx="8" fill="#123" />
          <circle cx="28" cy="36" r="10" fill="none" stroke="#7dd3fc" strokeWidth="3" />
          <path d="M24 36h8M28 32v8" stroke="#7dd3fc" strokeWidth="2" />
          <text x="62" y="40" fill="#fff" fontSize="22" fontFamily="Inter, sans-serif">+</text>
          <rect x="78" y="16" width="32" height="38" rx="4" fill="#107c41" />
          <path d="M86 44V26h6l4 8 4-8h6v18h-4V32l-4 8h-4l-4-8v12h-4z" fill="#fff" />
        </svg>
      )}
      {art === 'sql' && (
        <svg aria-hidden="true" viewBox="0 0 80 80">
          <ellipse cx="40" cy="22" rx="22" ry="8" fill="#3b82f6" />
          <path d="M18 22v18c0 5 10 9 22 9s22-4 22-9V22" fill="#1d4ed8" />
          <path d="M18 34v14c0 5 10 9 22 9s22-4 22-9V34" fill="#2563eb" />
          <ellipse cx="40" cy="48" rx="22" ry="8" fill="none" stroke="#bfdbfe" />
        </svg>
      )}
      {art === 'design' && (
        <svg aria-hidden="true" viewBox="0 0 80 80">
          <rect x="14" y="16" width="52" height="40" rx="6" fill="#1e1b4b" stroke="#a78bfa" />
          <rect x="20" y="24" width="22" height="6" rx="2" fill="#c4b5fd" />
          <rect x="20" y="34" width="40" height="4" rx="2" fill="#6d28d9" />
          <rect x="20" y="42" width="28" height="4" rx="2" fill="#4c1d95" />
        </svg>
      )}
      {art === 'ml' && (
        <svg aria-hidden="true" viewBox="0 0 80 80">
          <circle cx="24" cy="28" r="6" fill="#fbbf24" />
          <circle cx="56" cy="24" r="6" fill="#f59e0b" />
          <circle cx="40" cy="50" r="7" fill="#fcd34d" />
          <path d="M28 32 36 46M52 28 44 46M30 28h20" stroke="#fde68a" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
}
