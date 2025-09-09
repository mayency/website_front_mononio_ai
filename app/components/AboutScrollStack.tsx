"use client";
import React from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

export default function AboutScrollStack() {
  const items = [
    {
      title: "Step 1: Describe",
      description: "Just Talk - We Handle Everything Else. Tell our AI about your business in plain English. No technical setup, no complicated forms - just describe what you sell and who you want to reach",
      gradient: "from-purple-600/20 to-blue-600/20",
      borderColor: "border-purple-400/30",
      textGradient: "from-purple-400 to-blue-400"
    },
    {
      title: "Step 2: Generate ",
      description: "Watch AI Create Your Complete Campaign. Within minutes, get professional ad copy, targeting options, budget recommendations and creative assets - all customized for your specific business.",
      gradient: "from-blue-600/20 to-cyan-600/20",
      borderColor: "border-blue-400/30",
      textGradient: "from-blue-400 to-cyan-400"
    },
    {
      title: "Step 3: Launch",
      description: "Go Live on All Platforms Instantly One click deploys your campaign across Facebook, Google, TikTok, LinkedIn and more. No need to learn each platform separately",
      gradient: "from-cyan-600/20 to-green-600/20",
      borderColor: "border-cyan-400/30",
      textGradient: "from-cyan-400 to-green-400"
    },
    {
      title: "Step 4: Profit",
      description: "Sit Back While AI Maximizes Your ROI Our AI continuously optimizes your campaigns 24/7, automatically increasing budget on winners and pausing losers",
      gradient: "from-green-600/20 to-purple-600/20",
      borderColor: "border-green-400/30",
      textGradient: "from-green-400 to-purple-400"
    }
  ];

  return (
    <section className="bg-black">
      <div className="text-center py-8 md:py-12 lg:py-16 px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
        From Idea to Results in Under 10 Minutes
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
        See exactly how MONONIO turns any business idea into profitable campaigns
        </p>
      </div>
      
      <ScrollStack
        className="max-w-3xl lg:max-w-4xl mx-auto"
        style={{ marginTop: '-50px' }}
        itemDistance={100}           // מרחק קטן יותר למסכים קטנים
        itemScale={0.005}            
        itemStackDistance={25}       // מרחק קטן יותר בערימה
        stackPosition="30%"          
        scaleEndPosition="20%"       
        baseScale={0.95}             
        scaleDuration={0.2}          
        rotationAmount={0}           
        blurAmount={0}               
      >
        {items.map((item, index) => (
          <ScrollStackItem 
            key={index}
            itemClassName={`bg-gradient-to-br ${item.gradient} border ${item.borderColor} backdrop-blur-sm 
              h-60 md:h-72 lg:h-80 
              p-6 md:p-10 lg:p-12`}
          >
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-3 md:space-y-4 lg:space-y-6">
                <h3 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.textGradient}`}>
                  {item.title}
                </h3>
                <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-xl lg:max-w-2xl mx-auto px-2 md:px-4">
                  {item.description}
                </p>
                <div className="flex justify-center space-x-3 md:space-x-4 pt-2 md:pt-4">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse delay-75"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}