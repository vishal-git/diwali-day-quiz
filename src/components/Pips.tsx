export type PipKind = 'kids' | 'adult' | 'hard';

const WORD: Record<PipKind, string> = { kids: 'kids', adult: 'adult', hard: 'hard' };

interface Props { kind: PipKind; left: number; total: number; caption?: boolean }

/**
 * One glyph per question in a cell, lit while unplayed and dark once used.
 * Kids are marigold blossoms, adults are diyas, hard questions are firework bursts:
 * three shapes that stay apart at TV distance, drawn in SVG so no emoji font is involved.
 */
export function Pips({ kind, left, total, caption = false }: Props) {
  if (total === 0) return null;
  return (
    <span className={`pips pips-${kind}`} role="img" aria-label={`${left} of ${total} ${WORD[kind]} left`}>
      <span className="pips-row">
        {Array.from({ length: total }, (_, k) => <Glyph key={k} kind={kind} lit={k < left} />)}
      </span>
      {caption && <span className="pips-caption" aria-hidden="true">{WORD[kind]}</span>}
    </span>
  );
}

function Glyph({ kind, lit }: { kind: PipKind; lit: boolean }) {
  const cls = `pip pip-${kind} ${lit ? '' : 'used'}`;
  if (kind === 'kids') {
    // Marigold: two rings of petals around a dark centre.
    const petals = (n: number, r: number, size: number, fill: string, rot = 0) =>
      Array.from({ length: n }, (_, i) => {
        const a = ((i / n) * 360 + rot) * (Math.PI / 180);
        return <circle key={`${r}-${i}`} cx={16 + Math.cos(a) * r} cy={16 + Math.sin(a) * r} r={size} fill={fill} />;
      });
    return (
      <svg className={cls} viewBox="0 0 32 32" aria-hidden="true">
        {petals(8, 9.5, 4.2, 'var(--pip-a)')}
        {petals(8, 5.5, 3.6, 'var(--pip-b)', 22.5)}
        <circle cx="16" cy="16" r="2.6" fill="var(--pip-c)" />
      </svg>
    );
  }
  if (kind === 'adult') {
    // Diya: a bowl with a flame that disappears when the question is used.
    return (
      <svg className={cls} viewBox="0 0 32 32" aria-hidden="true">
        <path className="pip-flame" d="M16 3 C12.5 9, 11 12.5, 16 18 C21 12.5, 19.5 9, 16 3 Z" fill="var(--pip-b)" />
        <path className="pip-flame" d="M16 8.5 C14.4 11.5, 14 13, 16 15.5 C18 13, 17.6 11.5, 16 8.5 Z" fill="var(--pip-c)" />
        <path d="M4 19 Q16 16 28 19 L25 26 Q16 29 7 26 Z" fill="var(--pip-a)" />
        <ellipse cx="16" cy="19" rx="12" ry="2.2" fill="var(--pip-b)" />
      </svg>
    );
  }
  // Hard: a firework burst, eight rays with sparks on the tips.
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    const x = 16 + Math.cos(a) * 12, y = 16 + Math.sin(a) * 12;
    return (
      <g key={i}>
        <line x1="16" y1="16" x2={x} y2={y} stroke="var(--pip-a)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx={x} cy={y} r="2.2" fill="var(--pip-b)" />
      </g>
    );
  });
  return (
    <svg className={cls} viewBox="0 0 32 32" aria-hidden="true">
      {rays}
      <circle cx="16" cy="16" r="3.2" fill="var(--pip-c)" />
    </svg>
  );
}
