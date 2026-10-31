interface Bar { label: string; value: number }
interface Props { bars: Bar[]; revealNames: boolean; unit?: string }

const LETTERS = 'ABCDEFGH';

/** Horizontal-baseline bar chart; names hidden behind letters until revealed. */
export function RunChart({ bars, revealNames, unit = 'runs' }: Props) {
  const W = 1000, H = 520, padL = 40, padB = 90, padT = 40;
  const max = Math.max(...bars.map((b) => b.value));
  const slot = (W - padL * 2) / bars.length;
  const barW = slot * 0.6;
  return (
    <svg className="run-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Bar chart of ${bars.length} ${unit} totals`}>
      {bars.map((b, i) => {
        const h = ((H - padB - padT) * b.value) / max;
        const x = padL + slot * i + (slot - barW) / 2;
        const y = H - padB - h;
        const tallest = b.value === max;
        return (
          <g key={b.label}>
            <rect x={x} y={y} width={barW} height={h} rx={10}
              fill={revealNames && tallest ? 'var(--marigold)' : 'var(--bg-raised)'}
              stroke={revealNames && tallest ? 'var(--gold)' : 'rgba(255,209,102,0.35)'} strokeWidth={3} />
            {revealNames && (
              <text x={x + barW / 2} y={y - 14} textAnchor="middle" fill="var(--gold)" fontSize={30} fontWeight={700}>
                {b.value.toLocaleString('en-US')}
              </text>
            )}
            <text x={x + barW / 2} y={H - padB + 44} textAnchor="middle" fill="var(--cream)" fontSize={revealNames ? 28 : 40} fontWeight={700}>
              {revealNames ? b.label : LETTERS[i]}
            </text>
          </g>
        );
      })}
      <line x1={padL} x2={W - padL} y1={H - padB} y2={H - padB} stroke="rgba(255,244,224,0.4)" strokeWidth={2} />
    </svg>
  );
}
