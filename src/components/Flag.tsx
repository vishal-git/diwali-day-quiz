import type { Region } from '../data/types';

/** Inline SVG flags: Windows browsers draw flag emoji as letters, so these never depend on an emoji font. */
export function Flag({ region, height = 60 }: { region: Exclude<Region, null>; height?: number }) {
  return region === 'us' ? <FlagUS height={height} /> : <FlagIndia height={height} />;
}

function FlagUS({ height }: { height: number }) {
  const stripe = 100 / 13;
  const stars: JSX.Element[] = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
    stars.push(<circle key={`${r}-${c}`} cx={7 + c * 12.4 + (r % 2 ? 6.2 : 0)} cy={6 + r * 10} r={2.1} fill="#fff" />);
  }
  return (
    <svg className="flag flag-us" viewBox="0 0 190 100" height={height} aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={i} x="0" y={i * stripe} width="190" height={stripe + 0.3} fill={i % 2 ? '#fff' : '#B22234'} />
      ))}
      <rect x="0" y="0" width="80" height={stripe * 7} fill="#3C3B6E" />
      {stars}
    </svg>
  );
}

function FlagIndia({ height }: { height: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const a = (i * Math.PI) / 12;
    return <line key={i} x1="75" y1="50" x2={75 + Math.cos(a) * 11} y2={50 + Math.sin(a) * 11} stroke="#000080" strokeWidth="0.8" />;
  });
  return (
    <svg className="flag flag-india" viewBox="0 0 150 100" height={height} aria-hidden="true">
      <rect width="150" height="33.4" fill="#FF9933" />
      <rect y="33.3" width="150" height="33.4" fill="#fff" />
      <rect y="66.6" width="150" height="33.4" fill="#138808" />
      <circle cx="75" cy="50" r="12" fill="none" stroke="#000080" strokeWidth="2" />
      {spokes}
      <circle cx="75" cy="50" r="2" fill="#000080" />
    </svg>
  );
}
