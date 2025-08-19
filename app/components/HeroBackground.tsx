"use client";

import DarkVeil from "./DarkVeil";

export default function HeroBackground() {
  return (
    <div className="w-full h-screen relative bg-[#0a0a0a]">
      <DarkVeil
        speed={1.8}
        hueShift={32}
        noiseIntensity={0}
        scanlineFrequency={1.9}
        scanlineIntensity={0}
        warpAmount={5}
        resolutionScale={2}
      />
    </div>
  );
} 