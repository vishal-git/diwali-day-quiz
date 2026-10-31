const STATUES = [
  { name: 'Statue of Unity', place: 'Kevadia, Gujarat', m: 182, color: 'var(--marigold)' },
  { name: 'Spring Temple Buddha', place: 'Henan, China', m: 128, color: '#c084fc' },
  { name: 'Statue of Liberty', place: 'New York (with pedestal)', m: 93, color: '#6ee7b7' },
  { name: 'Christ the Redeemer', place: 'Rio de Janeiro (with pedestal)', m: 38, color: '#93c5fd' },
];

/** Proportional height comparison for 3.3. */
export function StatueCompare() {
  const W = 1000, H = 600, base = 510, top = 90, max = 182;
  const slot = W / STATUES.length;
  return (
    <svg className="statue-compare" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Height comparison of four statues">
      {[50, 100, 150].map((m) => {
        const y = base - ((base - top) * m) / max;
        return (
          <g key={m}>
            <line x1={0} x2={W} y1={y} y2={y} stroke="rgba(255,244,224,0.12)" strokeDasharray="6 8" />
            <text x={8} y={y - 6} fill="var(--muted)" fontSize={20}>{m} m</text>
          </g>
        );
      })}
      {STATUES.map((s, i) => {
        const h = ((base - top) * s.m) / max;
        const w = 90;
        const x = slot * i + (slot - w) / 2;
        const y = base - h;
        return (
          <g key={s.name}>
            <path d={`M${x} ${base} L${x} ${y + 30} Q${x + w / 2} ${y - 20} ${x + w} ${y + 30} L${x + w} ${base} Z`} fill={s.color} opacity={0.9} />
            <text x={x + w / 2} y={y - 28} textAnchor="middle" fill="var(--gold)" fontSize={34} fontWeight={700}>{s.m} m</text>
            <text x={slot * i + slot / 2} y={base + 40} textAnchor="middle" fill="var(--cream)" fontSize={24} fontWeight={700}>{s.name}</text>
            <text x={slot * i + slot / 2} y={base + 70} textAnchor="middle" fill="var(--muted)" fontSize={18}>{s.place}</text>
          </g>
        );
      })}
      <line x1={0} x2={W} y1={base} y2={base} stroke="rgba(255,244,224,0.5)" strokeWidth={2} />
    </svg>
  );
}
