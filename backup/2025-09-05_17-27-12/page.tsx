import Image from "next/image";
import Navbar from "./components/Navbar";
import LogoCloud from "./components/LogoCloud";
import CampaignBox from "./components/CampaignBox";
import MagicBento from "./components/MagicBento";
import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black w-full">
        {/* Background Options */}
        <div className="absolute inset-0 w-full h-full">
          {/* Try video first */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 hidden lg:block"
          >
            <source src="/videos/Abstract_Neon_Clouds1.mp4" type="video/mp4" />
          </video>
          
          {/* Always show gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30" />
          
          {/* Animated background particles/dots */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-400" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-800" />
          </div>
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Navbar */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
            
            {/* Logo - Properly sized */}
            <div className="mb-6 animate-fade-in">
              <Image
                src="/brand/Mononio_Logo.png"
                alt="Mononio AI"
                className="h-auto w-[180px] sm:w-[200px] md:w-[220px] lg:w-[250px] object-contain"
                width={250}
                height={80}
                priority
              />
            </div>

            {/* Main Headline */}
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-slide-up leading-tight">
              AI-Powered Marketing
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">
                That Delivers Results
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mb-8 max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 animate-slide-up animation-delay-200 px-4">
              Automate your campaigns across all major platforms with intelligent AI agents. 
              Save time, increase ROI, and scale effortlessly.
            </p>

            {/* Trust Indicators */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-400 animate-fade-in animation-delay-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>10x Better ROI</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span>5-Min Setup</span>
              </div>
            </div>

            {/* Campaign Form with glow */}
            <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl animate-scale-in animation-delay-600">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse" />
                <div className="relative">
                  <CampaignBox />
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-12 text-center animate-fade-in animation-delay-800">
              <p className="text-sm text-gray-400 mb-3">Trusted by 500+ marketing teams</p>
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-300">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 py-16 px-4 sm:px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                10x
              </div>
              <div className="text-sm text-gray-400">Average ROI</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm text-gray-400">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-sm text-gray-400">AI Optimization</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                5min
              </div>
              <div className="text-sm text-gray-400">Setup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Platform Section */}
      <section
        id="platform"
        className="bg-black text-white py-16 sm:py-24 px-4 sm:px-6 text-center relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">The Mononio Platform</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">
            Discover our features, pricing, and integrations that help you run
            campaigns smarter and faster.
          </p>

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

      {/* Contact Section */}
      <section
        id="contact"
        className="bg-gray-900 text-white py-16 sm:py-24 px-4 sm:px-6 text-center relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
            Ready to transform your marketing? Let's discuss how Mononio AI can help
            your business grow.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105">
            Contact Us
          </button>
        </div>
      </section>

      {/* Logo Cloud */}
      <LogoCloud />
    </div>
  );
}