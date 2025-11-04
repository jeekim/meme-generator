import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../components/Footer';

describe('Footer', () => {
  it('renders footer with correct text', () => {
    render(<Footer />);
    expect(screen.getByText('Powered by Google Gemini')).toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('w-full');
  });
});
