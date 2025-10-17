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
  Target,
  ArrowUp
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const getQuickStats = (t) => [
  {
    id: 1,
    icon: BookOpen,
    iconColor: 'bg-blue-50',
    iconTextColor: 'text-blue-600',
    value: '42/50',
    title: t('coursesCompleted'),
    color: 'blue',
    percentage: 84,
    trendPercentage: 5,
    trendDescription: t('vsLast28Days')
  },
  {
    id: 2,
    icon: Award,
    iconColor: 'bg-pink-50',
    iconTextColor: 'text-pink-600',
    value: '91%',
    title: t('averageScore'),
    color: 'pink',
    percentage: 91,
    trendPercentage: 3,
    trendDescription: t('vsLast28Days')
  },
  {
    id: 3,
    icon: Clock,
    iconColor: 'bg-green-50',
    iconTextColor: 'text-green-600',
    value: '18',
    title: t('hoursSpentLearning'),
    color: 'green',
    percentage: 90,
    trendPercentage: 8,
    trendDescription: t('vsLast28Days')
  },
  {
    id: 4,
    icon: Target,
    iconColor: 'bg-purple-50',
    iconTextColor: 'text-purple-600',
    value: '15/20',
    title: t('assessmentsCompleted'),
    color: 'purple',
    percentage: 75,
    trendPercentage: 10,
    trendDescription: t('vsLast28Days')
  }
];

export default function QuickStatsSection() {
  const { t } = useTranslation();
  const quickStats = getQuickStats(t);
  
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickStats.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 h-40 relative flex flex-col justify-between"
            >
              {/* Title (Top-Left) */}
              <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {stat.title}
              </div>
              
              {/* Icon (Top-Right) */}
              <div className="absolute top-6 right-6">
                <div className={`w-12 h-12 rounded-full ${stat.iconColor} flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 ${stat.iconTextColor}`} />
                </div>
              </div>
              
              {/* Main Value (Center) */}
              <div className="text-center flex-1 flex items-center justify-center">
                <div className="text-4xl font-bold text-gray-800">
                  {stat.value}
                </div>
              </div>
              
              {/* Trend Indicator (Bottom-Left) */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-500">
                    +{stat.trendPercentage}%
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {stat.trendDescription}
                </span>
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
