"use client";


import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black min-h-screen py-20">
      {/* Header Section */}
      <div className="text-center py-20 px-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
        Why Smart Business Owners Choose MONONIO Over $5K-15K Agency Fees
        </h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
        Real Results. Real Savings. Real Freedom From Agency Dependency
        </p>
      </div>

      {/* Main Principles Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {/* 👇 Force left-to-right order so the first item appears on the left */}
        <div dir="ltr" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* M - Mastery (1st) */}
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-400/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">M</span>
              </div>
              <h3 className="text-2xl font-bold text-purple-300 mb-3">Mastery</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
              Master every platform like a pro - even if you&apos;ve never run ads before
              </p>
            </div>
          </div>
          
          {/* O - Optimization (2nd) */}
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-400/30 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">O</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-300 mb-3">Optimization</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
              Continuous optimization means your campaigns get better while you sleep
              </p>
            </div>
          </div>
          
          {/* N - No-Code Setup (3rd) */}
          <div className="bg-gradient-to-br from-teal-600/20 to-teal-800/20 border border-teal-400/30 rounded-xl p-6 hover:border-teal-400/50 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">N</span>
              </div>
              <h3 className="text-2xl font-bold text-teal-300 mb-3">No-Code Setup</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
              Set up professional campaigns in minutes, not months - zero technical skills required
              </p>
            </div>
          </div>
          
          {/* O - Orchestration (4th) */}
          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">O</span>
              </div>
              <h3 className="text-2xl font-bold text-green-300 mb-3">Orchestration</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
              Run campaigns on 10+ platforms from one dashboard - Facebook, Google, TikTok, LinkedIn, YouTube, Instagram & more
              </p>
            </div>
          </div>
        </div>

        {/* Autonomy & Integrity. <a href="/case-studies" className="text-purple-400 hover:text-purple-300 underline">Read success stories</a> */}
        <div className="max-w-66xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            What Makes MONONIO Different From Other Tools
            </h3>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            Autonomy & Integrity. <a href="/case-studies" className="text-purple-400 hover:text-purple-300 underline">Read success stories</a>
            </p>
          </div>
          
          {/* 👇 Keep A (left) and I (right) even if the page is RTL */}
          <div dir="ltr" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* A - Autonomy (Left) */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-white">A</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-purple-300 mb-4">Autonomy</h4>
                  <p className="text-gray-200 leading-relaxed">
                  Complete Independence - No More Agency Lock-in or Monthly Retainers
                  </p>
                </div>
              </div>
            </div>
            
            {/* I - Integrity (Right) */}
            <div className="bg-gradient-to-br from-blue-600/20 to-teal-600/20 border border-blue-400/30 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-white">I</span>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-blue-300 mb-4">Integrity</h4>
                  <p className="text-gray-200 leading-relaxed">
                  Full Transparency - See Exactly Where Every Dollar Goes and Why
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-400/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-4">
             Ready to Stop Paying Agency Fees and Start Owning Your Marketing
            </h4>
            <p className="text-gray-300 mb-6">
            See How It Works - Free Demo
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105">
            Get My Free Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
