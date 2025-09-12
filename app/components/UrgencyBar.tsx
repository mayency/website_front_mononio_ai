'use client';

import { useState, useEffect } from 'react';

export default function UrgencyBar() {
  const [businessCount, setBusinessCount] = useState(47);
  const [timeLeft, setTimeLeft] = useState('3 days');

  useEffect(() => {
    const interval = setInterval(() => {
      setBusinessCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 text-center text-sm md:text-base">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        <span className="animate-pulse">⚡</span>
        <span>{businessCount} businesses ditched their agencies this week</span>
        <span className="hidden md:inline">•</span>
        <span className="font-semibold">Save $8,500/month</span>
        <span className="hidden md:inline">•</span>
        <span>Limited spots: {timeLeft}</span>
      </div>
    </div>
  );
}
