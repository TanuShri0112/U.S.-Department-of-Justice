import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, ChevronRight, Monitor } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function MyCoursesSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/courses');
  };

  const handleCourseClick = (courseId) => {
    navigate('/courses');
  };

  const myCourses = [
    {
      id: 1,
      title: "Municipal Corporation for Social Development of Antofagasta",
      description: "Building Well-being, Fostering Community Growth",
      progress: 65,
      modules: 3,
      students: 120
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Monitor className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{t('myCourses')}</h3>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-blue-600 hover:text-blue-700"
          onClick={handleViewAll}
        >
          {t('viewAll')}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {myCourses.map((course) => (
          <Card 
            key={course.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => handleCourseClick(course.id)}
          >
            {/* Top Section - Blue Banner + Image */}
            <div className="flex h-48">
              {/* Left: Blue Banner */}
              <div className="w-1/3 bg-blue-800 flex flex-col justify-center items-center p-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <BookOpen className="w-6 h-6 text-blue-800" />
                  </div>
                  <h4 className="text-white text-xs font-bold uppercase leading-tight mb-2">
                    CORPORACIÓN MUNICIPAL DE DESARROLLO SOCIAL DE ANTOFAGASTA
                  </h4>
                  <p className="text-white text-xs">
                    Construyendo Bienestar, Fomentando el Crecimiento Comunitario
                  </p>
                </div>
              </div>
              
              {/* Right: Image */}
              <div className="w-2/3 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Users className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium">Community Development</p>
                </div>
              </div>
            </div>
            
            {/* Bottom Section - Course Details */}
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4">
                {course.title}
              </h3>
              
              {/* Course Metadata */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <Monitor className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">{course.modules} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                    <Users className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">{course.students} students</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}