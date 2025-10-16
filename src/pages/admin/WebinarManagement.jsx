import React, { useState } from 'react';
import { Video, Calendar, Users, Clock, Play, Edit, Trash2, Plus } from 'lucide-react';

const WebinarManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [webinars, setWebinars] = useState([
    {
      id: 1,
      title: "Advanced Law Enforcement Techniques",
      instructor: "Dr. Sarah Johnson",
      date: "2024-01-15",
      time: "14:00",
      duration: 90,
      maxParticipants: 100,
      currentParticipants: 45,
      category: "Law Enforcement",
      status: "Scheduled",
      description: "Comprehensive training on advanced law enforcement techniques and procedures."
    },
    {
      id: 2,
      title: "Educational Technology Integration",
      instructor: "Prof. Michael Chen",
      date: "2024-01-19",
      time: "10:00",
      duration: 60,
      maxParticipants: 50,
      currentParticipants: 23,
      category: "Education",
      status: "Scheduled",
      description: "Learn how to integrate technology effectively in educational settings."
    },
    {
      id: 3,
      title: "Youth Advocacy Best Practices",
      instructor: "Dr. Lisa Rodriguez",
      date: "2024-01-22",
      time: "15:00",
      duration: 75,
      maxParticipants: 75,
      currentParticipants: 67,
      category: "Youth Advocacy",
      status: "Scheduled",
      description: "Best practices for effective youth advocacy and community engagement."
    }
  ]);

  const [newWebinar, setNewWebinar] = useState({
    title: '',
    instructor: '',
    date: '',
    time: '',
    duration: 60,
    maxParticipants: 50,
    category: 'General Training',
    description: ''
  });

  const handleCreateWebinar = () => {
    const webinar = {
      ...newWebinar,
      id: webinars.length + 1,
      currentParticipants: 0,
      status: 'Scheduled'
    };
    setWebinars([...webinars, webinar]);
    setNewWebinar({
      title: '',
      instructor: '',
      date: '',
      time: '',
      duration: 60,
      maxParticipants: 50,
      category: 'General Training',
      description: ''
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteWebinar = (id) => {
    setWebinars(webinars.filter(w => w.id !== id));
  };

  const handleStartWebinar = (id) => {
    // Simulate starting a webinar
    setWebinars(webinars.map(w => 
      w.id === id ? { ...w, status: 'Live' } : w
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Webinar Management</h1>
              <p className="text-gray-600">Schedule, manage, and track webinar sessions</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Schedule Webinar
          </button>
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Webinar Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-purple-600">{webinars.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Scheduled</p>
            <p className="text-xs text-gray-500">This month</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-green-600">
                {webinars.reduce((sum, w) => sum + w.currentParticipants, 0)}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900">Total Attendees</p>
            <p className="text-xs text-gray-500">+23% this month</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-blue-600">89%</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Attendance Rate</p>
            <p className="text-xs text-gray-500">Average</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-orange-600">4.5</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Avg Rating</p>
            <p className="text-xs text-gray-500">Based on 89 reviews</p>
          </div>
        </div>
      </div>

      {/* Webinars List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Webinars</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg">All</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">This Week</button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg">This Month</button>
          </div>
        </div>
        
        <div className="space-y-4">
          {webinars.map((webinar) => (
            <div key={webinar.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{webinar.title}</h4>
                  <p className="text-sm text-gray-600">
                    {webinar.date} at {webinar.time} • {webinar.instructor} • {webinar.currentParticipants}/{webinar.maxParticipants} participants
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  webinar.status === 'Live' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {webinar.status}
                </span>
                <button
                  onClick={() => handleStartWebinar(webinar.id)}
                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                  title="Start Webinar"
                >
                  <Play className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedWebinar(webinar)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Edit Webinar"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteWebinar(webinar.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Webinar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Webinar Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule New Webinar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Webinar Title</label>
                <input 
                  type="text" 
                  value={newWebinar.title}
                  onChange={(e) => setNewWebinar({...newWebinar, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter webinar title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                <select 
                  value={newWebinar.instructor}
                  onChange={(e) => setNewWebinar({...newWebinar, instructor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select Instructor</option>
                  <option>Dr. Sarah Johnson</option>
                  <option>Prof. Michael Chen</option>
                  <option>Dr. Lisa Rodriguez</option>
                  <option>Capt. David Wilson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  value={newWebinar.date}
                  onChange={(e) => setNewWebinar({...newWebinar, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input 
                  type="time" 
                  value={newWebinar.time}
                  onChange={(e) => setNewWebinar({...newWebinar, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <select 
                  value={newWebinar.duration}
                  onChange={(e) => setNewWebinar({...newWebinar, duration: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value={30}>30</option>
                  <option value={60}>60</option>
                  <option value={90}>90</option>
                  <option value={120}>120</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                <input 
                  type="number" 
                  value={newWebinar.maxParticipants}
                  onChange={(e) => setNewWebinar({...newWebinar, maxParticipants: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter max participants"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  value={newWebinar.category}
                  onChange={(e) => setNewWebinar({...newWebinar, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option>Law Enforcement</option>
                  <option>Education</option>
                  <option>Youth Advocacy</option>
                  <option>General Training</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  rows={3}
                  value={newWebinar.description}
                  onChange={(e) => setNewWebinar({...newWebinar, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter webinar description"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleCreateWebinar}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Schedule Webinar
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

export default WebinarManagement;
