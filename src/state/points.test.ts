import { QUESTION_BY_ID } from '../data/questions';
import { pointsFor } from './points';

const q = (id: string) => QUESTION_BY_ID[id];
const base = { via: 'board' as const, optionsShown: false, steal: false, double: false };

test('20 for kids/adult, 40 for hard, halved once options or the hint show', () => {
  expect(pointsFor({ ...base, q: q('1.1') }).total).toBe(20);
  expect(pointsFor({ ...base, q: q('1.1'), optionsShown: true }).total).toBe(10);
  expect(pointsFor({ ...base, q: q('1.10') }).total).toBe(40);
  expect(pointsFor({ ...base, q: q('1.10'), optionsShown: true }).total).toBe(20);
  expect(pointsFor({ ...base, q: q('6.9'), optionsShown: true }).parts).toContain('after hint ½');
});

test('Diwali is ×1.5, Lucky adds 10, the away side adds 5', () => {
  expect(pointsFor({ ...base, q: q('4.1') }).total).toBe(35); // 20 × 1.5, kids · India is the away side
  expect(pointsFor({ ...base, q: q('4.9') }).total).toBe(35); // adult · US likewise
  expect(pointsFor({ ...base, q: q('4.11'), optionsShown: true }).total).toBe(30);
  expect(pointsFor({ ...base, q: q('1.1'), via: 'lucky' }).total).toBe(30);
  expect(pointsFor({ ...base, q: q('1.3'), via: 'lucky' }).total).toBe(35); // kids · India, lucky
  expect(pointsFor({ ...base, q: q('1.4') }).total).toBe(25); // kids · India
  expect(pointsFor({ ...base, q: q('1.5') }).total).toBe(25); // adult · US
  expect(pointsFor({ ...base, q: q('1.1') }).total).toBe(20); // kids · US, home side
  expect(pointsFor({ ...base, q: q('6.1') }).total).toBe(20); // riddles have no sides
});

test('a steal is a flat 5 whatever the question; a double doubles the base and names the penalty', () => {
  expect(pointsFor({ ...base, q: q('4.11'), steal: true })).toEqual({ total: 5, parts: ['steal'], penalty: 0 });
  const d = pointsFor({ ...base, q: q('1.1'), double: true });
  expect(d.total).toBe(40);
  expect(d.penalty).toBe(20);
  expect(pointsFor({ ...base, q: q('1.1'), double: true, optionsShown: true }).total).toBe(20);
  expect(pointsFor({ ...base, q: q('1.4'), double: true, via: 'lucky' }).total).toBe(55); // 40 + 10 lucky + 5 away
});
