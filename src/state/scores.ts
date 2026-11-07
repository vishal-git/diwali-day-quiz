import { TEAMS, type TeamId } from '../data/teams';

export interface Award {
  id: string;
  /** Question id the points were given on; 'manual' when typed with no question open. */
  qid: string;
  team: TeamId;
  points: number;
  at: number;
}

export type Ledger = Award[];

export const SCORES_KEY = 'diwali-quiz-2026-scores';
export const NO_SCORES: Ledger = [];

export function totals(ledger: Ledger): Record<TeamId, number> {
  const t = Object.fromEntries(TEAMS.map((x) => [x.id, 0])) as Record<TeamId, number>;
  for (const a of ledger) t[a.team] += a.points;
  return t;
}

export function awardsFor(ledger: Ledger, qid: string): Award[] {
  return ledger.filter((a) => a.qid === qid);
}

export function addAward(ledger: Ledger, qid: string, team: TeamId, points: number, now = Date.now()): Ledger {
  if (!Number.isFinite(points) || points === 0) return ledger;
  return [...ledger, { id: `${now}-${Math.random().toString(36).slice(2, 7)}`, qid, team, points, at: now }];
}

export function removeAward(ledger: Ledger, id: string): Ledger {
  const next = ledger.filter((a) => a.id !== id);
  return next.length === ledger.length ? ledger : next;
}

const TEAM_IDS = new Set<string>(TEAMS.map((t) => t.id));

function isAward(x: unknown): x is Award {
  if (typeof x !== 'object' || x === null) return false;
  const a = x as Record<string, unknown>;
  return typeof a.id === 'string' && typeof a.qid === 'string' && typeof a.team === 'string' && TEAM_IDS.has(a.team)
    && typeof a.points === 'number' && Number.isFinite(a.points) && typeof a.at === 'number';
}

export function loadScores(): Ledger {
  try {
    const raw = localStorage.getItem(SCORES_KEY);
    if (!raw) return NO_SCORES;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every(isAward) ? parsed : NO_SCORES;
  } catch {
    return NO_SCORES;
  }
}

export function saveScores(ledger: Ledger): void {
  try { localStorage.setItem(SCORES_KEY, JSON.stringify(ledger)); } catch { /* private mode: in memory only */ }
}

export function clearScores(): void {
  try { localStorage.removeItem(SCORES_KEY); } catch { /* ignore */ }
}
