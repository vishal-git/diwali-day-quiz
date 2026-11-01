import { render, screen, fireEvent } from '@testing-library/react';
import { SafeImage } from './SafeImage';

test('a missing image becomes a labelled placeholder, never a broken icon', () => {
  render(<SafeImage src="img/nope.jpg" alt="Kohli as a schoolboy" />);
  const img = screen.getByRole('img', { name: 'Kohli as a schoolboy' });
  fireEvent.error(img);
  expect(screen.queryByRole('img')).toBeNull();
  expect(screen.getByText('Kohli as a schoolboy')).toBeInTheDocument();
  expect(screen.getByText(/image pending/i)).toBeInTheDocument();
});

test('a loaded image stays an image', () => {
  render(<SafeImage src="img/ok.jpg" alt="ok" />);
  expect(screen.getByRole('img', { name: 'ok' })).toHaveAttribute('src', '/img/ok.jpg');
});

test('a poster that fails to load becomes a title card rather than an "image pending" note', () => {
  const { container } = render(<SafeImage src="img/2.1-opt-toystory5.jpg" alt="Toy Story 5" className="poster" fallback="title" />);
  fireEvent.error(container.querySelector('img')!);
  const card = container.querySelector('.title-card');
  expect(card).not.toBeNull();
  expect(card).toHaveClass('poster');
  expect(card).toHaveTextContent('Toy Story 5');
  expect(container.textContent).not.toMatch(/pending/);
});

test('a missing "then" photo becomes a mystery silhouette card with the clue line, not an "image pending" note', () => {
  const { container } = render(<SafeImage src="img/5.9-musk-then.jpg" alt="Teenager in Pretoria, 1980s" className="question-image" fallback="mystery" />);
  fireEvent.error(container.querySelector('img')!);
  const card = container.querySelector('.mystery-card');
  expect(card).not.toBeNull();
  expect(card!.querySelector('svg')).not.toBeNull();
  expect(card).toHaveTextContent('Teenager in Pretoria, 1980s');
  expect(container.textContent).not.toMatch(/pending/);
});
