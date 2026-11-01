import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** What to show if the file is missing: a "pending" note, or a styled title card carrying the alt text (posters). */
  fallback?: 'pending' | 'title' | 'mystery';
}

/** Image that degrades gracefully when the file is missing. */
export function SafeImage({ src, alt, className = '', fallback = 'pending' }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed && fallback === 'title') {
    return (
      <div className={`title-card ${className}`} role="note" aria-label={alt}>
        <span className="title-card-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="28" height="28"><path d="M4 11h24v16H4z M4 11l3-6h21l-3 6M9 5l-3 6M15 5l-3 6M21 5l-3 6M27 5l-3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
        </span>
        <span className="title-card-text">{alt}</span>
      </div>
    );
  }
  if (failed && fallback === 'mystery') {
    // A "who is this?" photo we never found: a silhouette with the clue line, so the question still plays.
    return (
      <div className={`mystery-card ${className}`} role="note" aria-label={alt}>
        <svg viewBox="0 0 120 140" aria-hidden="true" className="mystery-silhouette">
          <circle cx="60" cy="44" r="28" fill="currentColor" />
          <path d="M10 140 C10 100, 35 84, 60 84 C85 84, 110 100, 110 140 Z" fill="currentColor" />
          <text x="60" y="56" textAnchor="middle" fontSize="40" fontWeight="700" fill="var(--bg-deep)">?</text>
        </svg>
        <span className="mystery-text">{alt}</span>
      </div>
    );
  }
  if (failed) {
    return (
      <div className={`img-placeholder ${className}`} role="note">
        <span className="img-placeholder-icon" aria-hidden="true">📷</span>
        <span className="img-placeholder-alt">{alt}</span>
        <span className="img-placeholder-note">image pending</span>
      </div>
    );
  }
  return <img className={className} src={src.startsWith('/') ? src : `/${src}`} alt={alt} onError={() => setFailed(true)} />;
}
