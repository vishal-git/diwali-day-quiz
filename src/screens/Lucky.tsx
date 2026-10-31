import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../data/categories';
import type { Question } from '../data/types';
import { pick } from '../state/rng';

interface Props {
  pool: Question[];
  rng: () => number;
  onLand: (q: Question) => void;
  durationMs?: number;
}

/** Flame roulette: cycles the category icons, slowing to a stop, then lands on a random live question. */
export function Lucky({ pool, rng, onLand, durationMs = 2200 }: Props) {
  const [idx, setIdx] = useState(0);
  const landed = useRef(false);

  useEffect(() => {
    let step = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      if (elapsed >= durationMs) {
        if (!landed.current) {
          landed.current = true;
          const q = pick(pool, rng);
          // brief pause on the final icon before the question appears
          timer = setTimeout(() => q && onLand(q), 350);
        }
        return;
      }
      step += 1;
      setIdx(step % CATEGORIES.length);
      // ease-out: 70ms at the start, ~300ms near the end
      const t = elapsed / durationMs;
      const delay = 70 + 230 * t * t;
      timer = setTimeout(tick, Math.max(1, Math.min(delay, durationMs - elapsed)));
    };
    timer = setTimeout(tick, 70);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cat = CATEGORIES[idx];
  return (
    <section className="lucky">
      <p className="lucky-title">🪔 Lucky Diya</p>
      <div className="lucky-wheel">
        <span className="lucky-icon" data-testid="spin-icon" key={idx}>{cat.icon}</span>
      </div>
      <p className="lucky-cat">{cat.name}</p>
    </section>
  );
}
