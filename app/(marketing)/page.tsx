"use client";

export default function MarketingPage() {
  return (
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

      {/* ✨ תוכן ההירו */}
      <div className="relative z-10 text-center text-white px-6">
        <img
          src="/logos/Mononio_Logo_1.png"
          alt="Mononio AI Logo"
          className="mx-auto mb-6 w-48 md:w-64 lg:w-72 drop-shadow-lg"
        />
        <p className="text-lg mb-8 max-w-xl mx-auto">
          הפלטפורמה החכמה שמעצימה את העסק שלך עם בינה מלאכותית מתקדמת.
        </p>
        <button className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-lg font-semibold shadow-lg transition">
          גלה עוד
        </button>
      </div>
    </section>
  );
}
