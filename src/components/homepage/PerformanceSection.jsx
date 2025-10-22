import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function PerformanceSection() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Performance</h3>
        <div className="text-2xl font-bold text-gray-900">3,567.00</div>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3B82F6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.72)}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">72%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-green-600 mb-2">
          <ArrowUp className="w-4 h-4" />
          <span className="text-sm font-medium">+23%</span>
        </div>
        
        <p className="text-sm text-gray-500 text-center">
          You have a 23% growth in comparison with last month.
        </p>
      </div>
    </div>
  );
}
