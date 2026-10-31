import paths from './india-paths.json';

const { viewBox, states } = paths as { viewBox: string; states: Record<string, string> };
const GUJARAT = states['Gujarat'];

function bounds(d: string) {
  const nums = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
  const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
  const pad = 12;
  const minX = Math.min(...xs) - pad, minY = Math.min(...ys) - pad;
  return `${minX} ${minY} ${Math.max(...xs) + pad - minX} ${Math.max(...ys) + pad - minY}`;
}
const GUJARAT_BOX = bounds(GUJARAT);

/**
 * filled=false: the unlabelled Gujarat outline alone (the question).
 * filled=true: all of India with Gujarat lit (the reveal).
 */
export function GujaratMap({ filled }: { filled: boolean }) {
  if (!filled) {
    return (
      <svg className="map map-outline" viewBox={GUJARAT_BOX} role="img" aria-label="Outline of an Indian state">
        <path d={GUJARAT} fill="var(--bg-raised)" stroke="var(--gold)" strokeWidth={1.2} strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className="map map-india" viewBox={viewBox} role="img" aria-label="Map of India with Gujarat highlighted">
      {Object.entries(states).map(([name, d]) => (
        <path key={name} d={d} fill={name === 'Gujarat' ? 'var(--marigold)' : 'var(--bg-raised)'}
          stroke={name === 'Gujarat' ? 'var(--gold)' : 'rgba(255,244,224,0.35)'} strokeWidth={name === 'Gujarat' ? 4 : 1.5} strokeLinejoin="round" />
      ))}
    </svg>
  );
}
