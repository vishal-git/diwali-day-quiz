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
