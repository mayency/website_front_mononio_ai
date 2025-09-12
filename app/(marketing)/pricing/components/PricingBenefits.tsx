'use client';

import React from 'react';
import { Shield, Zap, Users, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

const benefits: Benefit[] = [
  {
    icon: <DollarSign className="w-8 h-8 text-green-400" />,
    title: 'Save 90% vs Agencies',
    description: 'Traditional agencies charge $5,000-$15,000/month. Our AI does the same work for $297-$997/month.',
    highlight: 'Average savings: $8,000/month'
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: '5-Minute Setup',
    description: 'Connect your ad accounts and start optimizing immediately. No weeks of setup or onboarding.',
    highlight: 'vs 2-4 weeks for agencies'
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
    title: '24/7 AI Optimization',
    description: 'Our AI never sleeps. It continuously optimizes your campaigns, adjusts bids, and tests new variations.',
    highlight: '340% average ROI increase'
  },
  {
    icon: <Users className="w-8 h-8 text-purple-400" />,
    title: '10+ Platform Support',
    description: 'Facebook, Google, TikTok, LinkedIn, Instagram, YouTube, and more. All managed from one dashboard.',
    highlight: 'vs 2-3 platforms for agencies'
  },
  {
    icon: <Shield className="w-8 h-8 text-indigo-400" />,
    title: 'Full Transparency',
    description: 'See exactly what your campaigns are doing with real-time analytics and detailed reporting.',
    highlight: 'Complete visibility & control'
  },
  {
    icon: <Clock className="w-8 h-8 text-orange-400" />,
    title: 'Instant Scaling',
    description: 'Add more campaigns or platforms instantly. No need to hire more staff or wait for agency capacity.',
    highlight: 'Scale up in minutes'
  }
];

export default function PricingBenefits() {
  return (
    <div className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-indigo-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose MONONIO AI?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join 500+ businesses that have already switched from expensive agencies to our AI-powered solution
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group"
            >
              {/* Icon */}
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                {benefit.highlight && (
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-full">
                    <span className="text-indigo-300 text-sm font-semibold">
                      {benefit.highlight}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">
              Trusted by Growing Businesses
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
                <div className="text-gray-400 text-sm">Active Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">$2.3M+</div>
                <div className="text-gray-400 text-sm">Collectively Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">340%</div>
                <div className="text-gray-400 text-sm">Average ROI Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                <div className="text-gray-400 text-sm">Uptime Guarantee</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                style={{
                  WebkitAppearance: 'none',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Free Trial
              </button>
              <button
                style={{
                  WebkitAppearance: 'none',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
