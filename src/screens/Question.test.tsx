import { render, screen, fireEvent } from '@testing-library/react';
import { Question } from './Question';
import { QUESTION_BY_ID } from '../data/questions';

function setup(id: string, over: Partial<React.ComponentProps<typeof Question>> = {}) {
  const props = {
    q: QUESTION_BY_ID[id], via: 'board' as const, canSwap: true,
    onDone: vi.fn(), onPass: vi.fn(), onSwap: vi.fn(), onAbandon: vi.fn(), ...over,
  };
  const utils = render(<Question {...props} />);
  const root = utils.container.querySelector('.question')!;
  return { ...utils, props, root, advance: () => fireEvent.click(root) };
}

test('stage 0 shows the question text only', () => {
  setup('1.1');
  expect(screen.getByText(/second-largest by area/)).toBeInTheDocument();
  expect(screen.queryByText('Texas')).toBeNull();
  expect(screen.getByText('Geography')).toBeInTheDocument();
  expect(screen.getByText('Kids · US')).toBeInTheDocument();
});

test('click → options; click → answer highlighted with reveal; click → done (no story)', () => {
  const { props, advance } = setup('1.1');
  advance();
  expect(screen.getByText('Texas')).toBeInTheDocument();
  expect(document.querySelector('.option.correct')).toBeNull();
  advance();
  expect(document.querySelector('.option.correct')).toHaveTextContent('Texas');
  expect(document.querySelectorAll('.option.dim')).toHaveLength(3);
  expect(screen.getByText(/Alaska 665,000/)).toBeInTheDocument();
  expect(props.onDone).not.toHaveBeenCalled();
  advance();
  expect(props.onDone).toHaveBeenCalledWith('1.1');
});

test('Space and ArrowRight advance; Backspace and ArrowLeft step back', () => {
  setup('1.1');
  fireEvent.keyDown(window, { key: ' ' });
  expect(screen.getByText('Texas')).toBeInTheDocument();
  fireEvent.keyDown(window, { key: 'Backspace' });
  expect(screen.queryByText('Texas')).toBeNull();
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(screen.queryByText('Texas')).toBeNull();
});

test('a question with a story page needs one more click before done', () => {
  const { props, advance } = setup('3.3');
  advance(); advance();
  expect(document.querySelector('.option.correct')).toHaveTextContent('Sardar');
  advance();
  expect(screen.getByText(/How tall is 182 metres/)).toBeInTheDocument();
  expect(props.onDone).not.toHaveBeenCalled();
  advance();
  expect(props.onDone).toHaveBeenCalledWith('3.3');
});

test('Escape abandons without consuming', () => {
  const { props } = setup('1.1');
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(props.onAbandon).toHaveBeenCalled();
  expect(props.onDone).not.toHaveBeenCalled();
});

test('host buttons do not advance the stage', () => {
  const { props } = setup('1.1');
  fireEvent.click(screen.getByRole('button', { name: /swap/i }));
  expect(props.onSwap).toHaveBeenCalledWith('1.1');
  expect(screen.queryByText('Texas')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /pass/i }));
  expect(props.onPass).toHaveBeenCalledWith('1.1');
  expect(screen.queryByText('Texas')).toBeNull();
});

test('Swap is disabled with "no spares" when none remain', () => {
  setup('4.1', { canSwap: false });
  const swap = screen.getByRole('button', { name: /swap/i });
  expect(swap).toBeDisabled();
  expect(swap).toHaveTextContent(/no spares/i);
});

test('riddles show a hint card instead of options, then the text answer', () => {
  const { advance } = setup('6.1');
  advance();
  expect(screen.getByText(/related to music/)).toBeInTheDocument();
  expect(document.querySelectorAll('.option')).toHaveLength(0);
  advance();
  expect(screen.getByText('A piano')).toBeInTheDocument();
});

test('movie options render poster cards; celebrity options render face cards', () => {
  const { advance, unmount } = setup('2.1');
  advance();
  expect(document.querySelectorAll('.option img, .option .img-placeholder')).toHaveLength(4);
  expect(screen.getByText('Toy Story 5')).toBeInTheDocument();
  unmount();
  const s2 = setup('5.4');
  expect(screen.getByRole('img', { name: /schoolboy/i })).toBeInTheDocument();
  s2.advance();
  expect(screen.getByText('Virat Kohli')).toBeInTheDocument();
});

test('chart question renders hidden letters, then names on the answer stage', () => {
  const { advance } = setup('8.10');
  const chart = () => document.querySelector('.run-chart')!.textContent;
  expect(chart()).not.toMatch(/Tendulkar/);
  expect(screen.getByText('B')).toBeInTheDocument();
  advance(); advance();
  expect(chart()).toMatch(/Sachin Tendulkar/);
  expect(chart()).toMatch(/34,357/);
});

test('lucky draws show the lucky chip', () => {
  setup('8.10', { via: 'lucky' });
  expect(screen.getByText(/Lucky Diya — Sports · Hard·Adult/)).toBeInTheDocument();
});

test('video question embeds YouTube with autoplay off', () => {
  setup('9.2');
  const frame = document.querySelector('iframe')!;
  expect(frame.getAttribute('src')).toContain('XqZsoesa55w');
  expect(frame.getAttribute('src')).toContain('autoplay=0');
});
