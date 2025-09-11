"use client";
import React from "react";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function ErrorBoundary({ 
  error, 
  reset,
}: { 
  error: Error & { digest?: string }; 
  reset: () => void;
}) { 
  useEffect(() => { 
    Sentry.captureException(error); 
  }, [error]); 

  return ( 
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center text-white">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">⚠️</h1>
          <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            We've encountered an unexpected error. Our team has been notified and is working to fix it.
          </p>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={reset}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Try again
          </button>
          
          <div className="text-sm text-gray-500">
            <p>Error ID: {error.digest || 'Unknown'}</p>
            <p className="mt-2">
              If this problem persists, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 