import React, { useState } from 'react';
import { 
  FileText, Filter, Download, Clock, CheckCircle, BarChart2,
  MessageSquare, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const GradingSection = () => {
  const [showGradingDialog, setShowGradingDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  // Handler for opening the grading dialog
  const handleOpenGrading = (submission) => {
    setSelectedSubmission(submission);
    setGrade(submission.currentGrade || '');
    setFeedback('');
    setShowGradingDialog(true);
  };

  // Handler for submitting grades
  const handleSubmitGrade = () => {
    if (!grade) {
      toast.error('Please enter a grade');
      return;
    }

    // Here you would typically make an API call to save the grade
    toast.promise(
      // Simulating an API call with a timeout
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Saving grade...',
        success: () => {
          setShowGradingDialog(false);
          return 'Grade saved successfully!';
        },
        error: 'Failed to save grade',
      }
    );
  };

  // Handler for downloading grades
  const handleDownloadGrades = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Preparing grades export...',
        success: () => {
          // Here you would typically trigger a file download
          return 'Grades exported successfully!';
        },
        error: 'Failed to export grades',
      }
    );
  };

  // Handler for applying filters
  const handleApplyFilters = () => {
    toast.success('Filters applied successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Grading Center</h1>
            <p className="text-gray-600">Review and grade student submissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleApplyFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" onClick={handleDownloadGrades}>
              <Download className="h-4 w-4 mr-2" />
              Export Grades
            </Button>
          </div>
        </div>

        {/* Grading Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">23</h3>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Graded This Week</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">45</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">87%</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Submissions Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Pending Submissions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {/* Sample submissions - in a real app, this would come from your data source */}
            {[
              {
                id: 1,
                name: 'John Smith',
                initials: 'JS',
                module: 'Module 3: Credit Risk Assessment',
                submittedTime: '2 hours ago',
                dueDate: 'Feb 20, 2024',
                currentGrade: ''
              },
              {
                id: 2,
                name: 'Maria Johnson',
                initials: 'MJ',
                module: 'Module 5: Risk Mitigation Strategies',
                submittedTime: '5 hours ago',
                dueDate: 'Feb 25, 2024',
                currentGrade: ''
              }
            ].map((submission) => (
              <div key={submission.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {submission.initials}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{submission.name}</h4>
                      <p className="text-sm text-gray-600">{submission.module}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Submitted: {submission.submittedTime}</p>
                      <p className="text-xs text-gray-500">Due: {submission.dueDate}</p>
                    </div>
                    <Button onClick={() => handleOpenGrading(submission)}>
                      Grade Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Grading Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Assignment Graded</p>
                <p className="text-xs text-gray-600">You graded Sarah Davis's "Risk Assessment Quiz" - Score: 92%</p>
                <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Feedback Provided</p>
                <p className="text-xs text-gray-600">You provided feedback on Thomas Miller's assignment</p>
                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 bg-purple-50 rounded-lg">
              <RefreshCw className="h-5 w-5 text-purple-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Grade Updated</p>
                <p className="text-xs text-gray-600">You updated Emily Brown's grade after resubmission</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grading Dialog */}
      <Dialog open={showGradingDialog} onOpenChange={setShowGradingDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Student</Label>
              <p className="text-sm text-gray-700">{selectedSubmission?.name}</p>
              <p className="text-xs text-gray-500">{selectedSubmission?.module}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade (%)</Label>
              <Input
                id="grade"
                type="number"
                min="0"
                max="100"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Enter grade (0-100)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter feedback for the student..."
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowGradingDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitGrade}>
              Save Grade
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GradingSection;
