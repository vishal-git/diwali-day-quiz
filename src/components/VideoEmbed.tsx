interface Props { youtubeId: string; start?: number; title?: string }

/** YouTube embed, autoplay off. Clicks inside must not advance the question stage. */
export function VideoEmbed({ youtubeId, start = 0, title = 'video clip' }: Props) {
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?start=${start}&autoplay=0&rel=0`;
  return (
    <div className="video-wrap" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
      <iframe src={src} title={title} allow="encrypted-media; picture-in-picture" allowFullScreen />
    </div>
  );
}
