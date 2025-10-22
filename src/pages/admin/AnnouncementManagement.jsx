import React, { useState } from 'react';
import { Bell, Send, Edit, Trash2, Plus, Users, Eye, Calendar, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AnnouncementManagement = () => {
  const { t } = useLanguage();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
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

  // Effect to populate form when editing
  React.useEffect(() => {
    if (editingAnnouncement) {
      setNewAnnouncement({
        title: editingAnnouncement.title,
        content: editingAnnouncement.content,
        priority: editingAnnouncement.priority,
        targetAudience: editingAnnouncement.targetAudience,
        category: editingAnnouncement.category
      });
    }
  }, [editingAnnouncement]);

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
    if (editingAnnouncement) {
      // Update existing announcement
      setAnnouncements(announcements.map(a => 
        a.id === editingAnnouncement.id 
          ? { ...a, ...newAnnouncement }
          : a
      ));
      setEditingAnnouncement(null);
    } else {
      // Create new announcement
      const announcement = {
        ...newAnnouncement,
        id: announcements.length + 1,
        status: 'Published',
        publishDate: new Date().toISOString().split('T')[0],
        author: 'Admin',
        views: 0
      };
      setAnnouncements([announcement, ...announcements]);
    }
    
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transform transition-all duration-200 hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl flex items-center justify-center transform transition-transform duration-200 hover:scale-105 hover:rotate-3">
              <Bell className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                {t('announcementManagement')}
              </h1>
              <p className="text-gray-600 mt-1 text-lg">{t('createManageTrackAnnouncements')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const now = new Date();
                setNewAnnouncement(prev => ({
                  ...prev,
                  publishDate: now.toISOString().split('T')[0]
                }));
                setIsCreateModalOpen(true);
              }}
              className="bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1 flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              {t('createAnnouncement')}
            </button>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transform transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            {t('analyticsOverview')}
          </h3>
          <div className="h-6 w-px bg-gray-200"></div>
          <p className="text-gray-600">{t('realTimeAnnouncementMetrics')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Bell className="w-10 h-10 text-orange-600" />
            </div>
            <p className="text-base font-semibold text-gray-900 text-center">{t('totalAnnouncements')}</p>
            <p className="text-3xl font-bold text-center mt-2 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              {announcements.length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Send className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-base font-semibold text-gray-900 text-center">{t('published')}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                {announcements.filter(a => a.status === 'Published').length}
              </p>
              <span className="text-sm text-green-600">{t('active')}</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Eye className="w-10 h-10 text-blue-600" />
            </div>
            <p className="text-base font-semibold text-gray-900 text-center">{t('totalViews')}</p>
            <p className="text-3xl font-bold text-center mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {announcements.reduce((sum, a) => sum + a.views, 0)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Users className="w-10 h-10 text-purple-600" />
            </div>
            <p className="text-base font-semibold text-gray-900 text-center">{t('avgViews')}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {Math.round(announcements.reduce((sum, a) => sum + a.views, 0) / announcements.length) || 0}
              </p>
              <span className="text-sm text-purple-600">{t('perPost')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transform transition-all duration-200 hover:shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              {t('announcements')}
            </h3>
            <p className="text-gray-600 mt-1">{t('manageMonitorAnnouncements')}</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === 'all' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              {t('all')}
            </button>
            <button 
              onClick={() => setActiveFilter('published')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === 'published' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              {t('published')}
            </button>
            <button 
              onClick={() => setActiveFilter('drafts')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === 'drafts' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              {t('drafts')}
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {announcements
            .filter(announcement => {
              if (activeFilter === 'all') return true;
              if (activeFilter === 'published') return announcement.status === 'Published';
              if (activeFilter === 'drafts') return announcement.status === 'Draft';
              return true;
            })
            .map((announcement) => (
            <div 
              key={announcement.id} 
              className="group bg-white border border-gray-200 rounded-xl p-6 transform transition-all duration-200 hover:shadow-lg hover:scale-[1.01] hover:border-orange-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {announcement.title}
                    </h4>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityStyle(announcement.priority)}`}>
                      {t(announcement.priority)}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(announcement.status)}`}>
                      {t(announcement.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {announcement.content}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>
                      {announcement.publishDate}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-400" />
                      </div>
                      {announcement.targetAudience}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </div>
                      {announcement.views} {t('views')}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                        <Bell className="w-4 h-4 text-gray-400" />
                      </div>
                      {announcement.category}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      {t('by')} <span className="font-medium">{announcement.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(announcement.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          announcement.status === 'Published' 
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {announcement.status === 'Published' ? t('unpublish') : t('publish')}
                      </button>
                      <button
                        onClick={() => {
                          setEditingAnnouncement(announcement);
                          setIsCreateModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title={t('editAnnouncement')}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title={t('deleteAnnouncement')}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
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
                <p className="text-sm font-medium text-gray-900">{t(priority.value)} {t('priority')}</p>
                <p className="text-xs text-gray-500">{percentage}% {t('ofTotal')}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Announcement Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                    {editingAnnouncement ? t('editAnnouncement') : t('createNewAnnouncement')}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {editingAnnouncement ? t('updateAnnouncementDetails') : t('createPublishNewAnnouncement')}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingAnnouncement(null);
                  setNewAnnouncement({
                    title: '',
                    content: '',
                    priority: 'Medium',
                    targetAudience: 'All Users',
                    category: 'General'
                  });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('title')}</label>
                <input 
                  type="text" 
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder={t('enterDescriptiveTitle')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('content')}</label>
                <textarea 
                  rows={6}
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder={t('writeAnnouncementContent')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('priority')}</label>
                  <select 
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.icon} {t(priority.value)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('targetAudience')}</label>
                  <select 
                    value={newAnnouncement.targetAudience}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, targetAudience: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  >
                    {targetAudiences.map(audience => (
                      <option key={audience} value={audience}>{audience}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('category')}</label>
                  <select 
                    value={newAnnouncement.category}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingAnnouncement(null);
                    setNewAnnouncement({
                      title: '',
                      content: '',
                      priority: 'Medium',
                      targetAudience: 'All Users',
                      category: 'General'
                    });
                  }}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  {t('cancel')}
                </button>
                <button 
                  onClick={handleCreateAnnouncement}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-xl hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1 font-medium"
                >
                  {editingAnnouncement ? t('updateAnnouncement') : t('publishAnnouncement')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementManagement;
