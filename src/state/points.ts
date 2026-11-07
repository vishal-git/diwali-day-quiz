import type { Question } from '../data/types';

export interface PointsInput {
  q: Question;
  via: 'board' | 'lucky' | 'swap';
  /** Options or hint have been shown: the value halves. */
  optionsShown: boolean;
  /** Host tapped Steal: the next team plays for a flat 5. */
  steal: boolean;
  /** Host tapped ×2: Double-or-nothing was declared before the question. */
  double: boolean;
}

export interface Points {
  /** What a right answer is worth now. */
  total: number;
  /** How it was arrived at, for the small print under the number. */
  parts: string[];
  /** For Double-or-nothing: what a wrong answer costs. 0 otherwise. */
  penalty: number;
}

export const STEAL_POINTS = 5;
export const LUCKY_BONUS = 10;
export const AWAY_BONUS = 5;

/** The away side: kids answering India, adults answering US. */
export function isAwaySide(q: Question): boolean {
  return (q.mode === 'kids' && q.region === 'india') || (q.mode === 'adult' && q.region === 'us');
}

/**
 * Starting-hand scoring from the rules: 20 (40 hard), halved once options or the hint show,
 * ×1.5 on Diwali, ×2 on a declared double, +10 on a Lucky draw, +5 on the away side.
 * A steal is a flat 5 whatever the question.
 */
export function pointsFor({ q, via, optionsShown, steal, double }: PointsInput): Points {
  if (steal) return { total: STEAL_POINTS, parts: ['steal'], penalty: 0 };
  const hard = q.mode.startsWith('hard');
  let base = hard ? 40 : 20;
  const parts = [hard ? 'hard 40' : '20'];
  if (optionsShown) { base /= 2; parts.push(q.type === 'riddle' ? 'after hint ½' : 'after options ½'); }
  if (q.category === 'diwali') { base *= 1.5; parts.push('Diwali ×1.5'); }
  if (double) { base *= 2; parts.push('double ×2'); }
  let total = base;
  if (via === 'lucky') { total += LUCKY_BONUS; parts.push(`+${LUCKY_BONUS} lucky`); }
  if (isAwaySide(q)) { total += AWAY_BONUS; parts.push(`+${AWAY_BONUS} away side`); }
  return { total, parts, penalty: double ? base / 2 : 0 };
}
