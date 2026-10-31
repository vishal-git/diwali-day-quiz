import { render, screen } from '@testing-library/react';
import { GujaratMap } from './GujaratMap';

test('outline view shows one path with a viewBox hugging Gujarat', () => {
  render(<GujaratMap filled={false} />);
  const svg = screen.getByRole('img', { name: /outline/i });
  expect(svg.querySelectorAll('path')).toHaveLength(1);
  const [, , w, h] = svg.getAttribute('viewBox')!.split(' ').map(Number);
  expect(w).toBeGreaterThan(100); expect(w).toBeLessThan(400);
  expect(h).toBeGreaterThan(100); expect(h).toBeLessThan(400);
});

test('filled view draws every state with Gujarat highlighted', () => {
  render(<GujaratMap filled />);
  const svg = screen.getByRole('img', { name: /gujarat highlighted/i });
  expect(svg.querySelectorAll('path').length).toBeGreaterThan(30);
  expect(svg.querySelectorAll('path[fill="var(--marigold)"]')).toHaveLength(1);
});
