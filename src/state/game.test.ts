import { QUESTIONS } from '../data/questions';
import {
  EMPTY, remainingIn, spareFor, cellCounts, luckyPool, markUsed, markBurned, isAvailable,
} from './game';
import { mulberry32, shuffle } from './rng';

const ids = (qs: { id: string }[]) => qs.map((q) => q.id);
const GEO_KIDS_US = { category: 'geography', mode: 'kids', region: 'us' } as const;

test('remainingIn lists the live questions of a cell', () => {
  expect(ids(remainingIn(QUESTIONS, EMPTY, GEO_KIDS_US))).toEqual(['1.1', '1.2']);
});

test('a used question leaves its cell', () => {
  const s = markUsed(EMPTY, '1.1');
  expect(ids(remainingIn(QUESTIONS, s, GEO_KIDS_US))).toEqual(['1.2']);
});

test('a burned question leaves its cell too', () => {
  const s = markBurned(EMPTY, '1.2');
  expect(ids(remainingIn(QUESTIONS, s, GEO_KIDS_US))).toEqual(['1.1']);
  expect(isAvailable(QUESTIONS[1], s)).toBe(false);
});

test('spareFor matches category and mode only, ignoring region', () => {
  expect(spareFor(QUESTIONS, EMPTY, GEO_KIDS_US)?.id).toBe('1.S1');
  expect(spareFor(QUESTIONS, EMPTY, { category: 'geography', mode: 'kids', region: 'india' })?.id).toBe('1.S1');
  expect(spareFor(QUESTIONS, EMPTY, { category: 'geography', mode: 'adult', region: 'us' })?.id).toBe('1.S2');
});

test('hard cells draw spares of the matching kids/adult flavour', () => {
  expect(spareFor(QUESTIONS, EMPTY, { category: 'local', mode: 'hard-kids', region: null })?.id).toBe('3.S1');
  expect(spareFor(QUESTIONS, EMPTY, { category: 'local', mode: 'hard-adult', region: null })?.id).toBe('3.S3');
});

test('spareFor skips burned spares and returns undefined when exhausted', () => {
  const s = markBurned(EMPTY, '1.S1');
  expect(spareFor(QUESTIONS, s, GEO_KIDS_US)).toBeUndefined();
  expect(spareFor(QUESTIONS, EMPTY, { category: 'diwali', mode: 'kids', region: 'india' })).toBeUndefined();
});

test('cellCounts derives the tile counter', () => {
  const geo = cellCounts(QUESTIONS, EMPTY, 'geography');
  expect(geo).toEqual({ kids: 4, adult: 4, hardKids: true, hardAdult: true, total: 10, mustPlayPending: false });
  const diwali = cellCounts(QUESTIONS, EMPTY, 'diwali');
  expect(diwali.total).toBe(11);
  expect(diwali.kids).toBe(4);
  expect(diwali.adult).toBe(5);
  const local = cellCounts(QUESTIONS, EMPTY, 'local');
  expect(local.mustPlayPending).toBe(true);
  expect(cellCounts(QUESTIONS, markUsed(EMPTY, '3.3'), 'local').mustPlayPending).toBe(false);
  expect(cellCounts(QUESTIONS, markUsed(EMPTY, '1.9'), 'geography').hardKids).toBe(false);
});

test('luckyPool holds every live unplayed question and never a spare', () => {
  const pool = luckyPool(QUESTIONS, EMPTY);
  expect(pool).toHaveLength(91);
  expect(pool.every((q) => q.live)).toBe(true);
  const allUsed = { used: QUESTIONS.filter((q) => q.live).map((q) => q.id), burned: [] };
  expect(luckyPool(QUESTIONS, allUsed)).toEqual([]);
});

test('markUsed is idempotent and does not mutate', () => {
  const s1 = markUsed(EMPTY, '1.1');
  const s2 = markUsed(s1, '1.1');
  expect(s2.used).toEqual(['1.1']);
  expect(EMPTY.used).toEqual([]);
});

test('mulberry32(314) is reproducible', () => {
  const a = mulberry32(314); const b = mulberry32(314);
  expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  const v = mulberry32(314)();
  expect(v).toBeGreaterThanOrEqual(0);
  expect(v).toBeLessThan(1);
});

test('shuffle is a seeded permutation', () => {
  const xs = [1, 2, 3, 4, 5];
  const out = shuffle(xs, mulberry32(314));
  expect([...out].sort()).toEqual(xs);
  expect(shuffle(xs, mulberry32(314))).toEqual(out);
  expect(xs).toEqual([1, 2, 3, 4, 5]);
});
