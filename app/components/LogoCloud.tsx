"use client";

import React from "react";
import Image from "next/image";

export default function LogoCloud() {
  const logos = [
    { name: "Facebook", src: "/logos/facebook_logo.png", width: 200, height: 80 },
    { name: "Google Ads", src: "/logos/Google_Ads_Logo.png", width: 160, height: 80 },
    { name: "Meta", src: "/logos/Meta_Logo.png", width: 200, height: 80 },
    { name: "TikTok", src: "/logos/tiktok_logo.png", width: 120, height: 80 },
    { name: "LinkedIn", src: "/logos/Linkedin_Logo.png", width: 180, height: 80 },
    { name: "X", src: "/logos/x_logo.png", width: 80, height: 80 },
    { name: "Instagram", src: "/logos/instagram_logo.png", width: 80, height: 80 },
    { name: "YouTube", src: "/logos/youtube_logo.png", width: 184, height: 80 },
    { name: "WhatsApp", src: "/logos/whatsapp_logo.png", width: 120, height: 80 },
    { name: "Telegram", src: "/logos/telegram_logo.png", width: 120, height: 80 },
    { name: "Taboola", src: "/logos/taboola_logo.png", width: 160, height: 80 },
    { name: "Outbrain", src: "/logos/outbrain_logo.png", width: 140, height: 80 }
  ];

  // Duplicate logos multiple times for smoother infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="bg-gray-900 py-12 sm:py-16 w-full overflow-hidden">
      {/* Title */}
      <div className="text-center mb-10 px-6">
        <h2 className="text-lg font-semibold leading-8 text-gray-400">
          Deploy campaigns across the platforms you already use
        </h2>
      </div>
      
      {/* Logo carousel - Full width edge to edge */}
      <div className="relative w-full">
        {/* Gradient fade effects on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling logos container */}
        <div className="flex animate-scroll-logos-rtl">
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.name}-${index}`} 
              className="flex-shrink-0 flex items-center justify-center px-8 md:px-12"
            >
              <Image
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                src={logo.src}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}