import React, { useState } from 'react';
import { 
  Bell, Plus, Settings, CalendarClock, CheckCircle,
  Clock, BookOpen, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AnnouncementsSection = () => {
  const [showNewAnnouncementDialog, setShowNewAnnouncementDialog] = useState(false);
  const [showEditAnnouncementDialog, setShowEditAnnouncementDialog] = useState(false);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementCourse, setAnnouncementCourse] = useState('');
  const [announcementSchedule, setAnnouncementSchedule] = useState('');
  const [announcementScheduleDate, setAnnouncementScheduleDate] = useState('');
  const [announcementScheduleTime, setAnnouncementScheduleTime] = useState('');

  // Handler for creating a new announcement
  const handleCreateAnnouncement = () => {
    if (!announcementTitle || !announcementContent || !announcementCourse) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Creating announcement...',
        success: () => {
          setShowNewAnnouncementDialog(false);
          setAnnouncementTitle('');
          setAnnouncementContent('');
          setAnnouncementCourse('');
          setAnnouncementSchedule('');
          setAnnouncementScheduleDate('');
          setAnnouncementScheduleTime('');
          return 'Announcement created successfully!';
        },
        error: 'Failed to create announcement',
      }
    );
  };

  // Handler for editing an announcement
  const handleEditAnnouncement = () => {
    if (!announcementTitle || !announcementContent || !announcementCourse) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Updating announcement...',
        success: () => {
          setShowEditAnnouncementDialog(false);
          return 'Announcement updated successfully!';
        },
        error: 'Failed to update announcement',
      }
    );
  };

  // Handler for deleting an announcement
  const handleDeleteAnnouncement = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Deleting announcement...',
        success: () => {
          setShowDeleteConfirmDialog(false);
          return 'Announcement deleted successfully!';
        },
        error: 'Failed to delete announcement',
      }
    );
  };

  // Handler for opening settings
  const handleOpenSettings = () => {
    toast.success('Opening announcement settings...');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Bell className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600">Manage and send announcements to your students</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowNewAnnouncementDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
            <Button variant="outline" onClick={handleOpenSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Announcement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Announcements</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">24</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CalendarClock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Read Rate</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">92%</h3>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Scheduled</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">3</h3>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Announcements */}
        <div className="space-y-4">
          {[
            {
              id: 1,
              type: 'Module Update',
              time: 'Posted 2 hours ago',
              title: 'Module 5 Now Available',
              content: 'The new module on Risk Mitigation Strategies is now live. Please review the materials before next week\'s session.',
              course: 'Advanced Credit Analysis',
              recipients: 156,
              readCount: 145
            },
            {
              id: 2,
              type: 'Event',
              time: 'Posted yesterday',
              title: 'Guest Speaker Session',
              content: 'Join us for a special session with industry expert Dr. Smith on Friday at 3 PM.',
              course: 'All Courses',
              recipients: 245,
              readCount: 220
            },
            {
              id: 3,
              type: 'Scheduled',
              time: 'Scheduled for tomorrow',
              title: 'Assignment Deadline Extension',
              content: 'The deadline for Module 4 Assessment has been extended to Friday, February 23rd.',
              course: 'Risk Assessment Fundamentals',
              recipients: 89,
              readCount: null
            }
          ].map((announcement) => (
            <div key={announcement.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-white p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        "px-2 py-1 text-xs font-semibold rounded",
                        announcement.type === 'Module Update' ? "bg-blue-100 text-blue-700" :
                        announcement.type === 'Event' ? "bg-purple-100 text-purple-700" :
                        "bg-orange-100 text-orange-700"
                      )}>
                        {announcement.type}
                      </span>
                      <span className="text-sm text-gray-600">{announcement.time}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <BookOpen className="h-4 w-4" /> {announcement.course}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Users className="h-4 w-4" /> {announcement.recipients} recipients
                      </span>
                      {announcement.readCount !== null && (
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" /> {announcement.readCount} read
                        </span>
                      )}
                      {announcement.readCount === null && (
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="h-4 w-4 text-orange-600" /> Scheduled
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => toast.success('Opening announcement...')}>
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedAnnouncement(announcement);
                        setShowEditAnnouncementDialog(true);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scheduled Announcements */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Announcements</h2>
          <div className="space-y-4">
            {[
              {
                id: 1,
                date: 'Feb 25',
                time: '8:00 AM',
                title: 'Module 5 Workshop Reminder',
                description: 'Reminder for upcoming hands-on workshop session'
              },
              {
                id: 2,
                date: 'Feb 28',
                time: '9:00 AM',
                title: 'End of Module Survey',
                description: 'Module 5 feedback survey announcement'
              }
            ].map((announcement) => (
              <div key={announcement.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">{announcement.date}</span>
                      <span className="text-sm text-gray-600">{announcement.time}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{announcement.description}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setSelectedAnnouncement(announcement);
                      setShowEditAnnouncementDialog(true);
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

      {/* New Announcement Dialog */}
      <Dialog open={showNewAnnouncementDialog} onOpenChange={setShowNewAnnouncementDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Announcement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Announcement Title</Label>
              <Input
                id="title"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="Enter announcement title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={announcementCourse} onValueChange={setAnnouncementCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="course1">Advanced Credit Analysis</SelectItem>
                  <SelectItem value="course2">Risk Assessment Fundamentals</SelectItem>
                  <SelectItem value="course3">Financial Regulations & Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={announcementContent}
                onChange={(e) => setAnnouncementContent(e.target.value)}
                placeholder="Enter announcement content"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Select value={announcementSchedule} onValueChange={setAnnouncementSchedule}>
                <SelectTrigger>
                  <SelectValue placeholder="Select when to send" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Send Now</SelectItem>
                  <SelectItem value="later">Schedule for Later</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {announcementSchedule === 'later' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate">Date</Label>
                  <Input
                    id="scheduleDate"
                    type="date"
                    value={announcementScheduleDate}
                    onChange={(e) => setAnnouncementScheduleDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduleTime">Time</Label>
                  <Input
                    id="scheduleTime"
                    type="time"
                    value={announcementScheduleTime}
                    onChange={(e) => setAnnouncementScheduleTime(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowNewAnnouncementDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateAnnouncement}>
              {announcementSchedule === 'later' ? 'Schedule Announcement' : 'Send Now'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Announcement Dialog */}
      <Dialog open={showEditAnnouncementDialog} onOpenChange={setShowEditAnnouncementDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Title</Label>
              <p className="text-sm text-gray-700">{selectedAnnouncement?.title}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newTitle">New Title</Label>
              <Input
                id="newTitle"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="Enter new title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newContent">New Content</Label>
              <Textarea
                id="newContent"
                value={announcementContent}
                onChange={(e) => setAnnouncementContent(e.target.value)}
                placeholder="Enter new content"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEditAnnouncementDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                setShowEditAnnouncementDialog(false);
                setShowDeleteConfirmDialog(true);
              }}
            >
              Delete
            </Button>
            <Button onClick={handleEditAnnouncement}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Announcement</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this announcement? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteAnnouncement}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementsSection;
