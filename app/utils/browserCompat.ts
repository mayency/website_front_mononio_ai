/**
 * Browser Compatibility Configuration for ScrollStack
 * This module detects the user's browser and provides optimized settings
 * to ensure consistent scroll behavior across all platforms
 */

export interface ScrollStackConfig {
  pinEndMultiplier: number;
  maxTranslateY: number;
  scrollBehavior: 'smooth' | 'auto';
  useHardwareAcceleration: boolean;
  containerHeight: string;
}

export const getBrowserConfig = (): ScrollStackConfig => {
  // Safe browser detection with fallbacks
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const vendor = typeof navigator !== 'undefined' ? (navigator as any).vendor : '';
  
  const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(vendor);
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  
  // Chrome needs more restrictive boundaries to prevent over-scrolling
  if (isChrome) {
    return {
      pinEndMultiplier: 0.85,
      maxTranslateY: 0.55,
      scrollBehavior: 'auto', // Chrome handles smooth internally
      useHardwareAcceleration: true,
      containerHeight: isMobile ? 'min(75vh, 600px)' : 'min(85vh, 750px)'
    };
  }
  
  // Safari works well with default settings
  if (isSafari) {
    return {
      pinEndMultiplier: 0.8,
      maxTranslateY: 0.7,
      scrollBehavior: 'smooth',
      useHardwareAcceleration: true,
      containerHeight: isMobile ? 'min(80vh, 650px)' : 'min(90vh, 800px)'
    };
  }
  
  // Firefox configuration
  if (isFirefox) {
    return {
      pinEndMultiplier: 0.82,
      maxTranslateY: 0.65,
      scrollBehavior: 'smooth',
      useHardwareAcceleration: false, // Firefox has issues with some transforms
      containerHeight: 'min(85vh, 750px)'
    };
  }
  
  // Default fallback configuration
  return {
    pinEndMultiplier: 0.8,
    maxTranslateY: 0.65,
    scrollBehavior: 'smooth',
    useHardwareAcceleration: true,
    containerHeight: 'min(85vh, 750px)'
  };
};
