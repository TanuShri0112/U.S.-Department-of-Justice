import React from 'react';
import { ArrowUp, TrendingUp, Award, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function PerformanceSection() {
  return (
    <Card className="overflow-hidden bg-white">
      <CardContent className="p-6">
        {/* Header with improved visual hierarchy */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Performance Score</h3>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="text-lg font-bold text-blue-700">3,567</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your total performance points</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Progress Circle with enhanced visuals */}
        <div className="flex flex-col items-center">
          <div className="relative w-36 h-36 mb-6">
            {/* Outer decorative circle */}
            <div className="absolute inset-0 rounded-full bg-blue-50/50"></div>
            
            {/* SVG Progress Circle */}
            <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-200"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress indicator */}
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-blue-500 transition-all duration-1000 ease-out"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.72)}`}
              />
            </svg>
            
            {/* Centered percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-blue-700">72%</span>
              <span className="text-sm text-blue-600 font-medium">Completed</span>
            </div>
          </div>

          {/* Growth indicator with enhanced design */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-700">+23% Growth</span>
            </div>
            
            <p className="text-sm text-gray-600 text-center max-w-[200px]">
              Impressive progress! You've improved by 23% since last month.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
