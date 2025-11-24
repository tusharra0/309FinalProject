import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero call-to-action button', () => {
  render(<App />);
  const ctaButton = screen.getByRole('button', { name: /get started/i });
  expect(ctaButton).toBeInTheDocument();
});
