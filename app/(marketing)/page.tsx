"use client";

import DarkVeil from "@/app/components/DarkVeil";

export default function TestPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={210}
          noiseIntensity={0.02}
          scanlineIntensity={0.15}
          scanlineFrequency={2.5}
          warpAmount={0.05}
          speed={0.6}
          resolutionScale={1.2}
        />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Echo</h1>
          <p className="text-xl opacity-90">Your content goes here</p>
        </div>
      </div>
    </div>
  );
}
