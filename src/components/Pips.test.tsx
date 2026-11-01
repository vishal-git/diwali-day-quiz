import { render } from '@testing-library/react';
import { Pips } from './Pips';

test('draws one SVG glyph per question, dimming the played ones, with no emoji text', () => {
  const { container } = render(<Pips kind="kids" left={3} total={4} />);
  expect(container.querySelectorAll('svg.pip.pip-kids')).toHaveLength(4);
  expect(container.querySelectorAll('svg.pip.used')).toHaveLength(1);
  expect(container.textContent).not.toMatch(/\p{Extended_Pictographic}/u);
  expect(container.querySelector('.pips')).toHaveAttribute('aria-label', '3 of 4 kids left');
});

test('each kind has its own glyph so the groups cannot blur together', () => {
  const kinds = ['kids', 'adult', 'hard'] as const;
  const marks = kinds.map((k) => render(<Pips kind={k} left={1} total={1} />).container.querySelector('svg.pip')!.innerHTML);
  expect(new Set(marks).size).toBe(3);
});

test('an optional caption names the group', () => {
  const { container } = render(<Pips kind="adult" left={2} total={2} caption />);
  expect(container.querySelector('.pips-caption')).toHaveTextContent(/adult/i);
});
