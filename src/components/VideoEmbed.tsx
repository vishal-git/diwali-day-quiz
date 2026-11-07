import { useState } from 'react';

interface Props { youtubeId: string; start?: number; title?: string }

/**
 * YouTube embed behind a play button. The iframe is only created on click, with autoplay on,
 * so the video's title (which is the answer) is never sitting on screen before the host presses play.
 * Clicks inside must not advance the question stage.
 */
export function VideoEmbed({ youtubeId, start = 0, title = 'video clip' }: Props) {
  const [playing, setPlaying] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?start=${start}&autoplay=1&rel=0&modestbranding=1`;
  return (
    <div className="video-wrap" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
      {playing ? (
        <iframe src={src} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      ) : (
        <button className="video-cover" onClick={() => setPlaying(true)} aria-label="play the clip">
          <span className="video-play" aria-hidden="true">▶</span>
          <span className="video-cover-text">Play the clip</span>
        </button>
      )}
    </div>
  );
}
