import React, { useState } from 'react';
import { Bell, Send, Edit, Trash2, Plus, Users, Eye, Calendar } from 'lucide-react';

const AnnouncementManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "New Training Module Available",
      content: "We're excited to announce the launch of our new Advanced Law Enforcement Techniques module. This comprehensive training covers the latest protocols and procedures.",
      priority: "High",
      targetAudience: "All Users",
      status: "Published",
      publishDate: "2024-01-10",
      author: "Admin Team",
      views: 245,
      category: "Training Update"
    },
    {
      id: 2,
      title: "System Maintenance Scheduled",
      content: "Scheduled maintenance will occur on Sunday, January 21st from 2:00 AM to 6:00 AM EST. During this time, the platform will be temporarily unavailable.",
      priority: "Medium",
      targetAudience: "All Users",
      status: "Published",
      publishDate: "2024-01-12",
      author: "IT Department",
      views: 189,
      category: "System Update"
    },
    {
      id: 3,
      title: "Monthly Progress Report Available",
      content: "The December 2023 progress reports are now available for review. Please check your dashboard for detailed analytics and completion statistics.",
      priority: "Low",
      targetAudience: "Instructors",
      status: "Draft",
      publishDate: "2024-01-15",
      author: "Reporting Team",
      views: 0,
      category: "Report"
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'Medium',
    targetAudience: 'All Users',
    category: 'General'
  });

  const priorities = [
    { value: 'High', color: 'bg-red-100 text-red-700', icon: '🔴' },
    { value: 'Medium', color: 'bg-yellow-100 text-yellow-700', icon: '🟡' },
    { value: 'Low', color: 'bg-green-100 text-green-700', icon: '🟢' }
  ];

  const categories = [
    'Training Update',
    'System Update',
    'Report',
    'General',
    'Policy Change',
    'Event'
  ];

  const targetAudiences = [
    'All Users',
    'Instructors',
    'Students',
    'Administrators',
    'Law Enforcement',
    'Educators',
    'Youth Advocates'
  ];

  const handleCreateAnnouncement = () => {
    const announcement = {
      ...newAnnouncement,
      id: announcements.length + 1,
      status: 'Published',
      publishDate: new Date().toISOString().split('T')[0],
      author: 'Admin',
      views: 0
    };
    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({
      title: '',
      content: '',
      priority: 'Medium',
      targetAudience: 'All Users',
      category: 'General'
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const handleToggleStatus = (id) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, status: a.status === 'Published' ? 'Draft' : 'Published' } : a
    ));
  };

  const getPriorityStyle = (priority) => {
    return priorities.find(p => p.value === priority)?.color || 'bg-gray-100 text-gray-700';
  };

  const getStatusStyle = (status) => {
    return status === 'Published' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Announcement Management</h1>
              <p className="text-gray-600">Create, manage, and track platform announcements</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Announcement
          </button>
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcement Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bell className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Total Announcements</p>
            <p className="text-2xl font-bold text-orange-600">{announcements.length}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Published</p>
            <p className="text-2xl font-bold text-green-600">
              {announcements.filter(a => a.status === 'Published').length}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Total Views</p>
            <p className="text-2xl font-bold text-blue-600">
              {announcements.reduce((sum, a) => sum + a.views, 0)}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">Avg Views</p>
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(announcements.reduce((sum, a) => sum + a.views, 0) / announcements.length) || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Announcements</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-lg">All</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">Published</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">Drafts</button>
          </div>
        </div>
        
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityStyle(announcement.priority)}`}>
                      {announcement.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(announcement.status)}`}>
                      {announcement.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {announcement.publishDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {announcement.targetAudience}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {announcement.views} views
                    </div>
                    <span>By {announcement.author}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">{announcement.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleToggleStatus(announcement.id)}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                      announcement.status === 'Published' 
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {announcement.status === 'Published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => {/* Edit functionality */}}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit Announcement"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete Announcement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {priorities.map((priority) => {
            const count = announcements.filter(a => a.priority === priority.value).length;
            const percentage = announcements.length > 0 ? Math.round((count / announcements.length) * 100) : 0;
            return (
              <div key={priority.value} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${priority.color}`}>
                  <span className="text-xl font-bold">{count}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{priority.value} Priority</p>
                <p className="text-xs text-gray-500">{percentage}% of total</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Announcement Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Announcement</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input 
                  type="text" 
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea 
                  rows={6}
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter announcement content"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select 
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.icon} {priority.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                  <select 
                    value={newAnnouncement.targetAudience}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, targetAudience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {targetAudiences.map(audience => (
                      <option key={audience} value={audience}>{audience}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  value={newAnnouncement.category}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleCreateAnnouncement}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Publish Announcement
              </button>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementManagement;
