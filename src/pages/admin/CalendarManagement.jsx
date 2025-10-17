import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Plus, Edit, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const CalendarManagement = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', or 'day'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: t('principlesAssessmentLearning'),
      date: "2024-01-15",
      time: "09:00",
      duration: 120,
      type: t('training'),
      location: "Conference Room A",
      attendees: 25,
      instructor: "Dr. Maria Rodriguez"
    },
    {
      id: 2,
      title: t('trainingStrategiesFeedback'),
      date: "2024-01-16",
      time: "14:00",
      duration: 60,
      type: t('meeting'),
      location: "Main Conference Room",
      attendees: 12,
      instructor: "Prof. Carlos Mendez"
    },
    {
      id: 3,
      title: t('digitalToolsFormativeAssessment'),
      date: "2024-01-18",
      time: "10:00",
      duration: 90,
      type: t('workshop'),
      location: "Community Center",
      attendees: 30,
      instructor: "Dr. Ana Gutierrez"
    },
    {
      id: 4,
      title: t('designRubricsEvaluationCriteria'),
      date: "2024-01-20",
      time: "11:00",
      duration: 80,
      type: t('assessment'),
      location: "Training Center",
      attendees: 20,
      instructor: "Dr. Luis Fernandez"
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    type: t('training'),
    location: '',
    attendees: 0,
    instructor: ''
  });

  const eventTypes = [
    { value: t('training'), color: 'bg-blue-100 text-blue-700' },
    { value: t('meeting'), color: 'bg-green-100 text-green-700' },
    { value: t('workshop'), color: 'bg-purple-100 text-purple-700' },
    { value: t('webinar'), color: 'bg-orange-100 text-orange-700' },
    { value: t('assessment'), color: 'bg-red-100 text-red-700' }
  ];

  const getWeekDays = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // Start of week (Sunday)
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day.getDate());
    }
    
    return days;
  };

  const getDayEvents = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

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
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...newEvent }
          : event
      ));
      setSelectedEvent(null);
    } else {
      // Create new event
      const event = {
        ...newEvent,
        id: events.length + 1
      };
      setEvents([...events, event]);
    }
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

  // Effect to populate form when editing
  React.useEffect(() => {
    if (selectedEvent) {
      setNewEvent({
        title: selectedEvent.title,
        date: selectedEvent.date,
        time: selectedEvent.time,
        duration: selectedEvent.duration,
        type: selectedEvent.type,
        location: selectedEvent.location,
        attendees: selectedEvent.attendees,
        instructor: selectedEvent.instructor
      });
    }
  }, [selectedEvent]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transform transition-all duration-200 hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center transform transition-transform duration-200 hover:scale-105 hover:rotate-3">
              <Calendar className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t('calendarManagement')}
              </h1>
              <p className="text-gray-600 mt-1 text-lg">{t('scheduleManageEvents')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const now = new Date();
                setCurrentDate(now);
                setViewMode('day');
              }}
              className="px-4 py-2 text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Calendar className="w-4 h-4" />
              {t('today')}
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1 flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              {t('addEvent')}
            </button>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transform transition-all duration-200 hover:shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-white rounded-md transition-all duration-200 text-gray-600 hover:text-blue-600"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-white rounded-md transition-all duration-200 text-gray-600 hover:text-blue-600"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'day' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'week' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'month' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Month
            </button>
          </div>
        </div>

          {/* Calendar Grid */}
          <div className={`grid ${viewMode === 'day' ? 'grid-cols-1' : 'grid-cols-7'} gap-2`}>
            {/* Day Headers */}
            {viewMode !== 'day' && ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 border-b border-gray-100">
                {day}
              </div>
            ))}

            {/* Calendar Content based on view mode */}
            {viewMode === 'month' && days.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const isToday = day === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth() &&
                           currentDate.getFullYear() === new Date().getFullYear();
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-3 border border-gray-200 rounded-lg transition-all duration-200 ${
                    isToday ? 'bg-blue-50 border-blue-200' : 'bg-white hover:border-blue-200'
                  } ${!day ? 'bg-gray-50 border-transparent' : ''}`}
                  onClick={() => day && setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                        {day}
                      </div>
                      <div className="space-y-1.5">
                        {dayEvents.slice(0, 2).map(event => {
                          const eventType = eventTypes.find(t => t.value === event.type);
                          return (
                            <div
                              key={event.id}
                              className={`group text-xs p-2 rounded-lg ${eventType?.color || 'bg-gray-100 text-gray-700'} 
                                hover:shadow-sm transition-all duration-200 cursor-pointer`}
                              title={`${event.title} at ${event.time}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                                setIsCreateModalOpen(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium truncate">{event.title}</span>
                                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  {event.time}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-blue-600 font-medium hover:text-blue-700 cursor-pointer transition-colors">
                            +{dayEvents.length - 2} more events
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {viewMode === 'week' && getWeekDays(currentDate).map((day, index) => {
              const dayDate = new Date(currentDate);
              dayDate.setDate(day);
              const dayEvents = getDayEvents(dayDate);
              const isToday = day === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth() &&
                           currentDate.getFullYear() === new Date().getFullYear();
              
              return (
                <div
                  key={index}
                  className={`min-h-[200px] p-3 border border-gray-200 rounded-lg transition-all duration-200 ${
                    isToday ? 'bg-blue-50 border-blue-200' : 'bg-white hover:border-blue-200'
                  }`}
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(day);
                    setCurrentDate(newDate);
                    setViewMode('day');
                  }}
                >
                  <div className={`text-sm font-medium mb-3 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                    {day}
                  </div>
                  <div className="space-y-2">
                    {dayEvents.map(event => {
                      const eventType = eventTypes.find(t => t.value === event.type);
                      return (
                        <div
                          key={event.id}
                          className={`group p-3 rounded-lg ${eventType?.color || 'bg-gray-100 text-gray-700'} 
                            hover:shadow-sm transition-all duration-200 cursor-pointer`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(event);
                            setIsCreateModalOpen(true);
                          }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {event.time}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.duration}m
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {event.attendees}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {viewMode === 'day' && (() => {
              const dayEvents = getDayEvents(currentDate);
              const isToday = currentDate.getDate() === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth() &&
                           currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div className={`min-h-[600px] p-6 border border-gray-200 rounded-xl transition-all duration-200 ${
                  isToday ? 'bg-blue-50 border-blue-200' : 'bg-white'
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className={`text-2xl font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                        {currentDate.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-gray-600 mt-1">
                        {currentDate.toLocaleDateString('en-US', { year: 'numeric' })}
                      </div>
                    </div>
                    {isToday && (
                      <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        Today
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {dayEvents.map(event => {
                      const eventType = eventTypes.find(t => t.value === event.type);
                      return (
                        <div
                          key={event.id}
                          className={`group p-4 rounded-xl ${eventType?.color || 'bg-gray-100 text-gray-700'} 
                            hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200`}
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsCreateModalOpen(true);
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                              {event.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{event.time}</span>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Edit className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center">
                                <Clock className="w-4 h-4 text-gray-600" />
                              </div>
                              <span>{event.duration} minutes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center">
                                <Users className="w-4 h-4 text-gray-600" />
                              </div>
                              <span>{event.attendees} attendees</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-gray-600" />
                              </div>
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-200/50">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">Instructor:</span>
                              {event.instructor}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {selectedEvent ? 'Edit Event' : 'Create New Event'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {selectedEvent ? 'Update the event details' : 'Schedule a new event'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setSelectedEvent(null);
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
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
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
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1 font-medium"
              >
                {selectedEvent ? 'Update Event' : 'Create Event'}
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
