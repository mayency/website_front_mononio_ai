"use client";

import Navbar from "./components/Navbar";
import LogoCloud from "./components/LogoCloud";
import CampaignBox from "./components/CampaignBox";

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

      {/* 🌟 About Section */}
      <section id="about" className="bg-gray-900 text-white py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">About Mononio AI</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-300">
          Our vision is to revolutionize marketing with AI-powered automation.  
          We empower businesses with smart campaigns, customer insights,  
          and integrations that scale with your growth.
        </p>
      </section>

      {/* 🌟 Platform Section */}
      <section id="platform" className="bg-black text-white py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">The Mononio Platform</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">
          Discover our features, pricing, and integrations that help you run  
          campaigns smarter and faster.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-gray-800 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Features</h3>
            <p className="text-gray-400">
              Powerful AI-driven tools to automate your campaigns and maximize ROI.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-800 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Pricing</h3>
            <p className="text-gray-400">
              Flexible plans for startups, SMBs, and enterprises. Scale at your pace.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-800 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Integrations</h3>
            <p className="text-gray-400">
              Works seamlessly with platforms like Taboola, Outbrain, and more.
            </p>
          </div>
        </div>
      </section>

      {/* 🌟 Contact Section */}
      <section id="contact" className="bg-gray-900 text-white py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
          Have questions or want to see Mononio in action?  
          Reach out and let’s make something amazing together.
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
