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
      'Facebook',
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
    
    const trackA = document.querySelectorAll('.marquee-a .logo-img');
    const trackB = document.querySelectorAll('.marquee-b .logo-img');
    expect(trackA.length).toBeGreaterThan(0);
    expect(trackB.length).toBeGreaterThan(0);
  });

  it('has alt text and base classes on logos', () => {
    render(<LogoCloud />);
    
    const googleAdsLogos = screen.getAllByAltText('Google Ads');
    const tiktokLogos = screen.getAllByAltText('TikTok');
    
    expect(googleAdsLogos[0]).toHaveClass('logo-img');
    expect(tiktokLogos[0]).toHaveClass('logo-img');
  });

  it('has proper logo slider structure', () => {
    render(<LogoCloud />);
    
    const viewport = document.querySelector('.marquee-viewport');
    const trackA = document.querySelector('.marquee-a');
    const trackB = document.querySelector('.marquee-b');
    
    expect(viewport).toBeInTheDocument();
    expect(trackA).toBeInTheDocument();
    expect(trackB).toBeInTheDocument();
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