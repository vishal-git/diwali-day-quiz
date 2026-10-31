import { useState } from 'react';
import { QUESTIONS } from './data/questions';
import type { CategoryId, Cell, Question as Q } from './data/types';
import { luckyPool, remainingIn, spareFor } from './state/game';
import { mulberry32 } from './state/rng';
import { useGame } from './state/useGame';
import { Opening } from './screens/Opening';
import { Board } from './screens/Board';
import { Pick } from './screens/Pick';
import { Question } from './screens/Question';
import { Lucky } from './screens/Lucky';

const rng = mulberry32(314);

type Screen =
  | { kind: 'opening' }
  | { kind: 'board' }
  | { kind: 'pick'; category: CategoryId }
  | { kind: 'lucky' }
  | { kind: 'question'; q: Q; cell: Cell; via: 'board' | 'lucky' | 'swap' };

export default function App() {
  const game = useGame();
  const [screen, setScreen] = useState<Screen>({ kind: 'opening' });
  const toBoard = () => setScreen({ kind: 'board' });

  const openCell = (cell: Cell) => {
    const q = remainingIn(QUESTIONS, game.state, cell)[0];
    if (q) setScreen({ kind: 'question', q, cell, via: 'board' });
  };

  switch (screen.kind) {
    case 'opening':
      return <Opening onBegin={toBoard} />;
    case 'board':
      return (
        <Board
          questions={QUESTIONS}
          state={game.state}
          onPickCategory={(category) => setScreen({ kind: 'pick', category })}
          onLucky={() => setScreen({ kind: 'lucky' })}
          onReset={game.reset}
        />
      );
    case 'pick':
      return <Pick questions={QUESTIONS} state={game.state} category={screen.category} onPick={openCell} onBack={toBoard} />;
    case 'lucky':
      return (
        <Lucky
          pool={luckyPool(QUESTIONS, game.state)}
          rng={rng}
          onLand={(q) => setScreen({ kind: 'question', q, cell: { category: q.category, mode: q.mode, region: q.region }, via: 'lucky' })}
        />
      );
    case 'question': {
      const { q, cell, via } = screen;
      const spare = spareFor(QUESTIONS, game.state, cell);
      return (
        <Question
          key={q.id}
          q={q}
          via={via}
          canSwap={spare !== undefined}
          onDone={(id) => { game.markUsed(id); toBoard(); }}
          onPass={(id) => { game.markUsed(id); toBoard(); }}
          onSwap={(id) => {
            game.markBurned(id);
            if (spare) setScreen({ kind: 'question', q: spare, cell, via: 'swap' });
            else toBoard();
          }}
          onAbandon={toBoard}
        />
      );
    }
  }
}
