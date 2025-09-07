"use client";

import React from "react";
import Image from "next/image";

export default function LogoCloud() {
  const logos = [
    { name: "Facebook", src: "/logos/facebook_logo.png", width: 80, height: 80 },
    { name: "Google Ads", src: "/logos/Google_Ads_Logo.png", width: 125, height: 100 },
    { name: "Meta", src: "/logos/Meta_Logo.png", width: 200, height: 80 },
    { name: "TikTok", src: "/logos/tiktok_logo.png", width: 70, height: 80 },
    { name: "LinkedIn", src: "/logos/Linkedin_Logo.png", width: 180, height: 80 },
    { name: "X", src: "/logos/x_logo.png", width: 80, height: 80 },
    { name: "Instagram", src: "/logos/instagram_logo.png", width: 80, height: 80 },
    { name: "YouTube", src: "/logos/youtube_logo.png", width: 160, height: 80 },
    { name: "WhatsApp", src: "/logos/whatsapp_logo.png", width: 80, height: 80 },
    { name: "Telegram", src: "/logos/telegram_logo.png", width: 80, height: 80 },
    { name: "Taboola", src: "/logos/taboola_logo.png", width: 160, height: 80 },
    { name: "Outbrain", src: "/logos/outbrain_logo.png", width: 168, height: 80 },
  ];

  return (
    <div className="bg-gray-900 py-12 sm:py-16 overflow-hidden">
      <div className="w-full">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-400 mb-10">
          Deploy campaigns across the platforms you already use
        </h2>

        {/* Viewport */}
        <div className="relative w-full overflow-x-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />

          {/* Two identical tracks (A follows B) */}
          <div className="marquee-viewport">
            <div className="marquee-track marquee-a">
              {logos.map((logo) => (
                <div key={`A-${logo.name}`} className="px-8 md:px-12 flex items-center">
                  <Image
                    className="logo-img block w-auto object-contain
                               grayscale brightness-75 opacity-60
                               hover:grayscale-0 hover:brightness-100 hover:opacity-100
                               transition-transform duration-500 ease-out hover:scale-110 cursor-pointer"
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="marquee-track marquee-b" aria-hidden="true">
              {logos.map((logo) => (
                <div key={`B-${logo.name}`} className="px-8 md:px-12 flex items-center">
                  <Image
                    className="logo-img block w-auto object-contain
                               grayscale brightness-75 opacity-60
                               hover:grayscale-0 hover:brightness-100 hover:opacity-100
                               transition-transform duration-500 ease-out hover:scale-110 cursor-pointer"
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
      </div>

      <style jsx>{`
        /* גובה נדיב ל־viewport כדי שלא יהיה חיתוך אנכי */
        .marquee-viewport {
          position: relative;
          height: 6.5rem;           /* 104px – אפשר להגדיל/להקטין לפי הטעם */
        }

        /* גובה אחיד לכל הלוגואים – לא נגזר מגודל הקבצים עצמם */
        .logo-img {
          height: 4rem;             /* 64px */
        }
        @media (min-width: 768px) {
          .logo-img {
            height: 4.75rem;        /* ~76px במסכים רחבים יותר */
          }
        }

        .marquee-track {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);   /* מרכז אנכית מבלי להיחתך */
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          height: auto;
          width: max-content;            /* רוחב לפי סך התוכן */
          line-height: 0;                /* מנטרל baseline שיכול לייצר חיתוך מוזר */
          will-change: transform;
        }

        /* A: 0 -> -100% מהרוחב שלה */
        .marquee-a {
          animation: scroll-a 35s linear infinite;
        }
        /* B: 100% -> 0 (נכנסת מיד אחרי A) */
        .marquee-b {
          animation: scroll-b 35s linear infinite;
        }

        .marquee-viewport:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes scroll-a {
          from { transform: translate(-0%, -50%); }
          to   { transform: translate(-100%, -50%); }
        }
        @keyframes scroll-b {
          from { transform: translate(100%, -50%); }
          to   { transform: translate(0%, -50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}
