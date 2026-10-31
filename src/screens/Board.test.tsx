import { render, screen, fireEvent } from '@testing-library/react';
import { Board } from './Board';
import { QUESTIONS } from '../data/questions';
import { EMPTY, markUsed } from '../state/game';

const noop = () => {};

test('renders ten tiles: nine categories and Lucky Diya', () => {
  render(<Board questions={QUESTIONS} state={EMPTY} onPickCategory={noop} onLucky={noop} onReset={noop} />);
  expect(screen.getAllByRole('button', { name: /·|Lucky/ })).toHaveLength(10);
  expect(screen.getByRole('button', { name: /Geography/ })).toHaveTextContent('Kids 4 · Adult 4');
});

test('an exhausted category tile is disabled', () => {
  const s = QUESTIONS.filter((q) => q.category === 'geography').reduce((acc, q) => markUsed(acc, q.id), EMPTY);
  render(<Board questions={QUESTIONS} state={s} onPickCategory={noop} onLucky={noop} onReset={noop} />);
  expect(screen.getByRole('button', { name: /Geography/ })).toHaveAttribute('aria-disabled', 'true');
});

test('clicking a category reports its id', () => {
  const onPick = vi.fn();
  render(<Board questions={QUESTIONS} state={EMPTY} onPickCategory={onPick} onLucky={noop} onReset={noop} />);
  fireEvent.click(screen.getByRole('button', { name: /Food/ }));
  expect(onPick).toHaveBeenCalledWith('food');
});

test('Lucky tile is disabled when nothing live remains', () => {
  const s = { used: QUESTIONS.filter((q) => q.live).map((q) => q.id), burned: [] };
  render(<Board questions={QUESTIONS} state={s} onPickCategory={noop} onLucky={noop} onReset={noop} />);
  expect(screen.getByRole('button', { name: /Lucky Diya/ })).toHaveAttribute('aria-disabled', 'true');
});

test('the hard flames reflect used hard questions', () => {
  render(<Board questions={QUESTIONS} state={markUsed(EMPTY, '1.9')} onPickCategory={noop} onLucky={noop} onReset={noop} />);
  const geo = screen.getByRole('button', { name: /Geography/ });
  expect(geo.querySelectorAll('.flame.used')).toHaveLength(1);
  expect(geo.querySelectorAll('.flame')).toHaveLength(2);
});

test('must-play star shows until 3.3 is played', () => {
  const { rerender } = render(<Board questions={QUESTIONS} state={EMPTY} onPickCategory={noop} onLucky={noop} onReset={noop} />);
  expect(screen.getByRole('button', { name: /Local/ }).querySelector('.must-play')).not.toBeNull();
  rerender(<Board questions={QUESTIONS} state={markUsed(EMPTY, '3.3')} onPickCategory={noop} onLucky={noop} onReset={noop} />);
  expect(screen.getByRole('button', { name: /Local/ }).querySelector('.must-play')).toBeNull();
});

test('Reset asks for confirmation before resetting', () => {
  const onReset = vi.fn();
  const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
  render(<Board questions={QUESTIONS} state={markUsed(EMPTY, '1.1')} onPickCategory={noop} onLucky={noop} onReset={onReset} />);
  fireEvent.click(screen.getByRole('button', { name: /reset game/i }));
  expect(onReset).not.toHaveBeenCalled();
  confirm.mockReturnValue(true);
  fireEvent.click(screen.getByRole('button', { name: /reset game/i }));
  expect(onReset).toHaveBeenCalledTimes(1);
  expect(screen.getByText(/questions played: 1/i)).toBeInTheDocument();
});
