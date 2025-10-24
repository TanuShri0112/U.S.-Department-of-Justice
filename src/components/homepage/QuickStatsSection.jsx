import React from 'react';
import { BookOpen, Award, Star } from 'lucide-react';

const quickStats = [
  {
    id: 1,
    icon: BookOpen,
    iconColor: 'bg-blue-100',
    iconTextColor: 'text-blue-600',
    title: 'My Learning Progress',
    description: 'Continue your learning journey'
  },
  {
    id: 2,
    icon: Award,
    iconColor: 'bg-green-100',
    iconTextColor: 'text-green-600',
    title: 'Achievements',
    description: 'View your earned badges'
  },
  {
    id: 3,
    icon: Star,
    iconColor: 'bg-yellow-100',
    iconTextColor: 'text-yellow-600',
    title: 'Featured Courses',
    description: 'Explore recommended courses'
  }
];

export default function QuickStatsSection() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Your Learning Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className={`w-16 h-16 rounded-full ${stat.iconColor} flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className={`w-8 h-8 ${stat.iconTextColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">{stat.title}</h3>
                  <p className="text-gray-500 text-sm">{stat.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
