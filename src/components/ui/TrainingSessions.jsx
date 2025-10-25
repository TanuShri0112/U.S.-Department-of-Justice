import React, { useState } from 'react';
import { Button } from './button';

const TrainingSessions = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingSessions = [
    {
      title: "Basics in Tourism - Module 1",
      tag: "Child Protection",
      description: "Introduction to Child Protection Standards in Travel & Tourism",
      date: "Wed, Jun 12",
      time: "10:00 AM",
      duration: "1 hour",
      instructor: "Sarah Thompson",
      participants: "0/25"
    },
    {
      title: "Responsible Tourism Practices",
      tag: "Tourism Ethics",
      description: "Best Practices for Sustainable and Ethical Tourism",
      date: "Sat, Jun 15",
      time: "2:00 PM",
      duration: "2 hours",
      instructor: "Michael Chen",
      participants: "0/30"
    }
  ];

  const completedSessions = []; // This will be populated with completed sessions data

  const renderSession = (session) => (
    <div key={session.title} className="bg-white rounded-lg p-6 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{session.title}</h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {session.tag}
          </span>
        </div>
        <Button variant="primary">Join Session</Button>
      </div>
      <p className="text-gray-600 mb-4">{session.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Date & Time</p>
          <p>{session.date} {session.time}</p>
        </div>
        <div>
          <p className="text-gray-500">Duration</p>
          <p>{session.duration}</p>
        </div>
        <div>
          <p className="text-gray-500">Instructor</p>
          <p>{session.instructor}</p>
        </div>
        <div>
          <p className="text-gray-500">Participants</p>
          <p>{session.participants}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 10L20 15L15 20M4 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="text-2xl font-bold">Training Sessions</h2>
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Upcoming Sessions
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeTab === 'completed'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Completed Sessions
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'upcoming' ? (
          upcomingSessions.length > 0 ? (
            upcomingSessions.map(renderSession)
          ) : (
            <p className="text-gray-500 text-center py-8">No upcoming sessions</p>
          )
        ) : (
          completedSessions.length > 0 ? (
            completedSessions.map(renderSession)
          ) : (
            <p className="text-gray-500 text-center py-8">No completed sessions</p>
          )
        )}
      </div>
    </div>
  );
};

export default TrainingSessions;
