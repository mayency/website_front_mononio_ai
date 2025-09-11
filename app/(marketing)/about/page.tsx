"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Button from "../../components/ui/Button";
import Breadcrumb from "../../components/Breadcrumb";
import AnimatedStats from "../../components/AnimatedStats";

// Animation hook for intersection observer
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isInView] as const;
};

// Typewriter effect hook
const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isTyping) {
      let index = 0;
      const timer = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;
        if (index === text.length) {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }
  }, [text, speed, isTyping]);

  const startTyping = () => setIsTyping(true);
  return [displayText, startTyping] as const;
};

export default function AboutPage() {
  const differentiators = [
    {
      title: "AI That Actually Understands Business",
      description: "Not just keyword matching - our AI understands your industry, competition, and what makes customers buy",
      icon: "🧠"
    },
    {
      title: "Professional Results Without Professional Prices", 
      description: "Get better results than agencies for 90% less cost - no contracts, no minimums, no BS",
      icon: "💰"
    },
    {
      title: "You Own Everything",
      description: "Your data, your audiences, your campaigns. Never be held hostage by an agency again",
      icon: "🔐"
    },
    {
      title: "Launch in Minutes, Not Months",
      description: "From idea to live campaigns across all platforms in under 10 minutes. No learning curve required",
      icon: "⚡"
    }
  ];

  // Animation refs
  const [heroRef, heroInView] = useInView();
  const [storyRef, storyInView] = useInView();
  const [missionRef, missionInView] = useInView();
  const [differentiatorRef, differentiatorInView] = useInView();
  const [techRef, techInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  // Typewriter for opening quote
  const openingQuote = '"You need at least $5,000/month to see results."';
  const [typedQuote, startQuoteTyping] = useTypewriter(openingQuote, 30);

  useEffect(() => {
    if (storyInView) {
      setTimeout(() => startQuoteTyping(), 500);
    }
  }, [storyInView, startQuoteTyping]);

  return (
    <>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.6); }
        }
        
        @keyframes slide-in-left {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #6366f1 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px) rotateX(5deg) rotateY(5deg);
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
        }
        
        .text-highlight {
          position: relative;
        }
        
        .text-highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #a855f7);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .text-highlight:hover::after {
          transform: scaleX(1);
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl float-animation"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl float-animation" style={{animationDelay: '3s'}}></div>
        </div>

        {/* Logo Header with enhanced hover */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
          <Link
            href="/"
            aria-label="Go to homepage"
            tabIndex={0}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:ring-offset-2 rounded-lg"
          >
            <Image
              src="/brand/Mononio_Logo.png"
              alt="Mononio AI Logo"
              width={120}
              height={60}
              className="h-[22px] sm:h-[28px] lg:h-[35px] xl:h-[39px] 2xl:h-[45px] w-auto object-contain drop-shadow-xl transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl hover:brightness-110"
              priority
            />
          </Link>
        </div>

        {/* Breadcrumb with staggered animation */}
        <div className={`pt-20 px-6 ${heroInView ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={[{ label: "About" }]} />
          </div>
        </div>

        {/* Hero Section with enhanced animations */}
        <section ref={heroRef} className="relative py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${heroInView ? 'shimmer-text scale-in' : 'opacity-0'}`}>
            The Real Reason Agencies Don't Want You to See This
            </h1>
            <p className={`text-xl text-gray-300 mb-8 max-w-3xl mx-auto ${heroInView ? 'fade-in-up stagger-2' : 'opacity-0'}`}>
              We got tired of watching small businesses get ripped off by agencies that charge <span className="text-highlight font-bold text-red-400">$10K/month</span> for campaigns any smart AI could build better
            </p>
          </div>
        </section>

        {/* Story Section with typewriter and progressive reveal */}
        <section ref={storyRef} className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className={`bg-gray-900/50 border border-indigo-500/30 rounded-xl p-8 float-animation pulse-glow ${storyInView ? 'scale-in' : 'opacity-0'}`}>
              <h2 className={`text-3xl font-bold text-indigo-400 mb-6 ${storyInView ? 'fade-in-up' : 'opacity-0'}`}>
              The $60,000 Problem Every Small Business Faces
              </h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p className={storyInView ? 'fade-in-up stagger-1' : 'opacity-0'}>
                  <span className="text-red-400 font-semibold">{typedQuote}</span> That's what every agency told Sarah when she wanted to market her boutique. 
                  <span className="text-highlight font-bold">$60,000 a year</span> just to get started. For a small business owner already struggling with rent and inventory.
                </p>
                <p className={storyInView ? 'fade-in-up stagger-2' : 'opacity-0'}>
                  Meanwhile, the "marketing experts" were using the same cookie-cutter templates, 
                  charging premium prices for campaigns that took them <span className="text-yellow-400 font-semibold">20 minutes</span> to set up.
                </p>
                <p className={storyInView ? 'fade-in-up stagger-3' : 'opacity-0'}>
                  We realized something: <span className="text-purple-400 font-semibold">"The tools that create million-dollar campaigns aren't magic. 
                  They're just data, psychology, and optimization - things AI can do better than humans."</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section with slide animations */}
        <section ref={missionRef} className="py-16 px-6 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${missionInView ? 'fade-in-up' : 'opacity-0'}`}>
              Our Mission
            </h2>
            <p className={`text-xl text-gray-300 mb-12 max-w-3xl mx-auto ${missionInView ? 'fade-in-up stagger-1' : 'opacity-0'}`}>
              <span className="text-indigo-400 font-semibold">"ESmall businesses deserve the same marketing power as Fortune 500 companies - without paying Fortune 500 prices"</span>
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className={`bg-gray-900/50 border border-gray-800 rounded-xl p-6 card-hover ${missionInView ? 'slide-in-left' : 'opacity-0'}`}>
                <h3 className="text-2xl font-bold text-purple-400 mb-4">❌ Before MONONIO</h3>
                <ul className="text-left text-gray-300 space-y-2">
                  {['$5K-15K monthly agency fees', '3-6 month contracts', 'Black box reporting', 'Cookie-cutter campaigns', 'You own nothing'].map((item, index) => (
                    <li key={index} className={`${missionInView ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: `${0.5 + index * 0.1}s`}}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`bg-gray-900/50 border border-gray-800 rounded-xl p-6 card-hover ${missionInView ? 'slide-in-right' : 'opacity-0'}`}>
                <h3 className="text-2xl font-bold text-green-400 mb-4">✅ With MONONIO</h3>
                <ul className="text-left text-gray-300 space-y-2">
                  {['$297/month flat rate', 'Cancel anytime', 'Full transparency', 'Custom AI campaigns', 'You own everything'].map((item, index) => (
                    <li key={index} className={`${missionInView ? 'fade-in-up' : 'opacity-0'}`} style={{animationDelay: `${0.5 + index * 0.1}s`}}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiators Section with enhanced cards */}
        <section ref={differentiatorRef} className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${differentiatorInView ? 'fade-in-up' : 'opacity-0'}`}>
                What Makes Us Different
              </h2>
              <p className={`text-gray-300 text-lg ${differentiatorInView ? 'fade-in-up stagger-1' : 'opacity-0'}`}>
              While Other Tools Complicate, We <span className="text-highlight font-bold text-purple-400">Eliminate</span>
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-900/50 border border-gray-800 rounded-xl p-6 card-hover ${differentiatorInView ? 'scale-in' : 'opacity-0'}`}
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-indigo-400 mb-3 text-highlight">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section with animated stats */}
        <section ref={techRef} className="py-16 px-6 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${techInView ? 'fade-in-up' : 'opacity-0'}`}>
              The Technology Behind MONONIO
            </h2>
            <p className={`text-xl text-gray-300 mb-12 ${techInView ? 'fade-in-up stagger-1' : 'opacity-0'}`}>
              We've spent <span className="text-highlight font-bold text-purple-400">3 years</span> training our AI on millions of successful campaigns, 
              so it knows what works before you even start
            </p>
            
            {techInView && (
              <div className="fade-in-up stagger-2">
                <AnimatedStats />
              </div>
            )}
          </div>
        </section>

        {/* CTA Section with enhanced button */}
        <section ref={ctaRef} className="py-16 px-6 bg-gradient-to-t from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${ctaInView ? 'fade-in-up' : 'opacity-0'}`}>
              Stop Losing to Smarter Competitors
            </h2>
            <p className={`text-xl text-gray-300 mb-8 ${ctaInView ? 'fade-in-up stagger-1' : 'opacity-0'}`}>
              While you're paying agencies <span className="text-highlight font-bold text-red-400">$10K/month</span> for mediocre results, your competition is using MONONIO to dominate your market for <span className="text-highlight font-bold text-green-400">$297/month</span> and eating your market share
            </p>
            <div className={ctaInView ? 'scale-in stagger-2' : 'opacity-0'}>
              <Button 
                variant="primary" 
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg px-12 py-4 pulse-glow hover:scale-105 transition-all duration-300"
              >
                Stop Funding Your Competition
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
