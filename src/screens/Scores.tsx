import { QUESTION_BY_ID } from '../data/questions';
import { TEAMS, TEAM_BY_ID } from '../data/teams';
import { ScoreBar } from '../components/ScoreBar';
import { ConfirmButton } from '../components/ConfirmButton';
import type { Scores as ScoreState } from '../state/useScores';

/** #/scores: every award in order, with totals on top and a × to take one back. */
export function Scores({ scores }: { scores: ScoreState }) {
  const fmt = (t: number) => new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <section className="scores">
      <h1>Scores</h1>
      <ScoreBar totals={scores.totals} />
      {scores.ledger.length === 0 ? (
        <p className="muted">Nothing awarded yet. Points are given under the answer of each question.</p>
      ) : (
        <table>
          <thead><tr><th>Time</th><th>Question</th>{TEAMS.map((t) => <th key={t.id}>{t.name}</th>)}<th></th></tr></thead>
          <tbody>
            {scores.ledger.map((a) => {
              const q = QUESTION_BY_ID[a.qid];
              return (
                <tr key={a.id}>
                  <td className="muted">{fmt(a.at)}</td>
                  <td>{q ? <><code>{q.code}</code> {q.question}</> : a.qid}</td>
                  {TEAMS.map((t) => <td key={t.id} className="num">{a.team === t.id ? (a.points > 0 ? `+${a.points}` : a.points) : ''}</td>)}
                  <td><button className="given-remove" onClick={() => scores.remove(a.id)} aria-label={`remove ${a.points} from ${TEAM_BY_ID[a.team].name}`}>×</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <footer className="scores-foot">
        <ConfirmButton label="Reset scores" question="Reset all scores to zero?" onConfirm={scores.reset} />
        <span className="muted">Press Esc or remove <code>#/scores</code> from the address to go back.</span>
      </footer>
    </section>
  );
}
