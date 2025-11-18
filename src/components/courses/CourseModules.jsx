import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Video } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import ModuleCard from './ModuleCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditModuleDialog from './EditModuleDialog';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CourseModules = () => {
  console.log('Rendering CourseModules');
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const courseType = searchParams.get('type') || 'open';
  
  const [modules, setModules] = useState([]);
  const [isPublishedCourse, setIsPublishedCourse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState(null);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  const liveSessions = [
    { id: 1, title: 'Hand Hygiene Live Session', date: '24 Jan, 15:30', status: 'Scheduled' },
    { id: 2, title: 'Waste Management Demo', date: '26 Jan, 10:00', status: 'Completed' },
  ];

  const attendanceRecords = [
    { learner: 'Aditi Sharma', join: '15:29', leave: '16:10' },
    { learner: 'Rohit Verma', join: '15:35', leave: '16:05' },
  ];

  const recordings = [
    { title: 'Hand Hygiene Live Session', length: '40 mins', url: '#' },
    { title: 'Waste Management Demo', length: '35 mins', url: '#' },
  ];

  // Get course name based on courseId
  const getCourseName = (courseId) => {
    const courseNames = {
      '1757539': 'Advanced Credit Analysis',
      'nodejs101': 'Node.js Fundamentals',
      'reactjs202': 'React.js Advanced',
      'ml506': 'Machine Learning',
      'data345': 'Data Analysis',
      '1': 'Community-Based Risk Reduction (CBRR): Building Resilience from the Ground'
    };
    return courseNames[courseId] || 'Course';
  };

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
            // Law Enforcement Training - Use course banner
            'Law Enforcement Training': '/assets/C-1.png',
            // Educator Training - Use course banner
            'Educator Training': '/assets/C-2.png',
            // Youth Advocacy Training - Use course banner
            'Youth Advocate Training': '/assets/C-3.png'
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
            '1': [ // Community-Based Risk Reduction (CBRR)
              {
                id: 1,
                title: "Community-Based Risk Reduction (CBRR): Building Resilience from the Ground",
                description: "Understanding the core principles and frameworks of community outreach and prevention",
                units: 5,
                assessments: 1,
                duration: "2 hours",
                completed: false,
                locked: false,
              },
              // {
              //   id: 2,
              //   title: "Module 2: Stakeholder Analysis & Needs Assessment",
              //   description: "Identifying key stakeholders and assessing training needs in law enforcement",
              //   units: 8,
              //   assessments: 2,
              //   duration: "4 hours",
              //   completed: false,
              //   locked: courseType === 'sequential',
              // },
              // {
              //   id: 3,
              //   title: "Module 3: Customized Curriculum & Scenario Design",
              //   description: "Developing tailored training programs and realistic scenarios for law enforcement",
              //   units: 6,
              //   assessments: 2,
              //   duration: "3 hours",
              //   completed: false,
              //   locked: courseType === 'sequential',
              // }
            ]
          };
          
          return courseModules[courseId] || courseModules['1']; // Default to Law Enforcement Training
        };
        
        const defaultModules = getCourseModules(courseId).map((m) => {
          const titleToImage = {
            // CBRR Course - Use course banner
            'Community-Based Risk Reduction (CBRR): Building Resilience from the Ground': 'https://campustechnology.com/-/media/edu/campustechnology/2019-images/20191209online.jpg'
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
              <h1 className="text-2xl font-bold">{getCourseName(courseId)}</h1>
              <p className="text-gray-600">No modules found for this course</p>
            </div>
          </div>
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
          </CardContent>
        </Card>

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
            <h1 className="text-2xl font-bold">{getCourseName(courseId)}</h1>
            <p className="text-gray-600">
              {courseType === 'sequential' 
                ? 'Complete modules in order to unlock the next one' 
                : 'Access modules in any order'}
              {isPublishedCourse && ' • Published Course'}
            </p>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Live Class Module</CardTitle>
            <p className="text-sm text-gray-500">Schedule sessions, track attendance, and surface recordings.</p>
          </div>
          <Button onClick={() => setIsScheduleDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            Schedule Live Session
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700">Upcoming / Recent</h3>
              {liveSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                  <div>
                    <p className="font-medium">{session.title}</p>
                    <p className="text-xs text-gray-500">{session.date}</p>
                  </div>
                  <Badge variant="outline">{session.status}</Badge>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Recordings</h3>
              <div className="space-y-2">
                {recordings.map((recording) => (
                  <div key={recording.title} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                    <div>
                      <p className="font-medium">{recording.title}</p>
                      <p className="text-xs text-gray-500">{recording.length}</p>
                    </div>
                    <Button variant="ghost" size="sm">Play</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Attendance Snapshot</h3>
            <div className="overflow-auto rounded-lg border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-3 py-2 text-left">Learner</th>
                    <th className="px-3 py-2 text-left">Join</th>
                    <th className="px-3 py-2 text-left">Leave</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((item) => (
                    <tr key={item.learner} className="border-t">
                      <td className="px-3 py-2">{item.learner}</td>
                      <td className="px-3 py-2">{item.join}</td>
                      <td className="px-3 py-2">{item.leave}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

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

      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Live Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Session title" />
            <div className="grid gap-3 md:grid-cols-2">
              <Input type="date" />
              <Input type="time" />
            </div>
            <Textarea rows={3} placeholder="Agenda / notes" />
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Save (Demo Only)</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseModules;