'use client';

import React from 'react';

import MagicBento from './MagicBento';

export default function ComparisonCards() { 
  const magicBentoCards = [ 
    { 
      title: "Works With Everything", 
      description: "Connects to all major platforms: Facebook, Google, TikTok, LinkedIn, Instagram, YouTube, WhatsApp, and 20+ more", 
      icon: "integrations", 
      category: "Connectivity" 
    }, 
    { 
      title: "Agency vs MONONIO", 
      description: "Compare: $5K-15K/month for agencies vs $297/month for better results. Save 90% and own your campaigns", 
      icon: "price", 
      category: "Plans" 
    }, 
    { 
      title: "See Live Demo", 
      description: "Watch real campaigns being created in real-time. See exactly how it works before you commit to anything", 
      icon: "features", 
      category: "Capabilities" 
    } 
  ]; 

  return ( 
    <section className="py-24 bg-black relative overflow-hidden"> 
      {/* Background gradient effect */} 
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10" /> 

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8"> 
        {/* Section Header */} 
        <div className="text-center mb-16"> 
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"> 
            Ready to See What 
            <span className="text-red-500">$15K/Month</span>{' '} 
            Agencies Don't Want You to Know 
          </h2> 
          <p className="text-lg text-gray-400 max-w-3xl mx-auto"> 
            Everything you need to replace expensive agencies and run campaigns that actually make money 
          </p> 
        </div> 

        {/* MagicBento Cards */} 
        <MagicBento cards={magicBentoCards} /> 
      </div> 
    </section> 
  );
}
