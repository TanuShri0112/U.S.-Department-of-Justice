import React, { useState } from 'react';
import { 
  Video, 
  Calendar, 
  Users, 
  Clock, 
  Play, 
  Edit, 
  Trash2, 
  Plus, 
  BarChart3, 
  TrendingUp, 
  Star, 
  User, 
  X 
} from 'lucide-react';

const WebinarManagement = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
    if (selectedWebinar) {
      // Update existing webinar
      setWebinars(webinars.map(w => 
        w.id === selectedWebinar.id 
          ? { 
              ...w, 
              ...newWebinar,
              currentParticipants: w.currentParticipants // Preserve current participants
            }
          : w
      ));
      setSelectedWebinar(null);
    } else {
      // Create new webinar
      const webinar = {
        ...newWebinar,
        id: webinars.length + 1,
        currentParticipants: 0,
        status: 'Scheduled'
      };
      setWebinars([...webinars, webinar]);
    }

    // Reset form
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
    // Check if webinar can be started
    const webinar = webinars.find(w => w.id === id);
    const webinarDate = new Date(`${webinar.date} ${webinar.time}`);
    const now = new Date();
    const timeDiff = Math.abs(webinarDate - now) / (1000 * 60); // difference in minutes

    if (timeDiff > 30) {
      alert('Webinar can only be started within 30 minutes of scheduled time.');
      return;
    }

    // Start the webinar
    setWebinars(webinars.map(w => 
      w.id === id ? { ...w, status: 'Live' } : w
    ));

    // Simulate webinar start
    alert(`Webinar "${webinar.title}" is now live! Starting video conference...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transform transition-all duration-200 hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center transform transition-transform duration-200 hover:scale-105 hover:rotate-3">
              <Video className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Webinar Management
              </h1>
              <p className="text-gray-600 mt-1 text-lg">Schedule, manage, and track webinar sessions</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1 flex items-center gap-3 font-medium"
          >
            <Plus className="w-5 h-5" />
            Schedule Webinar
          </button>
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transform transition-all duration-200 hover:shadow-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          Webinar Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {webinars.length}
              </span>
            </div>
            <p className="text-base font-semibold text-gray-900 text-center">Scheduled</p>
            <p className="text-sm text-gray-600 text-center mt-1">This month</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                {webinars.reduce((sum, w) => sum + w.currentParticipants, 0)}
              </span>
            </div>
            <p className="text-base font-semibold text-gray-900 text-center">Total Attendees</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-600">+23% this month</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                89%
              </span>
            </div>
            <p className="text-base font-semibold text-gray-900 text-center">Attendance Rate</p>
            <p className="text-sm text-gray-600 text-center mt-1">Average</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <div className="text-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  4.5
                </span>
                <div className="flex items-center justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-yellow-200 fill-current'}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-base font-semibold text-gray-900 text-center">Avg Rating</p>
            <p className="text-sm text-gray-600 text-center mt-1">Based on 89 reviews</p>
          </div>
        </div>
      </div>

      {/* Webinars List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transform transition-all duration-200 hover:shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-600" />
              Upcoming Webinars
            </h3>
            <p className="text-gray-600 mt-1">Manage your scheduled webinar sessions</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-200 ${
                activeFilter === 'all' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Sessions
            </button>
            <button 
              onClick={() => setActiveFilter('thisWeek')}
              className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-200 ${
                activeFilter === 'thisWeek' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              This Week
            </button>
            <button 
              onClick={() => setActiveFilter('thisMonth')}
              className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-200 ${
                activeFilter === 'thisMonth' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              This Month
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {webinars
            .filter(webinar => {
              if (activeFilter === 'all') return true;
              
              const webinarDate = new Date(webinar.date);
              const today = new Date();
              const oneWeek = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
              const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
              
              if (activeFilter === 'thisWeek') {
                return webinarDate >= oneWeek && webinarDate <= today;
              }
              
              if (activeFilter === 'thisMonth') {
                return webinarDate >= firstDayOfMonth && webinarDate <= today;
              }
              
              return true;
            })
            .map((webinar) => (
            <div 
              key={webinar.id} 
              className="group bg-white border border-gray-200 rounded-xl p-6 transform transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-purple-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center transform transition-transform duration-200 group-hover:rotate-6">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {webinar.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{webinar.date} at {webinar.time}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  webinar.status === 'Live' 
                    ? 'bg-red-100 text-red-700 animate-pulse' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {webinar.status}
                </span>
              </div>
              
              <div className="flex items-center gap-6 mb-4 px-4 py-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {webinar.currentParticipants}/{webinar.maxParticipants} participants
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{webinar.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{webinar.instructor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {webinar.category}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartWebinar(webinar.id)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                    title="Start Webinar"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedWebinar(webinar);
                      setNewWebinar({
                        title: webinar.title,
                        instructor: webinar.instructor,
                        date: webinar.date,
                        time: webinar.time,
                        duration: webinar.duration,
                        maxParticipants: webinar.maxParticipants,
                        category: webinar.category,
                        description: webinar.description
                      });
                      setIsCreateModalOpen(true);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    title="Edit Webinar"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteWebinar(webinar.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Delete Webinar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Webinar Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {selectedWebinar ? 'Edit Webinar' : 'Schedule New Webinar'}
                  </h3>
                  <p className="text-gray-600">Fill in the details for your webinar session</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Webinar Title</label>
                  <input 
                    type="text" 
                    value={newWebinar.title}
                    onChange={(e) => setNewWebinar({...newWebinar, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Enter webinar title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                  <select 
                    value={newWebinar.instructor}
                    onChange={(e) => setNewWebinar({...newWebinar, instructor: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  >
                    <option value="">Select Instructor</option>
                    <option>Dr. Sarah Johnson</option>
                    <option>Prof. Michael Chen</option>
                    <option>Dr. Lisa Rodriguez</option>
                    <option>Capt. David Wilson</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    value={newWebinar.category}
                    onChange={(e) => setNewWebinar({...newWebinar, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  >
                    <option>Law Enforcement</option>
                    <option>Education</option>
                    <option>Youth Advocacy</option>
                    <option>General Training</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input 
                      type="date" 
                      value={newWebinar.date}
                      onChange={(e) => setNewWebinar({...newWebinar, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input 
                      type="time" 
                      value={newWebinar.time}
                      onChange={(e) => setNewWebinar({...newWebinar, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <select 
                      value={newWebinar.duration}
                      onChange={(e) => setNewWebinar({...newWebinar, duration: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    >
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={90}>1.5 hours</option>
                      <option value={120}>2 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                    <input 
                      type="number" 
                      value={newWebinar.maxParticipants}
                      onChange={(e) => setNewWebinar({...newWebinar, maxParticipants: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Enter max participants"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  rows={4}
                  value={newWebinar.description}
                  onChange={(e) => setNewWebinar({...newWebinar, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  placeholder="Enter webinar description"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateWebinar}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1 font-medium"
              >
                {selectedWebinar ? 'Update Webinar' : 'Schedule Webinar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebinarManagement;
