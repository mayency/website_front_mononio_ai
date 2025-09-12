'use client';

import React from 'react';
import InfiniteScroll from './InfiniteScroll';
import ReviewCard from './ReviewCard';

interface ReviewItem {
  quote: string;
  author: string;
  title: string;
  location: string;
  results: string;
  profilePicture?: string;
  rating: number;
}

const reviewsData: ReviewItem[] = [
  {
    quote: "I spent 6 months paying an $8K/month agency that couldn't explain where my money was going. With MONONIO, I see every click, every conversion, every dollar. First month: 40% better results.",
    author: "Sarah M.",
    title: "Boutique Owner",
    location: "Austin",
    results: "40% better ROAS, $7,700/month savings",
    rating: 5
  },
  {
    quote: "As a freelance consultant, I couldn't afford professional marketing. MONONIO created campaigns I never could have imagined. My lead quality went through the roof.",
    author: "Mike R.",
    title: "Business Consultant",
    location: "Denver",
    results: "5x more qualified leads, $297 vs $0 previous budget",
    rating: 5
  },
  {
    quote: "My old agency kept everything locked away. When I wanted to leave, I lost everything. With MONONIO, I own my audiences, my data, everything. And it works better.",
    author: "James T.",
    title: "Tech Startup Founder",
    location: "Seattle",
    results: "Owns all data, 60% cost reduction",
    rating: 5
  },
  {
    quote: "I was spending $12K/month on an agency that couldn't explain where my money went. MONONIO shows me every click, every conversion. First month: better results for $297.",
    author: "Rachel K.",
    title: "E-commerce Owner",
    location: "Miami",
    results: "Better ROAS, $11,700/month savings",
    rating: 5
  },
  {
    quote: "Finally, marketing that works for real businesses. No jargon, no hidden fees, no 6-month contracts. Just results I can actually understand and control.",
    author: "David Chen",
    title: "Restaurant Owner",
    location: "Portland",
    results: "3x more reservations, owns all data",
    rating: 5
  },
  {
    quote: "My agency took 4 months to launch one campaign. MONONIO created 5 campaigns across all platforms in 15 minutes. And they perform better.",
    author: "Lisa Martinez",
    title: "Fitness Coach",
    location: "Dallas",
    results: "15-minute setup vs 4-month wait",
    rating: 5
  },
  {
    quote: "I thought AI marketing was just hype. Then I tried MONONIO. It's like having a marketing genius working 24/7 for the price of a gym membership.",
    author: "Tom Wilson",
    title: "SaaS Founder",
    location: "Austin",
    results: "24/7 optimization, $290 savings per day",
    rating: 5
  },
  {
    quote: "Agencies always made me feel stupid for asking questions. MONONIO explains everything clearly and I finally understand my own marketing.",
    author: "Jennifer Adams",
    title: "Boutique Owner",
    location: "Nashville",
    results: "Full transparency, 2x conversion rate",
    rating: 5
  },
  {
    quote: "Best decision I made this year. Fired my $15K/month agency, hired MONONIO for $297. My ROI doubled and I sleep better at night.",
    author: "Carlos Rodríguez",
    title: "Manufacturing Business",
    location: "Phoenix",
    results: "Double ROI, $14,700 monthly savings",
    rating: 5
  },
  {
    quote: "I'm not tech-savvy at all. MONONIO made me feel like a marketing expert. Just talk to it like a person and it handles everything else.",
    author: "Susan Brown",
    title: "Local Service Business",
    location: "Chicago",
    results: "Zero technical skills needed, 150% lead increase",
    rating: 5
  }
];

export default function TestimonialsSection() {
  // Convert reviews to infinite scroll items
  const scrollItems = reviewsData.map((review) => ({
    content: <ReviewCard review={review} />
  }));

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Real Businesses. Real Results.
          </h2>
          <p className="text-xl text-gray-300">
            Join 500+ businesses that fired their expensive agencies
          </p>
        </div>
        
        {/* Scrolling Testimonials - RESTORED */}
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

        {/* Additional Trust Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-green-400">95%</div>
            <div className="text-gray-400">Get Better Results</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">24hrs</div>
            <div className="text-gray-400">To First Results</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">$8,500</div>
            <div className="text-gray-400">Avg Monthly Savings</div>
          </div>
        </div>
      </div>
    </section>
  );
}