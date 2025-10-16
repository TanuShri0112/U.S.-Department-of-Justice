import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Video, Calendar, Bell, Users, BarChart2, ClipboardCheck,
  Shield, ArrowLeft, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminPortal = ({ onToggle }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  const adminSections = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'courses', label: 'Upload Courses', icon: Upload },
    { id: 'webinars', label: 'Webinars', icon: Video },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'feedback', label: 'Feedback Reports', icon: ClipboardCheck },
  ];

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    // Navigate to the appropriate route
    switch (sectionId) {
      case 'courses':
        navigate('/courses/create');
        break;
      case 'webinars':
        navigate('/webinars');
        break;
      case 'schedule':
        navigate('/calendar');
        break;
      case 'announcements':
        navigate('/announcements');
        break;
      case 'messages':
        navigate('/messages');
        break;
      case 'users':
        navigate('/users');
        break;
      case 'reports':
        navigate('/reports');
        break;
      case 'feedback':
        navigate('/feedback-reports');
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
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Active Courses</p>
                      <p className="text-2xl font-bold text-green-900">24</p>
                    </div>
                    <Upload className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Scheduled Webinars</p>
                      <p className="text-2xl font-bold text-purple-900">8</p>
                    </div>
                    <Video className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Pending Reports</p>
                      <p className="text-2xl font-bold text-orange-900">12</p>
                    </div>
                    <BarChart2 className="w-8 h-8 text-orange-500" />
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
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Admin Portal</h1>
              </div>
            </div>
            
            <Button
              onClick={onToggle}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-4 h-full">
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
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export { AdminPortal };
