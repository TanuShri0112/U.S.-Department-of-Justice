import React, { useState } from 'react';
import { 
  CalendarDays, CalendarPlus, Settings, BookOpen, Users,
  CalendarCheck, CalendarClock, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ScheduleSection = () => {
  const [showNewEventDialog, setShowNewEventDialog] = useState(false);
  const [showEventDetailsDialog, setShowEventDetailsDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCourse, setEventCourse] = useState('');

  // Handler for creating a new event
  const handleCreateEvent = () => {
    if (!eventTitle || !eventType || !eventDate || !eventStartTime || !eventEndTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Creating event...',
        success: () => {
          setShowNewEventDialog(false);
          setEventTitle('');
          setEventType('');
          setEventDate('');
          setEventStartTime('');
          setEventEndTime('');
          setEventDescription('');
          setEventCourse('');
          return 'Event created successfully!';
        },
        error: 'Failed to create event',
      }
    );
  };

  // Handler for joining a session
  const handleJoinSession = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Joining session...',
        success: () => {
          window.open('https://meet.google.com', '_blank');
          return 'Joined session successfully!';
        },
        error: 'Failed to join session',
      }
    );
  };

  // Handler for starting a session
  const handleStartSession = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Starting session...',
        success: () => {
          window.open('https://meet.google.com', '_blank');
          return 'Session started successfully!';
        },
        error: 'Failed to start session',
      }
    );
  };

  // Handler for opening calendar settings
  const handleOpenSettings = () => {
    toast.success('Opening calendar settings...');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
            <p className="text-gray-600">Manage your classes, office hours, and events</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowNewEventDialog(true)}>
              <CalendarPlus className="h-4 w-4 mr-2" />
              New Event
            </Button>
            <Button variant="outline" onClick={handleOpenSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Schedule Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Events</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">4</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CalendarClock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Classes</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Office Hours</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">6</h3>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Events</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">45</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CalendarCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">Live Session</span>
                    <span className="text-sm text-blue-600">2:00 PM - 3:30 PM</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Module 3: Credit Risk Assessment</h4>
                  <p className="text-sm text-gray-600 mt-1">Course: Advanced Credit Analysis</p>
                  <p className="text-xs text-gray-500 mt-1">45 students registered</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.success('Opening session details...')}>
                    View
                  </Button>
                  <Button size="sm" onClick={handleJoinSession}>
                    Join Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Office Hours</span>
                    <span className="text-sm text-green-600">10:00 AM - 12:00 PM</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">General Office Hours</h4>
                  <p className="text-sm text-gray-600 mt-1">Open for all students</p>
                  <p className="text-xs text-gray-500 mt-1">3 students waiting</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.success('Opening office hours...')}>
                    Manage
                  </Button>
                  <Button size="sm" onClick={handleStartSession}>
                    Start Session
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">Assignment</span>
                    <span className="text-sm text-purple-600">Due at 11:59 PM</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Module 4 Assessment Deadline</h4>
                  <p className="text-sm text-gray-600 mt-1">Course: Risk Assessment Fundamentals</p>
                  <p className="text-xs text-gray-500 mt-1">89 submissions received out of 156</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.success('Opening assignment details...')}>
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast.success('Opening grading interface...')}>
                    Grade
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {[
              {
                id: 1,
                date: 'Tomorrow',
                time: '9:00 AM - 10:30 AM',
                title: 'Guest Speaker Session',
                description: 'Industry expert discussion on credit risk'
              },
              {
                id: 2,
                date: 'Feb 25',
                time: '2:00 PM - 4:00 PM',
                title: 'Module 5 Workshop',
                description: 'Hands-on practice with risk assessment tools'
              },
              {
                id: 3,
                date: 'Feb 28',
                time: '11:00 AM - 12:30 PM',
                title: 'End of Module Review',
                description: 'Comprehensive review of Module 5 content'
              }
            ].map((event) => (
              <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">{event.date}</span>
                      <span className="text-sm text-gray-600">{event.time}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowEventDetailsDialog(true);
                    }}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Event Dialog */}
      <Dialog open={showNewEventDialog} onOpenChange={setShowNewEventDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Enter event title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Event Type</Label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="live_session">Live Session</SelectItem>
                    <SelectItem value="office_hours">Office Hours</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="guest_speaker">Guest Speaker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select value={eventCourse} onValueChange={setEventCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course1">Advanced Credit Analysis</SelectItem>
                    <SelectItem value="course2">Risk Assessment Fundamentals</SelectItem>
                    <SelectItem value="course3">Financial Regulations & Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_time">Start Time</Label>
                <Input
                  id="start_time"
                  type="time"
                  value={eventStartTime}
                  onChange={(e) => setEventStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_time">End Time</Label>
                <Input
                  id="end_time"
                  type="time"
                  value={eventEndTime}
                  onChange={(e) => setEventEndTime(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Enter event description"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowNewEventDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateEvent}>
              Create Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog open={showEventDetailsDialog} onOpenChange={setShowEventDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Event</Label>
              <p className="text-sm text-gray-700">{selectedEvent?.title}</p>
              <p className="text-xs text-gray-500">{selectedEvent?.description}</p>
            </div>
            <div className="space-y-2">
              <Label>Date & Time</Label>
              <p className="text-sm text-gray-700">{selectedEvent?.date}</p>
              <p className="text-xs text-gray-500">{selectedEvent?.time}</p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEventDetailsDialog(false)}
            >
              Close
            </Button>
            {selectedEvent?.type === 'live_session' && (
              <Button onClick={handleJoinSession}>
                Join Session
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleSection;
