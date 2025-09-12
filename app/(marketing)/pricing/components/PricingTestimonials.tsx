'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  savings: string;
  plan: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    company: 'TechStart Inc.',
    role: 'Marketing Director',
    avatar: 'SC',
    rating: 5,
    content: 'We were paying $12,000/month to our agency and getting mediocre results. MONONIO AI cut our costs by 90% and increased our ROI by 280%. The AI optimization is incredible.',
    savings: 'Saved $10,800/month',
    plan: 'Professional Plan'
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    company: 'E-commerce Plus',
    role: 'CEO',
    avatar: 'MR',
    rating: 5,
    content: 'The setup was literally 5 minutes. Our previous agency took 3 weeks just to get started. Now we manage 8 platforms from one dashboard with better results.',
    savings: 'Saved $8,500/month',
    plan: 'Enterprise Plan'
  },
  {
    id: 3,
    name: 'Jennifer Kim',
    company: 'LocalBiz Solutions',
    role: 'Founder',
    avatar: 'JK',
    rating: 5,
    content: 'As a small business, we could never afford a full marketing team. MONONIO AI gives us enterprise-level marketing automation at a fraction of the cost.',
    savings: 'Saved $4,200/month',
    plan: 'Starter Plan'
  },
  {
    id: 4,
    name: 'David Thompson',
    company: 'GrowthCo',
    role: 'VP Marketing',
    avatar: 'DT',
    rating: 5,
    content: 'The transparency is amazing. We can see exactly what\'s working and what isn\'t. Our agency never gave us this level of insight and control.',
    savings: 'Saved $11,200/month',
    plan: 'Professional Plan'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    company: 'Digital Ventures',
    role: 'CMO',
    avatar: 'LW',
    rating: 5,
    content: 'The AI never stops optimizing. It\'s like having a team of experts working 24/7. Our conversion rates have tripled since switching.',
    savings: 'Saved $9,800/month',
    plan: 'Enterprise Plan'
  },
  {
    id: 6,
    name: 'Alex Johnson',
    company: 'StartupXYZ',
    role: 'Co-founder',
    avatar: 'AJ',
    rating: 5,
    content: 'We were skeptical about AI marketing, but the results speak for themselves. 340% ROI increase in just 3 months. This is the future of marketing.',
    savings: 'Saved $6,500/month',
    plan: 'Professional Plan'
  }
];

export default function PricingTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real results from real businesses that switched from expensive agencies to MONONIO AI
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-indigo-400/20">
              <Quote className="w-16 h-16" />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              style={{
                WebkitAppearance: 'none',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              style={{
                WebkitAppearance: 'none',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Testimonial Content */}
            <div className="text-center max-w-4xl mx-auto">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < currentTestimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {currentTestimonial.avatar}
                </div>

                {/* Details */}
                <div className="text-center md:text-left">
                  <div className="text-white font-semibold text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-gray-300">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </div>
                  <div className="text-indigo-400 font-semibold">
                    {currentTestimonial.plan}
                  </div>
                </div>

                {/* Savings Badge */}
                <div className="bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
                  <span className="text-green-400 font-semibold">
                    {currentTestimonial.savings}
                  </span>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    WebkitAppearance: 'none',
                    outline: 'none',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-indigo-500 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
            <div className="text-gray-400 text-sm">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">$2.3M+</div>
            <div className="text-gray-400 text-sm">Total Savings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">340%</div>
            <div className="text-gray-400 text-sm">Avg ROI Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">4.9/5</div>
            <div className="text-gray-400 text-sm">Customer Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
