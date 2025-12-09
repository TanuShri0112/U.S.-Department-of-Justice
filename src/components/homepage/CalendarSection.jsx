import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 6));
  const [selectedDate, setSelectedDate] = useState(6);
  
  const events = {
    6: [
      { id: 1, title: 'Tenant + SA region hosting live', time: 'Week 1', type: 'security' },
    ],
    8: [
      { id: 2, title: 'SSO metadata exchange (SAML/OAuth)', time: 'Week 1', type: 'integration' }
    ],
    12: [
      { id: 3, title: 'RBAC roles + MFA enforced', time: 'Week 2', type: 'security' }
    ],
    15: [
      { id: 4, title: 'LMS learning paths draft (F1–F6)', time: 'Week 3', type: 'lms' }
    ],
    18: [
      { id: 5, title: 'Recruitment workflow mapping (F7–F11)', time: 'Week 3', type: 'ats' }
    ],
    22: [
      { id: 6, title: 'POPIA consent + audit log export', time: 'Week 4', type: 'compliance' }
    ],
    26: [
      { id: 7, title: 'Analytics pack (PDF/Excel) ready', time: 'Week 5', type: 'analytics' }
    ],
    30: [
      { id: 8, title: 'Sandbox go-live readiness review', time: 'Week 6', type: 'golive' }
    ]
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(day);
    }
  };

  const getEventTypeStyles = (type) => {
    switch (type) {
      case 'security':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'integration':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'lms':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'ats':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'compliance':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'analytics':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      case 'golive':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  

  const days = getDaysInMonth(currentDate);

  return (
    <Card className="shadow-lg border-0 bg-white overflow-hidden">
      <CardContent className="p-4">
        <div className="bg-blue-50 rounded-2xl p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              {months[currentDate.getMonth()]}, {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 bg-blue-100 hover:bg-blue-200 rounded-lg"
                onClick={handlePreviousMonth}
              >
                <ChevronLeft className="w-4 h-4 text-blue-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 bg-blue-100 hover:bg-blue-200 rounded-lg"
                onClick={handleNextMonth}
              >
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </Button>
            </div>
          </div>


          {/* Calendar Grid */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-xs font-bold text-gray-700 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
                const isSelected = day === selectedDate;
                const isCurrentMonth = day !== null;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    disabled={!isCurrentMonth}
                    className={`
                      w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors
                      ${!isCurrentMonth 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : isToday
                        ? 'bg-blue-600 text-white font-semibold'
                        : isSelected
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events Section */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Events for {selectedDate} {months[currentDate.getMonth()]}
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {events[selectedDate] && events[selectedDate].length > 0 ? (
                events[selectedDate].map((event) => (
                <div
                  key={event.id}
                    className="bg-white rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-shadow"
                >
                    <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800 mb-1">{event.title}</h4>
                      <p className="text-xs text-gray-600">{event.time}</p>
                    </div>
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getEventTypeStyles(event.type)}`}>
                        {event.type}
                    </span>
                  </div>
                </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <CalendarIcon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs">No events scheduled</p>
            </div>
          )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}