import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Lock, CheckCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';

const ModuleCard = ({ module, onComplete, courseType = 'open', courseId }) => {
  const navigate = useNavigate();
  const { setMainCollapsed } = useSidebar();

  const handleViewLessonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (module.locked && courseType === 'sequential') {
      return;
    }
    
    // Get courseId from URL or props - improved detection
    const currentPath = window.location.pathname;
    let detectedCourseId = '1'; // default fallback
    
    // First, try to get courseId from props (most reliable)
    if (courseId && courseId !== '1') {
      detectedCourseId = courseId;
    } else {
      // Try multiple URL patterns to detect course ID
      if (currentPath.includes('/courses/view/')) {
        detectedCourseId = currentPath.split('/courses/view/')[1];
      } else if (currentPath.includes('/courses/')) {
        // Extract course ID from various course-related paths
        const pathParts = currentPath.split('/');
        const courseIndex = pathParts.indexOf('courses');
        if (courseIndex !== -1 && pathParts[courseIndex + 1]) {
          detectedCourseId = pathParts[courseIndex + 1];
        }
      } else if (currentPath.includes('/modules/')) {
        // If we're in modules section, try to get course from referrer or use module mapping
        const moduleId = module.id;
        
        // Use module title to determine course (most reliable)
        if (module.title && (module.title.includes('Course 2') || module.title.includes('CBRR') || module.title.includes('Community-Based'))) {
          detectedCourseId = '1';
        } else if (module.title && module.title.includes('Law Enforcement')) {
          detectedCourseId = '1';
        } else {
          // Fallback to module ID mapping
          if (moduleId === 1) {
            detectedCourseId = '1'; // Default to Course 1
          } else if (moduleId === 4) {
            detectedCourseId = '2'; // Course 2
          }
        }
      } else {
        // Final fallback - use module title to determine course
        if (module.title && (module.title.includes('Course 2') || module.title.includes('CBRR') || module.title.includes('Community-Based'))) {
          detectedCourseId = '1';
        } else if (module.title && module.title.includes('Law Enforcement')) {
          detectedCourseId = '1';
        }
      }
    }
    
    console.log('Current path:', currentPath);
    console.log('Course ID:', detectedCourseId);
    console.log('Module ID:', module.id);
    console.log('Module title:', module.title);
    
    // Check if there's an external lesson URL for this module
    const moduleLinks = {
      // Course 1 modules - Articulate Rise content
      '1-1': 'https://rise.articulate.com/share/yRQH1VOQ-9B6pJHCKcoOgJkzh6n0vCao',
      '1-2': 'https://rise.articulate.com/share/yRQH1VOQ-9B6pJHCKcoOgJkzh6n0vCao',
      '1-3': 'https://rise.articulate.com/share/yRQH1VOQ-9B6pJHCKcoOgJkzh6n0vCao',
    };
    
    const linkKey = `${detectedCourseId}-${module.id}`;
    const externalLink = moduleLinks[linkKey];
    
    if (externalLink) {
      // Open link directly in new tab
      window.open(externalLink, '_blank', 'noopener,noreferrer');
    } else {
      // Navigate to the module units page if no external link
      navigate(`/courses/${detectedCourseId}/modules/${module.id}/units`);
    }
  };

  const handleAssessmentsClick = () => {
    if (module.locked && courseType === 'sequential') {
      return;
    }
    navigate(`/courses/${courseId}/modules/${module.id}/assessments`);
  };

  const handleCompleteModule = () => {
    if (onComplete) {
      onComplete(module.id);
    }
  };

  const isLocked = module.locked && courseType === 'sequential';

  return (
    <>
      <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${isLocked ? 'opacity-60' : ''}`}>
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
          <img 
            src={module.image || '/placeholder.svg'} 
            alt={module.title} 
            className="w-full h-full object-cover"
          />
          {isLocked && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white rounded-full p-3">
                <Lock className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          )}
          {module.completed && (
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            {module.title}
            {isLocked && <Lock className="h-4 w-4 text-gray-400 ml-auto" />}
          </CardTitle>
          <p className="text-sm text-gray-600">{module.description}</p>
          {courseType === 'sequential' && (
            <Badge variant="outline" className="text-blue-600 border-blue-300 mt-2 w-fit">
              Sequential
            </Badge>
          )}
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-3">
            <Button 
              onClick={handleViewLessonClick}
              variant="outline" 
              className="w-full justify-start hover:bg-blue-50 transition-colors duration-200"
              disabled={isLocked}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              View Lesson
              {isLocked && <Lock className="h-3 w-3 ml-auto" />}
            </Button>

            {/* Assessment button removed as per requirement */}
            {/* <Button 
              onClick={handleAssessmentsClick}
              variant="outline" 
              className="w-full justify-start hover:bg-green-50 transition-colors duration-200"
              disabled={isLocked}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Assessments
              {isLocked && <Lock className="h-3 w-3 ml-auto" />}
            </Button> */}

            {!module.completed && !isLocked && courseType === 'sequential' && (
              <Button 
                onClick={handleCompleteModule}
                className="w-full bg-ca-primary hover:bg-ca-secondary text-white transition-colors duration-200"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            )}
          </div>

          {isLocked && (
            <div className="mt-3 p-2 bg-yellow-50 rounded-md">
              <p className="text-xs text-yellow-700 text-center">
                Complete the previous module to unlock this one
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default React.memo(ModuleCard);