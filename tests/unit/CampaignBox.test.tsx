import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CampaignBox from '@/app/components/CampaignBox';

// Mock the Speech Recognition API
const mockSpeechRecognition = {
  continuous: false,
  interimResults: false,
  lang: 'en-US',
  start: jest.fn(),
  stop: jest.fn(),
  onresult: null,
  onerror: null,
  onend: null,
};

// Mock window.SpeechRecognition
Object.defineProperty(window, 'SpeechRecognition', {
  writable: true,
  value: jest.fn(() => mockSpeechRecognition),
});

Object.defineProperty(window, 'webkitSpeechRecognition', {
  writable: true,
  value: jest.fn(() => mockSpeechRecognition),
});

describe('CampaignBox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<CampaignBox />);
    expect(screen.getByPlaceholderText(/Describe your business/i)).toBeInTheDocument();
  });

  it('handles text input', () => {
    render(<CampaignBox />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test campaign' } });
    expect(textarea).toHaveValue('Test campaign');
  });

  it('shows clear button when text is entered', () => {
    render(<CampaignBox />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test' } });
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('clears text when clear button is clicked', () => {
    render(<CampaignBox />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test' } });
    
    const clearButton = screen.getByText('✕');
    fireEvent.click(clearButton);
    
    expect(textarea).toHaveValue('');
  });

  it('shows microphone button', () => {
    render(<CampaignBox />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows language selector', () => {
    render(<CampaignBox />);
    const languageSelect = screen.getByDisplayValue('en');
    expect(languageSelect).toBeInTheDocument();
  });

  it('shows create campaign button', () => {
    render(<CampaignBox />);
    expect(screen.getByText(/Create my campaign/i)).toBeInTheDocument();
  });

  it('handles language change', () => {
    render(<CampaignBox />);
    const languageSelect = screen.getByDisplayValue('en');
    fireEvent.change(languageSelect, { target: { value: 'he-IL' } });
    expect(languageSelect).toHaveValue('he-IL');
  });
});
