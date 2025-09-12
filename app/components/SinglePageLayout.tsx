'use client';

import React from 'react';
import HomePageClient from './HomePageClient';
import AboutScrollStack from './AboutScrollStack';
import ComparisonCards from './ComparisonCards';
import AboutSection from './AboutSection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import FAQSection from './FAQSection';
import LogoCloud from './LogoCloud';

export default function SinglePageLayout() { 
  return ( 
    <div className="min-h-screen bg-black"> 
      {/* Homepage content - Hero section */} 
      <HomePageClient /> 

      {/* Process section - 4 Steps "From Idea to Results in Under 10 Minutes" */} 
      <section id="how-it-works" className="scroll-mt-20"> 
        <AboutScrollStack /> 
      </section> 

      {/* Comparison Cards - "Ready to See What $15K/Month Agencies Don't Want You to Know" */} 
      <section id="comparison" className="scroll-mt-20"> 
        <ComparisonCards /> 
      </section> 

      {/* About section - "Why Smart Business Owners Choose MONONIO" */} 
      <section id="about" className="scroll-mt-20"> 
        <AboutSection /> 
      </section> 

      {/* Testimonials section */} 
      <section id="testimonials" className="scroll-mt-20"> 
        <TestimonialsSection /> 
      </section> 

      {/* Pricing section */} 
      <section id="pricing" className="scroll-mt-20"> 
        <PricingSection /> 
      </section> 

      {/* FAQ section */} 
      <section id="faq" className="scroll-mt-20"> 
        <FAQSection /> 
      </section> 

      {/* Logo Cloud - Platform Integrations at the very bottom */} 
      <section id="platforms" className="mt-0"> 
        <LogoCloud /> 
      </section> 
    </div> 
  );
}
