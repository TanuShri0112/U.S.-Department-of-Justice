import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronUp } from 'lucide-react';
import ModuleCard from '@/components/courses/ModuleCard';

const CourseModules = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // Mock data for modules - updated to match ModuleCard format
  const modules = [
    { 
      id: 1, 
      title: 'National Community Outreach & Prevention', 
      description: 'Understanding the core principles and frameworks of community outreach and prevention',
      image: '/assets/clogo.png',
      units: 5,
      assessments: 1,
      duration: '2 hours',
      completed: false,
      locked: false
    }
  ];
  
  // Get course title from courseId
  const getCourseTitle = (id) => {
    const courseMap = {
      'become-private': 'BECOME PRIVATE',
      'general': 'General',
      'new-sov-101': 'NEW SOV 101',
      'new-sov-101-video': 'NEW SOV 101 (VIDEO)',
      'operate-private': 'OPERATE PRIVATE',
      'sovereignty-101': 'SOVEREIGNTY 101'
    };
    
    return courseMap[id] || 'Course';
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content area */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">{getCourseTitle(courseId || '')}</h1>
          
          <div className="mb-6">
            <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8">
              Courses
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                courseId={courseId}
                onDelete={() => {}}
                onUpdate={() => {}}
                onComplete={() => {}}
                courseType="open"
                onEdit={() => {}}
              />
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96 bg-white p-6 rounded-lg border">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center mb-4 text-lg font-semibold w-full justify-start" 
              onClick={() => navigate('/catalog')}
            >
              <ChevronUp className="mr-2 h-5 w-5" />
              Catalog
            </Button>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="bg-white border rounded-md px-4 py-2 flex items-center justify-between">
                  <span>{getCourseTitle(courseId || '')}</span>
                  <ChevronUp className="h-4 w-4" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Style</label>
                <div className="bg-white border rounded-md px-4 py-2 flex items-center justify-between">
                  <span>All</span>
                  <ChevronUp className="h-4 w-4" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Language</label>
                <div className="bg-white border rounded-md px-4 py-2 flex items-center justify-between">
                  <span>All</span>
                  <ChevronUp className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModules;