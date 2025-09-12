'use client';

import React, { useState } from 'react';
import { Check, X, Calculator, Zap, ArrowRight, ChevronDown } from 'lucide-react';
import SavingsCalculator from './SavingsCalculator';

export default function PricingSection() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      description: 'Perfect for small businesses getting started',
      features: [
        'Up to 5 campaigns per month',
        'Basic AI optimization',
        '3 platform integrations',
        'Email support',
        'Basic analytics dashboard',
      ],
      notIncluded: [
        'Advanced AI features',
        'Custom integrations',
        'Priority support',
      ],
    },
    {
      name: 'Professional',
      monthlyPrice: 799,
      yearlyPrice: 7990,
      description: 'For growing businesses that need more power',
      features: [
        'Up to 20 campaigns per month',
        'Advanced AI optimization',
        '8 platform integrations',
        'Priority email & chat support',
        'Advanced analytics & reporting',
        'A/B testing capabilities',
        'Custom audiences',
      ],
      notIncluded: [
        'Unlimited campaigns',
        'Dedicated account manager',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 2499,
      yearlyPrice: 24990,
      description: 'Full-featured solution for large organizations',
      features: [
        'Unlimited campaigns',
        'Full AI suite with custom models',
        'All platform integrations',
        '24/7 dedicated support',
        'Custom analytics & reporting',
        'White-label options',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
      ],
      notIncluded: [],
    },
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Absolutely! We offer a 14-day free trial for all plans. No credit card required.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.',
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Replace your $15K/month agency with AI-powered marketing for 95% less
          </p>
          
          {/* Calculate Savings Button - With Safari Fix */}
          <div className="mt-8">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                outline: 'none',
                border: 'none',
                WebkitTapHighlightColor: 'transparent',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 focus:outline-none"
            >
              <Calculator className="w-5 h-5" />
              Calculate Your Savings
            </button>
          </div>
        </div>

        {/* Savings Calculator Modal/Inline */}
        {showCalculator && (
          <div className="mb-12 animate-fadeIn">
            <SavingsCalculator 
              mode="inline"
              onClose={() => setShowCalculator(false)}
            />
          </div>
        )}

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={`font-medium ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-700 transition-colors focus:outline-none"
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform shadow-lg ${
                billingPeriod === 'yearly' ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`font-medium ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
            Yearly
            <span className="ml-2 inline-flex items-center gap-1 text-green-400 text-sm font-bold">
              <Zap className="w-3 h-3" /> Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-b from-purple-900/50 to-gray-800 ring-2 ring-purple-500 shadow-xl shadow-purple-500/20'
                  : 'bg-gray-800'
              } transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">
                    ${billingPeriod === 'monthly' ? plan.monthlyPrice.toLocaleString() : plan.yearlyPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                  {billingPeriod === 'yearly' && (
                    <p className="mt-1 text-sm text-gray-500">
                      (${Math.round(plan.yearlyPrice / 12)}/month)
                    </p>
                  )}
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
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

              <button
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  appearance: 'none',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none'
                }}
                className={`w-full rounded-lg px-4 py-3 text-center font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none ${
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

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none',
                    outline: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none'
                  }}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors focus:outline-none"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`px-6 transition-all duration-300 overflow-hidden ${
                    expandedFaq === index ? 'py-4 opacity-100 max-h-96' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}