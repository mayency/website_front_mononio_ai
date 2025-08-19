"use client";

import Link from "next/link";

export default function InteractiveButtons() {
  const handleGetStarted = () => {
    console.log("Clicked Get Started!");
    // כאן תוכל להוסיף ניווט, למשל: window.location.href = "/app/onboarding/1";
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <button
        onClick={handleGetStarted}
        className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
        aria-label="Get started"
      >
        Get started
      </button>
      <Link
        href="/features"
        className="border border-gray-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
      >
        See features
      </Link>
    </div>
  );
} 