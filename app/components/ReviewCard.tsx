"use client";

import React from 'react';

interface ReviewItem {
  quote: string;
  author: string;
  title: string;
  location: string;
  results: string;
}

interface ReviewCardProps {
  review: ReviewItem;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-gray-900/50 border border-indigo-500/30 rounded-xl p-6 h-full flex flex-col justify-center">
      {/* Quote */}
      <div className="mb-6">
        <p className="text-white text-lg leading-relaxed italic">
{review.quote}
        </p>
      </div>
      
      {/* Author Info */}
      <div className="mb-4">
        <div className="text-indigo-400 font-semibold text-lg">
          {review.author}
        </div>
        <div className="text-gray-400 text-sm">
          {review.title}, {review.location}
        </div>
      </div>
      
      {/* Results */}
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
        <div className="text-green-400 font-semibold text-sm mb-1">
          RESULTS
        </div>
        <div className="text-gray-300 text-sm font-medium">
          {review.results}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
