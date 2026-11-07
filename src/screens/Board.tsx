import { CATEGORIES, LUCKY } from '../data/categories';
import type { CategoryId, Question } from '../data/types';
import { cellCounts, luckyPool, playedCount, type GameState } from '../state/game';
import { Tile } from '../components/Tile';
import { ResetButton } from '../components/ResetButton';

interface Props {
  questions: Question[];
  state: GameState;
  onPickCategory: (c: CategoryId) => void;
  onLucky: () => void;
  onReset: () => void;
}

export function Board({ questions, state, onPickCategory, onLucky, onReset }: Props) {
  const luckyEmpty = luckyPool(questions, state).length === 0;
  return (
    <section className="board">
      <div className="board-grid">
        {CATEGORIES.map((c) => (
          <Tile
            key={c.id}
            category={c}
            counts={cellCounts(questions, state, c.id)}
            featured={c.id === 'diwali'}
            onClick={() => onPickCategory(c.id)}
          />
        ))}
        <button
          className={`tile tile-lucky ${luckyEmpty ? 'tile-empty' : ''}`}
          aria-disabled={luckyEmpty}
          onClick={() => !luckyEmpty && onLucky()}
        >
          <span className="tile-icon" aria-hidden="true">{LUCKY.icon}</span>
          <span className="tile-name">{LUCKY.name} 🪔</span>
          <span className="tile-counts">random draw · any mode</span>
        </button>
      </div>
      <footer className="board-footer">
        <span className="muted">questions played: {playedCount(state)} · <a className="link-quiet" href="#/rules">rules</a></span>
        <ResetButton onReset={onReset} />
      </footer>
    </section>
  );
}
