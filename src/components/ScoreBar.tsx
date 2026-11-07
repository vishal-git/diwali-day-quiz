import { TEAMS, type TeamId } from '../data/teams';

/** The three running totals, side by side. The leader is lit once anyone has scored. */
export function ScoreBar({ totals, size = 'normal' }: { totals: Record<TeamId, number>; size?: 'normal' | 'small' }) {
  const max = Math.max(...TEAMS.map((t) => totals[t.id]));
  const anyScore = TEAMS.some((t) => totals[t.id] !== 0);
  return (
    <div className={`scorebar scorebar-${size}`} role="list" aria-label="scores">
      {TEAMS.map((t) => (
        <div key={t.id} role="listitem" className={`score team-${t.id} ${anyScore && totals[t.id] === max ? 'leading' : ''}`}>
          <span className="score-team">{t.name}</span>
          <span className="score-value">{totals[t.id]}</span>
        </div>
      ))}
    </div>
  );
}
