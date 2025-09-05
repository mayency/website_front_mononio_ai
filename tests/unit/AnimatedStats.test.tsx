import { render, screen } from '@testing-library/react';
import AnimatedStats from '../../../app/components/AnimatedStats';

describe('AnimatedStats', () => {
  it('renders all stat items', () => {
    render(<AnimatedStats />);
    
    expect(screen.getByText(/Average ROI/i)).toBeInTheDocument();
    expect(screen.getByText(/Happy Clients/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Optimization/i)).toBeInTheDocument();
    expect(screen.getByText(/Setup Time/i)).toBeInTheDocument();
  });

  it('displays correct stat values', () => {
    render(<AnimatedStats />);
    
    expect(screen.getByText('10x')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('5min')).toBeInTheDocument();
  });

  it('has proper grid layout classes', () => {
    const { container } = render(<AnimatedStats />);
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid-cols-2', 'md:grid-cols-4');
  });

  it('applies gradient text styling', () => {
    const { container } = render(<AnimatedStats />);
    const gradientElements = container.querySelectorAll('.bg-gradient-to-r');
    expect(gradientElements).toHaveLength(4);
  });

  it('has animation delay styles', () => {
    const { container } = render(<AnimatedStats />);
    const animatedElements = container.querySelectorAll('[style*="animationDelay"]');
    expect(animatedElements).toHaveLength(4);
  });
});
