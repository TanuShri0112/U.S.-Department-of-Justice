import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Users, BarChart2, ClipboardCheck,
  Shield, GraduationCap, User, Settings, Database, AlertTriangle,
  Upload, Video, Calendar,Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast, Toaster } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePortal } from '@/contexts/PortalContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Import admin page components
import WebinarManagement from '../../pages/admin/WebinarManagement';
import CalendarManagement from '../../pages/admin/CalendarManagement';
import AnnouncementManagement from '../../pages/admin/AnnouncementManagement';
import UserManagement from '../../pages/admin/UserManagement';
import AdminReports from '../../pages/admin/AdminReports';
import AdminFeedbackReports from '../../pages/admin/AdminFeedbackReports';

const AdminPortal = ({ onToggle }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [courseForm, setCourseForm] = useState({
    title: '',
    category: 'Workplace Safety',
    duration: '',
    difficulty: 'Beginner',
    description: '',
    learningObjectives: ''
  });
  
  const [courseFilter, setCourseFilter] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [metrics, setMetrics] = useState({
    totalUsers: 1234,
    courseCompletionRate: 78,
    upcomingDeadlines: 15,
    certificatesIssued: 847,
    safetyIncidents: 3,
    activeSessions: 156,
    newRegistrations: 89,
    requiredTraining: 23,
    systemUptime: 94,
    avgLoadTime: 4.2,
    complianceRate: 87
  });
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showActionFeedback, setShowActionFeedback] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const { portalMode, switchPortal, isAdminPortal } = usePortal();

  const adminSections = [
    { id: 'overview', label: 'System Overview', icon: BarChart2 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'announcements', label: 'System Announcements', icon: Bell },
    { id: 'reports', label: 'System Reports', icon: BarChart2 },
    { id: 'feedback', label: 'Feedback Reports', icon: ClipboardCheck },
    { id: 'settings', label: 'System Settings', icon: Settings },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'logs', label: 'System Logs', icon: AlertTriangle },
  ];

  const handleFileUpload = (files) => {
    if (files.length === 0) return;
    
    const loadingToast = toast.loading(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`);
    
    // Simulate file upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress > 100) {
        clearInterval(interval);
        progress = 100;
        toast.success(`Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''}`, {
          id: loadingToast
        });
        setUploadProgress(0);
      }
      setUploadProgress(Math.min(progress, 100));
    }, 500);
  };

  const handleCreateCourse = () => {
    // Validate form
    if (!courseForm.title || !courseForm.duration || !courseForm.description || !courseForm.learningObjectives) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Creating course...');
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Course created successfully!', { id: loadingToast });
      
      // Reset form
      setCourseForm({
        title: '',
        category: 'Workplace Safety',
        duration: '',
        difficulty: 'Beginner',
        description: '',
        learningObjectives: ''
      });
    }, 1500);
  };

  const handleSaveAsDraft = () => {
    const loadingToast = toast.loading('Saving draft...');
    
    setTimeout(() => {
      toast.success('Draft saved successfully!', { id: loadingToast });
    }, 1000);
  };

  const handleFilterChange = (filter) => {
    setCourseFilter(filter);
    const loadingToast = toast.loading('Updating course list...');
    
    setTimeout(() => {
      toast.success('Course list updated', { id: loadingToast });
    }, 500);
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    
    // Navigate to specific pages for certain sections
    switch(sectionId) {
      case 'users':
        toast.success('Loading user management...');
        setTimeout(() => navigate('/users'), 500);
        break;
      case 'overview':
        // Update metrics if returning to overview
        setMetrics(prev => ({
          ...prev,
          totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
          courseCompletionRate: Math.min(100, prev.courseCompletionRate + Math.floor(Math.random() * 3)),
          upcomingDeadlines: Math.max(0, prev.upcomingDeadlines + Math.floor(Math.random() * 3 - 1))
        }));
        break;
      default:
        // Keep other sections (settings, database, logs, etc.) in portal view
        break;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
       case 'overview':
         return (
           <div className="space-y-6">
             {/* Main Stats Cards */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">DAI Global MEL Overview</h1>
                  <p className="text-gray-600">Dashboard analytics and key metrics for DAI Global</p>
                </div>
              </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-green-50 rounded-lg p-4 group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                   <div className="flex items-center justify-between">
                     <div>
                      <p className="text-sm font-medium text-green-700">Total Users Enrolled</p>
                     <p className="text-2xl font-bold text-green-900">{metrics.totalUsers.toLocaleString()}</p>
                     <p className="text-xs text-green-700 mt-1">DAI Global learners</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Course Completion Rate</p>
                      <p className="text-2xl font-bold text-green-900">{metrics.courseCompletionRate}%</p>
                      <p className="text-xs text-green-600 mt-1">+5% from last month</p>
                    </div>
                    <BarChart2 className="w-8 h-8 text-green-500 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4 group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Upcoming Deadlines</p>
                      <p className="text-2xl font-bold text-orange-900">{metrics.upcomingDeadlines}</p>
                      <p className="text-xs text-orange-600 mt-1">Compliance training due</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-500 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Certificates Issued</p>
                      <p className="text-2xl font-bold text-purple-900">{metrics.certificatesIssued}</p>
                      <p className="text-xs text-purple-600 mt-1">This year</p>
                     </div>
                     <Award className="w-8 h-8 text-purple-500 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
                   </div>
                 </div>
                   </div>
                 </div>
                 
             {/* Secondary Stats */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Training Activity</h3>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600">Active Training Sessions</span>
                     <span className="text-sm font-medium text-gray-900">{metrics.activeSessions}</span>
                     </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600">New Enrollments</span>
                     <span className="text-sm font-medium text-gray-900">{metrics.newRegistrations}</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600">Required Training Modules</span>
                     <span className="text-sm font-medium text-gray-900">{metrics.requiredTraining}</span>
                 </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600">Safety Incidents Reported</span>
                     <span className="text-sm font-medium text-red-600">{metrics.safetyIncidents}</span>
                   </div>
                   </div>
                 </div>
                 
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                 <div className="space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                     <div className="flex-1">
                       <p className="text-sm text-gray-900">Workplace Safety module updated</p>
                       <p className="text-xs text-gray-500">2 hours ago</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                     <div className="flex-1">
                       <p className="text-sm text-gray-900">Emergency Procedures training scheduled</p>
                       <p className="text-xs text-gray-500">4 hours ago</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                     <div className="flex-1">
                       <p className="text-sm text-gray-900">Compliance report generated</p>
                       <p className="text-xs text-gray-500">6 hours ago</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                     <div className="flex-1">
                       <p className="text-sm text-gray-900">{metrics.newRegistrations} new users enrolled</p>
                       <p className="text-xs text-gray-500">8 hours ago</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Performance Metrics */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance & Performance Metrics</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="text-center">
                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                     <span className="text-xl font-bold text-blue-600">{metrics.systemUptime}%</span>
                   </div>
                   <p className="text-sm font-medium text-gray-900">System Uptime</p>
                   <p className="text-xs text-gray-500">Last 30 days</p>
                 </div>
                 <div className="text-center">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                     <span className="text-xl font-bold text-green-600">{metrics.avgLoadTime}s</span>
                   </div>
                   <p className="text-sm font-medium text-gray-900">Avg Load Time</p>
                   <p className="text-xs text-gray-500">Page response</p>
                 </div>
                 <div className="text-center">
                   <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                     <span className="text-xl font-bold text-purple-600">{metrics.complianceRate}%</span>
                   </div>
                   <p className="text-sm font-medium text-gray-900">Compliance Rate</p>
                   <p className="text-xs text-gray-500">Arbeitsschutzgesetz</p>
                 </div>
               </div>
             </div>

             {/* Quick Actions */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveSection('courses')}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  <Upload className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Upload Training</span>
                 </button>
                <button 
                  onClick={() => setActiveSection('webinars')}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  <Video className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Schedule Session</span>
                 </button>
                <button 
                  onClick={() => setActiveSection('announcements')}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  <Bell className="w-6 h-6 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Send Notice</span>
                 </button>
                <button 
                  onClick={() => setActiveSection('reports')}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  <BarChart2 className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Generate Report</span>
                 </button>
               </div>
             </div>
           </div>
         );
       
       case 'courses':
         return (
           <div className="space-y-6">
             {/* Header */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-green-600" />
                 </div>
                 <div>
                  <h1 className="text-2xl font-bold text-gray-900">Training Management</h1>
                  <p className="text-gray-600">Upload and manage MEL learning modules</p>
                 </div>
               </div>
             </div>

             {/* Upload Section */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Training Module</h3>
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
                  isDragging ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400",
                  "relative cursor-pointer"
                )}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const files = Array.from(e.dataTransfer.files);
                  handleFileUpload(files);
                }}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileUpload(Array.from(e.target.files))}
                  accept=".pdf,.scorm,.mp4,.zip"
                />
                <Upload className={cn(
                  "w-12 h-12 mx-auto mb-4 transition-transform duration-200",
                  isDragging ? "text-green-600 scale-110" : "text-gray-400",
                  "transform hover:scale-110"
                )} />
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {isDragging ? "Drop files to upload" : "Drop files here or click to upload"}
                </h4>
                <p className="text-gray-600 mb-4">Support for SCORM, PDF, Video, and other formats</p>
                <button 
                  className={cn(
                    "px-6 py-2 rounded-lg font-medium transition-all duration-200",
                    "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg",
                    "transform hover:-translate-y-0.5 active:translate-y-0"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('fileInput').click();
                  }}
                >
                   Choose Files
                 </button>
                {uploadProgress > 0 && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b-lg overflow-hidden">
                    <div 
                      className="h-full bg-green-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
               </div>
             </div>

             {/* Course Creation Form */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Training Module</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Module Title</label>
                   <input 
                     type="text" 
                    value={courseForm.title}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Enter training module title"
                   />
                 </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    value={courseForm.category}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                     <option>Workplace Safety</option>
                     <option>Emergency Procedures</option>
                     <option>PPE Training</option>
                     <option>First Aid</option>
                     <option>Compliance Training</option>
                   </select>
                 </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                   <input 
                     type="number" 
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Enter duration"
                    min="1"
                   />
                 </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                  <select 
                    value={courseForm.difficulty}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                     <option>Beginner</option>
                     <option>Intermediate</option>
                     <option>Advanced</option>
                   </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    rows={4}
                    value={courseForm.description}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter training module description"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
                  <textarea 
                    rows={3}
                    value={courseForm.learningObjectives}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, learningObjectives: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="List the key learning objectives for this training module"
                  />
                 </div>
               </div>
               <div className="flex gap-3 mt-6">
                <button 
                  onClick={handleCreateCourse}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                   Create Module
                 </button>
                <button 
                  onClick={handleSaveAsDraft}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 hover:shadow transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                   Save as Draft
                 </button>
               </div>
             </div>

             {/* Existing Courses */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-gray-900">Existing Training Modules</h3>
                 <div className="flex gap-2">
                  <button 
                    onClick={() => handleFilterChange('all')}
                    className={cn(
                      "px-3 py-1 text-sm rounded-lg transition-all duration-200",
                      courseFilter === 'all' 
                        ? "bg-green-100 text-green-700 shadow-sm" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => handleFilterChange('published')}
                    className={cn(
                      "px-3 py-1 text-sm rounded-lg transition-all duration-200",
                      courseFilter === 'published' 
                        ? "bg-green-100 text-green-700 shadow-sm" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    Published
                  </button>
                  <button 
                    onClick={() => handleFilterChange('drafts')}
                    className={cn(
                      "px-3 py-1 text-sm rounded-lg transition-all duration-200",
                      courseFilter === 'drafts' 
                        ? "bg-yellow-100 text-yellow-700 shadow-sm" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    Drafts
                  </button>
                 </div>
               </div>
               
               <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                       <Shield className="w-5 h-5 text-blue-600" />
                     </div>
                     <div>
                       <h4 className="font-medium text-gray-900">Workplace Safety Fundamentals</h4>
                       <p className="text-sm text-gray-600">2 hours • 156 employees</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Published</span>
                     <button className="p-1 text-gray-400 hover:text-gray-600">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                       </svg>
                     </button>
                   </div>
                 </div>

                 <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                       <Shield className="w-5 h-5 text-green-600" />
                     </div>
                     <div>
                       <h4 className="font-medium text-gray-900">Emergency Procedures Training</h4>
                       <p className="text-sm text-gray-600">2 hours • 89 employees</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Published</span>
                     <button className="p-1 text-gray-400 hover:text-gray-600">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                       </svg>
                     </button>
                   </div>
                 </div>

                 <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                       <Shield className="w-5 h-5 text-orange-600" />
                     </div>
                     <div>
                       <h4 className="font-medium text-gray-900">PPE Equipment Training</h4>
                       <p className="text-sm text-gray-600">1.5 hours • Draft</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">Draft</span>
                     <button className="p-1 text-gray-400 hover:text-gray-600">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                       </svg>
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         );
 
       case 'webinars':
         return <WebinarManagement />;
 
       case 'schedule':
         return <CalendarManagement />;
 
       case 'announcements':
         return <AnnouncementManagement />;

       case 'users':
         return <UserManagement />;
 
       case 'reports':
         return <AdminReports />;
 
      case 'feedback':
        return <AdminFeedbackReports />;

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
                  <p className="text-gray-600">Configure platform settings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                      <input 
                        type="text" 
                        defaultValue="DAI Global" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                      <input 
                        type="email" 
                        defaultValue="support@daiglobal.com" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <Button className="w-full">Save Settings</Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500">Require 2FA for all users</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Session Timeout</p>
                        <p className="text-xs text-gray-500">Auto logout after inactivity</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Database Management</h1>
                  <p className="text-gray-600">Monitor and manage database</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-600">Total Records</p>
                  <p className="text-2xl font-bold text-blue-900">1,234,567</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-600">Database Size</p>
                  <p className="text-2xl font-bold text-green-900">2.4 GB</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-purple-600">Last Backup</p>
                  <p className="text-2xl font-bold text-purple-900">2h ago</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-orange-600">Connections</p>
                  <p className="text-2xl font-bold text-orange-900">45</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup & Restore</h3>
                  <Button className="w-full mb-2" variant="outline">Create Backup Now</Button>
                  <Button className="w-full" variant="outline">Restore from Backup</Button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Operations</h3>
                  <Button className="w-full mb-2" variant="outline">Optimize Tables</Button>
                  <Button className="w-full" variant="outline">View Query Logs</Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'logs':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
                  <p className="text-gray-600">Monitor system events and errors</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-red-600">Errors</p>
                  <p className="text-2xl font-bold text-red-900">12</p>
                  <p className="text-xs text-red-600 mt-1">Last 24 hours</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-600">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-900">47</p>
                  <p className="text-xs text-yellow-600 mt-1">Last 24 hours</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-600">Info</p>
                  <p className="text-2xl font-bold text-blue-900">1,234</p>
                  <p className="text-xs text-blue-600 mt-1">Last 24 hours</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-600">Success</p>
                  <p className="text-2xl font-bold text-green-900">5,678</p>
                  <p className="text-xs text-green-600 mt-1">Last 24 hours</p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Recent Log Entries</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">ERROR</span>
                          <span className="text-xs text-gray-500">2024-01-15 14:32:15</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Database connection timeout</p>
                        <p className="text-xs text-gray-600 mt-1">Connection timed out after 30 seconds</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">WARNING</span>
                          <span className="text-xs text-gray-500">2024-01-15 14:28:42</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">High memory usage detected</p>
                        <p className="text-xs text-gray-600 mt-1">Memory usage at 87%</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">SUCCESS</span>
                          <span className="text-xs text-gray-500">2024-01-15 14:20:05</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">Backup completed successfully</p>
                        <p className="text-xs text-gray-600 mt-1">Saved to: /backups/backup_20240115.sql</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Section</h3>
              <p className="text-gray-600">Select a section from the sidebar to get started</p>
            </div>
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
          success: {
            iconTheme: {
              primary: '#3B82F6',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#3B82F6',
              secondary: '#fff',
            },
          },
        }}
      />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                <h1 className="text-xl font-semibold text-gray-900">DAI Global Admin Portal</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {adminSections.map((section) => {
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
    </div>
  );
};

export { AdminPortal };
