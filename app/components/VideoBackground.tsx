"use client";

import React from "react";

export default function VideoBackground() {
  return (
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
  );
}
