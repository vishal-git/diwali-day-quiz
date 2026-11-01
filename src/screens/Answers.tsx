import { CATEGORIES, FINAL_QUESTION } from '../data/categories';
import type { Question } from '../data/types';
import { cellLabel } from '../data/types';

/** Host cheat sheet at #/answers — one table per category, for the paper scorer. Print-friendly. */
export function Answers({ questions }: { questions: Question[] }) {
  return (
    <section className="answers">
      <h1>Answers — host sheet</h1>
      <p className="muted">Not for the TV. Press Esc or remove <code>#/answers</code> from the address to go back.</p>
      {CATEGORIES.map((c) => (
        <div key={c.id} className="answers-group">
          <h2>{c.icon} {c.name}</h2>
          <table>
            <thead>
              <tr><th>Code</th><th>#</th><th>Cell</th><th>Question</th><th>Answer</th></tr>
            </thead>
            <tbody>
              {questions.filter((q) => q.category === c.id).map((q) => (
                <tr key={q.id} className={q.live ? '' : 'row-spare'}>
                  <td><code>{q.code}</code></td>
                  <td>{q.id}</td>
                  <td>{cellLabel(q.mode, q.region)}{!q.live && <> <em>spare</em></>}</td>
                  <td>{q.question}{q.hint && <> <span className="muted">(hint: {q.hint})</span></>}</td>
                  <td><strong>{q.answerText}</strong>{q.mustPlay && ' ⭐'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className="answers-group">
        <h2>🏁 Final round</h2>
        <table>
          <thead><tr><th>Code</th><th>#</th><th>Cell</th><th>Question</th><th>Answer</th></tr></thead>
          <tbody>
            <tr>
              <td><code>FINAL</code></td><td>{FINAL_QUESTION.id}</td><td>wager</td>
              <td>{FINAL_QUESTION.question}</td>
              <td><strong>{FINAL_QUESTION.answerText}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
