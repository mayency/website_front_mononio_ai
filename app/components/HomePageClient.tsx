"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import CampaignBox from "./CampaignBox";
import UrgencyBar from "./UrgencyBar";
import LiveStats from "./LiveStats";
import SavingsCalculator from "./SavingsCalculator";

export default function HomePageClient() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Urgency Bar */}
      <UrgencyBar />
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black w-full pt-8">
        {/* Background Options */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 hidden lg:block"
          >
            <source src="/videos/Abstract_Neon_Clouds1.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30" />
          
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-400" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-800" />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40 z-0" />
        
        {/* Navbar */}
        <div className="absolute top-12 left-0 right-0 z-20">
          <Navbar />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
            
            {/* Logo */}
            <div className="-mb-21 animate-fade-in">
              <Image
                src="/brand/Mononio_Logo.png"
                alt="Mononio AI"
                className="h-auto w-[180px] sm:w-[200px] md:w-[220px] lg:w-[350px] object-contain"
                width={250}
                height={80}
                priority
              />
            </div>
            
            {/* Main Headline */}
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-slide-up leading-tight">
              Stop Paying <span className="text-red-400 line-through">$15,000</span>/Month
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2">
                for Marketing Agencies
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="mb-6 max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 animate-slide-up animation-delay-200 px-4">
              Get <span className="text-green-400 font-bold">3x Better Results</span> for 
              <span className="text-green-400 font-bold"> $297/Month</span> with AI That Actually Works
              <span className="block text-sm md:text-base mt-2 text-gray-400">
                No contracts • See ROI in 30 days • Cancel anytime
              </span>
            </p>
            
            {/* Live Stats */}
            <LiveStats />
            
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
            
            {/* Main Campaign Box */}
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-9xl animate-scale-in animation-delay-600 -ml-4">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse" />
                <div className="relative">
                  <CampaignBox />
                </div>
              </div>
            </div>
            
            {/* Additional CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button 
                onClick={() => setShowCalculator(true)} 
                className="text-purple-400 hover:text-purple-300 underline"
              >
                See how much you'll save →
              </button>
              <span className="text-gray-500">or</span>
              <button 
                onClick={() => setShowDemo(true)} 
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Watch 2-minute demo
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="mt-12 text-center animate-fade-in animation-delay-800">
              <p className="text-sm text-gray-400 mb-3">500+ small businesses joined this month and fired their expensive agencies</p>
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

      {/* Modals */}
      {showCalculator && (
        <SavingsCalculator onClose={() => setShowCalculator(false)} />
      )}

      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full">
            <button 
              onClick={() => setShowDemo(false)}
              className="float-right text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Watch MONONIO Create a Campaign</h2>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Demo video placeholder - embed your video here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
