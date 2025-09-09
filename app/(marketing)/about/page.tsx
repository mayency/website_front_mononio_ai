import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Button from "../../components/ui/Button";
import Breadcrumb from "../../components/Breadcrumb";

export const metadata: Metadata = {
  title: "About Us - Why We Built MONONIO | MONONIO AI",
  description: "Learn why we built MONONIO to democratize professional marketing and give every business owner the tools they need to compete with industry giants.",
  keywords: "MONONIO AI about, marketing democratization, small business marketing tools, AI marketing platform founders",
  openGraph: {
    title: "About Us - The Story Behind MONONIO | MONONIO AI",
    description: "Discover how we're democratizing professional marketing for every business owner.",
    type: "website",
  },
};

export default function AboutPage() {
  const differentiators = [
    {
      title: "AI That Actually Understands Business",
      description: "Not just keyword matching - our AI understands your industry, competition, and what makes customers buy"
    },
    {
      title: "Professional Results Without Professional Prices", 
      description: "Get better results than agencies for 90% less cost - no contracts, no minimums, no BS"
    },
    {
      title: "You Own Everything",
      description: "Your data, your audiences, your campaigns. Never be held hostage by an agency again"
    },
    {
      title: "Launch in Minutes, Not Months",
      description: "From idea to live campaigns across all platforms in under 10 minutes. No learning curve required"
    }
  ];

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
          <Breadcrumb items={[{ label: "About" }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Why We Built MONONIO
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We got tired of watching small businesses get ripped off by agencies that charge $10K/month for campaigns any smart AI could build better
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 border border-indigo-500/30 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-indigo-400 mb-6">The Problem We&apos;re Solving</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                &ldquo;You need at least $5,000/month to see results.&rdquo; That&apos;s what every agency told Sarah when she wanted to market her boutique. 
                $60,000 a year just to get started. For a small business owner already struggling with rent and inventory.
              </p>
              <p>
                Meanwhile, the &ldquo;marketing experts&rdquo; were using the same cookie-cutter templates, 
                charging premium prices for campaigns that took them 20 minutes to set up.
              </p>
              <p>
                We realized something: &ldquo;The tools that create million-dollar campaigns aren&apos;t magic. 
                They&apos;re just data, psychology, and optimization - things AI can do better than humans.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            &ldquo;Every business owner should have access to the same marketing tools that Fortune 500 companies use - 
            without the Fortune 500 budget.&rdquo;
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Before MONONIO</h3>
              <ul className="text-left text-gray-300 space-y-2">
                <li>• $5K-15K monthly agency fees</li>
                <li>• 3-6 month contracts</li>
                <li>• Black box reporting</li>
                <li>• Cookie-cutter campaigns</li>
                <li>• You own nothing</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-400 mb-4">With MONONIO</h3>
              <ul className="text-left text-gray-300 space-y-2">
                <li>• $297/month flat rate</li>
                <li>• Cancel anytime</li>
                <li>• Full transparency</li>
                <li>• Custom AI campaigns</li>
                <li>• You own everything</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-gray-300 text-lg">
              We&apos;re not just another marketing tool - we&apos;re your unfair advantage
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/30 transition-colors">
                <h3 className="text-xl font-bold text-indigo-400 mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Technology Behind MONONIO</h2>
          <p className="text-xl text-gray-300 mb-12">
            We&apos;ve spent 3 years training our AI on millions of successful campaigns, 
            so it knows what works before you even start
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">2M+</div>
              <p className="text-gray-300">Campaigns analyzed</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-indigo-400 mb-2">50+</div>
              <p className="text-gray-300">Industries mastered</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <p className="text-gray-300">Optimization running</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-t from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Losing to Smarter Competitors
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            While you&apos;re paying agencies $10K/month for mediocre results, your competition is using MONONIO to dominate your market for $297/month and eating your market share
          </p>
          <Button 
            variant="primary" 
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-lg px-12 py-4"
          >
            Start Your Journey Now
          </Button>
        </div>
      </section>
    </div>
  );
}
