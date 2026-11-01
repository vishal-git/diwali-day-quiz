import { useState } from 'react';
import { CATEGORY_BY_ID } from '../data/categories';
import type { CategoryId, Cell, Mode, Question, Region } from '../data/types';
import { REGION_LABEL } from '../data/types';
import { remainingIn, type GameState } from '../state/game';
import { useKey } from '../hooks/useKey';
import { Pips, type PipKind } from '../components/Pips';
import { Flag } from '../components/Flag';

interface Props {
  questions: Question[];
  state: GameState;
  category: CategoryId;
  onPick: (cell: Cell) => void;
  onBack: () => void;
}

type Top = 'kids' | 'adult' | 'hard';
const TOP_LABEL: Record<Top, string> = { kids: 'Kids', adult: 'Adult', hard: 'Hard' };

export function Pick({ questions, state, category, onPick, onBack }: Props) {
  const [top, setTop] = useState<Top | null>(null);
  const cat = CATEGORY_BY_ID[category];
  const cell = (mode: Mode, region: Region) => ({ category, mode, region });
  const left = (mode: Mode, region: Region) => remainingIn(questions, state, cell(mode, region)).length;
  const total = (mode: Mode, region: Region) =>
    questions.filter((q) => q.live && q.category === category && q.mode === mode && q.region === region).length;

  useKey((e) => {
    if (e.key === 'Escape') { if (top) setTop(null); else onBack(); }
  }, [top, onBack]);

  // Flavour pips: one icon per question in the cell(s) this button covers.
  const CellButton = ({ label, mode, region, pip, flag, hard }: {
    label: string; mode: Mode; region: Region; pip: PipKind; flag?: Exclude<Region, null>; hard?: boolean;
  }) => {
    const n = left(mode, region);
    return (
      <button
        className={`btn-big ${hard ? 'btn-hard' : ''} ${flag ? 'btn-flag' : ''}`}
        disabled={n === 0}
        aria-label={flag ? label : undefined}
        onClick={() => onPick(cell(mode, region))}
      >
        {flag ? <Flag region={flag} height={150} /> : <span>{label}</span>}
        <Pips kind={pip} left={n} total={total(mode, region)} />
      </button>
    );
  };

  const topLeft = (t: Top) =>
    t === 'hard' ? left('hard-kids', null) + left('hard-adult', null) : left(t, 'us') + left(t, 'india');
  const topTotal = (t: Top) =>
    t === 'hard' ? total('hard-kids', null) + total('hard-adult', null) : total(t, 'us') + total(t, 'india');

  return (
    <section className="pick">
      <header className="pick-header">
        <span className="chip">
          <span aria-hidden="true">{cat.icon}</span> {cat.name}{top && ` › ${TOP_LABEL[top]}`}
        </span>
        <button className="btn-muted" onClick={onBack}>← Back</button>
      </header>
      <h2 className="pick-title">{top ? (top === 'hard' ? 'Which Hard?' : 'Which side?') : 'Who is playing?'}</h2>
      {!top && (
        <div className="pick-row">
          {(['kids', 'adult', 'hard'] as Top[]).map((t) => (
            <button key={t} className={`btn-big ${t === 'hard' ? 'btn-hard' : ''}`} disabled={topLeft(t) === 0} onClick={() => setTop(t)}>
              <span>{TOP_LABEL[t]}</span>
              <Pips kind={t} left={topLeft(t)} total={topTotal(t)} />
            </button>
          ))}
        </div>
      )}
      {top && top !== 'hard' && (
        <div className="pick-row">
          <CellButton label={REGION_LABEL.us} mode={top} region="us" pip={top} flag="us" />
          <CellButton label={REGION_LABEL.india} mode={top} region="india" pip={top} flag="india" />
        </div>
      )}
      {top === 'hard' && (
        <div className="pick-row">
          <CellButton label="Hard·Kids" mode="hard-kids" region={null} pip="hard" hard />
          <CellButton label="Hard·Adult" mode="hard-adult" region={null} pip="hard" hard />
        </div>
      )}
      {top && <button className="btn-muted pick-step-back" onClick={() => setTop(null)}>↑ Change mode</button>}
    </section>
  );
}
