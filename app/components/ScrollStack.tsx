"use client";

import React, { useLayoutEffect, useRef, useCallback, ReactNode, memo, useState, useEffect } from "react";
import { getBrowserConfig, ScrollStackConfig } from '../utils/browserCompat';

const ultraWideStyles = `
  .scroll-stack-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scroll-stack-container::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 2560px) {
    .scroll-stack-card-ultra {
      height: 36rem !important;
      padding: 6rem !important;
      border-radius: 60px !important;
    }
  }
  
  @media (min-width: 3000px) {
    .scroll-stack-card-ultra {
      height: 40rem !important;
      padding: 8rem !important;
      border-radius: 70px !important;
    }
  }
`;

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
  enableScrollChaining?: boolean;
}

interface Transform {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = memo(({ children, itemClassName = "" }) => {
  return (
    <div
      className={`scroll-stack-card scroll-stack-card-ultra relative w-full max-w-5xl mx-auto
      h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] 2xl:h-[36rem]
      my-8 lg:my-12 xl:my-16
      p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24
      rounded-[40px] lg:rounded-[50px] xl:rounded-[60px]
      shadow-[0_0_30px_rgba(0,0,0,0.1)] lg:shadow-[0_0_40px_rgba(0,0,0,0.15)] xl:shadow-[0_0_50px_rgba(0,0,0,0.2)]
      box-border origin-top will-change-transform ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
});

ScrollStackItem.displayName = 'ScrollStackItem';

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  style,
  itemDistance = 200,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
  enableScrollChaining = true,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef<Map<number, Transform>>(new Map());
  const isUpdatingRef = useRef<boolean>(false);
  const lastScrollTimeRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Default configuration for SSR - prevents hydration mismatch
  const defaultConfig: ScrollStackConfig = {
    pinEndMultiplier: 0.8,
    maxTranslateY: 0.65,
    scrollBehavior: 'smooth',
    useHardwareAcceleration: true,
    containerHeight: 'min(85vh, 750px)'
  };

  // Browser-specific configuration - only applied after hydration
  const [browserConfig, setBrowserConfig] = useState<ScrollStackConfig>(defaultConfig);

  // Apply browser-specific configuration after hydration
  useEffect(() => {
    setBrowserConfig(getBrowserConfig());
  }, []);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number): number => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number): number => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value.toString());
  }, []);

  // Optimized updateCardTransforms with faster throttling
  const updateCardTransforms = useCallback((): void => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    const now = performance.now();
    // Faster throttling for better responsiveness - changed from 16ms to 4ms
    if (now - lastScrollTimeRef.current < 4) {
      return;
    }
    lastScrollTimeRef.current = now;

    isUpdatingRef.current = true;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    
    // Calculate end element position once
    const lastCard = cardsRef.current[cardsRef.current.length - 1];
    const endElementTop = lastCard ? 
      lastCard.offsetTop + lastCard.offsetHeight + (containerHeight * 0.3) : 
      scroller.scrollHeight;

    // Batch DOM updates
    const updates: Array<{ card: HTMLElement; transform: string; filter: string; zIndex: string }> = [];

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
      
      let pinEnd: number;
      if (i === cardsRef.current.length - 1) {
        pinEnd = endElementTop - (containerHeight * browserConfig.pinEndMultiplier);
      } else {
        pinEnd = endElementTop - containerHeight / 2;
      }

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Optimized blur calculation
      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCard = cardsRef.current[j];
          if (jCard) {
            const jCardTop = jCard.offsetTop;
            const jTriggerStart = jCardTop - stackPositionPx - (itemStackDistance * j);
            if (scrollTop >= jTriggerStart) {
              topCardIndex = j;
            }
          }
        }
        
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = -120;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i) - 80;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i) - 80;
      }

      // Add boundary limiting for translateY for the last card
      if (i === cardsRef.current.length - 1) {
        const maxAllowedTranslate = containerHeight * browserConfig.maxTranslateY;
        if (translateY > maxAllowedTranslate) {
          translateY = maxAllowedTranslate;
        }
      }

      // Optimized transform calculation with reduced precision
      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 100) / 100,
        rotation: Math.round(rotation * 10) / 10,
        blur: Math.round(blur * 10) / 10
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged = !lastTransform || 
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.5 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.01 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.5 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.5;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        updates.push({
          card,
          transform,
          filter,
          zIndex: i.toString()
        });
        
        lastTransformsRef.current.set(i, newTransform);
      }

      // Stack completion logic
      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    // Apply all DOM updates in a single batch
    updates.forEach(({ card, transform, filter, zIndex }) => {
      card.style.transform = transform;
      card.style.filter = filter;
      card.style.zIndex = zIndex;
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    browserConfig,
  ]);

  // Optimized scroll handler with faster debouncing
  const handleScroll = useCallback((e: Event): void => {
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Faster debounce for better responsiveness
    scrollTimeoutRef.current = setTimeout(() => {
      if (enableScrollChaining) {
        const scroller = e.target as HTMLDivElement;
        const { scrollTop, scrollHeight, clientHeight } = scroller;
        
        // More aggressive bottom detection for faster transition
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
        
        if (isNearBottom) {
          // Faster window scroll continuation - increased from 2 to 8
          const checkWindowScroll = () => {
            if (window.scrollY < document.documentElement.scrollHeight - window.innerHeight) {
              window.scrollBy(0, 8); // Increased from 2 to 8 for faster transition
            }
          };
          
          // Use requestAnimationFrame for smoother continuation
          requestAnimationFrame(checkWindowScroll);
        }
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
    }, 2);
  }, [updateCardTransforms, enableScrollChaining]);

  // Improved wheel handler for faster transition after 4th card
  const handleWheel = useCallback((e: WheelEvent): void => {
    if (!enableScrollChaining) return;
    
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { scrollTop, scrollHeight, clientHeight } = scroller;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 30; // More sensitive detection
    
    // Faster transition after 4th card - increased sensitivity and speed
    if (e.deltaY > 0 && isAtBottom) {
      e.preventDefault();
      // Increased scroll speed from 0.3 to 0.8 for faster transition
      window.scrollBy(0, e.deltaY * 0.8);
    } else if (e.deltaY < 0 && scrollTop <= 10) {
      e.preventDefault();
      window.scrollBy(0, e.deltaY * 0.8);
    }
  }, [enableScrollChaining]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;

    // Optimized card setup
    cards.forEach((card, i) => {
      card.style.position = 'relative';
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'center top';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.zIndex = i.toString();
      
      // Add margin between cards
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      
      // Raise the first card up
      if (i === 0) {
        card.style.marginTop = '-50px';
      }
    });

    // Use passive listeners for better performance
    const scrollListener = (e: Event) => handleScroll(e);
    scroller.addEventListener('scroll', scrollListener, { passive: true });
    
    if (enableScrollChaining) {
      scroller.addEventListener('wheel', handleWheel as EventListener, { passive: false });
    }
    
    // Initial update
    updateCardTransforms();

    // Optimized resize observer
    const resizeObserver = new ResizeObserver(() => {
      // Debounce resize updates
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
    });
    resizeObserver.observe(scroller);

    return () => {
      scroller.removeEventListener('scroll', scrollListener);
      if (enableScrollChaining) {
        scroller.removeEventListener('wheel', handleWheel as EventListener);
      }
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    handleScroll,
    handleWheel,
    updateCardTransforms,
    enableScrollChaining,
  ]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ultraWideStyles }} />
      <div
        className={`relative w-full overflow-y-auto overflow-x-hidden ${className}`.trim()}
        ref={scrollerRef}
        style={{ 
          height: browserConfig.containerHeight,
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: browserConfig.scrollBehavior,
          transform: browserConfig.useHardwareAcceleration ? 'translateZ(0)' : 'none',
          willChange: 'scroll-position',
          ...style
        }}
      >
        <div className="scroll-stack-inner pt-[5vh] px-4 md:px-6 lg:px-8 pb-[25vh]">
          {children}
          <div className="scroll-stack-end w-full h-px" />
        </div>
      </div>
    </>
  );
};

export default ScrollStack;
