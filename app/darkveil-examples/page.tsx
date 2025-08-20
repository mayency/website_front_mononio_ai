"use client";

import { useState } from "react";
import DarkVeil from "@/components/DarkVeil";

export default function DarkVeilExamples() {
  const [activeExample, setActiveExample] = useState(0);

  const examples = [
    {
      name: "Default Dark Veil",
      description: "Basic dark veil effect with subtle animation",
      props: {},
    },
    {
      name: "Purple Haze",
      description: "Dark veil with purple hue shift and enhanced noise",
      props: {
        hueShift: 270,
        noiseIntensity: 0.15,
        speed: 0.8,
      },
    },
    {
      name: "Cyberpunk Scanlines",
      description: "Retro scanline effect with warp distortion",
      props: {
        scanlineIntensity: 0.4,
        scanlineFrequency: 3.0,
        warpAmount: 0.2,
        speed: 1.2,
      },
    },
    {
      name: "Noisy Distortion",
      description: "High noise with strong warp effects",
      props: {
        noiseIntensity: 0.3,
        warpAmount: 0.4,
        speed: 0.6,
        scanlineIntensity: 0.1,
      },
    },
    {
      name: "Subtle Overlay",
      description: "Very subtle dark overlay for background enhancement",
      props: {
        noiseIntensity: 0.05,
        scanlineIntensity: 0.05,
        warpAmount: 0.1,
        speed: 0.3,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          DarkVeil Component Examples
        </h1>
        
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Explore different configurations of the DarkVeil WebGL effect. 
          Each example demonstrates various parameters and their visual impact.
        </p>

        {/* Example Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setActiveExample(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeExample === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {example.name}
            </button>
          ))}
        </div>

        {/* Active Example Display */}
        <div className="mb-8">
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {examples[activeExample].name}
            </h2>
            <p className="text-gray-300 mb-4">
              {examples[activeExample].description}
            </p>
            <div className="bg-gray-900 p-4 rounded">
              <h3 className="text-white font-semibold mb-2">Props:</h3>
              <pre className="text-green-400 text-sm overflow-x-auto">
                {JSON.stringify(examples[activeExample].props, null, 2)}
              </pre>
            </div>
          </div>

          {/* Canvas Container */}
          <div 
            className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-600"
            style={{ background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)' }}
          >
            <DarkVeil {...examples[activeExample].props} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {examples[activeExample].name}
                </h3>
                <p className="text-gray-300 text-sm">
                  WebGL-powered dark veil effect
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Usage</h3>
            <pre className="bg-gray-900 p-4 rounded text-green-400 text-sm overflow-x-auto">
{`import DarkVeil from "@/components/DarkVeil";

<div className="relative w-full h-96">
  <DarkVeil />
</div>`}
            </pre>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">With Custom Props</h3>
            <pre className="bg-gray-900 p-4 rounded text-green-400 text-sm overflow-x-auto">
{`<DarkVeil
  hueShift={270}
  noiseIntensity={0.15}
  scanlineIntensity={0.3}
  speed={0.8}
  warpAmount={0.2}
/>`}
            </pre>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Available Props</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-300"><strong>hueShift:</strong> <span className="text-green-400">number</span> - Color hue shift in degrees (0-360)</p>
              <p className="text-gray-300"><strong>noiseIntensity:</strong> <span className="text-green-400">number</span> - Noise overlay intensity (0-1)</p>
              <p className="text-gray-300"><strong>scanlineIntensity:</strong> <span className="text-green-400">number</span> - Scanline effect intensity (0-1)</p>
              <p className="text-gray-300"><strong>speed:</strong> <span className="text-green-400">number</span> - Animation speed multiplier</p>
            </div>
            <div>
              <p className="text-gray-300"><strong>scanlineFrequency:</strong> <span className="text-green-400">number</span> - Scanline frequency</p>
              <p className="text-gray-300"><strong>warpAmount:</strong> <span className="text-green-400">number</span> - Warp distortion amount (0-1)</p>
              <p className="text-gray-300"><strong>resolutionScale:</strong> <span className="text-green-400">number</span> - Resolution scaling factor</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a 
            href="/darkveil-demo" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Original Demo
          </a>
        </div>
      </div>
    </div>
  );
} 