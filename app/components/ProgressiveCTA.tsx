'use client';

import { useState } from 'react';
import CampaignBox from './CampaignBox';
import SavingsCalculator from './SavingsCalculator';

export default function ProgressiveCTA() { 
  const [activeModal, setActiveModal] = useState<string | null>(null); 

  return ( 
    <> 
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center"> 
        <button 
          onClick={() => setActiveModal('calculator')} 
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 w-full sm:w-auto" 
        > 
          Calculate My Savings 
          <span className="block text-sm font-normal mt-1">Takes 10 seconds</span> 
        </button> 

        <button 
          onClick={() => setActiveModal('demo')} 
          className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 border border-gray-600 w-full sm:w-auto" 
        > 
          Watch 2-Minute Demo 
          <span className="block text-sm font-normal mt-1">See it in action</span> 
        </button> 

        <button 
          onClick={() => setActiveModal('campaign')} 
          className="text-purple-400 hover:text-purple-300 underline text-lg transition-all duration-200" 
        > 
          or start building now → 
        </button> 
      </div> 

      { activeModal === 'calculator' && ( 
        <SavingsCalculator onClose={() => setActiveModal(null)} /> 
      )} 

      { activeModal === 'demo' && ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"> 
          <div className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full"> 
            <button 
              onClick={() => setActiveModal(null)} 
              className="float-right text-gray-400 hover:text-white" 
            > 
              ✕ 
            </button> 
            <h2 className="text-2xl font-bold mb-4">Watch MONONIO Create a Campaign</h2> 
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center"> 
              <p className="text-gray-400">Demo video placeholder - embed your video here</p> 
            </div> 
          </div> 
        </div> 
      )} 

      { activeModal === 'campaign' && ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"> 
          <div className="max-w-xl w-full"> 
            <button 
              onClick={() => setActiveModal(null)} 
              className="float-right text-gray-400 hover:text-white mb-4" 
            > 
              ✕ 
            </button> 
            <CampaignBox /> 
          </div> 
        </div> 
      )} 
    </> 
  );
}
