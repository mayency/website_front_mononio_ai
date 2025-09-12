'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Does this actually work, or is it just hype?",
    answer: "MONONIO uses the same AI technology that powers Google and Facebook's billion-dollar ad systems. Our early users report 2-3x better results than their previous agencies, with average cost-per-lead dropping by 60% in the first month."
  },
  {
    question: "How much does it cost compared to agencies?",
    answer: "Agencies charge $5K-15K per month with 6-12 month contracts. MONONIO costs $297/month with no contracts. You can cancel anytime and keep everything you've built."
  },
  {
    question: "How long does it take to see results?",
    answer: "Most users see their first leads within 24-48 hours of launching. Full optimization typically happens within the first week as our AI learns your audience."
  },
  {
    question: "What happens if I want to cancel or leave?",
    answer: "Unlike agencies, you own everything - your ad accounts, audiences, and data. You can export everything and cancel anytime. No contracts, no hostage situations."
  },
  {
    question: "Do I need technical skills or marketing experience?",
    answer: "None. If you can describe your business in plain English, MONONIO handles the rest. The system is designed for business owners, not marketing experts."
  },
  {
    question: "How is this different from hiring a marketing agency?",
    answer: "Agencies cost $5K-15K/month, require 6-12 month contracts, keep your data hostage, and you have no control. With MONONIO, you pay $297/month, own everything, and have full transparency into every decision."
  },
  {
    question: "How is this different from tools like HubSpot or Marketo?",
    answer: "Those are complex marketing platforms that require teams to operate. MONONIO is specifically built for business owners who want results without the complexity. Think of it as the iPhone of marketing automation - powerful but simple."
  },
  {
    question: "What platforms does it work with?",
    answer: "Facebook, Instagram, Google Ads, YouTube, TikTok, LinkedIn, Twitter, and 15+ more. One system manages them all."
  },
  {
    question: "Can I see results before paying?",
    answer: "Yes. Start with our free demo where you can watch real campaigns being created for businesses similar to yours."
  },
  {
    question: "Is my data secure?",
    answer: "We use enterprise-grade security (same level as banks) with 256-bit encryption. Your business data never leaves your account, and we never share information with competitors or third parties."
  },
  {
    question: "What if the campaigns don't work?",
    answer: "Our AI monitors performance every 15 minutes and automatically pauses losing ads while scaling winners. If you're not satisfied in the first 30 days, we'll refund your money and help you transition back to your previous setup."
  },
  {
    question: "What's the catch? This sounds too good to be true.",
    answer: "There's no catch. We make money when you succeed, not from setup fees or long contracts. If MONONIO doesn't work for you, you can export everything and leave anytime. Your success is our business model."
  }
];

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
      staggerChildren: 0.1
    }
  }
};

interface FAQItemComponentProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItemComponent: React.FC<FAQItemComponentProps> = ({ faq, isOpen, onToggle, index }) => {
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
      variants={fadeInUp}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="text-lg md:text-xl font-semibold text-white pr-4">
          {faq.question}
        </h3>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </button>
      
      <motion.div
        id={`faq-answer-${index}`}
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <p className="text-gray-300 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-black py-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-16">
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          Everything You Need to Know
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          Honest answers to your most important questions
        </motion.p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <motion.div 
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {faqData.map((faq, index) => (
            <FAQItemComponent
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto text-center px-6 bg-gradient-to-t from-gray-900 to-black py-16 rounded-2xl">
        <motion.h3 
          className="text-3xl md:text-4xl font-bold mb-6 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
        >
          Ready to Stop Overpaying Agencies?
        </motion.h3>
        <motion.p 
          className="text-xl text-gray-300 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          Join hundreds of smart business owners who took control of their marketing
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
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
              variant="primary" 
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Watch 5-Min Demo
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
              className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Talk to Expert
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
