import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Edit, Trash2, List, MoreVertical, Lock, CheckCircle, FileText } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import EditModulePage from '@/pages/EditModulePage';

const ModuleCard = ({ module, onDelete, onUpdate, onComplete, courseType = 'open', onEdit, courseId }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { setMainCollapsed } = useSidebar();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${module.title}"?`)) {
      onDelete(module.id);
    }
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveModule = (updatedModule) => {
    if (onUpdate) {
      onUpdate(updatedModule);
      toast.success('Module updated successfully');
      setIsEditDialogOpen(false);
      // Force a full page reload after successful save
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 100);
    }
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    // Force a full page reload after dialog closes
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 100);
  };

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
        if (module.title && module.title.includes('Law Enforcement')) {
          detectedCourseId = '1';
        } else if (module.title && module.title.includes('Educator')) {
          detectedCourseId = '2';
        } else if (module.title && module.title.includes('Youth Advocate')) {
          detectedCourseId = '3';
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
        if (module.title && module.title.includes('Law Enforcement')) {
          detectedCourseId = '1';
        } else if (module.title && module.title.includes('Educator')) {
          detectedCourseId = '2';
        } else if (module.title && module.title.includes('Youth Advocate')) {
          detectedCourseId = '3';
        }
      }
    }
    
    console.log('Current path:', currentPath);
    console.log('Course ID:', detectedCourseId);
    console.log('Module ID:', module.id);
    console.log('Module title:', module.title);
    
    // Module external links mapping by course and module - ALL modules now open SCORM
    const moduleLinks = {
      // Course 1 - Law Enforcement Training
      '1-1': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/law-enforcement-training-modules-scorm12-pRANQ60M/scormcontent/index.html',
      
      // Course 2 - Educator Training  
      '2-4': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/educator-training-modules-scorm12-f-vnldQ9/scormcontent/index.html',
      
      // Course 3 - Youth Advocate Training
      '3-1': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/youth-advocate-training-modules-scorm12-Ev2vCYOy/scormcontent/index.html',
      
      // Fallback SCORM links for any missing combinations
      // Default Law Enforcement SCORM for Course 1 modules
      '1-2': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/law-enforcement-training-modules-scorm12-pRANQ60M/scormcontent/index.html',
      '1-3': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/law-enforcement-training-modules-scorm12-pRANQ60M/scormcontent/index.html',
      
      // Default Educator SCORM for Course 2 modules  
      '2-1': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/educator-training-modules-scorm12-f-vnldQ9/scormcontent/index.html',
      '2-2': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/educator-training-modules-scorm12-f-vnldQ9/scormcontent/index.html',
      '2-3': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/educator-training-modules-scorm12-f-vnldQ9/scormcontent/index.html',
      '2-5': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/educator-training-modules-scorm12-f-vnldQ9/scormcontent/index.html',
      '2-6': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/educator-training-modules-scorm12-f-vnldQ9/scormcontent/index.html',
      
      // Default Youth Advocate SCORM for Course 3 modules
      '3-2': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/youth-advocate-training-modules-scorm12-Ev2vCYOy/scormcontent/index.html',
      '3-3': 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/youth-advocate-training-modules-scorm12-Ev2vCYOy/scormcontent/index.html',
    };
    
    // Create the key for this course-module combination
    const linkKey = `${detectedCourseId}-${module.id}`;
    const externalLink = moduleLinks[linkKey];
    
    console.log('Link key:', linkKey);
    console.log('External link:', externalLink);
    
    if (externalLink) {
      // Open SCORM link in new tab
      window.open(externalLink, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback to default SCORM based on course type if no specific link is found
      console.log('No specific SCORM link found, using default SCORM for course type');
      
      // Determine default SCORM based on course type
      let defaultScormLink;
      if (detectedCourseId === '1') {
        // Law Enforcement Training SCORM
        defaultScormLink = 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/law-enforcement-training-modules-scorm12-pRANQ60M/scormcontent/index.html';
      } else if (detectedCourseId === '2') {
        // Educator Training SCORM
        defaultScormLink = 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/educator-training-modules-scorm12-f-vnldQ9/scormcontent/index.html';
      } else if (detectedCourseId === '3') {
        // Youth Advocate Training SCORM
        defaultScormLink = 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/youth-advocate-training-modules-scorm12-Ev2vCYOy/scormcontent/index.html';
      } else {
        // Ultimate fallback - Law Enforcement SCORM
        defaultScormLink = 'https://lesson-banners.s3.us-east-1.amazonaws.com/Scorms/law-enforcement-training-modules-scorm12-pRANQ60M/scormcontent/index.html';
      }
      
      console.log('Using default SCORM:', defaultScormLink);
      window.open(defaultScormLink, '_blank', 'noopener,noreferrer');
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
          <div className="absolute top-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white" disabled={isLocked}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border shadow-md">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Module
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Module
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

            <Button 
              onClick={handleAssessmentsClick}
              variant="outline" 
              className="w-full justify-start hover:bg-green-50 transition-colors duration-200"
              disabled={isLocked}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Assessments
              {isLocked && <Lock className="h-3 w-3 ml-auto" />}
            </Button>

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

      <Dialog open={isEditDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Edit Module</DialogTitle>
          <EditModulePage 
            module={module}
            onClose={handleCloseDialog}
            onSave={handleSaveModule}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(ModuleCard);