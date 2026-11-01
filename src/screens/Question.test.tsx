import { render, screen, fireEvent } from '@testing-library/react';
import { Question } from './Question';
import { QUESTION_BY_ID } from '../data/questions';

// A mocked clock: each helper advance() steps 1s so the double-click guard sees distinct clicks.
let clock = 0;
beforeEach(() => { clock = 100_000; vi.spyOn(Date, 'now').mockImplementation(() => clock); });
afterEach(() => vi.restoreAllMocks());
const tick = (ms = 1000) => { clock += ms; };

function setup(id: string, over: Partial<React.ComponentProps<typeof Question>> = {}) {
  const props = {
    q: QUESTION_BY_ID[id], via: 'board' as const, canSwap: true,
    onDone: vi.fn(), onPass: vi.fn(), onSwap: vi.fn(), onAbandon: vi.fn(), ...over,
  };
  const utils = render(<Question {...props} />);
  const root = utils.container.querySelector('.question')!;
  return { ...utils, props, root, advance: () => { tick(); fireEvent.click(root); }, rawClick: () => fireEvent.click(root) };
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
  tick(); fireEvent.keyDown(window, { key: ' ' });
  expect(screen.getByText('Texas')).toBeInTheDocument();
  tick(); fireEvent.keyDown(window, { key: 'Backspace' });
  expect(screen.queryByText('Texas')).toBeNull();
  tick(); fireEvent.keyDown(window, { key: 'ArrowRight' });
  tick(); fireEvent.keyDown(window, { key: 'ArrowLeft' });
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
  expect(chart()).toMatch(/Tendulkar/);
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

test('a double-click advances only one stage', () => {
  const { props, advance, rawClick } = setup('1.1');
  advance(); rawClick();
  expect(screen.getByText('Texas')).toBeInTheDocument();
  expect(document.querySelector('.option.correct')).toBeNull();
  tick(400);
  rawClick();
  expect(document.querySelector('.option.correct')).not.toBeNull();
  expect(props.onDone).not.toHaveBeenCalled();
});

test('a question with neither options nor hint skips the options stage', () => {
  const { advance } = setup('8.10');
  advance();
  expect(document.querySelector('.run-chart')!.textContent).toMatch(/Tendulkar/);
  expect(document.querySelectorAll('.stage-dots i')).toHaveLength(3);
});

test('Swap and Pass lock once the options or hint have been shown, and stay locked after stepping back', () => {
  const { advance } = setup('1.1');
  const swap = () => screen.getByRole('button', { name: /swap/i });
  const pass = () => screen.getByRole('button', { name: /pass/i });
  expect(swap()).toBeEnabled();
  expect(pass()).toBeEnabled();
  advance();
  expect(swap()).toBeDisabled();
  expect(pass()).toBeDisabled();
  tick(); fireEvent.keyDown(window, { key: 'Backspace' });
  expect(screen.queryByText('Texas')).toBeNull();
  expect(swap()).toBeDisabled();
  expect(pass()).toBeDisabled();
});

test('the hint locks Swap and Pass on a riddle too', () => {
  const { advance } = setup('6.1');
  advance();
  expect(screen.getByRole('button', { name: /swap/i })).toBeDisabled();
  expect(screen.getByRole('button', { name: /pass/i })).toBeDisabled();
});

const option = (text: string) => screen.getByText(text).closest('.option')!;

test('picking a wrong option greys it out without revealing the right one or advancing', () => {
  const { props, advance } = setup('1.1');
  advance();
  tick(); fireEvent.click(option('California'));
  expect(option('California')).toHaveClass('wrong');
  expect(option('California').querySelector('.snuff')).not.toBeNull();
  expect(document.querySelector('.option.correct')).toBeNull();
  expect(screen.queryByText(/Alaska 665,000/)).toBeNull();
  expect(props.onDone).not.toHaveBeenCalled();
  tick(); fireEvent.click(option('Montana'));
  expect(document.querySelectorAll('.option.wrong')).toHaveLength(2);
  expect(document.querySelector('.option.correct')).toBeNull();
});

test('picking the right option reveals the answer with fireworks; wrong picks stay grey', () => {
  const { props, advance } = setup('1.1');
  advance();
  tick(); fireEvent.click(option('California'));
  tick(); fireEvent.click(option('Texas'));
  expect(option('Texas')).toHaveClass('correct');
  expect(option('Texas')).toHaveClass('celebrate');
  expect(option('California')).toHaveClass('wrong');
  expect(document.querySelector('.fireworks')).not.toBeNull();
  expect(screen.getByText(/Alaska 665,000/)).toBeInTheDocument();
  expect(props.onDone).not.toHaveBeenCalled();
  advance();
  expect(props.onDone).toHaveBeenCalledWith('1.1');
});

test('a correct pick cannot be finished by the same double-click', () => {
  const { props, advance, rawClick } = setup('1.1');
  advance();
  tick(); fireEvent.click(option('Texas'));
  rawClick();
  expect(props.onDone).not.toHaveBeenCalled();
});

test('revealing by clicking through (nobody answered) has no fireworks', () => {
  const { advance } = setup('1.1');
  advance(); advance();
  expect(document.querySelector('.option.correct')).not.toBeNull();
  expect(document.querySelector('.option.celebrate')).toBeNull();
  expect(document.querySelector('.fireworks')).toBeNull();
});

test('keys A–D and 1–4 pick an option during the options stage only', () => {
  const { advance } = setup('1.1');
  tick(); fireEvent.keyDown(window, { key: 'b' });
  expect(document.querySelector('.option.wrong')).toBeNull();
  advance();
  tick(); fireEvent.keyDown(window, { key: 'b' });
  expect(document.querySelectorAll('.option')[1]).toHaveClass('wrong');
  tick(); fireEvent.keyDown(window, { key: '3' });
  expect(document.querySelectorAll('.option')[2]).toHaveClass('wrong');
  expect(document.querySelector('.option.correct')).toBeNull();
});

test('the header shows the question code for the host', () => {
  setup('1.1');
  expect(screen.getByText('GEO-K-US-1')).toBeInTheDocument();
});

test('a question with media but a text type still shows the picture', () => {
  const q = { ...QUESTION_BY_ID['1.4'], media: { src: 'img/1.4-himalayas.jpg', alt: 'Mountains' } };
  render(<Question q={q} via="board" canSwap onDone={vi.fn()} onPass={vi.fn()} onSwap={vi.fn()} onAbandon={vi.fn()} />);
  expect(screen.getByRole('img', { name: 'Mountains' })).toBeInTheDocument();
});

test('any category with option pictures renders them as art cards', () => {
  const q = { ...QUESTION_BY_ID['4.1'], optionMedia: ['img/a.jpg', 'img/b.jpg', 'img/c.jpg', 'img/d.jpg'] };
  render(<Question q={q} via="board" canSwap onDone={vi.fn()} onPass={vi.fn()} onSwap={vi.fn()} onAbandon={vi.fn()} />);
  tick(); fireEvent.click(document.querySelector('.question')!);
  expect(document.querySelectorAll('.option .art, .option .img-placeholder.art')).toHaveLength(4);
});
