import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarManagement = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Law Enforcement Training Session",
      date: "2024-01-15",
      time: "09:00",
      duration: 120,
      type: "Training",
      location: "Conference Room A",
      attendees: 25,
      instructor: "Capt. Sarah Johnson"
    },
    {
      id: 2,
      title: "Monthly Team Meeting",
      date: "2024-01-16",
      time: "14:00",
      duration: 60,
      type: "Meeting",
      location: "Main Conference Room",
      attendees: 12,
      instructor: "Chief Michael Davis"
    },
    {
      id: 3,
      title: "Youth Advocacy Workshop",
      date: "2024-01-18",
      time: "10:00",
      duration: 90,
      type: "Workshop",
      location: "Community Center",
      attendees: 30,
      instructor: "Dr. Lisa Rodriguez"
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    type: 'Training',
    location: '',
    attendees: 0,
    instructor: ''
  });

  const eventTypes = [
    { value: 'Training', color: 'bg-blue-100 text-blue-700' },
    { value: 'Meeting', color: 'bg-green-100 text-green-700' },
    { value: 'Workshop', color: 'bg-purple-100 text-purple-700' },
    { value: 'Webinar', color: 'bg-orange-100 text-orange-700' },
    { value: 'Assessment', color: 'bg-red-100 text-red-700' }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const handleCreateEvent = () => {
    const event = {
      ...newEvent,
      id: events.length + 1
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      duration: 60,
      type: 'Training',
      location: '',
      attendees: 0,
      instructor: ''
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Calendar Management</h1>
              <p className="text-gray-600">Schedule and manage training sessions, meetings, and events</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isToday = day === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth() &&
                           currentDate.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border border-gray-200 ${
                  isToday ? 'bg-blue-50' : 'bg-white'
                } ${!day ? 'bg-gray-50' : ''}`}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => {
                        const eventType = eventTypes.find(t => t.value === event.type);
                        return (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded ${eventType?.color || 'bg-gray-100 text-gray-700'} truncate`}
                            title={`${event.title} at ${event.time}`}
                          >
                            {event.title}
                          </div>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {events.map((event) => {
            const eventType = eventTypes.find(t => t.value === event.type);
            return (
              <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${eventType?.color || 'bg-gray-100'}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {event.date} at {event.time} • {event.location} • {event.attendees} attendees
                    </p>
                    <p className="text-xs text-gray-500">Instructor: {event.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${eventType?.color || 'bg-gray-100 text-gray-700'}`}>
                    {event.type}
                  </span>
                  <button
                    onClick={() => {/* Edit functionality */}}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit Event"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {eventTypes.map((type) => {
            const count = events.filter(e => e.type === type.value).length;
            return (
              <div key={type.value} className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${type.color}`}>
                  <span className="text-xl font-bold">{count}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{type.value}s</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Event</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input 
                  type="text" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select 
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.value}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input 
                  type="time" 
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input 
                  type="number" 
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({...newEvent, duration: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  type="text" 
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Attendees</label>
                <input 
                  type="number" 
                  value={newEvent.attendees}
                  onChange={(e) => setNewEvent({...newEvent, attendees: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructor/Host</label>
                <input 
                  type="text" 
                  value={newEvent.instructor}
                  onChange={(e) => setNewEvent({...newEvent, instructor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter instructor name"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleCreateEvent}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Event
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

export default CalendarManagement;
