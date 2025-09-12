'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface Props {
  onClose?: () => void;
  mode?: 'modal' | 'inline';
  className?: string;
}

export default function SavingsCalculator({ onClose, mode = 'modal', className = '' }: Props) {
  const [currentSpend, setCurrentSpend] = useState(10000);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [yearlySavings, setYearlySavings] = useState(0);

  // Calculate savings in real-time
  useEffect(() => {
    const mononioGost = currentSpend > 5000 ? 597 : 297;
    const savings = currentSpend - mononioGost;
    setMonthlySavings(Math.max(0, savings));
    setYearlySavings(Math.max(0, savings) * 12);
  }, [currentSpend]);

  const calculatorContent = (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-8">Savings Calculator</h3>
        <p className="text-gray-300 mb-6">
          What do you currently pay your marketing agency per month?
        </p>
      </div>

      <div className="bg-white/10 rounded-2xl p-8">
        <div className="mb-6">
          <label className="block text-white text-lg mb-4">
            Current monthly agency cost:
          </label>
          <input
            type="range"
            min="3000"
            max="20000"
            step="500"
            value={currentSpend}
            onChange={(e) => setCurrentSpend(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-gray-400 mt-2">
            <span>$3,000</span>
            <span className="text-2xl font-bold text-white">${currentSpend.toLocaleString()}</span>
            <span>$20,000</span>
          </div>
        </div>
        
        <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-6 mb-6">
          <div className="text-4xl font-bold text-green-400 mb-2">
            Save ${monthlySavings.toLocaleString()}/month
          </div>
          <div className="text-gray-300">
            That's ${yearlySavings.toLocaleString()} per year!
          </div>
        </div>
        
        <Button 
          onClick={() => {
            if (onClose) onClose();
            window.location.href = '#contact';
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Start Your Free Trial
        </Button>
      </div>

      {/* Safari-specific slider styling */}
      <style jsx>{`
        input[type="range"] { 
          -webkit-appearance: none !important; 
          outline: none!important;
        }
        input[type="range"]::-webkit-slider-thumb { 
          -webkit-appearance: none !important; 
          appearance: none; 
          width: 24px; 
          height: 24px; 
          border-radius: 50%; 
          background: #6366f1; 
          cursor: pointer; 
          border: 3px solid white; 
          box-shadow: 0 2px 10px rgba(0,0,0,0.4);
        }
        input[type="range"]::-moz-range-thumb { 
          width: 24px; 
          height: 24px; 
          border-radius: 50%; 
          background: #6366f1; 
          cursor: pointer; 
          border: 3px solid white; 
          box-shadow: 0 2px 10px rgba(0,0,0,0.4); 
          border: none;
        }
        input[type="range"]:focus { 
          outline: none!important; 
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );

  if (mode === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
          {onClose && (
            <button
              onClick={onClose}
              className="float-right text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          )}
          {calculatorContent}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`py-12 px-4 md:px-6 lg:px-8 bg-white/5 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {calculatorContent}
      </div>
    </motion.div>
  );
}
