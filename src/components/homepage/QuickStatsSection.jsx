import React from 'react';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  MoreVertical,
  X,
  Layers,
  FileText
} from 'lucide-react';

const quickStats = [
  {
    id: 1,
    icon: X,
    iconColor: 'bg-purple-100',
    iconTextColor: 'text-purple-600',
    progress: '5/12',
    total: 12,
    completed: 5,
    title: 'Courses Completed',
    color: 'purple'
  },
  {
    id: 2,
    icon: Layers,
    iconColor: 'bg-pink-100',
    iconTextColor: 'text-pink-600',
    progress: '8/15',
    total: 15,
    completed: 8,
    title: 'Certifications',
    color: 'pink'
  },
  {
    id: 3,
    icon: FileText,
    iconColor: 'bg-blue-100',
    iconTextColor: 'text-blue-600',
    progress: '12/20',
    total: 20,
    completed: 12,
    title: 'Training Hours',
    color: 'blue'
  }
];

export default function QuickStatsSection() {
  return (
    <section className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {quickStats.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full ${stat.iconColor} flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className={`w-5 h-5 ${stat.iconTextColor}`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-500 mb-1">{stat.progress} watched</div>
                  <div className="font-semibold text-gray-800 text-sm">{stat.title}</div>
                </div>
                
                {/* Options menu */}
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
