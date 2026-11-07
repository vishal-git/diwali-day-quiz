export type PipKind = 'kids' | 'adult' | 'hard';

const WORD: Record<PipKind, string> = { kids: 'kids', adult: 'adult', hard: 'hard' };

interface Props { kind: PipKind; left: number; total: number; caption?: boolean }

/**
 * One glyph per question in a cell, lit while unplayed and dark once used.
 * Kids are balloons, adults are a head-and-shoulders figure, hard questions are flames:
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

export function Glyph({ kind, lit = true, className = '' }: { kind: PipKind; lit?: boolean; className?: string }) {
  const cls = `pip pip-${kind} ${lit ? '' : 'used'} ${className}`;
  if (kind === 'kids') {
    // A balloon on a string.
    return (
      <svg className={cls} viewBox="0 0 32 32" aria-hidden="true">
        <ellipse cx="16" cy="12" rx="9" ry="10.5" fill="var(--pip-a)" />
        <ellipse cx="12.5" cy="8" rx="2.6" ry="3.6" fill="var(--pip-b)" opacity="0.8" transform="rotate(-20 12.5 8)" />
        <path d="M13.8 22.2 L16 25 L18.2 22.2 Z" fill="var(--pip-a)" />
        <path d="M16 25 C14 27, 18 28.5, 16 31" fill="none" stroke="var(--pip-c)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'adult') {
    // Head and shoulders.
    return (
      <svg className={cls} viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="10" r="6.5" fill="var(--pip-a)" />
        <path d="M4 30 C4 21.5, 9 18.5, 16 18.5 C23 18.5, 28 21.5, 28 30 Z" fill="var(--pip-b)" />
      </svg>
    );
  }
  // Hard: a flame.
  return (
    <svg className={cls} viewBox="0 0 32 32" aria-hidden="true">
      <path className="pip-flame" d="M16 1.5 C17 8, 24 10.5, 24 19 C24 25.5, 20.5 30, 16 30 C11.5 30, 8 25.5, 8 19 C8 15, 10 12.5, 11.5 10.5 C11.5 14, 13 15.5, 14.5 15.5 C13.5 11, 14.5 6, 16 1.5 Z" fill="var(--pip-a)" />
      <path className="pip-flame" d="M16 14 C17.5 18, 20 19.5, 20 23.5 C20 27, 18.2 29, 16 29 C13.8 29, 12 27, 12 23.5 C12 21.5, 13 20.5, 13.8 19.5 C13.8 21.5, 14.6 22.3, 15.4 22.3 C14.8 19.5, 15.3 16.5, 16 14 Z" fill="var(--pip-b)" />
      <ellipse cx="16" cy="25" rx="2" ry="3" fill="var(--pip-c)" />
    </svg>
  );
}
