"use client";

import DarkVeil from "@/components/DarkVeil";

export default function DarkVeilDemo() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">DarkVeil Component Demo</h1>
        
        {/* Basic Usage Example */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Basic Usage</h2>
          <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <DarkVeil />
          </div>
        </div>

        {/* Customized Example */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Customized with Parameters</h2>
          <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <DarkVeil
              hueShift={210}
              noiseIntensity={0.02}
              scanlineIntensity={0.15}
              scanlineFrequency={2.5}
              warpAmount={0.05}
              speed={0.6}
              resolutionScale={1.2}
            />
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Usage Instructions</h3>
          <div className="text-gray-300 space-y-2">
            <p><strong>Installation:</strong> <code className="bg-gray-700 px-2 py-1 rounded">npm install ogl</code></p>
            <p><strong>Import:</strong> <code className="bg-gray-700 px-2 py-1 rounded">import DarkVeil from './DarkVeil';</code></p>
            <p><strong>Basic Usage:</strong></p>
            <pre className="bg-gray-700 p-4 rounded overflow-x-auto">
{`<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <DarkVeil />
</div>`}
            </pre>
          </div>
        </div>

        {/* Available Props */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Available Props</h3>
          <div className="text-gray-300 space-y-2">
            <p><strong>hueShift:</strong> Color hue shift (0-360)</p>
            <p><strong>noiseIntensity:</strong> Noise effect intensity (0-1)</p>
            <p><strong>scanlineIntensity:</strong> Scanline effect intensity (0-1)</p>
            <p><strong>speed:</strong> Animation speed multiplier</p>
            <p><strong>scanlineFrequency:</strong> Scanline frequency</p>
            <p><strong>warpAmount:</strong> Warp distortion amount (0-1)</p>
            <p><strong>resolutionScale:</strong> Resolution scaling factor</p>
          </div>
        </div>
      </div>
    </div>
  );
} 