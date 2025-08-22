"use client";

import Navbar from "./components/Navbar";
import LogoCloud from "./components/LogoCloud";
import CampaignBox from "./components/CampaignBox";
import MagicBento from "./components/MagicBento";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black w-full">
        {/* 🎥 Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/Abstract_Neon_Clouds1.mp4" type="video/mp4" />
        </video>

        {/* 🌑 Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* 📌 Navbar */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div>

        {/* ✨ Logo */}
        <div className="relative z-10 text-center text-white px-6">
          <img
            src="/brand/Mononio_Logo.png"
            alt="Mononio AI Logo"
            className="mx-auto mb-6 w-96 md:w-[30rem] lg:w-[36rem] drop-shadow-lg"
          />
        </div>

        {/* 📦 Campaign Box */}
        <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 z-20 w-full flex justify-center">
          <CampaignBox />
        </div>
      </section>

      {/* 🌟 Woman Jumping Overlay */}
      <div className="relative z-30 flex justify-center -mt-32 mb-[-4rem]">
        <div className="woman-jumping w-[280px] h-[380px] md:w-[340px] md:h-[460px]" />
      </div>

      {/* 🌟 About Section */}
      <section
        id="about"
        className="bg-gray-900 text-white py-24 px-6 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">About Mononio AI</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-300">
          Our vision is to revolutionize marketing with AI-powered automation.
          We empower businesses with smart campaigns, customer insights, and
          integrations that scale with your growth.
        </p>
      </section>

      {/* 🌟 Platform Section */}
      <section
        id="platform"
        className="bg-black text-white py-24 px-6 text-center relative z-10"
      >
        <h2 className="text-4xl font-bold mb-6">The Mononio Platform</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">
          Discover our features, pricing, and integrations that help you run
          campaigns smarter and faster.
        </p>

        {/* ✨ MagicBento with 3 glowing cards */}
        <div className="max-w-6xl mx-auto">
          <MagicBento
            cards={[
              {
                label: "Capabilities",
                title: "Features",
                description:
                  "Powerful AI-driven tools to automate your campaigns and maximize ROI.",
              },
              {
                label: "Plans",
                title: "Pricing",
                description:
                  "Flexible plans for startups, SMBs, and enterprises. Scale at your pace.",
              },
              {
                label: "Connectivity",
                title: "Integrations",
                description:
                  "Works seamlessly with platforms like Taboola, Outbrain, and more.",
              },
            ]}
          />
        </div>
      </section>

      {/* 🌟 Contact Section */}
      <section
        id="contact"
        className="bg-gray-900 text-white py-24 px-6 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
          Have questions or want to see Mononio in action? Reach out and let’s
          make something amazing together.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="mailto:info@mononio.ai"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
          >
            Contact Us
          </a>
          <a
            href="#demo"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Book a Demo
          </a>
        </div>
      </section>

      {/* Logos Carousel */}
      <div className="bg-gray-950 text-white">
        <main>
          <LogoCloud />
        </main>
      </div>
    </>
  );
}
