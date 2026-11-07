import { useState } from 'react';
import { TEAMS, TEAM_BY_ID, type TeamId } from '../data/teams';
import type { Award } from '../state/scores';

interface Props {
  /** What the pill says a right answer is worth right now. */
  worth: number;
  awards: Award[];
  onAward: (team: TeamId, points: number) => void;
  onRemove: (id: string) => void;
}

/**
 * Under the answer: one tap per team awards the current value; the box beside it takes any
 * other number (a minus sign works) for when the host improvises. Awards already given on
 * this question are listed with a × to take them back.
 */
export function ScoreStrip({ worth, awards, onAward, onRemove }: Props) {
  const [custom, setCustom] = useState<Record<TeamId, string>>({ kids: '', gents: '', ladies: '' });
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();
  const give = (team: TeamId) => {
    const raw = custom[team].trim();
    const n = raw === '' ? worth : Number(raw);
    if (!Number.isFinite(n) || n === 0) return;
    onAward(team, n);
    setCustom((c) => ({ ...c, [team]: '' }));
  };
  return (
    <div className="scorestrip" onClick={stop} onKeyDown={stop}>
      <div className="scorestrip-row">
        {TEAMS.map((t) => {
          const typed = custom[t.id].trim() !== '';
          return (
            <div key={t.id} className={`award team-${t.id}`}>
              <button className="btn-award" onClick={() => give(t.id)} aria-label={`award ${typed ? custom[t.id] : worth} to ${t.name}`}>
                <span className="award-team">{t.name}</span>
                <span className="award-points">{typed ? custom[t.id] : `+${worth}`}</span>
              </button>
              <input
                className="award-input"
                type="number"
                inputMode="numeric"
                placeholder="other"
                aria-label={`other points for ${t.name}`}
                value={custom[t.id]}
                onChange={(e) => setCustom((c) => ({ ...c, [t.id]: e.target.value }))}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); give(t.id); e.currentTarget.blur(); } e.stopPropagation(); }}
              />
            </div>
          );
        })}
      </div>
      {awards.length > 0 && (
        <ul className="given" aria-label="points given on this question">
          {awards.map((a) => (
            <li key={a.id} className={`given-item team-${a.team}`}>
              <span>{TEAM_BY_ID[a.team].name} {a.points > 0 ? '+' : ''}{a.points}</span>
              <button className="given-remove" onClick={() => onRemove(a.id)} aria-label={`remove ${a.points} from ${TEAM_BY_ID[a.team].name}`}>×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
