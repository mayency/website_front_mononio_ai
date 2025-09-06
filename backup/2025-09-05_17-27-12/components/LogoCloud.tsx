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
    { name: "Outbrain", src: "/logos/outbrain_logo.png", width: 140, height: 80 },
  ];

  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="bg-gray-900 py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-400 mb-10">
          Deploy campaigns across the platforms you already use
        </h2>
        <div className="relative">
          <div className="flex animate-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 px-8">
                <Image
                  className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}