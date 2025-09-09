"use client";

import React, { useState } from "react";
import FAQItem from "./FAQItem";
import { faqData, FAQItem as FAQItemType } from "../data/faqData";

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-8">
      {faqData.map((faq: FAQItemType, index: number) => (
        <FAQItem
          key={index}
          faq={faq}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          index={index}
        />
      ))}
    </div>
  );
};

export default FAQAccordion; 