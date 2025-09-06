"use client";

import React, { useRef, useEffect } from "react";

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Lazy load video when component mounts
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  return (
    <div className="w-full h-screen relative bg-[#0a0a0a] overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata" // Only load metadata initially
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        poster="/brand/Mononio_Logo.png" // Fallback image while video loads
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
    </div>
  );
} 