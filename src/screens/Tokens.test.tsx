import { render } from '@testing-library/react';
import { Tokens } from './Tokens';

test('prints seven labelled discs per team: 3 swap, 2 hard, 1 double, 1 lucky', () => {
  const { container } = render(<Tokens />);
  expect(container.querySelectorAll('.tchip')).toHaveLength(21);
  expect(container.querySelectorAll('.tchip-group')).toHaveLength(3);
  expect(container.querySelectorAll('.tchip-group:first-of-type .tchip-swap')).toHaveLength(3);
  expect(container.querySelectorAll('.tchip-group:first-of-type .tchip-hard')).toHaveLength(2);
  expect(container.querySelectorAll('.tchip-group:first-of-type .tchip-double')).toHaveLength(1);
  expect(container.querySelectorAll('.tchip-group:first-of-type .tchip-lucky')).toHaveLength(1);
  expect(container.textContent).toMatch(/Gentlemen/);
  expect(container.textContent).toMatch(/Ladies/);
});
