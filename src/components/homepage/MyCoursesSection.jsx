import React from 'react';
import { BookOpen, Users, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MyCoursesSection() {
  const myCourses = [
    {
      id: 1,
      title: 'U.S. Department of Justice-National Community Outreach & Prevention',
      description: 'Foundations & Advanced Modules',
      modules: 3,
      students: 120,
      progress: 65,
      image: '/assets/course-1.png'
    },
    {
      id: 2,
      title: 'Law Enforcement Training Program',
      description: 'Professional Development Course',
      modules: 5,
      students: 85,
      progress: 40,
      image: '/assets/course-2.png'
    },
    {
      id: 3,
      title: 'Community Outreach Fundamentals',
      description: 'Building Trust and Safety',
      modules: 4,
      students: 95,
      progress: 80,
      image: '/assets/course-3.png'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">My Courses</h3>
        <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {myCourses.map((course) => (
          <div key={course.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 text-sm leading-tight mb-1 line-clamp-2">
                  {course.title}
                </h4>
                <p className="text-xs text-gray-500 mb-2">{course.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{course.modules} modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{course.students} students</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">{course.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
