import { render, screen, fireEvent } from '@testing-library/react';
import { Pick } from './Pick';
import { QUESTIONS } from '../data/questions';
import { EMPTY, markUsed } from '../state/game';

test('Kids then US picks the cell', () => {
  const onPick = vi.fn();
  render(<Pick questions={QUESTIONS} state={EMPTY} category="geography" onPick={onPick} onBack={() => {}} />);
  expect(screen.queryByRole('button', { name: /^US/ })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /^Kids/ }));
  fireEvent.click(screen.getByRole('button', { name: /^US/ }));
  expect(onPick).toHaveBeenCalledWith({ category: 'geography', mode: 'kids', region: 'us' });
});

test('Hard shows the two flavours and no region', () => {
  const onPick = vi.fn();
  render(<Pick questions={QUESTIONS} state={EMPTY} category="sports" onPick={onPick} onBack={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: /^Hard/ }));
  expect(screen.queryByRole('button', { name: /^US/ })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /Hard·Adult/ }));
  expect(onPick).toHaveBeenCalledWith({ category: 'sports', mode: 'hard-adult', region: null });
});

test('a cell with nothing left is disabled and says so', () => {
  const s = markUsed(markUsed(EMPTY, '1.1'), '1.2');
  render(<Pick questions={QUESTIONS} state={s} category="geography" onPick={() => {}} onBack={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: /^Kids/ }));
  const us = screen.getByRole('button', { name: /^US/ });
  expect(us).toBeDisabled();
  expect(us.querySelectorAll('.pip-kids.used')).toHaveLength(2);
  expect(us.querySelectorAll('.pip-kids:not(.used)')).toHaveLength(0);
  expect(screen.getByRole('button', { name: /^India/ }).querySelectorAll('.pip-kids:not(.used)')).toHaveLength(2);
  expect(us).not.toHaveTextContent(/left/);
});

test('mode buttons show pips, not a count', () => {
  render(<Pick questions={QUESTIONS} state={markUsed(EMPTY, '1.9')} category="geography" onPick={() => {}} onBack={() => {}} />);
  const kids = screen.getByRole('button', { name: /^Kids/ });
  expect(kids.querySelectorAll('.pip-kids')).toHaveLength(4);
  expect(kids).not.toHaveTextContent(/\d left/);
  const hard = screen.getByRole('button', { name: /^Hard/ });
  expect(hard.querySelectorAll('.pip-hard')).toHaveLength(2);
  expect(hard.querySelectorAll('.pip-hard.used')).toHaveLength(1);
});

test('Which side shows flags without repeating the category flavour; the header breadcrumbs the mode', () => {
  render(<Pick questions={QUESTIONS} state={EMPTY} category="movies" onPick={() => {}} onBack={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: /^Adult/ }));
  const us = screen.getByRole('button', { name: /^US/ });
  expect(us.querySelector('.flag-us')).not.toBeNull();
  expect(screen.getByRole('button', { name: /^India/ }).querySelector('.flag-india')).not.toBeNull();
  expect(screen.queryByText(/Hollywood/)).toBeNull();
  expect(screen.queryByText(/Bollywood/)).toBeNull();
  expect(screen.getByText(/Movies & TV › Adult/)).toBeInTheDocument();
});

test('Diwali has no US kids cell, so US is disabled under Kids', () => {
  render(<Pick questions={QUESTIONS} state={EMPTY} category="diwali" onPick={() => {}} onBack={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: /^Kids/ }));
  expect(screen.getByRole('button', { name: /^US/ })).toBeDisabled();
});

test('Back returns to the board', () => {
  const onBack = vi.fn();
  render(<Pick questions={QUESTIONS} state={EMPTY} category="food" onPick={() => {}} onBack={onBack} />);
  fireEvent.click(screen.getByRole('button', { name: /back/i }));
  expect(onBack).toHaveBeenCalled();
});
