'use client';

import { useState, useEffect } from 'react';

export default function LiveStats() {
  const [campaigns, setCampaigns] = useState(2847);
  const [lastLaunch, setLastLaunch] = useState('3 minutes ago');

  useEffect(() => {
    const interval = setInterval(() => {
      setCampaigns(prev => prev + Math.floor(Math.random() * 5));
      const minutes = Math.floor(Math.random() * 10) + 1;
      setLastLaunch(`${minutes} minute${minutes > 1 ? 's' : ''} ago`);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm md:text-base mb-8">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-gray-300">
          <span className="text-white font-semibold">{campaigns.toLocaleString()}</span> campaigns live now
        </span>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <span className="text-gray-300">
          Last launch: <span className="text-green-400">{lastLaunch}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-300">
          Avg ROAS: <span className="text-green-400 font-semibold">4.2x</span>
        </span>
      </div>
    </div>
  );
}
