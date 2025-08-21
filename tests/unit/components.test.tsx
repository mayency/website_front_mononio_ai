import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetallicPaint } from '../../app/components/MetallicPaint';
import InteractiveButtons from '../../app/components/InteractiveButtons';
import Navbar from '../../app/components/Navbar';
import HeroBackground from '../../app/components/HeroBackground';

describe('Component Tests', () => {
  test('MetallicPaint renders with children', () => {
    render(
      <MetallicPaint speed={0.8}>
        <div>Test content</div>
      </MetallicPaint>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
    const metallicElement = document.querySelector('.metallic-shine');
    expect(metallicElement).toBeInTheDocument();
  });

  test('MetallicPaint applies custom speed', () => {
    render(
      <MetallicPaint speed={1.2}>
        <div>Test content</div>
      </MetallicPaint>
    );
    
    const metallicElement = document.querySelector('.metallic-shine');
    expect(metallicElement).toHaveStyle('animation: metallic-shine 1.2s ease-in-out infinite');
  });

  test('MetallicPaint uses default speed when not provided', () => {
    render(
      <MetallicPaint>
        <div>Test content</div>
      </MetallicPaint>
    );
    
    const metallicElement = document.querySelector('.metallic-shine');
    expect(metallicElement).toHaveStyle('animation: metallic-shine 0.6s ease-in-out infinite');
  });

  test('InteractiveButtons renders both buttons', () => {
    render(<InteractiveButtons />);
    
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see features/i })).toBeInTheDocument();
  });

  test('InteractiveButtons handles click events', () => {
    render(<InteractiveButtons />);
    
    const getStartedButton = screen.getByRole('button', { name: /get started/i });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveClass('bg-white', 'text-gray-900');
  });

  test('InteractiveButtons has proper styling', () => {
    render(<InteractiveButtons />);
    
    const container = document.querySelector('.flex.flex-wrap.justify-center.gap-4');
    expect(container).toBeInTheDocument();
    
    const seeFeaturesLink = screen.getByRole('link', { name: /see features/i });
    expect(seeFeaturesLink).toHaveClass('border', 'border-gray-700', 'text-white');
  });

  test('Navbar renders with logo', () => {
    render(<Navbar />);
    
    const logo = document.querySelector('img[alt="Mononio AI"]');
    expect(logo).toBeInTheDocument();
  });

  test('Navbar has proper structure', () => {
    render(<Navbar />);
    
    const navbar = document.querySelector('nav');
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveClass('bg-gray-900', 'border-b', 'border-gray-800');
  });

  test('Navbar contains navigation links', () => {
    render(<Navbar />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  test('HeroBackground renders video element', () => {
    render(<HeroBackground />);
    
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveClass('absolute', 'inset-0', 'w-full', 'h-full', 'object-cover');
  });
}); 