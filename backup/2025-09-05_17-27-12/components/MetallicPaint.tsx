"use client";

import { ReactNode } from "react";

interface MetallicPaintProps {
  children: ReactNode;
  speed?: number;
}

export const MetallicPaint = ({ 
  children, 
  speed = 0.6
}: MetallicPaintProps) => {
  return (
    <div 
      className="relative overflow-hidden metallic-shine"
      style={{
        background: `linear-gradient(45deg, 
          rgba(255,255,255,0.1) 0%, 
          rgba(255,255,255,0.3) 25%, 
          rgba(255,255,255,0.1) 50%, 
          rgba(255,255,255,0.3) 75%, 
          rgba(255,255,255,0.1) 100%)`,
        backgroundSize: '200% 200%',
        animation: `metallic-shine ${speed}s ease-in-out infinite`,
      }}
    >
      {children}
    </div>
  );
}; 