import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Video, Volume2, Play, Edit, Trash2, Plus, Upload, FileType2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const ModuleUnits = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    type: 'text',
    content: '',
    duration: '',
    mediaFile: null
  });

  // Get lessons based on moduleId
  const getLessonsForModule = (moduleId) => {
    const moduleLessons = {
      '1': [ // Law Enforcement Training - Module 1
        {
          id: 1,
          title: "Adult Learning in Tactical & Compliance Settings (Andragogy in policing)",
          type: 'text',
          description: "Master adult learning principles specifically designed for law enforcement training environments.",
          duration: "45 min",
          content: "Understanding andragogy in policing - self-directed learning, problem-centered approaches, and experience-based learning for law enforcement professionals.",
          videoUrl: '',
          audioUrl: ''
        },
        {
          id: 2,
          title: "DOJ & POST Training Requirements",
          type: 'video',
          description: "Understand federal and state training requirements for law enforcement officers.",
          duration: "35 min",
          content: "Federal DOJ standards and state-specific POST requirements including certification, compliance, and continuing education mandates.",
          videoUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop&auto=format',
          audioUrl: ''
        },
        {
          id: 3,
          title: "Ethical & Civil Rights Foundations (Use of force, Miranda, implicit bias)",
          type: 'text',
          description: "Master the ethical foundations and civil rights principles essential for law enforcement.",
          duration: "50 min",
          content: "Constitutional framework, use of force standards, Miranda rights training, and implicit bias recognition strategies for law enforcement professionals.",
          videoUrl: '',
          audioUrl: ''
        },
        {
          id: 4,
          title: "Trauma-informed instruction for first responders",
          type: 'audio',
          description: "Learn trauma-informed approaches for training first responders and supporting their mental health.",
          duration: "40 min",
          content: "Understanding trauma in law enforcement, trauma-informed training principles, support resources, and intervention strategies for first responders.",
          videoUrl: '',
          audioUrl: '/placeholder-audio.mp3'
        }
      ],
      '2': [ // Law Enforcement Training - Module 2
        {
          id: 1,
          title: "Identifying Key Stakeholders in Law Enforcement Training",
          type: 'text',
          description: "Learn to identify and analyze key stakeholders in law enforcement training programs.",
          duration: "30 min",
          content: "Stakeholder analysis framework including internal and external stakeholders, power/interest matrices, and engagement strategies.",
          videoUrl: '',
          audioUrl: ''
        },
        {
          id: 2,
          title: "Conducting Training Needs Assessment",
          type: 'video',
          description: "Master the process of conducting comprehensive training needs assessments.",
          duration: "45 min",
          content: "Data collection techniques, assessment frameworks, and analysis methods for identifying law enforcement training needs.",
          videoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=450&fit=crop&auto=format',
          audioUrl: ''
        },
        {
          id: 3,
          title: "Prioritizing Training Needs and Resource Allocation",
          type: 'text',
          description: "Learn to prioritize training needs and effectively allocate resources for maximum impact.",
          duration: "35 min",
          content: "Risk-based prioritization, resource allocation strategies, implementation planning, and evaluation methods.",
          videoUrl: '',
          audioUrl: ''
        }
      ],
      '3': [ // Law Enforcement Training - Module 3
        {
          id: 1,
          title: "Curriculum Development for Law Enforcement",
          type: 'text',
          description: "Master the principles and processes of developing effective law enforcement curricula.",
          duration: "40 min",
          content: "Curriculum design principles, development processes, and specialized curriculum areas for law enforcement training.",
          videoUrl: '',
          audioUrl: ''
        },
        {
          id: 2,
          title: "Scenario-Based Training Design",
          type: 'video',
          description: "Learn to design and implement effective scenario-based training for law enforcement.",
          duration: "50 min",
          content: "Scenario development framework, design principles, implementation strategies, and evaluation methods for realistic training.",
          videoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop&auto=format',
          audioUrl: ''
        },
        {
          id: 3,
          title: "Assessment and Evaluation Methods",
          type: 'text',
          description: "Master comprehensive assessment and evaluation methods for law enforcement training programs.",
          duration: "45 min",
          content: "Formative and summative assessment, evaluation methods, technology integration, and quality assurance strategies.",
          videoUrl: '',
          audioUrl: ''
        }
      ]
    };
    
    return moduleLessons[moduleId] || moduleLessons['1'];
  };

  const [lessons, setLessons] = useState(getLessonsForModule(moduleId));

  const getTypeIcon = (type) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      case 'pdf': return <FileType2 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'text': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-purple-100 text-purple-800';
      case 'pdf': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setIsDetailDialogOpen(true);
  };

  const handleAddLesson = () => {
    const courseId = 'course-1';
    navigate(`/courses/builder/${courseId}/modules/${moduleId}/units/creator`);
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setNewLesson({
      title: lesson.title,
      description: lesson.description,
      type: lesson.type,
      content: lesson.content,
      duration: lesson.duration,
      mediaFile: null
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateLesson = () => {
    setLessons(lessons.map(lesson => 
      lesson.id === editingLesson.id 
        ? {
            ...lesson,
            title: newLesson.title,
            description: newLesson.description
          }
        : lesson
    ));
    setIsEditDialogOpen(false);
    setEditingLesson(null);
    toast({
      title: "Lesson Updated",
      description: "Lesson has been updated successfully.",
    });
  };

  const handleDeleteLesson = (lessonId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      setLessons(lessons.filter(lesson => lesson.id !== lessonId));
      toast({
        title: "Lesson Deleted",
        description: "Lesson has been deleted successfully.",
      });
    }
  };

  const handleStartLesson = (lesson) => {
    navigate(`/catalog/course-1/${moduleId}/unit-1/${lesson.id}`);
  };

  const handleMediaFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewLesson(prev => ({ ...prev, mediaFile: file }));
      toast({
        title: "File Selected",
        description: `${file.name} has been selected for upload.`,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Module {moduleId} - Lessons</h1>
            <p className="text-gray-600">Manage and view lesson content for this module</p>
          </div>
        </div>
        <Button onClick={handleAddLesson} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Lesson
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {lessons.map((lesson) => (
          <Card 
            key={lesson.id} 
            className="hover:shadow-md transition-shadow group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(lesson.type)}`}>
                    {getTypeIcon(lesson.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold cursor-pointer hover:text-blue-600" 
                        onClick={() => handleLessonClick(lesson)}>
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-normal">{lesson.description}</p>
                  </div>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(lesson.type)}>
                    {getTypeIcon(lesson.type)}
                    <span className="ml-1 capitalize">{lesson.type}</span>
                  </Badge>
                  <Badge variant="outline">{lesson.duration}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline" onClick={() => handleEditLesson(lesson)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteLesson(lesson.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  className="bg-ca-primary hover:bg-ca-secondary"
                  onClick={() => handleStartLesson(lesson)}
                >
                  <Play className="h-4 w-4 mr-1" />
                  View Content
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lesson Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedLesson && getTypeIcon(selectedLesson.type)}
              {selectedLesson?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedLesson && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Badge className={getTypeColor(selectedLesson.type)}>
                  {getTypeIcon(selectedLesson.type)}
                  <span className="ml-1 capitalize">{selectedLesson.type}</span>
                </Badge>
                <Badge variant="outline">{selectedLesson.duration}</Badge>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{selectedLesson.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Content Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedLesson.content}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  className="bg-ca-primary hover:bg-ca-secondary"
                  onClick={() => {
                    handleStartLesson(selectedLesson);
                    setIsDetailDialogOpen(false);
                  }}
                >
                  <Play className="h-4 w-4 mr-1" />
                  View Full Content
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Lesson Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Lesson</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                value={newLesson.title}
                onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter lesson title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newLesson.description}
                onChange={(e) => setNewLesson(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter lesson description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Content Type</Label>
              <Select value={newLesson.type} onValueChange={(value) => setNewLesson(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={newLesson.duration}
                onChange={(e) => setNewLesson(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 15 min"
              />
            </div>
            {(newLesson.type === 'video' || newLesson.type === 'audio') && (
              <div className="space-y-2">
                <Label htmlFor="mediaFile">Upload {newLesson.type === 'video' ? 'Video' : 'Audio'} File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="mediaFile"
                    type="file"
                    accept={newLesson.type === 'video' ? 'video/*' : 'audio/*'}
                    onChange={handleMediaFileChange}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {newLesson.mediaFile && (
                  <p className="text-sm text-gray-500">Selected: {newLesson.mediaFile.name}</p>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={newLesson.content}
                onChange={(e) => setNewLesson(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter lesson content"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLesson} disabled={!newLesson.title.trim()}>
              Add Lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editTitle">Lesson Title</Label>
              <Input
                id="editTitle"
                value={newLesson.title}
                onChange={(e) => setNewLesson(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter lesson title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                value={newLesson.description}
                onChange={(e) => setNewLesson(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter lesson description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateLesson} disabled={!newLesson.title.trim()}>
              Update Lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleUnits;