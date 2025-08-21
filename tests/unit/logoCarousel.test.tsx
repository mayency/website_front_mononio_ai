import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogoCloud from '../../app/components/LogoCloud';

describe('LogoCloud Component', () => {
  it('renders logo carousel section', () => {
    render(<LogoCloud />);
    
    const logoSection = document.querySelector('.bg-gray-900');
    expect(logoSection).toBeInTheDocument();
  });

  it('displays section heading', () => {
    render(<LogoCloud />);
    
    const heading = screen.getByText(/Deploy campaigns across the platforms you already use/);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-center', 'text-lg', 'font-semibold');
  });

  it('renders all partner logos with correct images', () => {
    render(<LogoCloud />);
    
    const expectedLogos = [
      'Mononio AI',
      'Google Ads',
      'Meta',
      'TikTok',
      'LinkedIn',
      'X',
      'Instagram',
      'YouTube',
      'WhatsApp',
      'Telegram',
      'Taboola',
      'Outbrain'
    ];

    expectedLogos.forEach(logoName => {
      const logoImages = screen.getAllByAltText(logoName);
      expect(logoImages.length).toBeGreaterThan(0);
      expect(logoImages[0].tagName).toBe('IMG');
    });
  });

  it('creates seamless infinite scroll with duplicated logos', () => {
    render(<LogoCloud />);
    
    const logoItems = document.querySelectorAll('.logo-item');
    // Should have 24 items (12 original + 12 duplicated)
    expect(logoItems).toHaveLength(24);
  });

  it('applies custom sizing classes to logos', () => {
    render(<LogoCloud />);
    
    const mononioLogos = screen.getAllByAltText('Mononio AI');
    const googleAdsLogos = screen.getAllByAltText('Google Ads');
    const tiktokLogos = screen.getAllByAltText('TikTok');
    
    expect(mononioLogos[0]).toHaveClass('h-50');
    expect(googleAdsLogos[0]).toHaveClass('h-40');
    expect(tiktokLogos[0]).toHaveClass('h-20');
  });

  it('has proper logo slider structure', () => {
    render(<LogoCloud />);
    
    const logoSlider = document.querySelector('.logo-slider');
    const logoTrack = document.querySelector('.logo-track');
    
    expect(logoSlider).toBeInTheDocument();
    expect(logoTrack).toBeInTheDocument();
  });

  it('logos have proper accessibility attributes', () => {
    render(<LogoCloud />);
    
    const logoImages = screen.getAllByRole('img');
    logoImages.forEach(img => {
      expect(img).toHaveAttribute('alt');
      expect(img).toHaveClass('w-auto', 'object-contain');
    });
  });
}); 