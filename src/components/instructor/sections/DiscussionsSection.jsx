import React, { useState } from 'react';
import { 
  MessageSquare, Plus, Settings, MessageCircle, Users, Clock,
  Flag, CheckCircle
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

const DiscussionsSection = () => {
  const [showNewDiscussionDialog, setShowNewDiscussionDialog] = useState(false);
  const [showModerationDialog, setShowModerationDialog] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [discussionTitle, setDiscussionTitle] = useState('');
  const [discussionDescription, setDiscussionDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [moderationReason, setModerationReason] = useState('');

  // Handler for creating a new discussion
  const handleCreateDiscussion = () => {
    if (!discussionTitle || !discussionDescription || !selectedCourse) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Creating discussion...',
        success: () => {
          setShowNewDiscussionDialog(false);
          setDiscussionTitle('');
          setDiscussionDescription('');
          setSelectedCourse('');
          return 'Discussion created successfully!';
        },
        error: 'Failed to create discussion',
      }
    );
  };

  // Handler for moderating discussions
  const handleModeration = () => {
    if (!moderationReason) {
      toast.error('Please provide a reason for moderation');
      return;
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Processing moderation action...',
        success: () => {
          setShowModerationDialog(false);
          setModerationReason('');
          return 'Discussion moderated successfully!';
        },
        error: 'Failed to moderate discussion',
      }
    );
  };

  // Handler for opening discussion settings
  const handleOpenSettings = () => {
    toast.success('Opening discussion settings...');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Discussion Forums</h1>
            <p className="text-gray-600">Manage course discussions and student interactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowNewDiscussionDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
            <Button variant="outline" onClick={handleOpenSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Discussion Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Discussions</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Posts Today</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">45</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Student Participation</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">78%</h3>
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
                  <p className="text-sm font-medium text-gray-600">Needs Moderation</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">3</h3>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Flag className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Discussions */}
        <div className="space-y-4">
          {[
            {
              id: 1,
              module: 'Module 3',
              status: 'Active',
              title: 'Understanding Credit Risk Models',
              description: 'Discussion on different credit risk assessment models and their applications.',
              replies: 24,
              participants: 15,
              lastActivity: '2 hours ago'
            },
            {
              id: 2,
              module: 'Module 5',
              status: 'Needs Moderation',
              title: 'Risk Mitigation Strategies Discussion',
              description: 'Share and discuss various risk mitigation approaches in credit analysis.',
              replies: 18,
              participants: 12,
              lastActivity: '30 minutes ago'
            }
          ].map((discussion) => (
            <div key={discussion.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-white p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {discussion.module}
                      </span>
                      <span className={cn(
                        "px-2 py-1 text-xs font-semibold rounded",
                        discussion.status === 'Active' 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      )}>
                        {discussion.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{discussion.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" /> {discussion.replies} replies
                      </span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Users className="h-4 w-4" /> {discussion.participants} participants
                      </span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="h-4 w-4" /> Last activity: {discussion.lastActivity}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toast.success('Opening discussion...')}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedDiscussion(discussion);
                        setShowModerationDialog(true);
                      }}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
              <MessageCircle className="h-5 w-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New Discussion Post</p>
                <p className="text-xs text-gray-600">John Smith posted in "Understanding Credit Risk Models"</p>
                <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 bg-yellow-50 rounded-lg">
              <Flag className="h-5 w-5 text-yellow-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Post Flagged for Review</p>
                <p className="text-xs text-gray-600">A post in "Risk Mitigation Strategies" needs moderation</p>
                <p className="text-xs text-gray-500 mt-1">30 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Discussion Resolved</p>
                <p className="text-xs text-gray-600">Maria Johnson marked a discussion as resolved</p>
                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Discussion Dialog */}
      <Dialog open={showNewDiscussionDialog} onOpenChange={setShowNewDiscussionDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Discussion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Discussion Title</Label>
              <Input
                id="title"
                value={discussionTitle}
                onChange={(e) => setDiscussionTitle(e.target.value)}
                placeholder="Enter discussion title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
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
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={discussionDescription}
                onChange={(e) => setDiscussionDescription(e.target.value)}
                placeholder="Enter discussion description"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowNewDiscussionDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateDiscussion}>
              Create Discussion
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Moderation Dialog */}
      <Dialog open={showModerationDialog} onOpenChange={setShowModerationDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Moderate Discussion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Discussion</Label>
              <p className="text-sm text-gray-700">{selectedDiscussion?.title}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Moderation</Label>
              <Textarea
                id="reason"
                value={moderationReason}
                onChange={(e) => setModerationReason(e.target.value)}
                placeholder="Enter reason for moderation..."
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowModerationDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleModeration}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiscussionsSection;
