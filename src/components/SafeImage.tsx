import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** What to show if the file is missing: a "pending" note, or a styled title card carrying the alt text (posters). */
  fallback?: 'pending' | 'title';
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
