"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export interface MagicBentoCard {
  color?: string;
  title: string;
  description: string;
  label?: string;
}

export interface MagicBentoProps {
  cards: MagicBentoCard[];
  particleCount?: number;
  glowColor?: string;
}

const DEFAULT_PARTICLE_COUNT = 10;
const DEFAULT_GLOW_COLOR = "132, 0, 255";

// ✨ קומפוננטת כרטיס בודד
const ParticleCard: React.FC<{
  card: MagicBentoCard;
  particleCount: number;
  glowColor: string;
}> = ({ card, particleCount, glowColor }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ top: string; left: string }[]>([]);

  // ⚡ צור חלקיקים רק בצד הלקוח (ללא hydration mismatch)
  useEffect(() => {
    const arr = Array.from({ length: particleCount }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setParticles(arr);
  }, [particleCount]);

  // ✨ Tilt + Magnetism + Ripple
  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(el, {
        rotateX,
        rotateY,
        x: (x - centerX) * 0.05,
        y: (y - centerY) * 0.05,
        duration: 0.2,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleClick = () => {
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: 200%;
        height: 200%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor},0.4) 0%, transparent 70%);
        left: -50%;
        top: -50%;
        pointer-events: none;
      `;
      el.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("click", handleClick);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("click", handleClick);
    };
  }, [glowColor]);

  return (
    <div
      ref={cardRef}
      className="relative p-6 rounded-xl border border-gray-700 shadow-lg transition-all duration-300 ease-in-out bg-[#060010] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(132,0,255,0.8)] hover:border-purple-400"
      style={{ color: "white" }}
    >
      {/* Glow Effect על Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-500/0 to-blue-600/0 hover:from-purple-600/10 hover:via-purple-500/5 hover:to-blue-600/10 rounded-xl transition-all duration-300 pointer-events-none"></div>
      
      {/* 🌌 Particles */}
      {particles.map((p, idx) => (
        <div
          key={idx}
          className="particle absolute w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-pulse"
          style={{
            top: p.top,
            left: p.left,
          }}
        />
      ))}

      <div className="relative z-10">
        {card.label && (
          <span className="text-sm text-purple-400 block mb-2">{card.label}</span>
        )}
        <h3 className="font-semibold text-xl mb-2">{card.title}</h3>
        <p className="text-base text-gray-300">{card.description}</p>
      </div>
    </div>
  );
};

// ✨ קומפוננטה הראשית
const MagicBento: React.FC<MagicBentoProps> = ({
  cards,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
      {cards.map((card, idx) => (
        <ParticleCard
          key={idx}
          card={card}
          particleCount={particleCount}
          glowColor={glowColor}
        />
      ))}
    </div>
  );
};

export default MagicBento;