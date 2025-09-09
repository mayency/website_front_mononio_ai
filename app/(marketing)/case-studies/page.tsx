"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/ui/Button";
import Breadcrumb from "../../components/Breadcrumb";
import InfiniteScroll from "../../components/InfiniteScroll";
import ReviewCard from "../../components/ReviewCard";

interface ReviewItem {
  quote: string;
  author: string;
  title: string;
  location: string;
  results: string;
}

// Customer reviews data - easily expandable
const reviewsData: ReviewItem[] = [
  {
    quote: "I spent 6 months paying an $8K/month agency that couldn't explain where my money was going. With MONONIO, I see every click, every conversion, every dollar. First month: 40% better results.",
    author: "Sarah M.",
    title: "Boutique Owner",
    location: "Austin",
    results: "40% better ROAS, $7,700/month savings"
  },
  {
    quote: "As a freelance consultant, I couldn't afford professional marketing. MONONIO created campaigns I never could have imagined. My lead quality went through the roof.",
    author: "Mike R.",
    title: "Business Consultant",
    location: "Denver",
    results: "5x more qualified leads, $297 vs $0 previous budget"
  },
  {
    quote: "My old agency kept everything locked away. When I wanted to leave, I lost everything. With MONONIO, I own my audiences, my data, everything. And it works better.",
    author: "James T.",
    title: "Tech Startup Founder",
    location: "Seattle",
    results: "Owns all data, 60% cost reduction"
  }
];

export default function CaseStudiesPage() {
  // Convert reviews to infinite scroll items
  const scrollItems = reviewsData.map((review) => ({
    content: <ReviewCard review={review} />
  }));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Logo Header */}
      <div className="absolute top-0 left-6 z-50">
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
            className="h-[22px] sm:h-[28px] lg:h-[35px] xl:h-[39px] 2xl:h-[45px] w-auto object-contain drop-shadow-xl transition-transform hover:scale-105"
            priority
          />
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="pt-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ label: "Case Studies" }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          What Our Early Users Are Saying
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Real feedback from businesses using MONONIO
          </p>
          
          {/* Hero Subtitle */}
          <div className="bg-gray-900/50 border border-indigo-500/30 rounded-xl p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-indigo-400 mb-2">
              From Zero to Profitable in 24 Hours
            </h2>
            <p className="text-gray-300">
              These are actual campaigns created by our AI - not mock-ups
            </p>
          </div>
        </div>
      </section>

      {/* Real Reviews Section with Infinite Scroll */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Real Reviews
            </h2>
            <p className="text-gray-300 text-lg">
              Scroll through authentic customer experiences
            </p>
          </div>
          
          <div className="flex justify-center">
            <div style={{ height: '600px', position: 'relative' }}>
              <InfiniteScroll 
                items={scrollItems} 
                isTilted={true} 
                tiltDirection='left' 
                autoplay={true} 
                autoplaySpeed={0.2} 
                autoplayDirection="down" 
                pauseOnHover={true}
                width="32rem"
                itemMinHeight={250}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            The Numbers Don&apos;t Lie
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-indigo-400 mb-2">90%</div>
              <p className="text-gray-300">of users see improvements within the first week</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">8 min</div>
              <p className="text-gray-300">average time to create a complete campaign</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">$297</div>
              <p className="text-gray-300">monthly cost vs $5K-15K for agencies</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-t from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Similar Results?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of businesses already using MONONIO to scale their marketing
          </p>
          <Button 
            variant="primary" 
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-lg px-12 py-4"
          >
            Start Your Success Story
          </Button>
        </div>
      </section>
    </div>
  );
}
