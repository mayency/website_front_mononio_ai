"use client";

import React from "react";
import { FAQItem as FAQItemType } from "../data/faqData";

interface FAQItemProps {
  faq: FAQItemType;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle, index }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:border-indigo-500/50 hover:scale-[1.02]"
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <button
        className="w-full p-8 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        tabIndex={0}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-indigo-400 pr-4">
            {faq.question}
          </h3>
          <div
            className={`transform transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
          >
            <svg
              className="w-6 h-6 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>
      
      <div
        id={`faq-answer-${index}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="px-8 pb-8">
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-300 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem; 