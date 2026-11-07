import { QUESTIONS, QUESTION_BY_ID } from './questions';

const code = (id: string) => QUESTION_BY_ID[id].code;

test('codes read CATEGORY-MODE-SCOPE-N: scope is US/IN, H for hard, S for spare', () => {
  expect(code('1.1')).toBe('GEO-K-US-1');
  expect(code('1.2')).toBe('GEO-K-US-2');
  expect(code('1.3')).toBe('GEO-K-IN-1');
  expect(code('1.6')).toBe('GEO-A-US-2');
  expect(code('1.9')).toBe('GEO-K-H-1');
  expect(code('1.10')).toBe('GEO-A-H-1');
  expect(code('1.S1')).toBe('GEO-K-S-1');
  expect(code('1.S2')).toBe('GEO-A-S-1');
  expect(code('4.9')).toBe('DIW-A-US-1');
  expect(code('8.10')).toBe('SPO-A-H-1');
  expect(code('9.S2')).toBe('GRW-A-S-1');
  expect(code('3.S3')).toBe('LOC-A-S-1');
  // riddles have no sides, so no scope
  expect(code('6.1')).toBe('RID-K-1');
  expect(code('6.5')).toBe('RID-A-1');
  expect(code('6.9')).toBe('RID-K-H-1');
  expect(code('6.S1')).toBe('RID-K-S-1');
});

test('codes are unique and every question can be found by code as well as id', () => {
  const codes = QUESTIONS.map((q) => q.code);
  expect(new Set(codes).size).toBe(QUESTIONS.length);
  expect(QUESTION_BY_ID['GEO-K-US-1'].id).toBe('1.1');
});
