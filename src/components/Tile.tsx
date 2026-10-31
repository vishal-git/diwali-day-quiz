import type { Category } from '../data/categories';
import type { CellCounts } from '../state/game';

interface Props {
  category: Category;
  counts: CellCounts;
  featured?: boolean;
  onClick: () => void;
}

export function Tile({ category, counts, featured, onClick }: Props) {
  const empty = counts.total === 0;
  return (
    <button
      className={`tile ${featured ? 'tile-featured' : ''} ${empty ? 'tile-empty' : ''}`}
      aria-disabled={empty}
      onClick={() => !empty && onClick()}
    >
      {counts.mustPlayPending && <span className="must-play" title="must-play question pending">⭐</span>}
      <span className="tile-icon" aria-hidden="true">{category.icon}</span>
      <span className="tile-name">{category.name}</span>
      {featured && <span className="tile-badge">1.5×</span>}
      <span className="tile-counts">
        Kids {counts.kids} · Adult {counts.adult} · Hard{' '}
        <span className={`flame ${counts.hardKids ? '' : 'used'}`} aria-label={counts.hardKids ? 'hard kids available' : 'used'}>🔥</span>
        <span className={`flame ${counts.hardAdult ? '' : 'used'}`} aria-label={counts.hardAdult ? 'hard adult available' : 'used'}>🔥</span>
      </span>
    </button>
  );
}
