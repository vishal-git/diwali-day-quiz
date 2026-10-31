import { useState } from 'react';

interface Props { src: string; alt: string; className?: string }

/** Image that degrades to a labelled placeholder card when the file is missing. */
export function SafeImage({ src, alt, className = '' }: Props) {
  const [failed, setFailed] = useState(false);
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
