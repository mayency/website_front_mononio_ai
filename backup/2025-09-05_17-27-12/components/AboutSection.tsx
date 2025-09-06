 "use client";

import React from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

export default function AboutSection() {
  const handleStackComplete = () => {
    // אופציונלי: אפשר להוסיף לוגיקה כשהstack הושלם
    // console.log("Scroll stack completed");
  };

  return (
    <section id="about" className="relative bg-black min-h-screen">
      {/* Header Section */}
      <div className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold text-white mb-4">
          About Mononio AI
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Revolutionizing multi-channel marketing with intelligent AI agents that automate your campaigns across all major platforms.
        </p>
      </div>

      {/* ScrollStack Section */}
      <ScrollStack onStackComplete={handleStackComplete}>
        <ScrollStackItem itemClassName="bg-gradient-to-br from-purple-600/15 to-blue-600/15 border border-purple-400/20 backdrop-blur-sm">
          <div className="text-white h-full flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6 text-purple-300">
              Our Vision
            </h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              We believe marketing should be intelligent, automated, and effective. Our AI platform learns from your data to optimize campaigns in real-time across multiple channels.
            </p>
          </div>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-gradient-to-br from-blue-600/15 to-teal-600/15 border border-blue-400/20 backdrop-blur-sm">
          <div className="text-white h-full flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6 text-blue-300">
              Customer Stories
            </h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              Join thousands of successful businesses that have transformed their marketing operations with Mononio AI intelligent automation platform.
            </p>
          </div>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-gradient-to-br from-teal-600/15 to-green-600/15 border border-teal-400/20 backdrop-blur-sm">
          <div className="text-white h-full flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6 text-teal-300">
              Technology
            </h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              Our AI-powered platform uses advanced machine learning algorithms to optimize your campaigns across multiple channels simultaneously.
            </p>
          </div>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-gradient-to-br from-yellow-600/15 to-red-600/15 border border-yellow-400/20 backdrop-blur-sm">
          <div className="text-white h-full flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6 text-yellow-300">
              Get Started
            </h3>
            <p className="text-lg text-gray-200 leading-relaxed">
              Ready to transform your marketing? Contact us today to schedule a demo and see how Mononio AI can revolutionize your campaigns.
            </p>
          </div>
        </ScrollStackItem>
      </ScrollStack>
    </section>
  );
}