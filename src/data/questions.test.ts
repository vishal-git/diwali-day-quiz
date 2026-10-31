import { QUESTIONS } from './questions';
import { CATEGORIES } from './categories';
import type { Question, CategoryId, Mode, Region } from './types';

const live = QUESTIONS.filter((q) => q.live);
const spares = QUESTIONS.filter((q) => !q.live);

function count(category: CategoryId, mode: Mode, region: Region) {
  return live.filter((q) => q.category === category && q.mode === mode && q.region === region).length;
}

test('bank totals match the v7 bank: 110 questions, 91 live, 19 spares', () => {
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

test('movies and celebrity options carry one media path per option', () => {
  for (const q of QUESTIONS.filter((x) => (x.category === 'movies' || x.category === 'celebrity') && x.options)) {
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
  expect(byId['9.2'].type).toBe('video');
  expect(byId['9.2'].video?.youtubeId).toBe('XqZsoesa55w');
  expect(byId['2.2'].type).toBe('emoji');
  expect(byId['3.S2'].options).toEqual(['True', 'False']);
  expect(QUESTIONS.filter((q) => q.mustPlay)).toHaveLength(1);
});
