export type TeamId = 'kids' | 'gents' | 'ladies';

export interface Team { id: TeamId; name: string }

export const TEAMS: readonly Team[] = [
  { id: 'kids', name: 'Kids' },
  { id: 'gents', name: 'Gentlemen' },
  { id: 'ladies', name: 'Ladies' },
];

export const TEAM_BY_ID = Object.fromEntries(TEAMS.map((t) => [t.id, t])) as Record<TeamId, Team>;
