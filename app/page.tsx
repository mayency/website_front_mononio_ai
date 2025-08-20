"use client";

import Navbar from "./components/Navbar";
import LogoCloud from "./components/LogoCloud";
import InteractiveButtons from "./components/InteractiveButtons";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full Width */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black w-full">
        {/* 🎥 רקע וידאו */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/Abstract_Neon_Clouds1.mp4" type="video/mp4" />
        </video>

        {/* 🌑 שכבת שקיפות לשיפור קריאות */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Navbar overlay */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div>

        {/* ✨ תוכן ההירו */}
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl font-extrabold mb-6">Mononio AI ✨</h1>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            הפלטפורמה החכמה שמעצימה את העסק שלך עם בינה מלאכותית מתקדמת.
          </p>
          <div className="mt-8">
            <InteractiveButtons />
          </div>
        </div>
      </section>
      
      {/* Rest of content */}
      <div className="bg-gray-900 text-white">
        <main>
          <LogoCloud />
        </main>
      </div>
    </>
  );
}
