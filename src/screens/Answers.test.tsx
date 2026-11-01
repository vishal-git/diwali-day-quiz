import { render, screen } from '@testing-library/react';
import { Answers } from './Answers';
import { QUESTIONS } from '../data/questions';

test('lists every question with its answer, grouped by category, plus the final round', () => {
  render(<Answers questions={QUESTIONS} />);
  expect(screen.getAllByRole('row')).toHaveLength(QUESTIONS.length + 1 + 10); // rows + final + 10 header rows
  expect(screen.getByText('1.1')).toBeInTheDocument();
  expect(screen.getByText('Rio Grande')).toBeInTheDocument();
  expect(screen.getByText(/Vikram Samvat 2083/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Riddles & Ukhana/ })).toBeInTheDocument();
});

test('spares are marked', () => {
  render(<Answers questions={QUESTIONS} />);
  expect(screen.getAllByText('spare').length).toBe(19);
});

test('the sheet lists the code next to the bank number', () => {
  render(<Answers questions={QUESTIONS} />);
  expect(screen.getByText('GEO-K-US-1')).toBeInTheDocument();
});
