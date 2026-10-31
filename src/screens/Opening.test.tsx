import { render, screen, fireEvent } from '@testing-library/react';
import { Opening } from './Opening';

test('Begin button and Enter both begin', () => {
  const onBegin = vi.fn();
  render(<Opening onBegin={onBegin} />);
  expect(screen.getByText(/happy diwali/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /begin/i }));
  fireEvent.keyDown(window, { key: 'Enter' });
  expect(onBegin).toHaveBeenCalledTimes(2);
});
