import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimatedHero from '../../app/components/AnimatedHero';

describe('AnimatedHero Component', () => {
  it('renders hero section with video background', () => {
    render(<AnimatedHero />);
    
    const heroSection = document.querySelector('.hero-background');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass('hero-background');
  });

  it('displays main heading with correct text', () => {
    render(<AnimatedHero />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Automate Multi-Channel Marketing with AI Agents');
    expect(heading).toHaveClass('text-5xl', 'font-extrabold', 'text-indigo-400');
  });

  it('displays descriptive paragraph', () => {
    render(<AnimatedHero />);
    
    const paragraph = screen.getByText(/One brief → campaigns across/);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('text-lg', 'text-gray-300');
  });

  it('renders CTA buttons with correct links', () => {
    render(<AnimatedHero />);
    
    const getStartedButton = screen.getByRole('link', { name: /get started/i });
    const seeFeaturesButton = screen.getByRole('link', { name: /see features/i });
    
    expect(getStartedButton).toBeInTheDocument();
    expect(seeFeaturesButton).toBeInTheDocument();
    
    expect(getStartedButton).toHaveAttribute('href', '/pricing');
    expect(seeFeaturesButton).toHaveAttribute('href', '/features');
  });

  it('applies correct styling to CTA buttons', () => {
    render(<AnimatedHero />);
    
    const getStartedButton = screen.getByRole('link', { name: /get started/i });
    const seeFeaturesButton = screen.getByRole('link', { name: /see features/i });
    
    expect(getStartedButton).toHaveClass('bg-indigo-500', 'hover:bg-indigo-600');
    expect(seeFeaturesButton).toHaveClass('border', 'border-gray-600', 'hover:border-indigo-500');
  });

  it('has proper accessibility attributes', () => {
    render(<AnimatedHero />);
    
    const heroSection = document.querySelector('.hero-background');
    expect(heroSection).toHaveClass('text-white', 'text-center');
  });
}); 