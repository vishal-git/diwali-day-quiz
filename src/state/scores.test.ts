import { addAward, awardsFor, clearScores, loadScores, removeAward, saveScores, totals, NO_SCORES } from './scores';

beforeEach(() => localStorage.clear());

test('awards add up per team; zero or non-numbers are ignored', () => {
  let l = addAward(NO_SCORES, '1.1', 'kids', 20, 1);
  l = addAward(l, '1.1', 'gents', 5, 2);
  l = addAward(l, '3.9', 'kids', -10, 3);
  l = addAward(l, '3.9', 'ladies', 0, 4);
  l = addAward(l, '3.9', 'ladies', Number.NaN, 5);
  expect(l).toHaveLength(3);
  expect(totals(l)).toEqual({ kids: 10, gents: 5, ladies: 0 });
  expect(awardsFor(l, '1.1').map((a) => a.team)).toEqual(['kids', 'gents']);
});

test('removeAward drops one entry and leaves the ledger alone for an unknown id', () => {
  const l = addAward(NO_SCORES, '1.1', 'kids', 20, 1);
  expect(removeAward(l, l[0].id)).toEqual([]);
  expect(removeAward(l, 'nope')).toBe(l);
});

test('ledger round-trips through localStorage and rejects junk', () => {
  const l = addAward(NO_SCORES, '1.1', 'kids', 20, 1);
  saveScores(l);
  expect(loadScores()).toEqual(l);
  localStorage.setItem('diwali-quiz-2026-scores', JSON.stringify([{ id: 'x', team: 'martians', points: 3 }]));
  expect(loadScores()).toEqual([]);
  clearScores();
  expect(localStorage.getItem('diwali-quiz-2026-scores')).toBeNull();
});
