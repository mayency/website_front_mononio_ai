import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/ui/Button";
import Breadcrumb from "../../components/Breadcrumb";
import FAQAccordion from "./components/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ - Everything You Need to Know | MONONIO AI",
  description: "Get honest answers to your most important questions about MONONIO AI. Learn how our platform works, pricing, security, and more.",
  keywords: "MONONIO AI FAQ, marketing automation questions, AI marketing platform, small business marketing",
  openGraph: {
    title: "FAQ - Everything You Need to Know | MONONIO AI",
    description: "Get honest answers to your most important questions about MONONIO AI.",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Logo Header */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
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
            height={80}
            className="h-[22px] sm:h-[28px] lg:h-[35px] xl:h-[39px] 2xl:h-[45px] w-auto object-contain drop-shadow-xl transition-transform hover:scale-105"
            priority
          />
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: "FAQ" }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Everything You Need to Know
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Honest answers to your most important questions
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <FAQAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-t from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Stop Overpaying Agencies?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of smart business owners who took control of their marketing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Watch 5-Min Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
            >
              Talk to Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
