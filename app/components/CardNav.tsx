"use client";

import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = useCallback(() => {
    const cardHeight = 80;
    const itemsPerRow = 3;
    const rows = Math.ceil(items.length / itemsPerRow);
    const spacing = 16;
    return cardHeight + rows * (cardHeight + spacing) + spacing;
  }, []);

  const createTimeline = useCallback(() => {
    const tl = gsap.timeline({ paused: true });
    const newHeight = calculateHeight();

    tl.to(navRef.current, {
      height: newHeight,
      duration: 0.6,
      ease: ease,
    })
      .from(
        cardsRef.current,
        {
          y: -50,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: ease,
        },
        "-=0.2"
      )
      .from(
        ".card-nav-link",
        {
          y: 20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.02,
          ease: ease,
        },
        "-=0.1"
      );

    return tl;
  }, [ease, items.length, calculateHeight]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [createTimeline]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        const tl = createTimeline();
        tlRef.current = tl;
        tl.progress(1);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, createTimeline]);

  const toggleExpanded = () => {
    if (!tlRef.current) return;

    if (isExpanded) {
      tlRef.current.reverse();
    } else {
      tlRef.current.play();
    }
    setIsExpanded(!isExpanded);
  };

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <div className={`card-nav-container w-full ${className}`}>
      <div
        ref={navRef}
        className="card-nav bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden relative h-[80px] transition-all duration-300"
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[80px] flex items-center justify-between px-80 z-[2]">
          <div className="w-6"></div>

          {/* Logo - doesn't trigger toggle */}
          <div
            className="logo-container flex items-center justify-center flex-1 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href="/"
              aria-label="Go to homepage"
              tabIndex={0}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:ring-offset-2 rounded-lg"
            >
              <Image
                src={logo}
                alt={logoAlt}
                width={120}
                height={60}
                className="h-[22px] sm:h-[28px] lg:h-[31px] xl:h-[39px] 2xl:h-[45px] w-auto object-contain drop-shadow-xl transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleExpanded}
            className="toggle-btn w-6 h-6 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:ring-offset-2 rounded"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            aria-expanded={isExpanded}
          >
            <div className="relative w-4 h-4">
              <span
                className={`absolute top-0 left-0 w-full h-0.5 bg-current transform transition-transform duration-300 ${
                  isExpanded ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 w-full h-0.5 bg-current transition-opacity duration-300 ${
                  isExpanded ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute top-3 left-0 w-full h-0.5 bg-current transform transition-transform duration-300 ${
                  isExpanded ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="card-nav-content absolute inset-x-0 top-[80px] px-6 pb-6">
          <div className="grid grid-cols-3 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => addToRefs(el, index)}
                className="card-nav-item p-4 rounded-xl transition-transform duration-200 hover:scale-105"
                style={{
                  backgroundColor: item.bgColor,
                  color: item.textColor,
                }}
              >
                <h3 className="font-semibold mb-3 text-lg">{item.label}</h3>
                <div className="space-y-2">
                  {item.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="card-nav-link block text-sm opacity-80 hover:opacity-100 transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:ring-offset-1 rounded"
                      aria-label={link.ariaLabel}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNav;
