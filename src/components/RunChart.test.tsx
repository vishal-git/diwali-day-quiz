import { render, screen } from '@testing-library/react';
import { RunChart } from './RunChart';

const bars = [
  { label: 'Ricky Ponting', value: 27483 },
  { label: 'Sachin Tendulkar', value: 34357 },
  { label: 'Jacques Kallis', value: 25534 },
];

test('hidden mode labels bars A, B, C and hides names and totals', () => {
  render(<RunChart bars={bars} revealNames={false} />);
  expect(screen.queryByText(/Tendulkar/)).toBeNull();
  expect(screen.queryByText('34,357')).toBeNull();
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('C')).toBeInTheDocument();
});

test('revealed mode shows names and totals', () => {
  render(<RunChart bars={bars} revealNames />);
  expect(screen.getByText(/Tendulkar/)).toBeInTheDocument();
  expect(screen.getByText('34,357')).toBeInTheDocument();
});

test('revealed labels are surnames so five names fit under five bars', () => {
  render(<RunChart bars={[...bars, { label: 'Kumar Sangakkara', value: 28016 }]} revealNames />);
  expect(screen.getByText('Sangakkara')).toBeInTheDocument();
  expect(screen.queryByText('Kumar Sangakkara')).toBeNull();
  expect(screen.getByText('Tendulkar')).toBeInTheDocument();
});
