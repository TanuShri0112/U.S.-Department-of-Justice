import React, { useState } from 'react';
import { Button } from './button';
import { useLanguage } from '@/contexts/LanguageContext';

const copy = {
  en: {
    title: 'Training Sessions',
    upcoming: 'Upcoming Sessions',
    completed: 'Completed Sessions',
    join: 'Join Session',
    noUpcoming: 'No upcoming sessions',
    noCompleted: 'No completed sessions',
    dateTime: 'Date & Time',
    duration: 'Duration',
    instructor: 'Instructor',
    participants: 'Participants',
  },
  es: {
    title: 'Sesiones de formación',
    upcoming: 'Próximas sesiones',
    completed: 'Sesiones completadas',
    join: 'Unirse a la sesión',
    noUpcoming: 'No hay sesiones próximas',
    noCompleted: 'No hay sesiones completadas',
    dateTime: 'Fecha y hora',
    duration: 'Duración',
    instructor: 'Instructor',
    participants: 'Participantes',
  },
};

const UPCOMING_SESSIONS = [
  {
    title: { en: 'Class 1', es: 'Clase 1' },
    tag: { en: 'Basic Training', es: 'Formación básica' },
    description: {
      en: 'Introduction to training standards and procedures',
      es: 'Introducción a los estándares y procedimientos de formación',
    },
    date: 'Wed, Jun 12',
    time: '10:00 AM',
    duration: { en: '1 hour', es: '1 hora' },
    instructor: 'Sarah Thompson',
    participants: '0/25',
  },
  {
    title: { en: 'Class 2', es: 'Clase 2' },
    tag: { en: 'Advanced Training', es: 'Formación avanzada' },
    description: {
      en: 'Best practices for advanced training methods',
      es: 'Mejores prácticas para metodologías de formación avanzada',
    },
    date: 'Sat, Jun 15',
    time: '2:00 PM',
    duration: { en: '2 hours', es: '2 horas' },
    instructor: 'Michael Chen',
    participants: '0/30',
  },
];

const formatCopy = (value, language) => {
  if (typeof value === 'string') {
    return value;
  }
  return value[language] ?? value.en;
};

const TrainingSessions = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { currentLanguage } = useLanguage();
  const t = copy[currentLanguage] ?? copy.en;

  const completedSessions = []; // This will be populated with completed sessions data

  const renderSession = (session) => (
    <div
      key={formatCopy(session.title, 'en')}
      className="bg-white rounded-lg p-6 mb-4 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {formatCopy(session.title, currentLanguage)}
          </h3>
          <span className="inline-block bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
            {formatCopy(session.tag, currentLanguage)}
          </span>
          <p className="text-gray-600 mt-3 mb-4 text-sm leading-relaxed">
            {formatCopy(session.description, currentLanguage)}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-gray-500 mb-1">
                {t.dateTime}
              </p>
              <p className="font-medium text-gray-900">{session.date}</p>
              <p className="font-medium text-gray-900">{session.time}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">
                {t.duration}
              </p>
              <p className="font-medium text-gray-900">
                {formatCopy(session.duration, currentLanguage)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">
                {t.instructor}
              </p>
              <p className="font-medium text-gray-900">{session.instructor}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">
                {t.participants}
              </p>
              <p className="font-medium text-gray-900">{session.participants}</p>
            </div>
          </div>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow transition-all ml-6"
        >
          {t.join}
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
          {t.title}
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
          {t.upcoming}
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
          {t.completed}
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'upcoming' ? (
          UPCOMING_SESSIONS.length > 0 ? (
            UPCOMING_SESSIONS.map(renderSession)
          ) : (
            <p className="text-gray-500 text-center py-8">
              {t.noUpcoming}
            </p>
          )
        ) : (
          completedSessions.length > 0 ? (
            completedSessions.map(renderSession)
          ) : (
            <p className="text-gray-500 text-center py-8">
              {t.noCompleted}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default TrainingSessions;