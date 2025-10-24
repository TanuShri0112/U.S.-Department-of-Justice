import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, Calendar, Users, ExternalLink, Eye, Download, Edit, Trash2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const ZoomClassesSection = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Basics in Tourism - Module 1",
      date: "Wed, Jun 12",
      time: "10:00 AM",
      duration: "1 hour",
      description: "Introduction to Child Protection Standards in Travel & Tourism",
      zoomLink: "https://zoom.us/j/123456789",
      meetingId: "123 456 789",
      attendance: 0,
      totalStudents: 25,
      isCompleted: false,
      instructor: "Sarah Thompson",
      course: "Child Protection"
    },
    {
      id: 2,
      title: "Responsible Tourism Practices",
      date: "Sat, Jun 15",
      time: "2:00 PM",
      duration: "2 hours",
      description: "Best Practices for Sustainable and Ethical Tourism",
      zoomLink: "https://zoom.us/j/987654321",
      meetingId: "987 654 321",
      attendance: 0,
      totalStudents: 30,
      isCompleted: false,
      instructor: "Michael Chen",
      course: "Tourism Ethics"
    },
    {
      id: 3,
      title: "Tourism Industry Safety Standards",
      date: "Sat, Jun 8",
      time: "11:00 AM",
      duration: "1.5 hours",
      description: "Implementation of Safety Protocols in Tourism Sector",
      attendance: 18,
      totalStudents: 25,
      recordingUrl: "https://example.com/recording/tourism-safety.mp4",
      isCompleted: true,
      instructor: "Emma Rodriguez",
      course: "Safety Standards"
    },
    {
      id: 4,
      title: "Child Protection Compliance Workshop",
      date: "Wed, Jun 5",
      time: "3:00 PM",
      duration: "1 hour",
      description: "Latest updates in child protection compliance for tourism industry",
      attendance: 22,
      totalStudents: 30,
      recordingUrl: "https://example.com/recording/compliance-workshop.mp4",
      isCompleted: true,
      instructor: "David Anderson",
      course: "Compliance"
    }
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRecordingDialogOpen, setIsRecordingDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [selectedRecording, setSelectedRecording] = useState(null);

  const upcomingClasses = classes.filter(cls => !cls.isCompleted);
  const completedClasses = classes.filter(cls => cls.isCompleted);

  const handleEditClass = () => {
    if (!editingClass) return;

    setClasses(classes.map(cls => 
      cls.id === editingClass.id ? editingClass : cls
    ));
    setIsEditDialogOpen(false);
    setEditingClass(null);
    toast.success('Class updated successfully!');
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter(cls => cls.id !== id));
    toast.success('Class deleted successfully!');
  };

  const handleJoinZoom = (zoomLink, title) => {
    window.open(zoomLink, '_blank');
    toast.success(`Joining ${title} on Zoom`);
  };

  const handleViewRecording = (cls) => {
    setSelectedRecording(cls);
    setIsRecordingDialogOpen(true);
  };

  const handleDownloadRecording = (cls) => {
    if (cls.recordingUrl) {
      const link = document.createElement('a');
      link.href = cls.recordingUrl;
      link.download = `${cls.title.replace(/\s+/g, '-')}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloading ${cls.title} recording`);
    }
  };

  return (
    <section className="mb-6">
      <Card className="overflow-hidden border-0 shadow-lg bg-white">
        <CardHeader className="pb-4 pt-5 px-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl flex items-center gap-3 text-slate-800 font-bold">
              <div className="p-2 bg-teal-500 rounded-lg shadow-md">
                <Video className="h-5 w-5 text-white" />
              </div>
              Training Sessions
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl mb-6">
              <TabsTrigger value="upcoming" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300">
                <Calendar className="h-4 w-4" />
                Upcoming Sessions
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300">
                <Video className="h-4 w-4" />
                Completed Sessions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="space-y-4">
                {upcomingClasses.length > 0 ? (
                  upcomingClasses.map((cls) => (
                    <div key={cls.id} className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                              {cls.title}
                            </h3>
                            <Badge variant="outline" className="text-teal-600 border-teal-200">
                              {cls.course}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{cls.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingClass(cls);
                              setIsEditDialogOpen(true);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteClass(cls.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-600">{cls.date}</span>
                            <span className="text-sm text-gray-400">{cls.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">0/{cls.totalStudents}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{cls.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Instructor</p>
                            <p className="text-sm font-medium text-gray-700">{cls.instructor}</p>
                          </div>
                          {cls.zoomLink && (
                            <Button
                              size="sm"
                              onClick={() => handleJoinZoom(cls.zoomLink, cls.title)}
                              className="bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Join Session
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Video className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No upcoming sessions scheduled</p>
                    <p className="text-sm">Schedule your first training session to get started</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="space-y-4">
                {completedClasses.length > 0 ? (
                  completedClasses.map((cls) => (
                    <div key={cls.id} className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                              {cls.title}
                            </h3>
                            <Badge variant="outline" className="text-teal-600 border-teal-200">
                              {cls.course}
                            </Badge>
                            <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                              Completed
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{cls.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingClass(cls);
                              setIsEditDialogOpen(true);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteClass(cls.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-600">{cls.date}</span>
                            <span className="text-sm text-gray-400">{cls.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{cls.attendance}/{cls.totalStudents}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{cls.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Instructor</p>
                            <p className="text-sm font-medium text-gray-700">{cls.instructor}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewRecording(cls)}
                              className="border-teal-200 text-teal-600 hover:bg-teal-50"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Recording
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadRecording(cls)}
                              className="border-teal-200 text-teal-600 hover:bg-teal-50"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Video className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No completed sessions yet</p>
                    <p className="text-sm">Complete your first session to see it here</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Session
            </DialogTitle>
          </DialogHeader>
          {editingClass && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Session Title</Label>
                <Input
                  id="edit-title"
                  value={editingClass.title}
                  onChange={(e) => setEditingClass({...editingClass, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-duration">Duration</Label>
                <Select 
                  value={editingClass.duration} 
                  onValueChange={(value) => setEditingClass({...editingClass, duration: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                    <SelectItem value="3 hours">3 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingClass.description}
                  onChange={(e) => setEditingClass({...editingClass, description: e.target.value})}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleEditClass} className="flex-1">
                  Update Session
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Recording Viewer Dialog */}
      <Dialog open={isRecordingDialogOpen} onOpenChange={setIsRecordingDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              {selectedRecording?.title} - Recording
            </DialogTitle>
          </DialogHeader>
          {selectedRecording && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">Recording Player</p>
                  <p className="text-sm text-gray-500">
                    Session held on {selectedRecording.date} at {selectedRecording.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    Attendance: {selectedRecording.attendance}/{selectedRecording.totalStudents} participants
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{selectedRecording.title}</h3>
                  <p className="text-sm text-gray-600">{selectedRecording.description}</p>
                </div>
                <Button onClick={() => handleDownloadRecording(selectedRecording)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Recording
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default ZoomClassesSection;