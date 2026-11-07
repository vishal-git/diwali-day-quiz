import paths from './india-paths.json';

const { viewBox, states } = paths as { viewBox: string; states: Record<string, string> };

function centroid(d: string): [number, number] {
  const nums = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
  return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
}

/** All of India with the named states lit and labelled: "where is Odisha?" for the kids. */
export function IndiaMap({ highlight, labels = {} }: { highlight: string[]; labels?: Record<string, string> }) {
  const lit = new Set(highlight);
  return (
    <svg className="map map-india" viewBox={viewBox} role="img" aria-label={`Map of India with ${highlight.map((h) => labels[h] ?? h).join(' and ')} highlighted`}>
      {Object.entries(states).map(([name, d]) => (
        <path key={name} d={d} fill={lit.has(name) ? 'var(--marigold)' : 'var(--bg-raised)'}
          stroke={lit.has(name) ? 'var(--gold)' : 'rgba(255,244,224,0.35)'} strokeWidth={lit.has(name) ? 4 : 1.5} strokeLinejoin="round" />
      ))}
      {highlight.filter((n) => states[n]).map((n) => {
        const [x, y] = centroid(states[n]);
        return <text key={n} x={x} y={y} textAnchor="middle" className="map-label">{labels[n] ?? n}</text>;
      })}
    </svg>
  );
}
