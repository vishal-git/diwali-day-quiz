import { useState } from 'react';
import { QUESTIONS } from './data/questions';
import type { CategoryId, Cell, Question } from './data/types';
import { remainingIn } from './state/game';
import { useGame } from './state/useGame';
import { Opening } from './screens/Opening';
import { Board } from './screens/Board';
import { Pick } from './screens/Pick';

type Screen =
  | { kind: 'opening' }
  | { kind: 'board' }
  | { kind: 'pick'; category: CategoryId }
  | { kind: 'lucky' }
  | { kind: 'question'; q: Question; cell: Cell; via: 'board' | 'lucky' | 'swap' };

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
      return <section className="placeholder" onClick={toBoard}>Lucky Diya coming soon</section>;
    case 'question':
      return <section className="placeholder" onClick={toBoard}>{screen.q.question}</section>;
  }
}
