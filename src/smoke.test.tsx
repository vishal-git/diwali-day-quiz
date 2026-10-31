import { render, screen } from '@testing-library/react';
import App from './App';

test('app opens on the Happy Diwali title', () => {
  render(<App />);
  expect(screen.getByText(/happy diwali/i)).toBeInTheDocument();
});
