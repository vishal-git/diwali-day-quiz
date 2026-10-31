import { loadState, saveState, clearState, STORAGE_KEY } from './storage';
import { EMPTY } from './game';

beforeEach(() => localStorage.clear());

test('empty storage loads EMPTY', () => {
  expect(loadState()).toEqual(EMPTY);
});

test('round-trips a saved state', () => {
  saveState({ used: ['1.1', '2.2'], burned: ['1.S1'] });
  expect(loadState()).toEqual({ used: ['1.1', '2.2'], burned: ['1.S1'] });
});

test('garbage in storage falls back to EMPTY', () => {
  localStorage.setItem(STORAGE_KEY, 'not json');
  expect(loadState()).toEqual(EMPTY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ used: 'x' }));
  expect(loadState()).toEqual(EMPTY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ used: ['1.1', 7], burned: [] }));
  expect(loadState()).toEqual(EMPTY);
});

test('clearState removes the key', () => {
  saveState({ used: ['1.1'], burned: [] });
  clearState();
  expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
});
