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
  fireEvent.click(screen.getByRole('button', { name: /^Hard \d/ }));
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
  expect(us).toHaveTextContent('0 left');
  expect(screen.getByRole('button', { name: /^India/ })).toHaveTextContent('2 left');
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
