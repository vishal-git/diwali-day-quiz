import type { CategoryId } from './types';

export interface Category { id: CategoryId; name: string; icon: string; us: string; india: string; /** false: no US/India step; kids and adult questions are one pool. */ sides?: boolean }

export const CATEGORIES: Category[] = [
  { id: 'geography', name: 'Geography', icon: '🌍', us: 'states, rivers', india: 'states, cities' },
  { id: 'movies', name: 'Movies & TV', icon: '🎬', us: 'Hollywood', india: 'Bollywood' },
  { id: 'local', name: 'Local', icon: '🏛️', us: 'Richmond & Virginia', india: 'Gujarat & Mumbai' },
  { id: 'diwali', name: 'Diwali', icon: '🪔', us: 'Diwali in America', india: 'Diwali at home' },
  { id: 'celebrity', name: 'Celebrity Then & Now', icon: '⭐', us: 'US', india: 'India' },
  { id: 'riddles', name: 'Riddles & Ukhana', icon: '🧩', us: 'English riddles and Gujarati/Hindi ukhana, one pool', india: 'English riddles and Gujarati/Hindi ukhana, one pool', sides: false },
  { id: 'food', name: 'Food', icon: '🍛', us: 'American', india: 'Gujarati / Mumbai / Indian' },
  { id: 'sports', name: 'Sports', icon: '🏏', us: 'NFL, tennis, soccer', india: 'cricket, athletics, badminton' },
  { id: 'growing-up', name: 'Growing Up', icon: '📼', us: 'Kids: 2010s–20s, one pool · Adults: America', india: 'Adults: 80s–90s India' },
];

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<CategoryId, Category>;

export const LUCKY = { name: 'Lucky Diya', icon: '🎲' };

/** Final round, played off-board. Shown only on the host answers sheet. */
export const FINAL_QUESTION = {
  id: 'FINAL',
  question: 'Gujarati families say "Saal Mubarak" on the morning after Diwali. Which Vikram Samvat year begins on Monday, Nov 9, 2026?',
  options: ['2081', '2082', '2083', '2084'],
  answer: 2,
  answerText: 'Vikram Samvat 2083',
};
