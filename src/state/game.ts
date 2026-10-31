import type { Question, Cell, CategoryId, Mode } from '../data/types';

export interface GameState {
  used: string[];
  burned: string[];
}

export const EMPTY: GameState = { used: [], burned: [] };

export interface CellCounts {
  kids: number;
  adult: number;
  hardKids: boolean;
  hardAdult: boolean;
  total: number;
  mustPlayPending: boolean;
}

export function isAvailable(q: Question, s: GameState): boolean {
  return q.live && !s.used.includes(q.id) && !s.burned.includes(q.id);
}

function isUntouched(q: Question, s: GameState): boolean {
  return !s.used.includes(q.id) && !s.burned.includes(q.id);
}

export function remainingIn(qs: Question[], s: GameState, cell: Cell): Question[] {
  return qs.filter(
    (q) => isAvailable(q, s) && q.category === cell.category && q.mode === cell.mode && q.region === cell.region,
  );
}

/** Spares are tagged kids/adult only; a Hard cell draws the matching flavour. Region is ignored. */
function spareMode(mode: Mode): Mode {
  return mode === 'hard-kids' ? 'kids' : mode === 'hard-adult' ? 'adult' : mode;
}

export function spareFor(qs: Question[], s: GameState, cell: Cell): Question | undefined {
  const want = spareMode(cell.mode);
  return qs.find((q) => !q.live && q.category === cell.category && q.mode === want && isUntouched(q, s));
}

export function cellCounts(qs: Question[], s: GameState, category: CategoryId): CellCounts {
  const avail = qs.filter((q) => q.category === category && isAvailable(q, s));
  const n = (mode: Mode) => avail.filter((q) => q.mode === mode).length;
  return {
    kids: n('kids'),
    adult: n('adult'),
    hardKids: n('hard-kids') > 0,
    hardAdult: n('hard-adult') > 0,
    total: avail.length,
    mustPlayPending: avail.some((q) => q.mustPlay),
  };
}

export function luckyPool(qs: Question[], s: GameState): Question[] {
  return qs.filter((q) => isAvailable(q, s));
}

export function markUsed(s: GameState, id: string): GameState {
  return s.used.includes(id) ? s : { ...s, used: [...s.used, id] };
}

export function markBurned(s: GameState, id: string): GameState {
  return s.burned.includes(id) ? s : { ...s, burned: [...s.burned, id] };
}

export function playedCount(s: GameState): number {
  return s.used.length;
}
