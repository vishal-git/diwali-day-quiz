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
  expect(screen.getByText(/capital of New York/)).toBeInTheDocument();
  expect(screen.queryByText('Albany')).toBeNull();
  expect(screen.getByText('Geography')).toBeInTheDocument();
  expect(screen.getByText('Kids · US')).toBeInTheDocument();
});

test('click → options; click → answer highlighted with reveal; click → done (no story)', () => {
  const { props, advance } = setup('1.1');
  advance();
  expect(screen.getByText('Albany')).toBeInTheDocument();
  expect(document.querySelector('.option.correct')).toBeNull();
  advance();
  expect(document.querySelector('.option.correct')).toHaveTextContent('Albany');
  expect(document.querySelectorAll('.option.dim')).toHaveLength(3);
  expect(screen.getByText(/capital since 1797/)).toBeInTheDocument();
  expect(props.onDone).not.toHaveBeenCalled();
  advance();
  expect(props.onDone).toHaveBeenCalledWith('1.1');
});

test('Space and ArrowRight advance; Backspace and ArrowLeft step back', () => {
  setup('1.1');
  tick(); fireEvent.keyDown(window, { key: ' ' });
  expect(screen.getByText('Albany')).toBeInTheDocument();
  tick(); fireEvent.keyDown(window, { key: 'Backspace' });
  expect(screen.queryByText('Albany')).toBeNull();
  tick(); fireEvent.keyDown(window, { key: 'ArrowRight' });
  tick(); fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(screen.queryByText('Albany')).toBeNull();
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
  expect(screen.queryByText('Albany')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /pass/i }));
  expect(props.onPass).toHaveBeenCalledWith('1.1');
  expect(screen.queryByText('Albany')).toBeNull();
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
  expect(screen.getByText(/black and white/)).toBeInTheDocument();
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

test('video question hides the clip behind a play button, then embeds YouTube with autoplay on', () => {
  const { props } = setup('9.2');
  expect(document.querySelector('iframe')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: /play the clip/i }));
  const frame = document.querySelector('iframe')!;
  expect(frame.getAttribute('src')).toContain('XqZsoesa55w');
  expect(frame.getAttribute('src')).toContain('autoplay=1');
  expect(props.onDone).not.toHaveBeenCalled();
  expect(screen.queryByText('Baby Shark')).toBeNull(); // still on the question stage
});

test('a double-click advances only one stage', () => {
  const { props, advance, rawClick } = setup('1.1');
  advance(); rawClick();
  expect(screen.getByText('Albany')).toBeInTheDocument();
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
  expect(screen.queryByText('Albany')).toBeNull();
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
  tick(); fireEvent.click(option('New York City'));
  expect(option('New York City')).toHaveClass('wrong');
  expect(option('New York City').querySelector('.snuff')).not.toBeNull();
  expect(document.querySelector('.option.correct')).toBeNull();
  expect(screen.queryByText(/capital since 1797/)).toBeNull();
  expect(props.onDone).not.toHaveBeenCalled();
  tick(); fireEvent.click(option('Buffalo'));
  expect(document.querySelectorAll('.option.wrong')).toHaveLength(2);
  expect(document.querySelector('.option.correct')).toBeNull();
});

test('picking the right option reveals the answer with fireworks; wrong picks stay grey', () => {
  const { props, advance } = setup('1.1');
  advance();
  tick(); fireEvent.click(option('New York City'));
  tick(); fireEvent.click(option('Albany'));
  expect(option('Albany')).toHaveClass('correct');
  expect(option('Albany')).toHaveClass('celebrate');
  expect(option('New York City')).toHaveClass('wrong');
  expect(document.querySelector('.fireworks')).not.toBeNull();
  expect(screen.getByText(/capital since 1797/)).toBeInTheDocument();
  expect(props.onDone).not.toHaveBeenCalled();
  advance();
  expect(props.onDone).toHaveBeenCalledWith('1.1');
});

test('a correct pick cannot be finished by the same double-click', () => {
  const { props, advance, rawClick } = setup('1.1');
  advance();
  tick(); fireEvent.click(option('Albany'));
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
  tick(); fireEvent.keyDown(window, { key: 'a' });
  expect(document.querySelector('.option.wrong')).toBeNull();
  advance();
  tick(); fireEvent.keyDown(window, { key: 'a' });
  expect(document.querySelectorAll('.option')[0]).toHaveClass('wrong');
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
  expect(document.querySelector('.question')).toHaveClass('has-media');
});

test('any category with option pictures renders them as art cards', () => {
  const q = { ...QUESTION_BY_ID['4.1'], optionMedia: ['img/a.jpg', 'img/b.jpg', 'img/c.jpg', 'img/d.jpg'] };
  render(<Question q={q} via="board" canSwap onDone={vi.fn()} onPass={vi.fn()} onSwap={vi.fn()} onAbandon={vi.fn()} />);
  tick(); fireEvent.click(document.querySelector('.question')!);
  expect(document.querySelectorAll('.option .art, .option .img-placeholder.art')).toHaveLength(4);
});

test('image questions use the mystery fallback when the photo is missing', () => {
  setup('5.9');
  fireEvent.error(screen.getByRole('img', { name: /Pretoria/ }));
  expect(document.querySelector('.question-body .mystery-card')).not.toBeNull();
});

test('a wrong pick shows that option\'s note when the question carries one; a right pick never does', () => {
  const { advance } = setup('1.5');
  advance();
  expect(document.querySelector('.wrong-note')).toBeNull();
  tick(); fireEvent.click(option('Alaska'));
  expect(screen.getByText(/Alaska does not share a border/)).toBeInTheDocument();
  tick(); fireEvent.click(option('Florida'));
  expect(screen.queryByText(/Alaska does not share/)).toBeNull();
  expect(screen.getByText(/Florida borders two states/)).toBeInTheDocument();
  tick(); fireEvent.click(option('Maine'));
  expect(document.querySelector('.wrong-note')).toBeNull();
  expect(option('Maine')).toHaveClass('correct');
});

test('a wrong pick on a question without notes shows nothing extra', () => {
  const { advance } = setup('8.2');
  advance();
  tick(); fireEvent.click(option('3'));
  expect(option('3')).toHaveClass('wrong');
  expect(document.querySelector('.wrong-note')).toBeNull();
});

test('image questions show the picture with the question and keep it through the options', () => {
  const { advance } = setup('3.5');
  expect(screen.getByRole('img', { name: /red arrow/i })).toBeInTheDocument();
  advance();
  expect(screen.getByRole('img', { name: /red arrow/i })).toBeInTheDocument();
  expect(screen.getByText('The Federal Reserve')).toBeInTheDocument();
  tick(); fireEvent.click(option('James Monroe Building'));
  expect(screen.getByText(/tallest in Richmond at 449 ft/)).toBeInTheDocument();
});

const worth = () => document.querySelector('.points-n')!.textContent;

test('the points pill follows the rules: 40 on hard, 20 once options show, 5 on Steal, doubled on ×2', () => {
  const { advance } = setup('1.10');
  expect(worth()).toBe('40');
  advance();
  expect(worth()).toBe('20');
  fireEvent.click(screen.getByRole('button', { name: /^Steal$/ }));
  expect(worth()).toBe('5');
  fireEvent.click(screen.getByRole('button', { name: /^Steal$/ }));
  expect(worth()).toBe('20');
  fireEvent.click(screen.getByRole('button', { name: /×2/ }));
  expect(worth()).toBe('40');
  expect(screen.getByText(/wrong −20/)).toBeInTheDocument();
  // the host buttons never advance the stage
  expect(document.querySelector('.option.correct')).toBeNull();
});

test('a Lucky draw on Diwali kids shows 30 + 10 lucky + 5 away before options', () => {
  setup('4.1', { via: 'lucky' });
  expect(worth()).toBe('45');
  expect(screen.getByText(/Diwali ×1.5 · \+10 lucky · \+5 away side/)).toBeInTheDocument();
});

test('at the answer, one tap awards the pill value to a team; a typed number overrides it; given points can be removed', () => {
  const onAward = vi.fn(); const onRemoveAward = vi.fn();
  const { advance } = setup('1.5', { onAward, onRemoveAward, awards: [{ id: 'a1', qid: '1.5', team: 'gents', points: 25, at: 1 }] });
  advance(); advance();
  fireEvent.click(screen.getByRole('button', { name: /award 15 to Kids/ })); // 10 after options + 5 away side
  expect(onAward).toHaveBeenCalledWith('kids', 15);
  const box = screen.getByLabelText('other points for Ladies');
  fireEvent.change(box, { target: { value: '-5' } });
  fireEvent.keyDown(box, { key: 'Enter' });
  expect(onAward).toHaveBeenCalledWith('ladies', -5);
  expect(screen.getByText('Gentlemen +25')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /remove 25 from Gentlemen/ }));
  expect(onRemoveAward).toHaveBeenCalledWith('a1');
});

test('typing in an award box never advances or picks', () => {
  const { props, advance } = setup('1.5', { onAward: vi.fn(), onRemoveAward: vi.fn() });
  advance(); advance();
  const box = screen.getByLabelText('other points for Kids');
  box.focus();
  tick(); fireEvent.keyDown(box, { key: ' ' });
  tick(); fireEvent.keyDown(box, { key: 'ArrowRight' });
  expect(props.onDone).not.toHaveBeenCalled();
});
