import { useMemo } from 'react';
import { mulberry32, SEED } from '../state/rng';

const COLOURS = ['#ffd166', '#f4a300', '#e0409a', '#fff4e0', '#ff7a1a', '#7fd1ff'];

interface Particle { dx: string; dy: string; c: string; d: string }
interface Burst { x: string; y: string; d: string; particles: Particle[] }

/** A one-shot burst of CSS particles over the whole screen. Layout is seeded so every run looks the same. */
export function Fireworks({ bursts = 7, perBurst = 18 }: { bursts?: number; perBurst?: number }) {
  const layout = useMemo<Burst[]>(() => {
    const rng = mulberry32(SEED);
    return Array.from({ length: bursts }, (_, b) => {
      const delay = b * 180 + rng() * 120;
      const colour = COLOURS[Math.floor(rng() * COLOURS.length)];
      return {
        x: `${12 + rng() * 76}%`,
        y: `${12 + rng() * 50}%`,
        d: `${Math.round(delay)}ms`,
        particles: Array.from({ length: perBurst }, (_, i) => {
          const a = (i / perBurst) * Math.PI * 2 + (rng() - 0.5) * 0.3;
          const r = 9 + rng() * 9;
          return {
            dx: `${(Math.cos(a) * r).toFixed(2)}vmin`,
            dy: `${(Math.sin(a) * r + 3).toFixed(2)}vmin`,
            c: rng() < 0.75 ? colour : COLOURS[Math.floor(rng() * COLOURS.length)],
            d: `${Math.round(delay + rng() * 60)}ms`,
          };
        }),
      };
    });
  }, [bursts, perBurst]);

  return (
    <div className="fireworks" aria-hidden="true">
      {layout.map((b, k) => (
        <div key={k} className="burst" style={{ left: b.x, top: b.y, ['--d' as string]: b.d } as React.CSSProperties}>
          <i className="flash" />
          {b.particles.map((p, i) => (
            <i
              key={i}
              className="particle"
              style={{ ['--dx' as string]: p.dx, ['--dy' as string]: p.dy, ['--c' as string]: p.c, ['--d' as string]: p.d } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
