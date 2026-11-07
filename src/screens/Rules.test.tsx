import { render, screen } from '@testing-library/react';
import { Rules } from './Rules';

test('the rules page names the three teams, the tokens and the scoring', () => {
  render(<Rules />);
  expect([...document.querySelectorAll('.team-name')].map((n) => n.textContent)).toEqual(['Kids', 'Gentlemen', 'Ladies']);
  expect(screen.getByText(/Double-or-nothing/)).toBeInTheDocument();
  expect(screen.getByText('Lucky Diya 🪔 · once per team')).toBeInTheDocument();
  expect(screen.getByText('Right, no options or hint').nextElementSibling).toHaveTextContent('20');
  expect(screen.getByText(/improvise/)).toBeInTheDocument();
  expect(screen.getByText(/Riddles & Ukhana/)).toBeInTheDocument();
});
