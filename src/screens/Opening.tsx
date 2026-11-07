import { useKey } from '../hooks/useKey';
import { Diya } from '../components/Diya';
import { ScoreBar } from '../components/ScoreBar';
import type { TeamId } from '../data/teams';

const SPARKS = Array.from({ length: 18 }, (_, i) => i);

export function Opening({ onBegin, totals }: { onBegin: () => void; totals?: Record<TeamId, number> }) {
  useKey((e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onBegin(); }
  }, [onBegin]);

  return (
    <section className="opening">
      <div className="sparks" aria-hidden="true">
        {SPARKS.map((i) => (
          <span key={i} className="spark" style={{ left: `${(i * 53) % 100}%`, animationDelay: `${(i * 0.7) % 6}s`, animationDuration: `${7 + (i % 5)}s` }} />
        ))}
      </div>
      <Diya />
      <h1 className="opening-title">Happy Diwali</h1>
      <p className="opening-sub">Diwali Quiz · 2026</p>
      <button className="btn-primary" onClick={onBegin}>Begin</button>
      <a className="link-quiet" href="#/rules">House rules</a>
      {totals && <ScoreBar totals={totals} size="small" />}
    </section>
  );
}
