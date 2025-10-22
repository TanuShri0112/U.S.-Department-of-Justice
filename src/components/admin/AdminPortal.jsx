import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Video, Calendar, Bell, Users, BarChart2, ClipboardCheck,
  Shield, CalendarDays
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
import { useAdminPortal } from '@/contexts/AdminPortalContext';

// Import admin page components
import WebinarManagement from '../../pages/admin/WebinarManagement';
import CalendarManagement from '../../pages/admin/CalendarManagement';
import AnnouncementManagement from '../../pages/admin/AnnouncementManagement';
import UserManagement from '../../pages/admin/UserManagement';
import AdminReports from '../../pages/admin/AdminReports';
import AdminEvents from '../../pages/admin/AdminEvents';
import AdminFeedbackReports from '../../pages/admin/AdminFeedbackReports';

const AdminPortal = ({ onToggle }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [courseForm, setCourseForm] = useState({
    title: '',
    category: 'Law Enforcement Training',
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
    activeCourses: 24,
    scheduledWebinars: 8,
    pendingReports: 12,
    courseCompletions: 847,
    activeSessions: 156,
    newRegistrations: 89,
    supportTickets: 23,
    systemUptime: 94,
    avgLoadTime: 4.2,
    userSatisfaction: 87
  });
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showActionFeedback, setShowActionFeedback] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const { isAdminPortalEnabled, setIsAdminPortalEnabled } = useAdminPortal();

  const adminSections = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'courses', label: 'Upload Courses', icon: Upload },
    { id: 'webinars', label: 'Webinars', icon: Video },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'events', label: 'Events', icon: CalendarDays },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'feedback', label: 'Feedback Reports', icon: ClipboardCheck },
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
      
      // Update metrics
      setMetrics(prev => ({
        ...prev,
        activeCourses: prev.activeCourses + 1
      }));

      // Reset form
      setCourseForm({
        title: '',
        category: 'Law Enforcement Training',
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
    // Removed loading toast to prevent system status notifications
    // const loadingToast = toast.loading(`Loading ${sectionId} section...`);
    
    // Simulate loading state
    setTimeout(() => {
    setActiveSection(sectionId);
      
      // Update metrics if returning to overview
      if (sectionId === 'overview') {
        setMetrics(prev => ({
          ...prev,
          totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
          activeCourses: prev.activeCourses + Math.floor(Math.random() * 2),
          scheduledWebinars: prev.scheduledWebinars + Math.floor(Math.random() * 2),
          pendingReports: Math.max(0, prev.pendingReports + Math.floor(Math.random() * 3 - 1))
        }));
      }

      // Removed toast messages to prevent system status notifications
      // toast.success(messages[sectionId], { id: loadingToast });
    }, 800);
  };

  const renderContent = () => {
    switch (activeSection) {
       case 'overview':
         return (
           <div className="space-y-6">
             {/* Main Stats Cards */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                   <BarChart2 className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                   <h1 className="text-2xl font-bold text-gray-900">Overview Summary</h1>
                   <p className="text-gray-600">Dashboard analytics and key metrics</p>
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="bg-blue-50 rounded-lg p-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-sm font-medium text-blue-600">Total Users</p>
                      <p className="text-2xl font-bold text-blue-900">{metrics.totalUsers.toLocaleString()}</p>
                      <p className="text-xs text-blue-600 mt-1">+{Math.floor(metrics.totalUsers * 0.012)}% this month</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Active Courses</p>
                      <p className="text-2xl font-bold text-green-900">{metrics.activeCourses}</p>
                      <p className="text-xs text-green-600 mt-1">{Math.ceil(metrics.activeCourses * 0.12)} new this week</p>
                    </div>
                    <Upload className="w-8 h-8 text-green-500 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Scheduled Webinars</p>
                      <p className="text-2xl font-bold text-purple-900">{metrics.scheduledWebinars}</p>
                      <p className="text-xs text-purple-600 mt-1">{Math.ceil(metrics.scheduledWebinars * 0.25)} this week</p>
                    </div>
                    <Video className="w-8 h-8 text-purple-500 transform transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4 group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Pending Reports</p>
                      <p className="text-2xl font-bold text-orange-900">{metrics.pendingReports}</p>
                      <p className="text-xs text-orange-600 mt-1">Due this week</p>
                     </div>
                     <BarChart2 className="w-8 h-8 text-orange-500" />
                   </div>
                 </div>
                   </div>
                 </div>
                 
             {/* Secondary Stats */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Activity</h3>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600">Course Completions</span>
                     <span className="text-sm font-medium text-gray-900">847</span>
                     </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600">Active Sessions</span>
                     <span className="text-sm font-medium text-gray-900">156</span>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600">New Registrations</span>
                     <span className="text-sm font-medium text-gray-900">89</span>
                 </div>
                   <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-600">Support Tickets</span>
                     <span className="text-sm font-medium text-gray-900">23</span>
                   </div>
                   </div>
                 </div>
                 
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                 <div className="space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                     <div className="flex-1">
                       <p className="text-sm text-gray-900">New course "Advanced Training" uploaded</p>
                       <p className="text-xs text-gray-500">2 hours ago</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                     <div className="flex-1">
                       <p className="text-sm text-gray-900">Webinar "Safety Protocols" scheduled</p>
                       <p className="text-xs text-gray-500">4 hours ago</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                     <div className="flex-1">
                       <p className="text-sm text-gray-900">Monthly report generated</p>
                       <p className="text-xs text-gray-500">6 hours ago</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                     <div className="flex-1">
                       <p className="text-sm text-gray-900">15 new users registered</p>
                       <p className="text-xs text-gray-500">8 hours ago</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Performance Metrics */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="text-center">
                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                     <span className="text-xl font-bold text-blue-600">94%</span>
                   </div>
                   <p className="text-sm font-medium text-gray-900">System Uptime</p>
                   <p className="text-xs text-gray-500">Last 30 days</p>
                 </div>
                 <div className="text-center">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                     <span className="text-xl font-bold text-green-600">4.2s</span>
                   </div>
                   <p className="text-sm font-medium text-gray-900">Avg Load Time</p>
                   <p className="text-xs text-gray-500">Page response</p>
                 </div>
                 <div className="text-center">
                   <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                     <span className="text-xl font-bold text-purple-600">87%</span>
                   </div>
                   <p className="text-sm font-medium text-gray-900">User Satisfaction</p>
                   <p className="text-xs text-gray-500">Recent surveys</p>
                 </div>
               </div>
             </div>

             {/* Quick Actions */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => {
                    setActiveSection('courses');
                    // Removed toast messages to prevent system status notifications
                    // const loadingToast = toast.loading('Preparing course upload...');
                    // setTimeout(() => {
                    //   toast.success('Ready to upload new course', { id: loadingToast });
                    // }, 1000);
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  <Upload className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Upload Course</span>
                 </button>
                <button 
                  onClick={() => {
                    setActiveSection('webinars');
                    // Removed toast messages to prevent system status notifications
                    // const loadingToast = toast.loading('Opening webinar scheduler...');
                    // setTimeout(() => {
                    //   toast.success('Ready to schedule webinar', { id: loadingToast });
                    // }, 1000);
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  <Video className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Schedule Webinar</span>
                 </button>
                <button 
                  onClick={() => {
                    setActiveSection('announcements');
                    // Removed toast messages to prevent system status notifications
                    // const loadingToast = toast.loading('Opening announcement creator...');
                    // setTimeout(() => {
                    //   toast.success('Ready to create announcement', { id: loadingToast });
                    // }, 1000);
                  }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95"
                >
                  <Bell className="w-6 h-6 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Send Announcement</span>
                 </button>
                <button 
                  onClick={() => {
                    setActiveSection('reports');
                    // Removed toast messages to prevent system status notifications
                    // const loadingToast = toast.loading('Preparing report generator...');
                    // setTimeout(() => {
                    //   toast.success('Ready to generate reports', { id: loadingToast });
                    // }, 1000);
                  }}
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
                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                   <Upload className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                   <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
                   <p className="text-gray-600">Upload, manage, and organize training courses</p>
                 </div>
               </div>
             </div>

             {/* Upload Section */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Course</h3>
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400",
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
                  isDragging ? "text-blue-500 scale-110" : "text-gray-400",
                  "transform hover:scale-110"
                )} />
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {isDragging ? "Drop files to upload" : "Drop files here or click to upload"}
                </h4>
                <p className="text-gray-600 mb-4">Support for SCORM, PDF, Video, and other formats</p>
                <button 
                  className={cn(
                    "px-6 py-2 rounded-lg font-medium transition-all duration-200",
                    "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg",
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
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
               </div>
             </div>

             {/* Course Creation Form */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Course</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                   <input 
                     type="text" 
                    value={courseForm.title}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Enter course title"
                   />
                 </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    value={courseForm.category}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                     <option>Law Enforcement Training</option>
                     <option>Educator Training</option>
                     <option>Youth Advocacy Training</option>
                     <option>General Training</option>
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
                    placeholder="Enter course description"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
                  <textarea 
                    rows={3}
                    value={courseForm.learningObjectives}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, learningObjectives: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="List the key learning objectives for this course"
                  />
                 </div>
               </div>
               <div className="flex gap-3 mt-6">
                <button 
                  onClick={handleCreateCourse}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                   Create Course
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
                 <h3 className="text-lg font-semibold text-gray-900">Existing Courses</h3>
                 <div className="flex gap-2">
                  <button 
                    onClick={() => handleFilterChange('all')}
                    className={cn(
                      "px-3 py-1 text-sm rounded-lg transition-all duration-200",
                      courseFilter === 'all' 
                        ? "bg-blue-100 text-blue-700 shadow-sm" 
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
                       <Upload className="w-5 h-5 text-blue-600" />
                     </div>
                     <div>
                       <h4 className="font-medium text-gray-900">Law Enforcement Fundamentals</h4>
                       <p className="text-sm text-gray-600">12 hours • 156 students</p>
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
                       <Upload className="w-5 h-5 text-green-600" />
                     </div>
                     <div>
                       <h4 className="font-medium text-gray-900">Educator Training Program</h4>
                       <p className="text-sm text-gray-600">8 hours • 89 students</p>
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
                       <Upload className="w-5 h-5 text-orange-600" />
                     </div>
                     <div>
                       <h4 className="font-medium text-gray-900">Youth Advocacy Workshop</h4>
                       <p className="text-sm text-gray-600">6 hours • Draft</p>
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

             {/* Course Analytics */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="text-center">
                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                     <span className="text-xl font-bold text-blue-600">24</span>
                   </div>
                   <p className="text-sm font-medium text-gray-900">Total Courses</p>
                   <p className="text-xs text-gray-500">3 new this month</p>
                 </div>
                 <div className="text-center">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                     <span className="text-xl font-bold text-green-600">847</span>
                   </div>
                   <p className="text-sm font-medium text-gray-900">Total Completions</p>
                   <p className="text-xs text-gray-500">+15% this month</p>
                 </div>
                 <div className="text-center">
                   <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                     <span className="text-xl font-bold text-purple-600">4.2</span>
                   </div>
                   <p className="text-sm font-medium text-gray-900">Avg Rating</p>
                   <p className="text-xs text-gray-500">Based on 234 reviews</p>
                 </div>
               </div>
             </div>
           </div>
         );
 
       case 'webinars':
         return <WebinarManagement />;
 
       case 'schedule':
         return <CalendarManagement />;
 
      case 'events':
        return <AdminEvents />;

      case 'announcements':
         return <AnnouncementManagement />;

       case 'users':
         return <UserManagement />;
 
       case 'reports':
         return <AdminReports />;
 
       case 'feedback':
         return <AdminFeedbackReports />;
 
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
                <Shield className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Admin Portal</h1>
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
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:text-gray-900"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5",
                      activeSection === section.id ? "text-blue-600" : "text-gray-500"
                    )} />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Admin Portal Toggle at Bottom */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-3 py-2 border border-blue-200 hover:bg-blue-100 transition-colors">
              <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium text-blue-700 flex-1">Admin Portal</span>
              <Switch
                checked={isAdminPortalEnabled}
                onCheckedChange={setIsAdminPortalEnabled}
                className="scale-75"
              />
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
