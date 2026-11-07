import { QUESTIONS } from './questions';
import { CATEGORIES } from './categories';
import type { Question, CategoryId, Mode, Region } from './types';

const live = QUESTIONS.filter((q) => q.live);
const spares = QUESTIONS.filter((q) => !q.live);

function count(category: CategoryId, mode: Mode, region: Region) {
  return live.filter((q) => q.category === category && q.mode === mode && q.region === region).length;
}

test('bank totals match the v8 bank: 110 questions, 91 live, 19 spares', () => {
  expect(QUESTIONS).toHaveLength(110);
  expect(live).toHaveLength(91);
  expect(spares).toHaveLength(19);
});

test('ids are unique', () => {
  expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
});

test('nine categories in bank order', () => {
  expect(CATEGORIES.map((c) => c.id)).toEqual([
    'geography', 'movies', 'local', 'diwali', 'celebrity', 'riddles', 'food', 'sports', 'growing-up',
  ]);
});

const REGULAR: CategoryId[] = ['geography', 'movies', 'local', 'celebrity', 'riddles', 'food', 'sports', 'growing-up'];

test.each(REGULAR)('%s has the 2/2/2/2/1/1 live layout', (cat) => {
  expect(count(cat, 'kids', 'us')).toBe(2);
  expect(count(cat, 'kids', 'india')).toBe(2);
  expect(count(cat, 'adult', 'us')).toBe(2);
  expect(count(cat, 'adult', 'india')).toBe(2);
  expect(count(cat, 'hard-kids', null)).toBe(1);
  expect(count(cat, 'hard-adult', null)).toBe(1);
});

test('diwali has 11 live and no spares', () => {
  expect(count('diwali', 'kids', 'india')).toBe(4);
  expect(count('diwali', 'adult', 'india')).toBe(4);
  expect(count('diwali', 'adult', 'us')).toBe(1);
  expect(count('diwali', 'hard-kids', null)).toBe(1);
  expect(count('diwali', 'hard-adult', null)).toBe(1);
  expect(spares.filter((q) => q.category === 'diwali')).toHaveLength(0);
});

test('hard questions have no region; kids/adult always do', () => {
  for (const q of QUESTIONS) {
    if (q.mode.startsWith('hard')) expect(q.region, q.id).toBeNull();
    else expect(q.region, q.id).not.toBeNull();
  }
});

test('non-riddles have 2–4 options and a valid answer index', () => {
  for (const q of QUESTIONS.filter((x) => x.type !== 'riddle' && x.type !== 'chart')) {
    expect(q.options, q.id).toBeDefined();
    expect(q.options!.length, q.id).toBeGreaterThanOrEqual(2);
    expect(q.options!.length, q.id).toBeLessThanOrEqual(4);
    expect(typeof q.answer, q.id).toBe('number');
    expect(q.answer as number, q.id).toBeGreaterThanOrEqual(0);
    expect(q.answer as number, q.id).toBeLessThan(q.options!.length);
    expect(q.answerText.length, q.id).toBeGreaterThan(0);
  }
});

test('riddles carry a hint and a text answer, no options', () => {
  const riddles = QUESTIONS.filter((q) => q.type === 'riddle');
  expect(riddles).toHaveLength(12);
  for (const q of riddles) {
    expect(q.hint, q.id).toBeTruthy();
    expect(typeof q.answer, q.id).toBe('string');
    expect(q.options, q.id).toBeUndefined();
  }
});

test('optionNotes, when present, line up with the options and have something to say', () => {
  const noted = QUESTIONS.filter((q) => q.optionNotes);
  expect(noted.length).toBeGreaterThanOrEqual(30);
  for (const q of noted) {
    expect(q.optionNotes, q.id).toHaveLength(q.options!.length);
    expect(q.optionNotes![q.answer as number], q.id).toBe('');
    expect(q.optionNotes!.filter(Boolean).length, q.id).toBeGreaterThanOrEqual(2);
  }
});

test('the right answer is not given away by being the longest option', () => {
  const withOptions = QUESTIONS.filter((q) => q.options && q.options.length > 2);
  let longest = 0;
  for (const q of withOptions) {
    const lens = q.options!.map((o) => o.length);
    const right = lens[q.answer as number];
    const longestWrong = Math.max(...lens.filter((_, i) => i !== q.answer));
    if (right > longestWrong) longest++;
    // Never a giveaway: the right answer may not dwarf every wrong one.
    expect(right, `${q.id} ${q.options!.join(' | ')}`).toBeLessThanOrEqual(longestWrong * 1.35);
  }
  // Pure chance with four options is 25%: stay close to it either way, so "pick the longest" and "never the longest" both fail.
  expect(longest / withOptions.length).toBeGreaterThan(0.05);
  expect(longest / withOptions.length).toBeLessThan(0.3);
});

test('movies and celebrity options carry one media path per option', () => {
  // 2.2 and 2.6 ask about characters inside a film, so their options are words, not posters.
  for (const q of QUESTIONS.filter((x) => (x.category === 'movies' || x.category === 'celebrity') && x.options && !['2.2', '2.6'].includes(x.id))) {
    expect(q.optionMedia, q.id).toHaveLength(q.options!.length);
  }
});

test('the special records are wired', () => {
  const byId = Object.fromEntries(QUESTIONS.map((q) => [q.id, q])) as Record<string, Question>;
  expect(byId['3.3'].mustPlay).toBe(true);
  expect(byId['3.3'].story?.graphic).toBe('statue');
  expect(byId['4.9'].story?.image).toBe('img/4.9-usps-diwali-stamp.jpg');
  expect(byId['7.10'].story?.lines.length).toBeGreaterThan(0);
  expect(byId['8.10'].type).toBe('chart');
  expect(byId['8.10'].chart?.bars).toHaveLength(5);
  expect(byId['8.10'].story?.graphic).toBe('run-chart');
  expect(byId['1.S1'].story?.graphic).toBe('map-gujarat');
  expect(byId['8.5'].story?.lines.length).toBeGreaterThan(0);
  expect(byId['3.1'].media?.src).toBe('img/3.1-richmond-fan-map.jpg');
  expect(byId['3.5'].media?.src).toBe('img/3.5-richmond-skyline-fed.jpg');
  expect(byId['6.10'].type).toBe('riddle');
  expect(byId['6.10'].question).toMatch(/ukhanu/i);
  expect(byId['8.8'].question).toMatch(/\(in shooting\)/);
  expect(byId['9.2'].type).toBe('video');
  expect(byId['9.2'].video?.youtubeId).toBe('XqZsoesa55w');
  expect(byId['2.S1'].type).toBe('emoji');
  expect(byId['2.2'].answerText).toBe('Woody');
  expect(byId['2.6'].answerText).toBe('A clownfish');
  expect(byId['3.S2'].options).toEqual(['True', 'False']);
  expect(QUESTIONS.filter((q) => q.mustPlay)).toHaveLength(1);
});

test('the sourced artwork is wired in and every referenced file exists', () => {
  const byId = Object.fromEntries(QUESTIONS.map((q) => [q.id, q])) as Record<string, Question>;
  const onDisk = new Set(Object.keys(import.meta.glob('../../public/img/*.jpg')).map((k) => k.replace('../../public/', '')));
  const here = (p: string) => onDisk.has(p);
  expect(byId['4.1'].optionMedia).toEqual(['img/4.1-opt-krishna.jpg', 'img/4.1-opt-rama.jpg', 'img/4.1-opt-arjuna.jpg', 'img/4.1-opt-hanuman.jpg']);
  expect(byId['4.1'].story?.image).toBe('img/4.1-rama-return-ayodhya.jpg');
  expect(byId['4.6'].optionMedia).toHaveLength(4);
  expect(byId['4.7'].optionMedia).toHaveLength(4);
  expect(byId['3.4'].media).toBeUndefined();
  expect(byId['3.4'].story?.image).toBe('img/3.4-asiatic-lion.jpg');
  for (const id of ['1.4', '3.3', '3.7', '3.8', '4.8']) expect(byId[id].media?.src, id).toMatch(/^img\//);
  const refs = QUESTIONS.flatMap((q) => [q.media?.src, q.story?.image, ...(q.optionMedia ?? [])]).filter(Boolean) as string[];
  const sourced = refs.filter((p) => /^(img\/(1\.4|3\.[3478]|4\.[1678]))/.test(p));
  expect(sourced.length).toBeGreaterThanOrEqual(19);
  for (const p of sourced) expect(here(p), p).toBe(true);
});

test('every image a question references is on disk, except the two then-photos nobody could find', () => {
  const onDisk = new Set(Object.keys(import.meta.glob('../../public/img/*.jpg')).map((k) => k.replace('../../public/', '')));
  const refs = QUESTIONS.flatMap((q) => [q.media?.src, q.story?.image, ...(q.optionMedia ?? [])]).filter(Boolean) as string[];
  const missing = [...new Set(refs)].filter((p) => !onDisk.has(p)).sort();
  expect(missing).toEqual(['img/5.8-nooyi-then.jpg', 'img/5.9-musk-then.jpg']);
});
