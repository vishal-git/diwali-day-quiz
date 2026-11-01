export type PipKind = 'kids' | 'adult' | 'hard';

export const PIP_ICON: Record<PipKind, string> = { kids: '🧒', adult: '🧑', hard: '🔥' };
const PIP_WORD: Record<PipKind, string> = { kids: 'kids', adult: 'adult', hard: 'hard' };

interface Props { kind: PipKind; left: number; total: number }

/** One icon per question in a cell: lit while unplayed, dimmed once used. Replaces a numeric count. */
export function Pips({ kind, left, total }: Props) {
  if (total === 0) return null;
  return (
    <span className={`pips pips-${kind}`} role="img" aria-label={`${left} of ${total} ${PIP_WORD[kind]} left`}>
      {Array.from({ length: total }, (_, k) => (
        <span key={k} className={`pip pip-${kind} ${k < left ? '' : 'used'}`} aria-hidden="true">{PIP_ICON[kind]}</span>
      ))}
    </span>
  );
}
