"use client";

import { useEffect, useState } from "react";

export default function AboutScrollStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const items = [
    "Revolutionize your marketing",
    "Harness the power of AI",
    "Scale your growth with Mononio AI",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="text-3xl md:text-4xl font-bold text-purple-400 min-h-[4rem] flex items-center justify-center">
        <div className="transition-all duration-1000 ease-in-out transform">
          {items[currentIndex]}
        </div>
      </div>
    </div>
  );
} 