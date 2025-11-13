import React, { useMemo } from 'react';
import { Button } from './button';
import { useLanguage } from '@/contexts/LanguageContext';

const BASE_COURSES = [
  {
    title: {
      en: 'Course 1: Digital Safety Essentials',
      es: 'Curso 1: Fundamentos de seguridad digital',
    },
    progress: 75,
    nextLesson: {
      en: 'Module 2: Suspicious Emails',
      es: 'Módulo 2: Correos sospechosos',
    },
    dueDate: 'Nov 15, 2025',
    thumbnail: '/assets/course-1.png',
  },
  {
    title: {
      en: 'Class 2: Data Protection & GDPR',
      es: 'Clase 2: Protección de datos y RGPD',
    },
    progress: 45,
    nextLesson: {
      en: 'Module 3: Practical Applications',
      es: 'Módulo 3: Aplicaciones prácticas',
    },
    dueDate: 'Nov 20, 2025',
    thumbnail: '/assets/course-2.png',
  },
  {
    title: {
      en: 'Course 3: Secure Workplace Practices',
      es: 'Curso 3: Prácticas seguras en el trabajo digital',
    },
    progress: 30,
    nextLesson: {
      en: 'Module 1: Fundamentals',
      es: 'Módulo 1: Fundamentos',
    },
    dueDate: 'Nov 25, 2025',
    thumbnail: '/assets/course-3.png',
  },
];

const copy = {
  en: {
    heading: 'Ongoing Courses',
    progress: 'Progress',
    nextLesson: 'Next Lesson',
    dueDate: 'Due Date',
    cta: 'Continue Learning',
  },
  es: {
    heading: 'Cursos en curso',
    progress: 'Progreso',
    nextLesson: 'Próxima lección',
    dueDate: 'Fecha límite',
    cta: 'Continuar aprendiendo',
  },
};

const localize = (value, language) => {
  if (typeof value === 'string') {
    return value;
  }
  return value[language] ?? value.en;
};

const OngoingCourses = () => {
  const { currentLanguage } = useLanguage();
  const t = copy[currentLanguage] ?? copy.en;

  const courses = useMemo(
    () =>
      BASE_COURSES.map((course) => ({
        ...course,
        title: localize(course.title, currentLanguage),
        nextLesson: localize(course.nextLesson, currentLanguage),
      })),
    [currentLanguage],
  );

  return (
    <div className="p-6 border-2 border-green-600 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <svg
          className="w-6 h-6 text-blue-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-2xl font-bold">{t.heading}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{t.progress}</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">{t.nextLesson}</p>
                <p className="text-sm">{course.nextLesson}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">{t.dueDate}</p>
                <p className="text-sm">{course.dueDate}</p>
              </div>

              <Button variant="outline" className="w-full">
                {t.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingCourses;
