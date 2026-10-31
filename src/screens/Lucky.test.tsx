import { render, screen, act } from '@testing-library/react';
import { Lucky } from './Lucky';
import { QUESTIONS } from '../data/questions';
import { mulberry32 } from '../state/rng';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

test('spins for the duration then lands once on a pool member', () => {
  const onLand = vi.fn();
  const pool = QUESTIONS.filter((q) => q.live).slice(0, 10);
  render(<Lucky pool={pool} rng={mulberry32(314)} onLand={onLand} durationMs={1000} />);
  expect(screen.getByText(/Lucky Diya/)).toBeInTheDocument();
  act(() => { vi.advanceTimersByTime(900); });
  expect(onLand).not.toHaveBeenCalled();
  act(() => { vi.advanceTimersByTime(600); });
  expect(onLand).toHaveBeenCalledTimes(1);
  expect(pool).toContain(onLand.mock.calls[0][0]);
});

test('seed 314 gives a deterministic draw', () => {
  const onLand = vi.fn();
  const pool = QUESTIONS.filter((q) => q.live);
  render(<Lucky pool={pool} rng={mulberry32(314)} onLand={onLand} durationMs={500} />);
  act(() => { vi.advanceTimersByTime(1200); });
  const expected = pool[Math.floor(mulberry32(314)() * pool.length)];
  expect(onLand).toHaveBeenCalledWith(expected);
});

test('the icon shown changes while spinning', () => {
  render(<Lucky pool={QUESTIONS.filter((q) => q.live)} rng={mulberry32(314)} onLand={() => {}} durationMs={2000} />);
  const first = screen.getByTestId('spin-icon').textContent;
  act(() => { vi.advanceTimersByTime(300); });
  expect(screen.getByTestId('spin-icon').textContent).not.toBe(first);
});
