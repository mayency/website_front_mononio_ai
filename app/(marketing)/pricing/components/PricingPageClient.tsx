"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../../../components/ui/Button";
import Navbar from "../../../components/Navbar";

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  savings?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: 297,
    period: "month",
    description: "Perfect for small businesses getting started with AI marketing",
    features: [
      "Up to 5 active campaigns",
      "Facebook + Google Ads integration",
      "Basic AI optimization",
      "Email support",
      "Monthly performance reports",
      "Campaign templates library"
    ],
    cta: "Start Free Trial",
    savings: "Save $4,703/month vs agencies"
  },
  {
    name: "Professional",
    price: 597,
    period: "month",
    description: "The complete solution for growing businesses",
    features: [
      "Unlimited campaigns",
      "All platforms (Facebook, Google, TikTok, LinkedIn, Instagram, YouTube)",
      "24/7 AI optimization",
      "Priority support",
      "Weekly detailed reports",
      "Advanced analytics dashboard",
      "A/B testing automation",
      "Custom audience targeting"
    ],
    cta: "Start Free Trial",
    popular: true,
    savings: "Save $9,403/month vs agencies"
  },
  {
    name: "Enterprise",
    price: 997,
    period: "month",
    description: "For large organizations with advanced needs",
    features: [
      "Everything in Professional",
      "White-label options",
      "Custom reporting",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "Advanced security features",
      "SLA guarantee"
    ],
    cta: "Contact Sales",
    savings: "Save $14,003/month vs agencies"
  }
];

const comparisonData = [
  {
    feature: "Monthly Cost",
    agency: "$5,000 - $15,000",
    mononio: "$297 - $997",
    advantage: "mononio"
  },
  {
    feature: "Setup Time",
    agency: "2-4 weeks",
    mononio: "5 minutes",
    advantage: "mononio"
  },
  {
    feature: "Platforms Supported",
    agency: "Limited (2-3)",
    mononio: "10+ platforms",
    advantage: "mononio"
  },
  {
    feature: "Optimization",
    agency: "Manual (business hours)",
    mononio: "24/7 AI automation",
    advantage: "mononio"
  },
  {
    feature: "Transparency",
    agency: "Limited reporting",
    mononio: "Full visibility & control",
    advantage: "mononio"
  },
  {
    feature: "Scalability",
    agency: "Requires more staff",
    mononio: "Instant scaling",
    advantage: "mononio"
  }
];

const faqData = [
  {
    question: "How much can I save compared to hiring a marketing agency?",
    answer: "Most businesses save 85-95% compared to traditional agencies. A typical agency charges $5,000-$15,000/month, while MONONIO AI starts at just $297/month with better results."
  },
  {
    question: "What's included in the free trial?",
    answer: "The free trial includes full access to all features for 14 days. You can create campaigns, connect your ad accounts, and see real results with no credit card required."
  },
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences."
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the results, we'll refund your payment in full."
  },
  {
    question: "How does the AI optimization work?",
    answer: "Our AI continuously monitors your campaigns, adjusts bids, optimizes targeting, and tests new creative variations 24/7 to maximize your ROI."
  },
  {
    question: "What platforms do you support?",
    answer: "We support Facebook, Instagram, Google Ads, TikTok, LinkedIn, YouTube, Twitter, Pinterest, Snapchat, and more. New platforms are added regularly."
  }
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6 }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

export default function PricingPageClient() {
  const [selectedPlan, setSelectedPlan] = useState<number>(1); // Professional plan
  const [showCalculator, setShowCalculator] = useState(false);
  const [agencyCost, setAgencyCost] = useState(10000);
  const [calculatedSavings, setCalculatedSavings] = useState(9403);

  const handleSavingsCalculation = () => {
    const savings = agencyCost - 597; // Professional plan price
    setCalculatedSavings(Math.max(0, savings));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900">
      {/* Navigation Bar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Floating Eyes Animation */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating Eyes */}
        <motion.div
          className="absolute top-20 left-10 w-8 h-8 bg-white rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 w-6 h-6 bg-white rounded-full opacity-15"
          animate={{
            y: [0, -15, 0],
            x: [0, -8, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-black rounded-full"></div>
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black rounded-full"></div>
        </motion.div>
        
        <motion.div
          className="absolute top-40 left-1/4 w-7 h-7 bg-white rounded-full opacity-18"
          animate={{
            y: [0, -25, 0],
            x: [0, 12, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
        </motion.div>
        
        <motion.div
          className="absolute top-60 right-1/3 w-5 h-5 bg-white rounded-full opacity-12"
          animate={{
            y: [0, -18, 0],
            x: [0, -6, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
        </motion.div>
        
        <motion.div
          className="absolute top-80 left-1/3 w-6 h-6 bg-white rounded-full opacity-16"
          animate={{
            y: [0, -22, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-black rounded-full"></div>
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black rounded-full"></div>
        </motion.div>
      </div>

      {/* Enhancement 2: Urgency Banner */}
      <motion.div 
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto">
          <span className="font-semibold">Limited Time Offer:</span> Save additional 20% on annual plans.
          <span className="ml-2 text-yellow-200">Expires in 3 days</span>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            className="mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
          >
            <Image
              src="/brand/Mononio_Logo.png"
              alt="MONONIO AI Logo"
              width={120}
              height={120}
              className="mx-auto mb-6 w-20 h-20 md:w-24 md:h-24"
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            Stop Paying{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              $15K/Month
            </span>{" "}
            to Agencies
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Get Better Results for{" "}
            <span className="text-green-400 font-semibold">90% Less Cost</span>
          </motion.h2>

          {/* Cost Comparison Visual */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6"
              variants={slideInLeft}
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4">Traditional Agency</h3>
              <div className="text-4xl font-bold text-red-300 mb-2">$5,000 - $15,000</div>
              <div className="text-gray-400">per month</div>
              <ul className="text-left mt-4 space-y-2 text-gray-300">
                <li>• 2-4 week setup</li>
                <li>• Limited platforms</li>
                <li>• Manual optimization</li>
                <li>• Limited transparency</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6"
              variants={slideInRight}
            >
              <h3 className="text-2xl font-bold text-green-400 mb-4">MONONIO AI</h3>
              <div className="text-4xl font-bold text-green-300 mb-2">$297 - $997</div>
              <div className="text-gray-400">per month</div>
              <ul className="text-left mt-4 space-y-2 text-gray-300">
                <li>• 5 minute setup</li>
                <li>• 10+ platforms</li>
                <li>• 24/7 AI optimization</li>
                <li>• Full transparency</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Enhancement 1: Trust Statistics */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-green-400">500+</div>
              <div className="text-gray-400 text-sm">Businesses Switched</div>
            </motion.div>
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-green-400">$2.3M</div>
              <div className="text-gray-400 text-sm">Collectively Saved</div>
            </motion.div>
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-green-400">340%</div>
              <div className="text-gray-400 text-sm">Average ROI Increase</div>
            </motion.div>
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-3xl font-bold text-green-400">47</div>
              <div className="text-gray-400 text-sm">Switched This Week</div>
            </motion.div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
              onClick={() => setShowCalculator(!showCalculator)}
            >
              Calculate Your Savings
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Savings Calculator */}
      {showCalculator && (
        <motion.section 
          className="py-12 px-4 md:px-6 lg:px-8 bg-white/5 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-8">Savings Calculator</h3>
            <div className="bg-white/10 rounded-2xl p-8">
              <div className="mb-6">
                <label className="block text-white text-lg mb-4">
                  What do you currently pay your marketing agency per month?
                </label>
                <input
                  type="range"
                  min="3000"
                  max="20000"
                  step="500"
                  value={agencyCost}
                  onChange={(e) => setAgencyCost(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-gray-400 mt-2">
                  <span>$3,000</span>
                  <span className="text-2xl font-bold text-white">${agencyCost.toLocaleString()}</span>
                  <span>$20,000</span>
                </div>
              </div>
              
              <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-6 mb-6">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  Save ${calculatedSavings.toLocaleString()}/month
                </div>
                <div className="text-gray-300">
                  That's ${(calculatedSavings * 12).toLocaleString()} per year!
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleSavingsCalculation}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >
                  Start Your Free Trial
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Pricing Cards */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInUp}
            >
              Choose Your Plan
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              All plans include our core AI optimization features. Scale up as you grow.
            </motion.p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "border-indigo-500 shadow-2xl shadow-indigo-500/20"
                    : "border-gray-700 hover:border-gray-500"
                }`}
                variants={scaleIn}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                {/* Enhancement 5: Money-back guarantee badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    30-Day Guarantee
                  </div>
                </div>

                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  </div>
                  
                  {plan.savings && (
                    <div className="text-green-400 font-semibold text-sm mb-6">
                      {plan.savings}
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Enhancement 3: Social Proof for each plan */}
                <div className="bg-white/5 rounded-lg p-3 mb-6 text-center">
                  <div className="text-sm text-gray-300">
                    {plan.name === 'Starter' && "127 businesses chose this plan this month"}
                    {plan.name === 'Professional' && "284 businesses chose this plan this month"}
                    {plan.name === 'Enterprise' && "43 businesses chose this plan this month"}
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInUp}
            >
              Agency vs MONONIO AI
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              See why thousands of businesses are switching to AI-powered marketing
            </motion.p>
          </div>

          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-6 px-6 text-white font-semibold text-lg">Feature</th>
                    <th className="text-center py-6 px-6 text-red-400 font-semibold text-lg">Marketing Agency</th>
                    <th className="text-center py-6 px-6 text-green-400 font-semibold text-lg">MONONIO AI</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-6 px-6 text-white font-medium">{row.feature}</td>
                      <td className="py-6 px-6 text-center text-gray-300">{row.agency}</td>
                      <td className="py-6 px-6 text-center">
                        <span className={`font-semibold ${
                          row.advantage === 'mononio' ? 'text-green-400' : 'text-gray-300'
                        }`}>
                          {/* Enhancement 4: Fixed comparison table bug - row.mononio is correct */}
                          {row.mononio}
                        </span>
                        {row.advantage === 'mononio' && (
                          <svg className="w-5 h-5 text-green-400 ml-2 inline" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInUp}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Everything you need to know about MONONIO AI pricing
            </motion.p>
          </div>

          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {faqData.map((faq, index) => (
              <motion.div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
          >
            Ready to Save 90% on Marketing?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Join thousands of businesses already using MONONIO AI to automate their marketing
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
              >
                Start Your Free Trial
              </Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-gray-400 mt-6 text-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
          >
            No credit card required • 14-day free trial • Cancel anytime
          </motion.p>
        </div>
      </section>
    </div>
  );
}
