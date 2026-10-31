import { EMPTY, type GameState } from './game';

export const STORAGE_KEY = 'diwali-quiz-2026';

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === 'string');
}

export function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === 'object' && parsed !== null &&
      isStringArray((parsed as GameState).used) && isStringArray((parsed as GameState).burned)
    ) {
      return { used: (parsed as GameState).used, burned: (parsed as GameState).burned };
    }
    return EMPTY;
  } catch {
    return EMPTY;
  }
}

export function saveState(s: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable (private mode); the game still runs in memory */
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
}
