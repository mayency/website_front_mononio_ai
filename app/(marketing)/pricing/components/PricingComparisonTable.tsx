'use client';

import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    starter: boolean | string;
    professional: boolean | string;
    enterprise: boolean | string;
  }[];
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    category: 'Core Features',
    features: [
      {
        name: 'AI Campaign Optimization',
        starter: 'Basic',
        professional: 'Advanced',
        enterprise: 'Custom AI Models'
      },
      {
        name: 'Campaign Management',
        starter: 'Up to 5 campaigns',
        professional: 'Unlimited campaigns',
        enterprise: 'Unlimited + White-label'
      },
      {
        name: 'Platform Integrations',
        starter: '3 platforms',
        professional: '8 platforms',
        enterprise: 'All platforms + API'
      },
      {
        name: 'Analytics & Reporting',
        starter: 'Basic dashboard',
        professional: 'Advanced analytics',
        enterprise: 'Custom reporting + API'
      }
    ]
  },
  {
    category: 'Support & Service',
    features: [
      {
        name: 'Customer Support',
        starter: 'Email support',
        professional: 'Priority email & chat',
        enterprise: '24/7 dedicated support'
      },
      {
        name: 'Account Management',
        starter: false,
        professional: false,
        enterprise: 'Dedicated account manager'
      },
      {
        name: 'Training & Onboarding',
        starter: 'Self-service',
        professional: 'Guided setup',
        enterprise: 'Custom training sessions'
      },
      {
        name: 'SLA Guarantee',
        starter: false,
        professional: false,
        enterprise: true
      }
    ]
  },
  {
    category: 'Advanced Features',
    features: [
      {
        name: 'A/B Testing',
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: 'Custom Audiences',
        starter: false,
        professional: true,
        enterprise: true
      },
      {
        name: 'White-label Options',
        starter: false,
        professional: false,
        enterprise: true
      },
      {
        name: 'API Access',
        starter: false,
        professional: false,
        enterprise: true
      },
      {
        name: 'Custom Integrations',
        starter: false,
        professional: false,
        enterprise: true
      }
    ]
  }
];

export default function PricingComparisonTable() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Core Features']));

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const renderFeatureValue = (value: boolean | string, plan: string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-400 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-500 mx-auto" />
      );
    }
    
    return (
      <span className={`text-sm ${
        plan === 'enterprise' ? 'text-green-400' : 
        plan === 'professional' ? 'text-blue-400' : 
        'text-gray-300'
      }`}>
        {value}
      </span>
    );
  };

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
        <h3 className="text-2xl font-bold text-white text-center">Detailed Feature Comparison</h3>
        <p className="text-gray-300 text-center mt-2">Compare all features across our pricing plans</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-4 px-6 text-gray-300 font-semibold">Features</th>
              <th className="text-center py-4 px-6 text-gray-300 font-semibold">Starter</th>
              <th className="text-center py-4 px-6 text-blue-400 font-semibold">Professional</th>
              <th className="text-center py-4 px-6 text-green-400 font-semibold">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((category, categoryIndex) => (
              <React.Fragment key={category.category}>
                {/* Category Header */}
                <tr 
                  className="bg-gray-800/50 cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => toggleCategory(category.category)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{category.category}</span>
                      {expandedCategories.has(category.category) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6"></td>
                  <td className="py-4 px-6"></td>
                  <td className="py-4 px-6"></td>
                </tr>

                {/* Category Features */}
                {expandedCategories.has(category.category) && category.features.map((feature, featureIndex) => (
                  <tr 
                    key={`${categoryIndex}-${featureIndex}`}
                    className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-300 pl-8">{feature.name}</td>
                    <td className="py-4 px-6 text-center">
                      {renderFeatureValue(feature.starter, 'starter')}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderFeatureValue(feature.professional, 'professional')}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {renderFeatureValue(feature.enterprise, 'enterprise')}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 px-6 py-6 text-center">
        <p className="text-gray-300 mb-4">Still not sure which plan is right for you?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            style={{
              WebkitAppearance: 'none',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          >
            Schedule a Demo
          </button>
          <button
            style={{
              WebkitAppearance: 'none',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
            className="px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
