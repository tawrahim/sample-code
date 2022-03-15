import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';

describe("Home page", () => {
  it('renders the home page', () => {
    render(<Home />);
    expect(screen.getByText('Duration in bed')).toBeInTheDocument();
    expect(screen.getByText('Duration asleep')).toBeInTheDocument();
    expect(screen.queryByText('Your score: ')).not.toBeInTheDocument();
  });

  it('Validate form', async () => {
    render(<Home />);
    const calculateButton = screen.getByText('Calculate');
    expect(calculateButton).toHaveAttribute('disabled');
    fireEvent.change(screen.getByTestId('bedDurationSelection'), { target: { value: '01:00' } })
    fireEvent.change(screen.getByTestId('sleepDurationSelection'), { target: { value: '03:00' } })
    expect(calculateButton).not.toHaveAttribute('disabled');
  });

  it('Do calculation', async () => {
    render(<Home />);
    const calculateButton = screen.getByText('Calculate');
    fireEvent.change(screen.getByTestId('bedDurationSelection'), { target: { value: '01:00' } })
    fireEvent.change(screen.getByTestId('sleepDurationSelection'), { target: { value: '03:00' } })
    fireEvent.click(calculateButton);
    await waitFor(() => {
      expect(screen.getByTestId('score')).toBeInTheDocument();
    })
  });
})