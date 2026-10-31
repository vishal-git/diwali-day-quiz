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
