"use client";

import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

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
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef(false);
  const { logout } = useAuth();
  const router = useRouter();

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 280;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const topBar = 80;
        const padding = 16;
        const cards = contentEl.querySelectorAll(".nav-card");
        let totalHeight = 0;
        
        cards.forEach((card) => {
          totalHeight += (card as HTMLElement).offsetHeight + 8;
        });
        
        return topBar + totalHeight + padding;
      }
    }
    return 280;
  }, []);

  // Initialize timeline once
  useEffect(() => {
    if (!navRef.current) return;

    gsap.set(navRef.current, { height: 80, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({ 
      paused: true,
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
      onReverseComplete: () => {
        isAnimatingRef.current = false;
      }
    });

    tl.to(navRef.current, {
      height: calculateHeight(),
      duration: 0.6,
      ease: ease,
    })
    .to(cardsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out",
    }, "-=0.3");

    tlRef.current = tl;
  }, [calculateHeight, ease]);

  const toggleMenu = useCallback(() => {
    if (isAnimatingRef.current) return;

    const tl = tlRef.current;
    if (!tl) return;

    if (isExpanded) {
      tl.reverse();
      setIsExpanded(false);
    } else {
      tl.play();
      setIsExpanded(true);
    }
  }, [isExpanded]);

  const handleLinkClick = (e: React.MouseEvent, href: string, label: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (label === "Logout") {
      logout();
      router.push("/");
      return;
    }

    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }

    closeMenu();
  };

  const closeMenu = () => {
    if (isExpanded && !isAnimatingRef.current) {
      const tl = tlRef.current;
      if (tl) {
        tl.reverse();
        setIsExpanded(false);
      }
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${
          isExpanded ? "open" : ""
        } block h-[80px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height] bg-white dark:bg-gray-900 transition-shadow hover:shadow-lg`}
        style={{ minHeight: '80px' }}
      >
        {/* Top bar with logo */}
        <div 
          className="card-nav-top absolute inset-x-0 top-0 h-[80px] flex items-center justify-between px-4 z-[1] cursor-pointer"
          onClick={toggleMenu}
        >
          {/* Empty space for balance */}
          <div className="w-8"></div>

          {/* Logo container */}
          <div
            className="logo-container flex items-center justify-center flex-1 py-2"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              height: '80px',
              position: 'relative',
              zIndex: 0
            }}
          >
            <Link
              href="/"
              aria-label="Go to homepage"
              tabIndex={0}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:ring-offset-2 rounded-lg inline-block"
            >
              <img
                src={logo}
                alt={logoAlt}
                style={{
                  height: '300px',
                  width: 'auto',
                  objectFit: 'contain',
                  maxHeight: '100%',
                  display: 'block',
                  marginTop: '30px'
                }}
                className="drop-shadow-xl transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* Menu indicator */}
          <div className="flex items-center justify-center w-8 h-8 relative z-10">
            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600 dark:text-gray-300"
              >
                <path 
                  d="M5 7.5L10 12.5L15 7.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Menu content - FIXED: Removed aria-hidden to fix accessibility warning */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[80px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[10] ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-[12px]`}
          style={{
            backgroundColor: isExpanded ? 'rgb(255 255 255 / 0.95)' : 'transparent',
            backdropFilter: isExpanded ? 'blur(8px)' : 'none',
            transition: 'background-color 0.3s ease'
          }}
        >
          {(items || []).slice(0, 4).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] shadow-sm"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-semibold tracking-[-0.5px] text-[18px] md:text-[20px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[4px]">
                {item.links?.map((lnk, i) => (
                  <button
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-all duration-200 hover:opacity-80 hover:translate-x-1 text-[14px] md:text-[15px] text-left border-none bg-transparent p-1 rounded"
                    aria-label={lnk.ariaLabel}
                    onClick={(e) => handleLinkClick(e, lnk.href, lnk.label)}
                    style={{ color: "inherit" }}
                  >
                    <GoArrowUpRight
                      className="nav-card-link-icon shrink-0"
                      aria-hidden="true"
                    />
                    <span>{lnk.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
