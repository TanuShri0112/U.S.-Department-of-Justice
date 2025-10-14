import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import AddModuleDialog from './AddModuleDialog';
import ModuleCard from './ModuleCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditModuleDialog from './EditModuleDialog';

const CourseModules = () => {
  console.log('Rendering CourseModules');
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const courseType = searchParams.get('type') || 'open';
  
  const [modules, setModules] = useState([]);
  const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);
  const [isPublishedCourse, setIsPublishedCourse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState(null);

  // Load modules data based on courseId
  useEffect(() => {
    const loadModulesData = () => {
      setLoading(true);
      
      const publishedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const publishedCourse = publishedCourses.find(course => course.id === courseId);
      
      if (publishedCourse) {
        setIsPublishedCourse(true);
        
        if (publishedCourse.modules && publishedCourse.modules.length > 0) {
          const imageMap = {
            'Module 1: Foundations of Law Enforcement Training in the U.S.': 'https://images.unsplash.com/photo-1520483601560-4b17b0c93a77?w=800&h=600&fit=crop',
            'Module 2: Stakeholder Analysis & Needs Assessment': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
            'Module 3: Customized Curriculum & Scenario Design': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
            'Module 1: Foundations of Professional Learning in Education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
            'Module 2: Needs Assessment for Schools & Districts': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
            'Module 3: Curriculum & Module Design for Teachers': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
            'Module 1: Foundations of Youth Advocacy & Development': 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop',
            'Module 2: Needs Assessment in Youth Advocacy': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
            'Module 3: Designing Advocacy Training Programs': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop'
          };
          const courseModules = publishedCourse.modules.map((module, index) => ({
            id: module.id,
            title: module.title,
            description: module.description,
            units: module.units?.length || 0,
            assessments: module.assessments?.length || 0,
            duration: module.duration || `${Math.max(1, (module.units?.length || 0) + (module.assessments?.length || 0))} hours`,
            completed: false,
            locked: courseType === 'sequential' && index > 0,
            image: module.image || imageMap[module.title]
          }));
          setModules(courseModules);
        } else {
          setModules([]);
        }
      } else {
        setIsPublishedCourse(false);
        // Course-specific modules based on courseId
        const getCourseModules = (courseId) => {
          const courseModules = {
            '1': [ // Law Enforcement Training
              {
                id: 1,
                title: "Module 1: Foundations of Law Enforcement Training in the U.S.",
                description: "Understanding the core principles and frameworks of law enforcement training",
                units: 5,
                assessments: 1,
                duration: "2 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Stakeholder Analysis & Needs Assessment",
                description: "Identifying key stakeholders and assessing training needs in law enforcement",
                units: 8,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Customized Curriculum & Scenario Design",
                description: "Developing tailored training programs and realistic scenarios for law enforcement",
                units: 6,
                assessments: 2,
                duration: "3 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ],
            '2': [ // Educator Training
              {
                id: 1,
                title: "Module 1: Foundations of Professional Learning in Education",
                description: "Core concepts of professional development and educator growth",
                units: 7,
                assessments: 2,
                duration: "3 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Needs Assessment for Schools & Districts",
                description: "Evaluating educational needs and identifying improvement opportunities",
                units: 9,
                assessments: 3,
                duration: "5 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Curriculum & Module Design for Teachers",
                description: "Creating effective curriculum and training modules for educators",
                units: 6,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ],
            '3': [ // Youth Advocate Training
              {
                id: 1,
                title: "Module 1: Foundations of Youth Advocacy & Development",
                description: "Understanding youth development and advocacy principles",
                units: 6,
                assessments: 1,
                duration: "2.5 hours",
                completed: false,
                locked: false,
              },
              {
                id: 2,
                title: "Module 2: Needs Assessment in Youth Advocacy",
                description: "Identifying and analyzing the needs of youth populations",
                units: 8,
                assessments: 2,
                duration: "4 hours",
                completed: false,
                locked: courseType === 'sequential',
              },
              {
                id: 3,
                title: "Module 3: Designing Advocacy Training Programs",
                description: "Creating comprehensive training programs for youth advocates",
                units: 7,
                assessments: 2,
                duration: "3.5 hours",
                completed: false,
                locked: courseType === 'sequential',
              }
            ]
          };
          
          return courseModules[courseId] || courseModules['1']; // Default to Law Enforcement Training
        };
        
        const defaultModules = getCourseModules(courseId).map((m) => {
          const titleToImage = {
            'Module 1: Foundations of Law Enforcement Training in the U.S.': 'https://images.unsplash.com/photo-1520483601560-4b17b0c93a77?w=800&h=600&fit=crop',
            'Module 2: Stakeholder Analysis & Needs Assessment': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
            'Module 3: Customized Curriculum & Scenario Design': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
            'Module 1: Foundations of Professional Learning in Education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
            'Module 2: Needs Assessment for Schools & Districts': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
            'Module 3: Curriculum & Module Design for Teachers': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
            'Module 1: Foundations of Youth Advocacy & Development': 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop',
            'Module 2: Needs Assessment in Youth Advocacy': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
            'Module 3: Designing Advocacy Training Programs': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop'
          };
          return { ...m, image: titleToImage[m.title] };
        });
        setModules(defaultModules);
      }
      
      setLoading(false);
    };

    loadModulesData();
  }, [courseId, courseType]);

  useEffect(() => {
    if (isPublishedCourse) {
      const publishedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const courseIndex = publishedCourses.findIndex(course => course.id === courseId);
      if (courseIndex !== -1) {
        publishedCourses[courseIndex].modules = modules;
        localStorage.setItem('courses', JSON.stringify(publishedCourses));
      }
    }
  }, [modules, isPublishedCourse, courseId]);

  const handleAddModule = useCallback(() => {
    setIsAddModuleDialogOpen(true);
  }, []);

  const handleModuleAdd = useCallback((newModule) => {
    setModules(prev => [...prev, newModule]);
  }, []);

  const handleModuleDelete = useCallback((moduleId) => {
    setModules(prev => prev.filter(module => module.id !== moduleId));
  }, []);

  const handleModuleUpdate = useCallback((updatedModule) => {
    setModules(prev => prev.map(module => 
      module.id === updatedModule.id ? { ...module, ...updatedModule } : module
    ));
  }, []);

  const handleModuleComplete = useCallback((moduleId) => {
    setModules(prev => prev.map((module, index) => {
      if (module.id === moduleId) {
        const nextModule = prev[index + 1];
        const updatedModules = [...prev];
        updatedModules[index] = { ...module, completed: true };
        if (nextModule && courseType === 'sequential') {
          updatedModules[index + 1] = { ...nextModule, locked: false };
        }
        return updatedModules[index];
      }
      return module;
    }));
    toast.success('Module completed! Next module unlocked.');
  }, [courseType]);

  const handleEditModule = useCallback((module) => {
    setModuleToEdit(module);
    setIsEditDialogOpen(true);
  }, []);

  if (loading) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading modules...</span>
        </div>
      </div>
    );
  }

  if (isPublishedCourse && modules.length === 0) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/courses')} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Course Modules</h1>
              <p className="text-gray-600">No modules found for this course</p>
            </div>
          </div>
          <Button onClick={handleAddModule} className="bg-ca-primary hover:bg-ca-secondary">
            <Plus className="h-4 w-4 mr-2" />
            Add Module
          </Button>
        </div>

        <Card className="max-w-md mx-auto mt-8">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 bg-gray-100 rounded-full p-6 w-20 h-20 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle className="text-xl">No Modules Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              This course doesn't have any modules yet. Create your first module to get started.
            </p>
            <Button onClick={handleAddModule} className="w-full bg-ca-primary hover:bg-ca-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Create First Module
            </Button>
          </CardContent>
        </Card>

        <AddModuleDialog
          open={isAddModuleDialogOpen}
          onOpenChange={setIsAddModuleDialogOpen}
          onModuleAdd={handleModuleAdd}
        />
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/courses')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Course Modules</h1>
            <p className="text-gray-600">
              {courseType === 'sequential' 
                ? 'Complete modules in order to unlock the next one' 
                : 'Access modules in any order'}
              {isPublishedCourse && ' • Published Course'}
            </p>
          </div>
        </div>
        <Button onClick={handleAddModule} className="bg-ca-primary hover:bg-ca-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            courseId={courseId}
            onDelete={handleModuleDelete}
            onUpdate={handleModuleUpdate}
            onComplete={handleModuleComplete}
            courseType={courseType}
            onEdit={handleEditModule}
          />
        ))}
      </div>

      <AddModuleDialog
        open={isAddModuleDialogOpen}
        onOpenChange={setIsAddModuleDialogOpen}
        onModuleAdd={handleModuleAdd}
      />

      {moduleToEdit && (
        <EditModuleDialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            if (!open) setModuleToEdit(null);
          }}
          module={moduleToEdit}
          onUpdate={handleModuleUpdate}
        />
      )}
    </div>
  );
};

export default CourseModules;