"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface InfiniteScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  width?: string;
  maxHeight?: string;
  negativeMargin?: string;
  items?: InfiniteScrollItem[];
  itemMinHeight?: number;
  isTilted?: boolean;
  tiltDirection?: 'left' | 'right';
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: 'down' | 'up';
  pauseOnHover?: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  width = '30rem',
  maxHeight = '100%',
  negativeMargin = '-0.5em',
  items = [],
  itemMinHeight = 200,
  isTilted = true,
  tiltDirection = 'left',
  autoplay = true,
  autoplaySpeed = 0.3,
  autoplayDirection = 'down',
  pauseOnHover = true
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTiltTransform = (): string => {
    if (!isTilted) return 'none';
    return tiltDirection === 'left'
      ? 'rotateX(20deg) rotateZ(-20deg) skewX(20deg)'
      : 'rotateX(20deg) rotateZ(20deg) skewX(-20deg)';
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight = itemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

    // Simple wheel event handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const distance = -e.deltaY * 0.5;
      divItems.forEach(child => {
        gsap.to(child, {
          duration: 0.5,
          ease: 'expo.out',
          y: `+=${distance}`,
          modifiers: {
            y: gsap.utils.unitize(wrapFn)
          }
        });
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    let rafId: number;
    if (autoplay) {
      const directionFactor = autoplayDirection === 'down' ? 1 : -1;
      const speedPerFrame = autoplaySpeed * directionFactor;

      const tick = () => {
        divItems.forEach(child => {
          gsap.set(child, {
            y: `+=${speedPerFrame}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn)
            }
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);
        const startTicker = () => {
          rafId = requestAnimationFrame(tick);
        };

        container.addEventListener('mouseenter', stopTicker);
        container.addEventListener('mouseleave', startTicker);

        return () => {
          container.removeEventListener('wheel', handleWheel);
          stopTicker();
          container.removeEventListener('mouseenter', stopTicker);
          container.removeEventListener('mouseleave', startTicker);
        };
      } else {
        return () => {
          container.removeEventListener('wheel', handleWheel);
          rafId && cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [items, autoplay, autoplaySpeed, autoplayDirection, pauseOnHover, isTilted, tiltDirection, negativeMargin]);

  return (
    <>
      <style>
        {`
          .infinite-scroll-wrapper {
            max-height: ${maxHeight};
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            overflow: hidden;
            overscroll-behavior: none;
          }

          .infinite-scroll-wrapper::before,
          .infinite-scroll-wrapper::after {
            content: '';
            position: absolute;
            background: linear-gradient(var(--dir, to bottom), rgba(0,0,0,0.8), transparent);
            height: 25%;
            width: 100%;
            z-index: 1;
            pointer-events: none;
          }

          .infinite-scroll-wrapper::before {
            top: 0;
          }

          .infinite-scroll-wrapper::after {
            --dir: to top;
            bottom: 0;
          }

          .infinite-scroll-container {
            width: ${width};
            display: flex;
            flex-direction: column;
            overscroll-behavior: contain;
            padding-inline: 1rem;
            cursor: grab;
            transform-origin: center center;
          }

          .infinite-scroll-item {
            height: ${itemMinHeight}px;
            margin-top: ${negativeMargin};
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            font-size: 1.25rem;
            font-weight: 600;
            text-align: center;
            user-select: none;
            box-sizing: border-box;
            position: relative;
          }
        `}
      </style>

      <div className="infinite-scroll-wrapper" ref={wrapperRef}>
        <div
          className="infinite-scroll-container"
          ref={containerRef}
          style={{
            transform: getTiltTransform()
          }}
        >
          {items.map((item, i) => (
            <div className="infinite-scroll-item" key={i}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
