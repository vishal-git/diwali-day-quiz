import { CATEGORIES } from '../data/categories';
import { Glyph } from '../components/Pips';

/** House rules at #/rules, readable from the sofa. The host may bend any of it on the night. */
export function Rules() {
  return (
    <section className="rules">
      <header className="rules-head">
        <h1>House rules</h1>
        <p className="rules-sub">Diwali Quiz 2026 · the host may improvise as the evening goes on</p>
      </header>

      <div className="teams" aria-label="teams">
        <div className="team team-kids"><span className="team-glyph" aria-hidden="true"><Glyph kind="kids" /></span><span className="team-name">Kids</span></div>
        <div className="team team-gents"><span className="team-glyph" aria-hidden="true"><Glyph kind="adult" /></span><span className="team-name">Gentlemen</span></div>
        <div className="team team-ladies"><span className="team-glyph" aria-hidden="true"><Glyph kind="adult" /></span><span className="team-name">Ladies</span></div>
      </div>

      <div className="rules-grid">
        <article className="rule-card">
          <h2>A turn</h2>
          <ol>
            <li>Pick a <strong>category</strong>, then <strong>Kids</strong> or <strong>Adult</strong>, then <strong>US</strong> or <strong>India</strong>.</li>
            <li>The host reads the question. Answer outright for full points, or ask for the <strong>four options</strong> (the <strong>hint</strong>, on a riddle) for half.</li>
            <li>Wrong or stuck? The question <strong>passes to the next team</strong> for a steal. The wrong card goes dark; the right answer stays hidden.</li>
          </ol>
        </article>

        <article className="rule-card">
          <h2>Tokens · each team starts with</h2>
          <ul className="tokens">
            <li><span className="tok">🔄 ×3</span><span><strong>Swap</strong> — a fresh question, same category and mode. Only before the options show. The swapped one is gone for good.</span></li>
            <li><span className="tok">🔥 ×2</span><span><strong>Hard</strong> — unlocks a Hard question, Kids or Adult flavour, your choice. Spent even if you miss.</span></li>
            <li><span className="tok">🎲 ×1</span><span><strong>Double-or-nothing</strong> — call it before the question is read. Right doubles it; wrong loses the base value. Kids and Adult questions only.</span></li>
          </ul>
        </article>

        <article className="rule-card">
          <h2>Lucky Diya 🪔 · once per team</h2>
          <p>A random unplayed question from any category, any mode (Hard included), any side. Right answer = normal points <strong>+10</strong>. A Hard drawn this way has no penalty. Swap and Double still work on it.</p>
          <h2>Diwali tile</h2>
          <p>The centrepiece: every Diwali point counts <strong>×1.5</strong>.</p>
        </article>

        <article className="rule-card">
          <h2>Scoring · starting hand</h2>
          <table>
            <thead><tr><th></th><th>Kids / Adult</th><th>Hard</th></tr></thead>
            <tbody>
              <tr><td>Right, no options or hint</td><td>20</td><td>40</td></tr>
              <tr><td>Right, after options or hint</td><td>10</td><td>20</td></tr>
              <tr><td>Wrong</td><td>0</td><td>0</td></tr>
              <tr><td>Away side (Kids·India, Adult·US)</td><td>+5</td><td>—</td></tr>
              <tr><td>Steal</td><td>5</td><td>5</td></tr>
              <tr><td>Lucky Diya, right answer</td><td>+10</td><td>+10</td></tr>
            </tbody>
          </table>
          <p className="rules-note">Diwali ×1.5 on top. The pill on each question does this sum for you: tap <strong>Steal</strong> or <strong>×2</strong> when they happen, then tap the team under the answer to award it. Totals live on the board and at <code>#/scores</code>.</p>
        </article>
      </div>

      <article className="rule-card rule-wide">
        <h2>The board</h2>
        <ul className="cats">
          {CATEGORIES.map((c) => (
            <li key={c.id}><span aria-hidden="true">{c.icon}</span> <strong>{c.name}</strong> <span className="muted">{c.sides === false ? `· ${c.us}, no US/India pick` : `· US: ${c.us} · India: ${c.india}`}</span></li>
          ))}
          <li><span aria-hidden="true">🎲</span> <strong>Lucky Diya</strong> <span className="muted">· random draw from the eight categories and Diwali</span></li>
        </ul>
        <p className="rules-note"><strong>Final round:</strong> every team wagers up to half its points on one last question.</p>
      </article>

      <footer className="rules-foot muted">Token labels to print and stick on poker chips: <a className="link-quiet" href="#/tokens">#/tokens</a> · Press Esc or remove <code>#/rules</code> from the address to go back.</footer>
    </section>
  );
}
