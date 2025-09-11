"use client";

import React from 'react';

interface ReviewItem {
  quote: string;
  author: string;
  title: string;
  location: string;
  results: string;
  profilePicture?: string;
  rating: number;
}

interface ReviewCardProps {
  review: ReviewItem;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Generate initials from author name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Generate star rating display with realistic gold color
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating 
            ? 'text-yellow-500 drop-shadow-sm' 
            : 'text-gray-600'
        }`}
        style={{
          filter: index < rating ? 'drop-shadow(0 0 2px rgba(234, 179, 8, 0.5))' : 'none'
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-gray-900/50 border border-indigo-500/30 rounded-xl p-6 h-full flex flex-col justify-center">
      {/* Quote */}
      <div className="mb-6">
        <p className="text-white text-lg leading-relaxed italic">
          {review.quote}
        </p>
      </div>
      
      {/* Author Info with Profile Picture */}
      <div className="mb-4 flex items-center gap-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          {review.profilePicture ? (
            <img
              src={review.profilePicture}
              alt={`${review.author} profile`}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/30"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center border-2 border-indigo-500/30">
              <span className="text-white font-bold text-sm">
                {getInitials(review.author)}
              </span>
            </div>
          )}
        </div>
        
        {/* Author Details */}
        <div className="flex-1">
          <div className="text-indigo-400 font-semibold text-lg">
            {review.author}
          </div>
          <div className="text-gray-400 text-sm">
            {review.title}, {review.location}
          </div>
          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-1">
            {renderStars(review.rating)}
          </div>
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
