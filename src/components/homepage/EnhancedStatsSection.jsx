import React from 'react';
import { 
  Clock,
  CheckCircle,
  BookOpen
} from 'lucide-react';

const learningStats = [
  {
    id: 1,
    icon: Clock,
    iconColor: 'bg-blue-100',
    iconTextColor: 'text-blue-600',
    value: '45.2h',
    label: 'Total Time Spent',
    description: 'Time invested in learning'
  },
  {
    id: 2,
    icon: CheckCircle,
    iconColor: 'bg-green-100',
    iconTextColor: 'text-green-600',
    value: '12',
    label: 'Modules Completed',
    description: 'Successfully finished modules'
  },
  {
    id: 3,
    icon: BookOpen,
    iconColor: 'bg-purple-100',
    iconTextColor: 'text-purple-600',
    value: '4',
    label: 'My Courses',
    description: 'Currently enrolled courses'
  }
];

export default function EnhancedStatsSection() {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {learningStats.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col items-start gap-4">
                <div className={`w-12 h-12 ${stat.iconColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-6 h-6 ${stat.iconTextColor}`} />
                </div>
                
                <div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-800">{stat.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}