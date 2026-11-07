import { render, screen, fireEvent } from '@testing-library/react';
import { Scores } from './Scores';
import { addAward, NO_SCORES, totals } from '../state/scores';

function fake(ledger = NO_SCORES) {
  return { ledger, totals: totals(ledger), award: vi.fn(), remove: vi.fn(), reset: vi.fn() };
}

test('lists every award with its question code and the running totals', () => {
  const l = addAward(addAward(NO_SCORES, '1.1', 'kids', 20, 1), '4.1', 'ladies', 30, 2);
  const s = fake(l);
  render(<Scores scores={s} />);
  expect(screen.getByText('GEO-K-US-1')).toBeInTheDocument();
  expect(screen.getByText('+30')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /remove 20 from Kids/ }));
  expect(s.remove).toHaveBeenCalledWith(l[0].id);
});

test('Reset scores asks first: No cancels, Yes resets', () => {
  const s = fake();
  render(<Scores scores={s} />);
  fireEvent.click(screen.getByRole('button', { name: /reset scores/i }));
  fireEvent.click(screen.getByRole('button', { name: /^no$/i }));
  expect(s.reset).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: /reset scores/i }));
  fireEvent.click(screen.getByRole('button', { name: /yes, reset/i }));
  expect(s.reset).toHaveBeenCalledTimes(1);
});
