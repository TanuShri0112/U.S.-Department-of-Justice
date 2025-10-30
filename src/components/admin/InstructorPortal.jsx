import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Users, ClipboardCheck, BarChart2, MessageSquare,
  Calendar, FileText, GraduationCap, Shield, User, Upload, Video, Bell,
  ChevronDown, ChevronUp, CheckCircle, XCircle, Clock, Plus
} from 'lucide-react';
import {
  GradingSection,
  DiscussionsSection,
  ScheduleSection,
  AnnouncementsSection
} from '@/components/instructor/sections';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast, Toaster } from 'react-hot-toast';
import { usePortal } from '@/contexts/PortalContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LanguageSwitcher from '../ui/LanguageSwitcher';

// Assignment Card Component with Expandable Sections
const AssignmentCard = ({ title, course, dueDate, totalStudents, submitted, pending, questions, submissions }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="flex gap-4 mt-2 flex-wrap">
              <span className="text-sm text-gray-600">📚 {course}</span>
              <span className="text-sm text-gray-600">📅 Due: {dueDate}</span>
            </div>
          </div>
          <Button size="sm" variant="outline">
            <FileText className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Total Students</p>
            <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-xs text-green-600">Submitted</p>
            <p className="text-2xl font-bold text-green-700">{submitted}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
            <p className="text-xs text-orange-600">Pending</p>
            <p className="text-2xl font-bold text-orange-700">{pending}</p>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => setShowQuestions(!showQuestions)}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-900">Questions ({questions.length})</span>
          </div>
          {showQuestions ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {showQuestions && (
          <div className="px-6 pb-4 space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    {q.type}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">Q{index + 1}. {q.question}</p>
                    
                    {q.type === 'MCQ' && q.options && (
                      <div className="space-y-2 ml-4">
                        {q.options.map((option, i) => (
                          <div key={i} className={cn(
                            "p-2 rounded",
                            option === q.correctAnswer ? "bg-green-100 border border-green-300" : "bg-white border border-gray-200"
                          )}>
                            <span className="text-sm text-gray-700">{String.fromCharCode(65 + i)}. {option}</span>
                            {option === q.correctAnswer && (
                              <CheckCircle className="inline-block h-4 w-4 text-green-600 ml-2" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {(q.type === 'True/False' || q.type === 'Fill-up') && (
                      <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded">
                        <span className="text-sm font-medium text-green-700">
                          ✓ Correct Answer: {q.correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submissions Section */}
      <div>
        <button
          onClick={() => setShowSubmissions(!showSubmissions)}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            <span className="font-medium text-gray-900">Student Submissions ({submitted})</span>
          </div>
          {showSubmissions ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        
        {showSubmissions && (
          <div className="px-6 pb-4">
            <div className="space-y-3">
              {submissions.map((sub, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                        {sub.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{sub.name}</p>
                        <p className="text-xs text-gray-500">{sub.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Submitted: {sub.submittedDate}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-sm font-semibold",
                            sub.score >= 90 ? "bg-green-100 text-green-700" :
                            sub.score >= 75 ? "bg-blue-100 text-blue-700" :
                            sub.score >= 60 ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          )}>
                            Score: {sub.score}%
                          </span>
                          {sub.status === 'graded' && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Feedback
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {submitted > submissions.length && (
              <div className="mt-4 text-center">
                <Button variant="link" size="sm">
                  View all {submitted} submissions →
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const InstructorPortal = ({ onToggle }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const { portalMode, switchPortal, isInstructorPortal } = usePortal();
  const [showCreateAssignmentModal, setShowCreateAssignmentModal] = useState(false);
  
  const [metrics, setMetrics] = useState({
    totalStudents: 156,
    activeCourses: 8,
    pendingAssignments: 23,
    avgGrade: 87,
    completionRate: 78,
    activeDiscussions: 12,
  });

  const instructorSections = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'upload', label: 'Upload Course', icon: Upload },
    { id: 'students', label: 'My Students', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: ClipboardCheck },
    { id: 'grades', label: 'Grading', icon: FileText },
    { id: 'webinars', label: 'Webinars', icon: Video },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
  ];

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    
    // Navigate based on section
    switch(sectionId) {
      case 'webinars':
        toast.success('Loading webinars...');
        setTimeout(() => navigate('/webinars'), 500);
        break;
      case 'schedule':
      case 'announcements':
      case 'students':
      case 'upload':
      case 'assignments':
        // Keep in portal for quick access
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Metrics Cards */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900">{metrics.totalStudents}</div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Across all courses</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900">{metrics.activeCourses}</div>
                    <BookOpen className="h-8 w-8 text-green-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Currently teaching</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900">{metrics.pendingAssignments}</div>
                    <ClipboardCheck className="h-8 w-8 text-orange-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Assignments to grade</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Average Grade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900">{metrics.avgGrade}%</div>
                    <BarChart2 className="h-8 w-8 text-purple-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Class average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900">{metrics.completionRate}%</div>
                    <GraduationCap className="h-8 w-8 text-teal-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Course completion</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Discussions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-gray-900">{metrics.activeDiscussions}</div>
                    <MessageSquare className="h-8 w-8 text-pink-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Ongoing threads</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => navigate('/courses')}
                    className="w-full h-20 flex flex-col gap-2"
                    variant="outline"
                  >
                    <BookOpen className="h-6 w-6" />
                    <span>Manage Courses</span>
                  </Button>
                  <Button 
                    onClick={() => navigate('/assignments')}
                    className="w-full h-20 flex flex-col gap-2"
                    variant="outline"
                  >
                    <ClipboardCheck className="h-6 w-6" />
                    <span>Grade Assignments</span>
                  </Button>
                  <Button 
                    onClick={() => navigate('/users')}
                    className="w-full h-20 flex flex-col gap-2"
                    variant="outline"
                  >
                    <Users className="h-6 w-6" />
                    <span>View Students</span>
                  </Button>
                  <Button 
                    onClick={() => toast.success('Creating new announcement...')}
                    className="w-full h-20 flex flex-col gap-2"
                    variant="outline"
                  >
                    <MessageSquare className="h-6 w-6" />
                    <span>Announce</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 bg-blue-50 rounded-lg">
                    <ClipboardCheck className="h-5 w-5 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New assignment submitted</p>
                      <p className="text-xs text-gray-600">John Doe submitted "Module 3 Assessment" - 5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 bg-green-50 rounded-lg">
                    <Users className="h-5 w-5 text-green-600 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New student enrolled</p>
                      <p className="text-xs text-gray-600">Jane Smith joined "Advanced Credit Analysis" - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 bg-purple-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-purple-600 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New discussion post</p>
                      <p className="text-xs text-gray-600">Discussion: "Credit Risk Assessment Methods" - 4 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'students':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
                  <p className="text-gray-600">Students enrolled in your courses</p>
                </div>
                <Button variant="outline" onClick={() => navigate('/users')}>
                  <Users className="h-4 w-4 mr-2" />
                  View All Students
                </Button>
              </div>

              {/* Students by Course */}
              <div className="space-y-6">
                {/* Course 1: Advanced Credit Analysis */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Advanced Credit Analysis</h3>
                        <p className="text-sm text-gray-600">156 Students Enrolled</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate('/courses/view/1757539')}>
                        <BookOpen className="h-4 w-4 mr-1" />
                        View Course
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-3">
                      {/* Student 1 */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                            JS
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">John Smith</p>
                            <p className="text-xs text-gray-500">john.smith@blbnrw.de</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Progress: 78%</p>
                            <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </div>
                      </div>

                      {/* Student 2 */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                            MJ
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Maria Johnson</p>
                            <p className="text-xs text-gray-500">maria.j@blbnrw.de</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Progress: 92%</p>
                            <p className="text-xs text-gray-500">Last active: 1 day ago</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </div>
                      </div>

                      {/* Student 3 */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                            RW
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Robert Wilson</p>
                            <p className="text-xs text-gray-500">r.wilson@blbnrw.de</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Progress: 45%</p>
                            <p className="text-xs text-gray-500">Last active: 3 hours ago</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-center">
                      <Button variant="link" size="sm">Show all 156 students →</Button>
                    </div>
                  </div>
                </div>

                {/* Course 2: Risk Assessment Fundamentals */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Risk Assessment Fundamentals</h3>
                        <p className="text-sm text-gray-600">89 Students Enrolled</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate('/courses')}>
                        <BookOpen className="h-4 w-4 mr-1" />
                        View Course
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-3">
                      {/* Student 1 */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                            SD
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Sarah Davis</p>
                            <p className="text-xs text-gray-500">sarah.d@blbnrw.de</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Progress: 65%</p>
                            <p className="text-xs text-gray-500">Last active: Today</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </div>
                      </div>

                      {/* Student 2 */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
                            TM
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Thomas Miller</p>
                            <p className="text-xs text-gray-500">t.miller@blbnrw.de</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Progress: 88%</p>
                            <p className="text-xs text-gray-500">Last active: Yesterday</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-center">
                      <Button variant="link" size="sm">Show all 89 students →</Button>
                    </div>
                  </div>
                </div>

                {/* Course 3: Financial Regulations & Compliance */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-purple-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Financial Regulations & Compliance</h3>
                        <p className="text-sm text-gray-600">0 Students Enrolled</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded">Draft</span>
                    </div>
                  </div>
                  
                  <div className="p-6 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">No students enrolled yet</p>
                    <Button variant="outline" onClick={() => toast.success('Publishing course...')}>
                      <Upload className="h-4 w-4 mr-2" />
                      Publish Course
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'upload':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Course</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => navigate('/courses/create')}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Course Content</h3>
                  <p className="text-sm text-gray-600 mb-4">Drag and drop your course files or click to browse</p>
                  <Button onClick={(e) => {
                    e.stopPropagation();
                    navigate('/courses/create');
                  }}>Create New Course</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-600 mb-2" />
                    <h4 className="font-semibold text-gray-900">Documents</h4>
                    <p className="text-xs text-gray-600">PDF, DOCX, PPT</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <Video className="h-8 w-8 text-green-600 mb-2" />
                    <h4 className="font-semibold text-gray-900">Videos</h4>
                    <p className="text-xs text-gray-600">MP4, AVI, MOV</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <Upload className="h-8 w-8 text-purple-600 mb-2" />
                    <h4 className="font-semibold text-gray-900">SCORM</h4>
                    <p className="text-xs text-gray-600">ZIP packages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manage Courses Section */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Your Courses</CardTitle>
                  <Button variant="outline" onClick={() => navigate('/courses')}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    View All Courses
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Course 1 */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Advanced Credit Analysis</h4>
                        <p className="text-sm text-gray-600 mb-2">Comprehensive course on credit risk assessment and analysis</p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Published</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">156 Students</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">8 Modules</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => navigate('/courses/builder/1757539')}>
                          <FileText className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => navigate('/courses/view/1757539')}>
                          <BookOpen className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Course 2 */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Risk Assessment Fundamentals</h4>
                        <p className="text-sm text-gray-600 mb-2">Introduction to risk management and assessment techniques</p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Published</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">89 Students</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">5 Modules</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => navigate('/courses')}>
                          <FileText className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => navigate('/courses')}>
                          <BookOpen className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Course 3 */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Financial Regulations & Compliance</h4>
                        <p className="text-sm text-gray-600 mb-2">Understanding regulatory frameworks and compliance requirements</p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">Draft</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">0 Students</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">3 Modules</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => navigate('/courses')}>
                          <FileText className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" onClick={() => toast.success('Publishing course...')}>
                          <Upload className="h-4 w-4 mr-1" />
                          Publish
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-blue-600" />
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button variant="outline" className="w-full" onClick={() => navigate('/courses/create')}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New Course
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/courses')}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Browse All Courses
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => toast.success('Opening course builder...')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Course Builder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'webinars':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Webinars</CardTitle>
                  <Button onClick={() => navigate('/webinars')}>
                    <Video className="h-4 w-4 mr-2" />
                    View All Webinars
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">Introduction to Credit Analysis</h4>
                        <p className="text-sm text-gray-600 mt-1">Scheduled: Today at 3:00 PM</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Active</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">45 Registered</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">Advanced Risk Assessment</h4>
                        <p className="text-sm text-gray-600 mt-1">Scheduled: Tomorrow at 10:00 AM</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">Upcoming</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">32 Registered</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'schedule':
        return <ScheduleSection />;
      
      case 'assignments':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">My Assignments</h1>
                  <p className="text-gray-600">View and grade student submissions</p>
                </div>
                <Button onClick={() => setShowCreateAssignmentModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Assignment
                </Button>
              </div>

              {/* Assignments List */}
              <div className="space-y-4">
                {/* Assignment 1 */}
                <AssignmentCard 
                  title="Module 3: Credit Risk Assessment Quiz"
                  course="Advanced Credit Analysis"
                  dueDate="Feb 20, 2024"
                  totalStudents={156}
                  submitted={142}
                  pending={14}
                  questions={[
                    { type: 'MCQ', question: 'What is the primary purpose of credit risk assessment?', options: ['Risk identification', 'Profit maximization', 'Customer satisfaction', 'Market analysis'], correctAnswer: 'Risk identification' },
                    { type: 'True/False', question: 'Credit scoring models are always 100% accurate.', correctAnswer: 'False' },
                    { type: 'Fill-up', question: 'The three C\'s of credit are Character, _____, and Collateral.', correctAnswer: 'Capacity' },
                    { type: 'MCQ', question: 'Which factor is NOT typically considered in credit analysis?', options: ['Payment history', 'Debt-to-income ratio', 'Eye color', 'Employment status'], correctAnswer: 'Eye color' }
                  ]}
                  submissions={[
                    { name: 'John Smith', email: 'john.smith@blbnrw.de', submittedDate: 'Feb 18, 2024', score: 85, status: 'graded' },
                    { name: 'Maria Johnson', email: 'maria.j@blbnrw.de', submittedDate: 'Feb 19, 2024', score: 92, status: 'graded' },
                    { name: 'Robert Wilson', email: 'r.wilson@blbnrw.de', submittedDate: 'Feb 17, 2024', score: 78, status: 'graded' }
                  ]}
                />

                {/* Assignment 2 */}
                <AssignmentCard 
                  title="Module 5: Risk Mitigation Strategies Assessment"
                  course="Advanced Credit Analysis"
                  dueDate="Feb 25, 2024"
                  totalStudents={156}
                  submitted={98}
                  pending={58}
                  questions={[
                    { type: 'MCQ', question: 'Which is the most effective risk mitigation strategy?', options: ['Avoidance', 'Transfer', 'Reduction', 'Depends on context'], correctAnswer: 'Depends on context' },
                    { type: 'Fill-up', question: 'Insurance is an example of risk _____.', correctAnswer: 'Transfer' },
                    { type: 'True/False', question: 'All risks can be completely eliminated.', correctAnswer: 'False' },
                    { type: 'MCQ', question: 'What does diversification help reduce?', options: ['All risks', 'Systematic risk', 'Unsystematic risk', 'No risks'], correctAnswer: 'Unsystematic risk' }
                  ]}
                  submissions={[
                    { name: 'Sarah Davis', email: 'sarah.d@blbnrw.de', submittedDate: 'Feb 24, 2024', score: 88, status: 'graded' },
                    { name: 'Thomas Miller', email: 't.miller@blbnrw.de', submittedDate: 'Feb 23, 2024', score: 95, status: 'graded' }
                  ]}
                />

                {/* Assignment 3 */}
                <AssignmentCard 
                  title="Module 2: Financial Ratios Quiz"
                  course="Risk Assessment Fundamentals"
                  dueDate="Feb 15, 2024"
                  totalStudents={89}
                  submitted={89}
                  pending={0}
                  questions={[
                    { type: 'Fill-up', question: 'The current ratio is calculated by dividing current assets by current _____.', correctAnswer: 'Liabilities' },
                    { type: 'MCQ', question: 'Which ratio measures profitability?', options: ['Current ratio', 'ROE', 'Debt ratio', 'Quick ratio'], correctAnswer: 'ROE' },
                    { type: 'True/False', question: 'A higher debt-to-equity ratio always indicates better financial health.', correctAnswer: 'False' },
                    { type: 'MCQ', question: 'What does ROA stand for?', options: ['Return on Assets', 'Rate of Assets', 'Risk on Assets', 'Revenue on Assets'], correctAnswer: 'Return on Assets' }
                  ]}
                  submissions={[
                    { name: 'Emily Brown', email: 'e.brown@blbnrw.de', submittedDate: 'Feb 14, 2024', score: 90, status: 'graded' },
                    { name: 'Michael Chen', email: 'm.chen@blbnrw.de', submittedDate: 'Feb 15, 2024', score: 87, status: 'graded' }
                  ]}
                />
              </div>
            </div>
          </div>
        );
      
      case 'announcements':
        return <AnnouncementsSection />;
      
      case 'grades':
        return <GradingSection />;

      case 'discussions':
        return <DiscussionsSection />;

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900">Coming Soon</h3>
            <p className="text-gray-600 mt-2">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            borderRadius: '0.75rem',
            padding: '1rem',
          },
        }}
      />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">Instructor Portal</h1>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {instructorSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200",
                      "hover:bg-gray-50 hover:scale-105",
                      activeSection === section.id
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "text-gray-700 hover:text-gray-900"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5",
                      activeSection === section.id ? "text-green-600" : "text-gray-500"
                    )} />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Portal Switcher at Bottom */}
          <div className="border-t border-gray-200 p-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Portal Mode
              </label>
              <Select value={portalMode} onValueChange={switchPortal}>
                <SelectTrigger className="w-full bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="student" className="cursor-pointer hover:bg-slate-100 focus:bg-slate-100">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-600" />
                      <span>Student Mode</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="instructor" className="cursor-pointer hover:bg-green-50 focus:bg-green-50">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-green-600" />
                      <span>Instructor Portal</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin" className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span>Admin Portal</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Create Assignment Modal */}
      <Dialog open={showCreateAssignmentModal} onOpenChange={setShowCreateAssignmentModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Plus className="h-6 w-6 text-green-600" />
              Create New Assignment
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="assignmentTitle">Assignment Title</Label>
                <Input 
                  id="assignmentTitle" 
                  placeholder="e.g., Module 4: Risk Assessment Quiz"
                  className="mt-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="course1">Advanced Credit Analysis</SelectItem>
                      <SelectItem value="course2">Risk Assessment Fundamentals</SelectItem>
                      <SelectItem value="course3">Financial Regulations & Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input 
                    id="dueDate" 
                    type="datetime-local"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide instructions for the assignment..."
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalPoints">Total Points</Label>
                  <Input 
                    id="totalPoints" 
                    type="number"
                    placeholder="100"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="passingGrade">Passing Grade (%)</Label>
                  <Input 
                    id="passingGrade" 
                    type="number"
                    placeholder="60"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Assignment Type */}
            <div className="border-t pt-4">
              <Label className="text-base font-semibold">Assignment Type</Label>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <button className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <ClipboardCheck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-900">Quiz</p>
                  <p className="text-xs text-blue-600">MCQ, True/False</p>
                </button>
                <button className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Essay</p>
                  <p className="text-xs text-gray-600">Written response</p>
                </button>
                <button className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">File Upload</p>
                  <p className="text-xs text-gray-600">Document submission</p>
                </button>
              </div>
            </div>

            {/* Questions Section */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <Label className="text-base font-semibold">Questions</Label>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Question
                </Button>
              </div>

              {/* Sample Question */}
              <div className="space-y-3">
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <Label className="text-sm">Question 1</Label>
                      <Select defaultValue="mcq" className="mt-2">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mcq">MCQ</SelectItem>
                          <SelectItem value="truefalse">True/False</SelectItem>
                          <SelectItem value="fillup">Fill-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Input 
                    placeholder="Enter your question here..."
                    className="mb-3"
                  />
                  
                  <div className="space-y-2">
                    <Input placeholder="Option A" className="text-sm" />
                    <Input placeholder="Option B" className="text-sm" />
                    <Input placeholder="Option C" className="text-sm" />
                    <Input placeholder="Option D" className="text-sm" />
                  </div>
                  
                  <div className="mt-3">
                    <Label className="text-xs">Correct Answer</Label>
                    <Select className="mt-1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Option A</SelectItem>
                        <SelectItem value="b">Option B</SelectItem>
                        <SelectItem value="c">Option C</SelectItem>
                        <SelectItem value="d">Option D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowCreateAssignmentModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  toast.success('Assignment created successfully!');
                  setShowCreateAssignmentModal(false);
                }}
              >
                Create Assignment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorPortal;

