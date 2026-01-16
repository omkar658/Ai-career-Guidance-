'use client';

import { Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'pulse';
}

export default function LoadingSpinner({
  message = "Loading...",
  size = 'md',
  variant = 'gradient'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'gradient':
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-spin`}></div>
            <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse opacity-50`}></div>
          </div>
        );
      case 'pulse':
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        );
      default:
        return (
          <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        {renderSpinner()}
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-600 font-medium">{message}</p>
        <p className="text-sm text-gray-500 mt-1">AI is analyzing your profile...</p>
      </div>
    </div>
  );
}