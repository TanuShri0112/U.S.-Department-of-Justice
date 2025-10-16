import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Video, Calendar, Bell, Users, BarChart2, ClipboardCheck,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useAdminPortal } from '@/contexts/AdminPortalContext';

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
  const { isAdminPortalEnabled, setIsAdminPortalEnabled } = useAdminPortal();

  const adminSections = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'courses', label: 'Upload Courses', icon: Upload },
    { id: 'webinars', label: 'Webinars', icon: Video },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'feedback', label: 'Feedback Reports', icon: ClipboardCheck },
  ];

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    // Don't navigate - just change the active section to show content inline
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
                       <p className="text-2xl font-bold text-blue-900">1,234</p>
                       <p className="text-xs text-blue-600 mt-1">+12% this month</p>
                     </div>
                     <Users className="w-8 h-8 text-blue-500" />
                   </div>
                 </div>
                 
                 <div className="bg-green-50 rounded-lg p-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-sm font-medium text-green-600">Active Courses</p>
                       <p className="text-2xl font-bold text-green-900">24</p>
                       <p className="text-xs text-green-600 mt-1">3 new this week</p>
                     </div>
                     <Upload className="w-8 h-8 text-green-500" />
                   </div>
                 </div>
                 
                 <div className="bg-purple-50 rounded-lg p-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-sm font-medium text-purple-600">Scheduled Webinars</p>
                       <p className="text-2xl font-bold text-purple-900">8</p>
                       <p className="text-xs text-purple-600 mt-1">2 this week</p>
                     </div>
                     <Video className="w-8 h-8 text-purple-500" />
                   </div>
                 </div>
                 
                 <div className="bg-orange-50 rounded-lg p-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="text-sm font-medium text-orange-600">Pending Reports</p>
                       <p className="text-2xl font-bold text-orange-900">12</p>
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
                 <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                   <Upload className="w-6 h-6 text-blue-600" />
                   <span className="text-sm font-medium text-gray-700">Upload Course</span>
                 </button>
                 <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                   <Video className="w-6 h-6 text-purple-600" />
                   <span className="text-sm font-medium text-gray-700">Schedule Webinar</span>
                 </button>
                 <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                   <Bell className="w-6 h-6 text-orange-600" />
                   <span className="text-sm font-medium text-gray-700">Send Announcement</span>
                 </button>
                 <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
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
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                 <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                 <h4 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</h4>
                 <p className="text-gray-600 mb-4">Support for SCORM, PDF, Video, and other formats</p>
                 <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                   Choose Files
                 </button>
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
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Enter course title"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Enter duration"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                     <option>Beginner</option>
                     <option>Intermediate</option>
                     <option>Advanced</option>
                   </select>
                 </div>
                 <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                   <textarea 
                     rows={4}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="Enter course description"
                   />
                 </div>
                 <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
                   <textarea 
                     rows={3}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     placeholder="List the key learning objectives for this course"
                   />
                 </div>
               </div>
               <div className="flex gap-3 mt-6">
                 <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                   Create Course
                 </button>
                 <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                   Save as Draft
                 </button>
               </div>
             </div>

             {/* Existing Courses */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-gray-900">Existing Courses</h3>
                 <div className="flex gap-2">
                   <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">All</button>
                   <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">Published</button>
                   <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">Drafts</button>
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
