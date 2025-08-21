import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimatedHero from '../../app/components/AnimatedHero';

describe('CTA Buttons Navigation', () => {
  it('renders primary CTA button with correct navigation', () => {
    render(<AnimatedHero />);
    
    const primaryCTA = screen.getByRole('link', { name: /get started/i });
    expect(primaryCTA).toBeInTheDocument();
    expect(primaryCTA).toHaveAttribute('href', '/pricing');
    expect(primaryCTA).toHaveClass('bg-indigo-500', 'hover:bg-indigo-600', 'transition-colors');
  });

  it('renders secondary CTA button with correct navigation', () => {
    render(<AnimatedHero />);
    
    const secondaryCTA = screen.getByRole('link', { name: /see features/i });
    expect(secondaryCTA).toBeInTheDocument();
    expect(secondaryCTA).toHaveAttribute('href', '/features');
    expect(secondaryCTA).toHaveClass('border', 'border-gray-600', 'hover:border-indigo-500');
  });

  it('CTA buttons have proper styling and hover states', () => {
    render(<AnimatedHero />);
    
    const primaryCTA = screen.getByRole('link', { name: /get started/i });
    const secondaryCTA = screen.getByRole('link', { name: /see features/i });
    
    // Primary CTA styling
    expect(primaryCTA).toHaveClass('px-6', 'py-3', 'rounded-md', 'font-semibold');
    
    // Secondary CTA styling
    expect(secondaryCTA).toHaveClass('px-6', 'py-3', 'rounded-md', 'transition-colors');
  });

  it('CTA buttons are accessible and clickable', () => {
    render(<AnimatedHero />);
    
    const primaryCTA = screen.getByRole('link', { name: /get started/i });
    const secondaryCTA = screen.getByRole('link', { name: /see features/i });
    
    expect(primaryCTA).toBeVisible();
    expect(secondaryCTA).toBeVisible();
    
    // Verify they are actual links
    expect(primaryCTA.tagName).toBe('A');
    expect(secondaryCTA.tagName).toBe('A');
  });
}); 