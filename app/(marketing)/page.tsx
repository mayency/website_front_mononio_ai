import React from "react";
import Image from "next/image";

export default function MarketingPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black w-full">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/Abstract_Neon_Clouds1.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6">
        <Image
          src="/brand/Mononio_Logo.png"
          alt="Mononio AI Logo"
          width={288}
          height={288}
          className="mx-auto mb-6 w-48 md:w-64 lg:w-72 drop-shadow-lg"
          priority
        />
        <p className="text-lg mb-8 max-w-xl mx-auto">
          The intelligent platform that empowers your business with advanced artificial intelligence.
        </p>
        <button className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-lg font-semibold shadow-lg transition">
          Learn More
        </button>
      </div>
    </section>
  );
}
