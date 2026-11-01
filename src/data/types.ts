export type Mode = 'kids' | 'adult' | 'hard-kids' | 'hard-adult';
export type Region = 'us' | 'india' | null;
export type CategoryId =
  | 'geography' | 'movies' | 'local' | 'diwali' | 'celebrity'
  | 'riddles' | 'food' | 'sports' | 'growing-up';
export type QType = 'text' | 'emoji' | 'image' | 'riddle' | 'chart' | 'video' | 'map';

export interface Media { src: string; alt: string }

export interface Story {
  title: string;
  image?: string;
  graphic?: 'statue' | 'map-gujarat' | 'run-chart';
  lines: string[];
}

export interface Question {
  id: string;
  /** Host-facing code, derived at load: CATEGORY-MODE-SCOPE-N, e.g. GEO-K-US-1, DIW-A-H-1, LOC-A-S-2. */
  code: string;
  category: CategoryId;
  mode: Mode;
  region: Region;
  live: boolean;
  type: QType;
  question: string;
  media?: Media;
  options?: string[];
  optionMedia?: string[];
  hint?: string;
  answer: number | string;
  answerText: string;
  reveal?: string;
  story?: Story;
  mustPlay?: boolean;
  video?: { youtubeId: string; start: number };
  chart?: { bars: { label: string; value: number }[]; unit?: string };
}

export const CATEGORY_CODE: Record<CategoryId, string> = {
  geography: 'GEO', movies: 'MOV', local: 'LOC', diwali: 'DIW', celebrity: 'CEL',
  riddles: 'RID', food: 'FOO', sports: 'SPO', 'growing-up': 'GRW',
};

export interface Cell { category: CategoryId; mode: Mode; region: Region }

export const MODE_LABEL: Record<Mode, string> = {
  kids: 'Kids', adult: 'Adult', 'hard-kids': 'Hard·Kids', 'hard-adult': 'Hard·Adult',
};
export const REGION_LABEL = { us: 'US', india: 'India' } as const;

export function cellLabel(mode: Mode, region: Region): string {
  return region ? `${MODE_LABEL[mode]} · ${REGION_LABEL[region]}` : MODE_LABEL[mode];
}
