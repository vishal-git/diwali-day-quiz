import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('#/answers renders the host cheat sheet', () => {
  window.location.hash = '#/answers';
  render(<App />);
  expect(screen.getByRole('heading', { name: /answers/i })).toBeInTheDocument();
  window.location.hash = '';
});

test('F toggles fullscreen', () => {
  window.location.hash = '';
  const req = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(document.documentElement, 'requestFullscreen', { value: req, configurable: true });
  render(<App />);
  fireEvent.keyDown(window, { key: 'f' });
  expect(req).toHaveBeenCalled();
});

test('Swap burns the live question, shows the spare with Swap disabled; Pass consumes it', () => {
  window.location.hash = '';
  localStorage.clear();
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /begin/i }));
  fireEvent.click(screen.getByRole('button', { name: /Geography/ }));
  fireEvent.click(screen.getByRole('button', { name: /^Kids/ }));
  fireEvent.click(screen.getByRole('button', { name: /^US/ }));
  expect(screen.getByText(/capital of New York/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /swap/i }));
  expect(screen.getByText(/Which Indian state is this/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /swap/i })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: /pass/i }));
  expect(screen.getByRole('button', { name: /Geography/ }).querySelectorAll('.pip-kids.used')).toHaveLength(1);
  expect(JSON.parse(localStorage.getItem('diwali-quiz-2026')!)).toEqual({ used: ['1.S1'], burned: ['1.1'] });
});

test('Esc leaves a question unconsumed', () => {
  window.location.hash = '';
  localStorage.clear();
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /begin/i }));
  fireEvent.click(screen.getByRole('button', { name: /Food/ }));
  fireEvent.click(screen.getByRole('button', { name: /^Adult/ }));
  fireEvent.click(screen.getByRole('button', { name: /^India/ }));
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.getByRole('button', { name: /Food/ }).querySelectorAll('.pip.used')).toHaveLength(0);
  expect(localStorage.getItem('diwali-quiz-2026')).toBeNull();
});

test('#/q/<id> opens that question directly (layout-check aid)', () => {
  window.location.hash = '#/q/7.10';
  render(<App />);
  expect(screen.getByText(/rasgulla/)).toBeInTheDocument();
  window.location.hash = '';
});

test('points awarded under an answer show up on the board and the opening screen', () => {
  window.location.hash = '';
  localStorage.clear();
  let clock = 0;
  vi.spyOn(Date, 'now').mockImplementation(() => (clock += 1000)); // past the double-click guard
  const { unmount } = render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /begin/i }));
  fireEvent.click(screen.getByRole('button', { name: /Geography/ }));
  fireEvent.click(screen.getByRole('button', { name: /^Kids/ }));
  fireEvent.click(screen.getByRole('button', { name: /^US/ }));
  fireEvent.click(screen.getByText(/capital of New York/).closest('.question')!); // options
  fireEvent.click(screen.getByText(/capital of New York/).closest('.question')!); // answer
  fireEvent.click(screen.getByRole('button', { name: /award 10 to Ladies/ }));
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.getAllByRole('listitem').map((i) => i.textContent)).toEqual(['Kids0', 'Gentlemen0', 'Ladies10']);
  expect(JSON.parse(localStorage.getItem('diwali-quiz-2026-scores')!)[0]).toMatchObject({ qid: '1.1', team: 'ladies', points: 10 });
  unmount();
  render(<App />);
  expect(screen.getAllByRole('listitem').map((i) => i.textContent)).toEqual(['Kids0', 'Gentlemen0', 'Ladies10']);
  vi.restoreAllMocks();
});
