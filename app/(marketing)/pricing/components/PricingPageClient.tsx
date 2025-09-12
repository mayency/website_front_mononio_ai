'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/app/components/Navbar';
import LogoCloud from '@/app/components/LogoCloud';
import SavingsCalculator from '@/app/components/SavingsCalculator';
import PricingBenefits from './PricingBenefits';
import PricingComparisonTable from './PricingComparisonTable';
import PricingTestimonials from './PricingTestimonials';
import { Check, X, Calculator, ChevronDown, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

// Lazy load heavy components for better performance
const LazyMotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
  ssr: false,
});

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  savings?: string;
}

export default function PricingPageClient() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Performance optimization - intersection observer for animations
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const plans: PricingPlan[] = [
    {
      name: 'Starter',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      description: 'Perfect for small businesses getting started with AI marketing',
      features: [
        'Up to 5 campaigns per month',
        'Basic AI optimization',
        '3 platform integrations (Facebook, Google, Instagram)',
        'Email support (24h response)',
        'Basic analytics dashboard',
        'Campaign templates library',
        '1 user account',
      ],
      notIncluded: [
        'Advanced AI features',
        'Custom integrations',
        'Priority support',
        'White-label options',
        'API access',
      ],
    },
    {
      name: 'Professional',
      monthlyPrice: 799,
      yearlyPrice: 7990,
      description: 'Scale your marketing with advanced AI capabilities',
      features: [
        'Up to 20 campaigns per month',
        'Advanced AI optimization & predictions',
        '8 platform integrations',
        'Priority email & chat support (2h response)',
        'Advanced analytics & custom reports',
        'A/B testing with AI recommendations',
        'Custom audiences & lookalikes',
        '5 user accounts',
        'Campaign automation workflows',
        'Performance alerts & monitoring',
      ],
      notIncluded: [
        'Unlimited campaigns',
        'Custom integrations',
        'Dedicated account manager',
        'White-label options',
      ],
      popular: true,
      savings: 'Save $1,598/year',
    },
    {
      name: 'Enterprise',
      monthlyPrice: 2499,
      yearlyPrice: 24990,
      description: 'Complete solution for large organizations and agencies',
      features: [
        'Unlimited campaigns',
        'Full AI suite with custom ML models',
        'All 12+ platform integrations',
        '24/7 dedicated support & Slack channel',
        'Custom analytics & white-label reports',
        'Full white-label options',
        'RESTful API & webhooks',
        'Custom integrations development',
        'Dedicated account manager',
        'Quarterly business reviews',
        'Training & onboarding (10 hours)',
        'Unlimited user accounts',
        'SSO & advanced security',
        'SLA guarantee (99.9% uptime)',
      ],
      notIncluded: [],
      savings: 'Save $4,998/year',
    },
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference immediately. When downgrading, the change takes effect at the next billing cycle.',
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Absolutely! We offer a 14-day free trial for all plans. No credit card required. You\'ll have full access to all features during the trial period.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and for Enterprise plans, we also offer bank transfers and custom invoicing.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with MONONIO AI within the first 30 days, we\'ll refund your payment in full.',
    },
    {
      question: 'What happens when I reach my campaign limit?',
      answer: 'You\'ll receive a notification when you\'re approaching your limit. You can either upgrade your plan or purchase additional campaigns as needed. Unused campaigns don\'t roll over to the next month.',
    },
    {
      question: 'Can I white-label the platform for my agency?',
      answer: 'White-label options are available with our Enterprise plan. This includes custom branding, domain, and client portals. Contact our sales team for detailed customization options.',
    },
  ];

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    // Scroll to contact form or trigger signup modal
    const contactSection = document.getElementById('contact-section');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section with Gradient Animation */}
      <div 
        ref={heroRef}
        className={`relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 py-24 sm:py-32 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 via-indigo-800/20 to-purple-800/20 animate-pulse" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* Trust Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-400">
              <Shield className="w-4 h-4" />
              <span>Trusted by 500+ companies worldwide</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pricing that scales
              </span>
              <br />
              with your growth
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Start with our 14-day free trial. No credit card required.
              <br />
              Join 500+ companies achieving 10x ROI with MONONIO AI.
            </p>
            
            {/* Calculate Savings Button - Safari Fix Applied */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                style={{
                  WebkitAppearance: 'none',
                  outline: 'none',
                  border: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
                className="calculator-button group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Calculate Your Savings
                <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400 animate-pulse" />
              </button>
              
              <a
                href="#plans"
                style={{
                  WebkitAppearance: 'none',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-xl"
              >
                View Plans
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="mt-16 flex justify-center items-center gap-4">
            <span className={`font-medium transition-colors ${
              billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'
            }`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              style={{
                WebkitAppearance: 'none',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-700 transition-colors hover:bg-gray-600"
              aria-label="Toggle billing period"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform shadow-lg ${
                  billingPeriod === 'yearly' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium transition-colors ${
              billingPeriod === 'yearly' ? 'text-white' : 'text-gray-400'
            }`}>
              Yearly
              <span className="ml-2 inline-flex items-center gap-1 text-green-400 text-sm font-bold">
                <Zap className="w-3 h-3" />
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Savings Calculator - Conditional Render with Animation */}
      {showCalculator && (
        <div className="relative z-50 animate-fadeIn">
          <SavingsCalculator 
            mode="inline"
            onClose={() => setShowCalculator(false)}
          />
        </div>
      )}

      {/* Pricing Cards */}
      <div id="plans" className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                plan.popular
                  ? 'bg-gradient-to-b from-purple-900/50 to-gray-800 ring-2 ring-purple-500 shadow-xl shadow-purple-500/20'
                  : 'bg-gray-800 hover:bg-gray-800/90'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Savings Badge */}
              {plan.savings && billingPeriod === 'yearly' && (
                <div className="absolute -top-4 -right-4 z-10">
                  <span className="inline-flex items-center rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
                    {plan.savings}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
                
                {/* Pricing */}
                <div className="mt-6">
                  <p className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">
                      ${billingPeriod === 'monthly' ? plan.monthlyPrice.toLocaleString() : plan.yearlyPrice.toLocaleString()}
                    </span>
                    <span className="text-gray-400">
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </span>
                  </p>
                  {billingPeriod === 'yearly' && (
                    <p className="mt-1 text-sm text-gray-500">
                      (${Math.round(plan.yearlyPrice / 12)}/month)
                    </p>
                  )}
                </div>
              </div>

              {/* Features List */}
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start group">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded?.map((feature) => (
                  <li key={feature} className="flex items-start opacity-50">
                    <X className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-500 text-sm line-through">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handlePlanSelect(plan.name)}
                style={{
                  WebkitAppearance: 'none',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
                className={`w-full rounded-lg px-4 py-3 text-center font-semibold transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Benefits Section */}
      <PricingBenefits />

      {/* Pricing Comparison Table Section */}
      <PricingComparisonTable />

      {/* Testimonials Section */}
      <PricingTestimonials />

      {/* FAQ Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-400">Got questions? We've got answers</p>
        </div>
        
        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl bg-gray-800 overflow-hidden transition-all duration-300 hover:bg-gray-800/80"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  style={{
                    WebkitAppearance: 'none',
                    outline: 'none',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`px-6 transition-all duration-300 ${
                    expandedFaq === index ? 'pb-4 opacity-100 max-h-96' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LogoCloud Section - Restored as per changelog */}
      <LogoCloud />

      {/* Final CTA Section */}
      <div className="relative bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-indigo-900/50 py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-gray-300 mb-4">Join 500+ businesses already using MONONIO AI</p>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Start your 14-day free trial today. No credit card required.
            Experience the power of AI-driven marketing automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              style={{
                WebkitAppearance: 'none',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
              className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button
              style={{
                WebkitAppearance: 'none',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
              className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-xl"
            >
              Schedule a Demo
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              14-day free trial
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
