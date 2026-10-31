import data from './questions.json';
import type { Question } from './types';

export const QUESTIONS = data as Question[];
export const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q])) as Record<string, Question>;
