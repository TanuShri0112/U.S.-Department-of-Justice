import React from 'react';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  MoreVertical,
  Shield,
  Users,
  FileCheck,
  Clock
} from 'lucide-react';

const quickStats = [
  {
    id: 1,
    icon: Shield,
    iconColor: 'bg-teal-100',
    iconTextColor: 'text-teal-600',
    progress: '0/4',
    total: 4,
    completed: 0,
    title: 'Required Safety Modules',
    color: 'teal'
  },
  {
    id: 2,
    icon: FileCheck,
    iconColor: 'bg-blue-100',
    iconTextColor: 'text-blue-600',
    progress: '0/6',
    total: 6,
    completed: 0,
    title: 'Compliance Certifications',
    color: 'blue'
  },
  {
    id: 3,
    icon: Clock,
    iconColor: 'bg-emerald-100',
    iconTextColor: 'text-emerald-600',
    progress: '0/8',
    total: 8,
    completed: 0,
    title: 'Training Hours Required',
    color: 'emerald'
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
                  <div className="text-sm text-gray-500 mb-1">{stat.progress} completed</div>
                  <div className="font-semibold text-gray-800 text-sm">{stat.title}</div>
                </div>
                
                {/* Progress indicator */}
                <div className={`h-1.5 w-16 bg-${stat.color}-100 rounded-full overflow-hidden`}>
                  <div 
                    className={`h-full bg-${stat.color}-500 rounded-full`}
                    style={{ width: `${(stat.completed / stat.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}