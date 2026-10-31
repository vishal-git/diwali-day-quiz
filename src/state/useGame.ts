import { useCallback, useState } from 'react';
import { EMPTY, markBurned, markUsed, type GameState } from './game';
import { clearState, loadState, saveState } from './storage';

export function useGame() {
  const [state, setState] = useState<GameState>(() => loadState());

  const update = useCallback((fn: (s: GameState) => GameState) => {
    setState((prev) => {
      const next = fn(prev);
      if (next !== prev) saveState(next);
      return next;
    });
  }, []);

  return {
    state,
    markUsed: useCallback((id: string) => update((s) => markUsed(s, id)), [update]),
    markBurned: useCallback((id: string) => update((s) => markBurned(s, id)), [update]),
    reset: useCallback(() => { clearState(); setState(EMPTY); }, []),
  };
}
