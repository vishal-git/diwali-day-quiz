import { useState } from 'react';
import { CATEGORY_BY_ID } from '../data/categories';
import type { CategoryId, Cell, Mode, Question, Region } from '../data/types';
import { remainingIn, type GameState } from '../state/game';
import { useKey } from '../hooks/useKey';

interface Props {
  questions: Question[];
  state: GameState;
  category: CategoryId;
  onPick: (cell: Cell) => void;
  onBack: () => void;
}

type Top = 'kids' | 'adult' | 'hard';

export function Pick({ questions, state, category, onPick, onBack }: Props) {
  const [top, setTop] = useState<Top | null>(null);
  const cat = CATEGORY_BY_ID[category];
  const left = (mode: Mode, region: Region) => remainingIn(questions, state, { category, mode, region }).length;

  useKey((e) => {
    if (e.key === 'Escape') { if (top) setTop(null); else onBack(); }
  }, [top, onBack]);

  const CellButton = ({ label, mode, region }: { label: string; mode: Mode; region: Region }) => {
    const n = left(mode, region);
    return (
      <button className="btn-big" disabled={n === 0} onClick={() => onPick({ category, mode, region })}>
        <span>{label}</span>
        <small>{n} left</small>
      </button>
    );
  };

  const topTotal = (t: Top) =>
    t === 'hard' ? left('hard-kids', null) + left('hard-adult', null) : left(t, 'us') + left(t, 'india');

  return (
    <section className="pick">
      <header className="pick-header">
        <span className="chip"><span aria-hidden="true">{cat.icon}</span> {cat.name}</span>
        <button className="btn-muted" onClick={onBack}>← Back</button>
      </header>
      <h2 className="pick-title">{top ? (top === 'hard' ? 'Which Hard?' : 'Which side?') : 'Who is playing?'}</h2>
      {!top && (
        <div className="pick-row">
          {(['kids', 'adult', 'hard'] as Top[]).map((t) => (
            <button key={t} className={`btn-big ${t === 'hard' ? 'btn-hard' : ''}`} disabled={topTotal(t) === 0} onClick={() => setTop(t)}>
              <span>{t === 'kids' ? 'Kids' : t === 'adult' ? 'Adult' : 'Hard'}</span>
              <small>{topTotal(t)} left</small>
            </button>
          ))}
        </div>
      )}
      {top && top !== 'hard' && (
        <div className="pick-row">
          <CellButton label={`US · ${cat.us}`} mode={top} region="us" />
          <CellButton label={`India · ${cat.india}`} mode={top} region="india" />
        </div>
      )}
      {top === 'hard' && (
        <div className="pick-row">
          <CellButton label="Hard·Kids" mode="hard-kids" region={null} />
          <CellButton label="Hard·Adult" mode="hard-adult" region={null} />
        </div>
      )}
      {top && <button className="btn-muted pick-step-back" onClick={() => setTop(null)}>↑ Change mode</button>}
    </section>
  );
}
