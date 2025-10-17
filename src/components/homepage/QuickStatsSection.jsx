import React from 'react';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  MoreVertical,
  X,
  Layers,
  FileText,
  Clock,
  Target
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const getQuickStats = (t) => [
  {
    id: 1,
    icon: BookOpen,
    iconColor: 'bg-blue-50',
    iconTextColor: 'text-blue-600',
    progress: '42/50',
    total: 50,
    completed: 42,
    title: t('coursesCompleted'),
    subtitle: t('coursesCompletedSubtitle'),
    color: 'blue',
    percentage: 84
  },
  {
    id: 2,
    icon: Award,
    iconColor: 'bg-pink-50',
    iconTextColor: 'text-pink-600',
    progress: '91%',
    total: 100,
    completed: 91,
    title: t('averageScore'),
    subtitle: t('avgScore'),
    color: 'pink',
    percentage: 91
  },
  {
    id: 3,
    icon: Clock,
    iconColor: 'bg-green-50',
    iconTextColor: 'text-green-600',
    progress: '18',
    total: 20,
    completed: 18,
    title: t('hoursSpentLearning'),
    subtitle: t('hours'),
    color: 'green',
    percentage: 90
  },
  {
    id: 4,
    icon: Target,
    iconColor: 'bg-purple-50',
    iconTextColor: 'text-purple-600',
    progress: '15/20',
    total: 20,
    completed: 15,
    title: t('assessmentsCompleted'),
    subtitle: t('assessmentsCompletedSubtitle'),
    color: 'purple',
    percentage: 75
  }
];

export default function QuickStatsSection() {
  const { t } = useTranslation();
  const quickStats = getQuickStats(t);
  
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const IconComponent = stat.icon;
          const progressPercentage = stat.percentage;
          const circumference = 2 * Math.PI * 45; // radius = 45
          const strokeDasharray = circumference;
          const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;
          
          return (
            <div
              key={stat.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 ${
                stat.color === 'blue' ? 'bg-gradient-to-br from-blue-50 to-blue-100/30' :
                stat.color === 'pink' ? 'bg-gradient-to-br from-pink-50 to-pink-100/30' :
                stat.color === 'green' ? 'bg-gradient-to-br from-green-50 to-green-100/30' :
                'bg-gradient-to-br from-purple-50 to-purple-100/30'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Circular Progress Indicator */}
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      className={`transition-all duration-1000 ease-out ${
                        stat.color === 'blue' ? 'text-blue-500' :
                        stat.color === 'pink' ? 'text-pink-500' :
                        stat.color === 'green' ? 'text-green-500' : 'text-purple-500'
                      }`}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                    />
                  </svg>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-gray-800">{stat.progress}</div>
                    {stat.subtitle && (
                      <div className="text-xs text-gray-600 mt-1">{stat.subtitle}</div>
                    )}
                  </div>
                </div>
                
                {/* Title and Icon */}
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${stat.iconColor} flex items-center justify-center`}>
                    <IconComponent className={`w-4 h-4 ${stat.iconTextColor}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800 text-sm">{stat.title}</div>
                    {stat.id === 2 && (
                      <div className="text-xs text-gray-500">{stat.subtitle}</div>
                    )}
                  </div>
                </div>
                
                {/* Percentage for non-percentage stats */}
                {stat.id !== 2 && (
                  <div className="text-xs text-gray-500">
                    {progressPercentage}% {t('complete')}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Progress Over Time Graph */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('progressOverTime')}</h3>
        <div className="h-64 flex items-end justify-between">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between h-full text-xs text-gray-500 mr-2">
            <span>10</span>
            <span>8</span>
            <span>6</span>
            <span>4</span>
            <span>2</span>
            <span>0</span>
          </div>
          
          {/* Graph area */}
          <div className="flex-1 relative">
            {/* Grid lines */}
            <div className="absolute inset-0">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-gray-100"
                  style={{ top: `${(i / 5) * 100}%` }}
                />
              ))}
            </div>
            
            {/* Line graph */}
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path
                d="M 20 160 Q 80 120 120 100 T 200 80 T 280 60 T 360 40"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data points */}
              {[
                { x: 20, y: 160 },
                { x: 80, y: 120 },
                { x: 120, y: 100 },
                { x: 160, y: 80 },
                { x: 200, y: 80 },
                { x: 240, y: 70 },
                { x: 280, y: 60 },
                { x: 320, y: 50 },
                { x: 360, y: 40 }
              ].map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={index < 5 ? "#3B82F6" : "#8B5CF6"}
                  className="drop-shadow-sm"
                />
              ))}
            </svg>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          <span>20 0W</span>
          <span>20 DV</span>
          <span>20 DW</span>
          <span>20 OV</span>
          <span>20 DW</span>
          <span>20 DV</span>
          <span>20 DV</span>
        </div>
      </div>
    </section>
  );
}
