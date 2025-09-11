"use client";

import React, { useEffect, useState, useRef } from 'react';

interface AnimatedStatProps {
  value: string;
  label: string;
  color: string;
  delay: number;
  isPercentage?: boolean;
  isCurrency?: boolean;
  isTime?: boolean;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ 
  value, 
  label, 
  color, 
  delay,
  isPercentage = false,
  isCurrency = false,
  isTime = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            animateValue();
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animateValue = () => {
    let start = 0;
    let end: number;
    
    if (isPercentage) {
      end = parseInt(value.replace('%', ''));
    } else if (isCurrency) {
      end = parseInt(value.replace(/[$,]/g, ''));
    } else if (isTime) {
      end = parseInt(value.replace(' hours', ''));
    } else {
      end = parseInt(value) || 0;
    }

    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedValue(end);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(start));
      }
    }, 16);
  };

  const formatValue = (val: number) => {
    if (isPercentage) return `${val}%`;
    if (isCurrency) return `$${val.toLocaleString()}`;
    if (isTime) return `${val} hours`;
    return val.toString();
  };

  return (
    <div 
      ref={ref}
      className={`bg-gray-900/50 border border-gray-800 rounded-xl p-6 transition-all duration-700 ease-out transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/50 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-8 opacity-0'
      }`}
    >
      <div className={`text-4xl font-bold ${color} mb-2 transition-all duration-300`}>
        {isVisible ? formatValue(animatedValue) : '0'}
      </div>
      <p className="text-gray-300">{label}</p>
    </div>
  );
};

const AnimatedStats: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <AnimatedStat
        value="95%"
        label="Get better results than their previous agency"
        color="text-indigo-400"
        delay={0}
        isPercentage={true}
      />
      <AnimatedStat
        value="24 hours"
        label="Average time to see first results"
        color="text-purple-400"
        delay={200}
        isTime={true}
      />
      <AnimatedStat
        value="$8,500"
        label="Average monthly savings vs agencies"
        color="text-green-400"
        delay={400}
        isCurrency={true}
      />
    </div>
  );
};

export default AnimatedStats;
