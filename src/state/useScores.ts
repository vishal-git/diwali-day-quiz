import { useCallback, useMemo, useState } from 'react';
import type { TeamId } from '../data/teams';
import { NO_SCORES, addAward, clearScores, loadScores, removeAward, saveScores, totals, type Ledger } from './scores';

export function useScores() {
  const [ledger, setLedger] = useState<Ledger>(() => loadScores());

  const update = useCallback((fn: (l: Ledger) => Ledger) => {
    setLedger((prev) => {
      const next = fn(prev);
      if (next !== prev) saveScores(next);
      return next;
    });
  }, []);

  return {
    ledger,
    totals: useMemo(() => totals(ledger), [ledger]),
    award: useCallback((qid: string, team: TeamId, points: number) => update((l) => addAward(l, qid, team, points)), [update]),
    remove: useCallback((id: string) => update((l) => removeAward(l, id)), [update]),
    reset: useCallback(() => { clearScores(); setLedger(NO_SCORES); }, []),
  };
}

export type Scores = ReturnType<typeof useScores>;
