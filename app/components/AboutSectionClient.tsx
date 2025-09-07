"use client";

import React, { useState } from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

export default function AboutSectionClient() {
  const [controls, setControls] = useState({
    itemDistance: 200,
    stackDistance: 30,
    stackPosition: 25,
    baseScale: 0.85,
    rotationAmount: 0,
    blurAmount: 0,
  });

  const [showControls, setShowControls] = useState(false);

  const updateControl = (key: string, value: number) => {
    setControls(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <section id="about" className="relative bg-black">
      {/* Header Section */}
      <div className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold text-white mb-4">
          About Mononio AI
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Revolutionizing multi-channel marketing with intelligent AI agents that automate your campaigns across all major platforms.
        </p>
        
        {/* Toggle Controls Button */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          {showControls ? 'Hide' : 'Customize'} ScrollStack
        </button>
      </div>

      {/* Control Panel */}
      {showControls && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 border border-gray-700 rounded-lg p-6 w-80 max-h-[80vh] overflow-y-auto">
          <h3 className="text-white text-lg font-bold mb-4">Customize</h3>
          
          <div className="space-y-4">
            {/* Item Distance */}
            <div>
              <label className="block text-white text-sm mb-2">
                Item Distance: {controls.itemDistance}px
              </label>
              <input
                type="range"
                min="50"
                max="400"
                value={controls.itemDistance}
                onChange={(e) => updateControl('itemDistance', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Stack Distance */}
            <div>
              <label className="block text-white text-sm mb-2">
                Stack Distance: {controls.stackDistance}px
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={controls.stackDistance}
                onChange={(e) => updateControl('stackDistance', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Stack Position */}
            <div>
              <label className="block text-white text-sm mb-2">
                Stack Position: {controls.stackPosition}%
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={controls.stackPosition}
                onChange={(e) => updateControl('stackPosition', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Base Scale */}
            <div>
              <label className="block text-white text-sm mb-2">
                Base Scale: {controls.baseScale}
              </label>
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.01"
                value={controls.baseScale}
                onChange={(e) => updateControl('baseScale', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Rotation Amount */}
            <div>
              <label className="block text-white text-sm mb-2">
                Rotation Amount: {controls.rotationAmount}°
              </label>
              <input
                type="range"
                min="0"
                max="15"
                value={controls.rotationAmount}
                onChange={(e) => updateControl('rotationAmount', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Blur Amount */}
            <div>
              <label className="block text-white text-sm mb-2">
                Blur Amount: {controls.blurAmount}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={controls.blurAmount}
                onChange={(e) => updateControl('blurAmount', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={() => setControls({
                itemDistance: 200,
                stackDistance: 30,
                stackPosition: 25,
                baseScale: 0.85,
                rotationAmount: 0,
                blurAmount: 0,
              })}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors mt-4"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      )}

      {/* ScrollStack */}
      <div className="relative">
        <ScrollStack 
          className="max-w-4xl mx-auto"
          itemDistance={controls.itemDistance}        
          itemScale={0.03}         
          itemStackDistance={controls.stackDistance}    
          stackPosition={`${controls.stackPosition}%`}       
          scaleEndPosition="10%"    
          baseScale={controls.baseScale}          
          rotationAmount={controls.rotationAmount}
          blurAmount={controls.blurAmount}
        >
          <ScrollStackItem itemClassName="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-400/30 backdrop-blur-sm">
            <div className="text-white h-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-6 text-purple-300">
                Our Vision
              </h3>
              <p className="text-lg text-gray-200 leading-relaxed">
                We envision a world where marketing teams can focus on creativity and strategy while AI handles the complexity of multi-platform campaign management.
              </p>
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="bg-gradient-to-br from-pink-600/20 to-orange-600/20 border border-pink-400/30 backdrop-blur-sm">
            <div className="text-white h-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-6 text-pink-300">
                Customer Stories
              </h3>
              <p className="text-lg text-gray-200 leading-relaxed">
                Join thousands of successful businesses that have transformed their marketing operations with Mononio AI&apos;s intelligent automation platform.
              </p>
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="bg-gradient-to-br from-green-600/20 to-teal-600/20 border border-green-400/30 backdrop-blur-sm">
            <div className="text-white h-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-6 text-green-300">
                Technology
              </h3>
              <p className="text-lg text-gray-200 leading-relaxed">
                Our AI-powered platform uses advanced machine learning algorithms to optimize your campaigns across multiple channels simultaneously.
              </p>
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="bg-gradient-to-br from-yellow-600/20 to-red-600/20 border border-yellow-400/30 backdrop-blur-sm">
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
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
} 