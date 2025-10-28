import React, { useState } from 'react';
import { Button } from './button';
import { useLanguage } from '@/contexts/LanguageContext';

const TrainingSessions = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { currentLanguage } = useLanguage();

  const upcomingSessions = [
    {
      title: currentLanguage === 'en' ? "Class 1" : "Klasse 1",
      tag: currentLanguage === 'en' ? "Basic Training" : "Grundausbildung",
      description: currentLanguage === 'en' 
        ? "Introduction to Basic Training Standards and Procedures" 
        : "Einführung in die Grundausbildungsstandards und -verfahren",
      date: "Wed, Jun 12",
      time: "10:00 AM",
      duration: currentLanguage === 'en' ? "1 hour" : "1 Stunde",
      instructor: "Sarah Thompson",
      participants: "0/25"
    },
    {
      title: currentLanguage === 'en' ? "Class 2" : "Klasse 2",
      tag: currentLanguage === 'en' ? "Advanced Training" : "Fortgeschrittene Ausbildung",
      description: currentLanguage === 'en'
        ? "Best Practices for Advanced Training Methods"
        : "Best Practices für fortgeschrittene Trainingsmethoden",
      date: "Sat, Jun 15",
      time: "2:00 PM",
      duration: currentLanguage === 'en' ? "2 hours" : "2 Stunden",
      instructor: "Michael Chen",
      participants: "0/30"
    }
  ];

  const completedSessions = []; // This will be populated with completed sessions data

  const renderSession = (session) => (
    <div key={session.title} className="bg-white rounded-lg p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{session.title}</h3>
          <span className="inline-block bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
            {session.tag}
          </span>
          <p className="text-gray-600 mt-3 mb-4 text-sm leading-relaxed">{session.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-gray-500 mb-1">
                {currentLanguage === 'en' ? 'Date & Time' : 'Datum & Uhrzeit'}
              </p>
              <p className="font-medium text-gray-900">{session.date}</p>
              <p className="font-medium text-gray-900">{session.time}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">
                {currentLanguage === 'en' ? 'Duration' : 'Dauer'}
              </p>
              <p className="font-medium text-gray-900">{session.duration}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">
                {currentLanguage === 'en' ? 'Instructor' : 'Ausbilder'}
              </p>
              <p className="font-medium text-gray-900">{session.instructor}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">
                {currentLanguage === 'en' ? 'Participants' : 'Teilnehmer'}
              </p>
              <p className="font-medium text-gray-900">{session.participants}</p>
            </div>
          </div>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow transition-all ml-6"
        >
          {currentLanguage === 'en' ? 'Join Session' : 'Sitzung beitreten'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 border-2 border-green-600 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 10L20 15L15 20M4 4V20M4 12H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="text-2xl font-bold text-gray-900">
          {currentLanguage === 'en' ? 'Training Sessions' : 'Trainingseinheiten'}
        </h2>
      </div>

      <div className="flex space-x-2 mb-8">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
            activeTab === 'upcoming'
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {currentLanguage === 'en' ? 'Upcoming Sessions' : 'Kommende Sitzungen'}
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
            activeTab === 'completed'
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {currentLanguage === 'en' ? 'Completed Sessions' : 'Abgeschlossene Sitzungen'}
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'upcoming' ? (
          upcomingSessions.length > 0 ? (
            upcomingSessions.map(renderSession)
          ) : (
            <p className="text-gray-500 text-center py-8">
              {currentLanguage === 'en' ? 'No upcoming sessions' : 'Keine kommenden Sitzungen'}
            </p>
          )
        ) : (
          completedSessions.length > 0 ? (
            completedSessions.map(renderSession)
          ) : (
            <p className="text-gray-500 text-center py-8">
              {currentLanguage === 'en' ? 'No completed sessions' : 'Keine abgeschlossenen Sitzungen'}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default TrainingSessions;