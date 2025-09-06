import React, { useLayoutEffect, useRef, useCallback, ReactNode, memo } from "react";

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
  itemDistance = 200,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef<Map<number, Transform>>(new Map());

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

  const updateCardTransforms = useCallback((): void => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length) return;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const cardHeight = card.offsetHeight;
      
      // Calculate trigger points for this card
      const triggerStart = cardTop - stackPositionPx;
      const triggerEnd = cardTop - scaleEndPositionPx;
      
      // When should this card start pinning
      const pinStart = triggerStart - (itemStackDistance * i);
      
      // When should this card stop pinning (based on container end)
      const lastCard = cardsRef.current[cardsRef.current.length - 1];
      const containerEnd = lastCard ? lastCard.offsetTop + lastCard.offsetHeight : scroller.scrollHeight;
      const pinEnd = containerEnd - containerHeight + stackPositionPx + (itemStackDistance * (cardsRef.current.length - 1));

      // Calculate progress
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);

      // Calculate translateY
      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        // Card is pinned
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        // Card has reached its final position
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      // Calculate rotation if needed
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Calculate blur
      let blur = 0;
      if (blurAmount && i > 0) {
        // Find which card is currently on top
        let topCardIndex = 0;
        for (let j = cardsRef.current.length - 1; j >= 0; j--) {
          const jCard = cardsRef.current[j];
          if (jCard) {
            const jPinStart = jCard.offsetTop - stackPositionPx - (itemStackDistance * j);
            if (scrollTop >= jPinStart) {
              topCardIndex = j;
              break;
            }
          }
        }
        
        // Apply blur to cards below the top card
        if (i < topCardIndex) {
          blur = (topCardIndex - i) * blurAmount;
        }
      }

      // Apply transform
      const transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      const filter = blur > 0 ? `blur(${blur}px)` : '';
      
      card.style.transform = transform;
      card.style.filter = filter;
      
      // Set z-index (cards at the top of the array should be on top visually)
      card.style.zIndex = (cardsRef.current.length - i).toString();
    });

    // Check if all cards are stacked
    const lastCard = cardsRef.current[cardsRef.current.length - 1];
    if (lastCard) {
      const lastPinStart = lastCard.offsetTop - stackPositionPx - (itemStackDistance * (cardsRef.current.length - 1));
      const isComplete = scrollTop >= lastPinStart + 100;
      
      if (isComplete && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete?.();
      } else if (!isComplete && stackCompletedRef.current) {
        stackCompletedRef.current = false;
      }
    }
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
  ]);

  const handleScroll = useCallback((): void => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
    cardsRef.current = cards;

    // Set initial styles
    cards.forEach((card, i) => {
      card.style.position = 'relative';
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'center top';
      card.style.zIndex = (i + 1).toString(); // כרטיסיות מאוחרות יותר מעל
      
      // Add margin between cards
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    const scrollListener = () => handleScroll();
    scroller.addEventListener('scroll', scrollListener, { passive: true });
    
    // Initial update
    updateCardTransforms();

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      updateCardTransforms();
    });
    resizeObserver.observe(scroller);

    return () => {
      scroller.removeEventListener('scroll', scrollListener);
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [
    itemDistance,
    handleScroll,
    updateCardTransforms,
  ]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ultraWideStyles }} />
      <div
        className={`scroll-stack-container relative w-full h-screen overflow-y-auto overflow-x-hidden ${className}`.trim()}
        ref={scrollerRef}
        style={{ 
          overscrollBehavior: 'auto',
          scrollBehavior: 'smooth',
        }}
      >
        <div className="scroll-stack-inner pt-[20vh] px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pb-[50vh]">
          {children}
        </div>
      </div>
    </>
  );
};

export default ScrollStack;