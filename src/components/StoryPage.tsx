import type { Question } from '../data/types';
import { SafeImage } from './SafeImage';
import { StatueCompare } from './StatueCompare';
import { GujaratMap } from './GujaratMap';
import { IndiaMap } from './IndiaMap';
import { RunChart } from './RunChart';

export function StoryPage({ q }: { q: Question }) {
  const s = q.story!;
  const hasVisual = Boolean(s.graphic || s.image);
  return (
    <article className={`story fade-in ${hasVisual ? '' : 'story-text-only'}`}>
      {hasVisual && <div className="story-visual">
        {s.graphic === 'statue' && <StatueCompare />}
        {s.graphic === 'map-gujarat' && <GujaratMap filled />}
        {s.graphic === 'map-states' && s.highlight && <IndiaMap highlight={s.highlight} labels={s.labels} />}
        {s.graphic === 'run-chart' && q.chart && <RunChart bars={q.chart.bars} revealNames unit={q.chart.unit} />}
        {s.image && <SafeImage className="story-image" src={s.image} alt={s.title} />}
      </div>}
      <div className="story-text">
        <h2 className="story-title">{s.title}</h2>
        {s.lines.map((line, i) => <p key={i} className="story-line">{line}</p>)}
      </div>
    </article>
  );
}
