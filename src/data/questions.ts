import data from './questions.json';
import { CATEGORY_CODE, type Question } from './types';

type Raw = Omit<Question, 'code'>;

/** CATEGORY-MODE-SCOPE-N: mode is K or A; scope is US/IN, H for a hard question, S for a spare. N counts within that group in bank order. */
export function assignCodes(raw: Raw[]): Question[] {
  const seen = new Map<string, number>();
  return raw.map((q) => {
    const mode = q.mode.endsWith('kids') ? 'K' : 'A';
    const scope = !q.live ? 'S' : q.mode.startsWith('hard') ? 'H' : q.region === 'us' ? 'US' : 'IN';
    const prefix = `${CATEGORY_CODE[q.category]}-${mode}-${scope}`;
    const n = (seen.get(prefix) ?? 0) + 1;
    seen.set(prefix, n);
    return { ...q, code: `${prefix}-${n}` };
  });
}

export const QUESTIONS: Question[] = assignCodes(data as Raw[]);
/** Indexed by bank id (1.1) and by code (GEO-K-US-1). */
export const QUESTION_BY_ID = Object.fromEntries(
  QUESTIONS.flatMap((q) => [[q.id, q], [q.code, q]]),
) as Record<string, Question>;
