"use client";

import { useState, useEffect, ReactNode } from 'react';

interface LazyAnimatedComponentProps {
  children: ReactNode;
  minHeight?: string;
  className?: string;
  delay?: number;
}

export default function LazyAnimatedComponent({
  children,
  minHeight = '200px',
  className = '',
  delay = 0
}: LazyAnimatedComponentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Wait for document to be ready
    if (document.readyState === 'complete') {
      setTimeout(() => {
        setShouldRender(true);
        requestAnimationFrame(() => {
          setIsLoaded(true);
        });
      }, delay);
    } else {
      const handleLoad = () => {
        setTimeout(() => {
          setShouldRender(true);
          requestAnimationFrame(() => {
            setIsLoaded(true);
          });
        }, delay);
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [delay]);

  return (
    <div 
      className={`${className} ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ minHeight: shouldRender ? 'auto' : minHeight }}
    >
      {shouldRender ? children : (
        <div className="skeleton" style={{ height: minHeight, width: '100%' }} />
      )}
    </div>
  );
}
