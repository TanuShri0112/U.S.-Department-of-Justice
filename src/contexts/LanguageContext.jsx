import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const LanguageContext = createContext();

const DEFAULT_LANGUAGE = 'uk';
const SUPPORTED_LANGUAGES = [DEFAULT_LANGUAGE, 'en'];
const RTL_LANGUAGES = new Set();
const STORAGE_KEY = 'athena-language';

const metadata = {
  uk: {
    title: 'Athena LMS — Система управління навчанням',
    description:
      'Athena LMS — доступна платформа з відповідністю WCAG 2.1, SCORM та аналітикою для курсів “Voice of Accessibility”.',
    ogTitle: 'Athena LMS Україна',
    ogDescription: 'Повністю локалізована платформа для навчання з підтримкою доступності та AI-асистента.',
  },
  en: {
    title: 'Athena LMS - Learning Management System',
    description:
      'Athena LMS - Advanced Learning Platform with WCAG 2.1 Compliance and SCORM Integration',
    ogTitle: 'Athena LMS',
    ogDescription: 'Professional Learning Management System for Training and Development',
  },
};

const resolveInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }

  const browserLanguage = navigator.language?.slice(0, 2).toLowerCase();
  if (browserLanguage && SUPPORTED_LANGUAGES.includes(browserLanguage)) {
    return browserLanguage;
  }

  return DEFAULT_LANGUAGE;
};

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(resolveInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    const meta = metadata[currentLanguage] ?? metadata.en;
    document.title = meta.title;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', meta.description);
    }

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', meta.ogTitle);
    }

    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', meta.ogDescription);
    }

    document.documentElement.dir = RTL_LANGUAGES.has(currentLanguage) ? 'rtl' : 'ltr';

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, currentLanguage);
    }
  }, [currentLanguage]);

  const value = useMemo(
    () => ({
      currentLanguage,
      setLanguage: (lang) => {
        if (SUPPORTED_LANGUAGES.includes(lang)) {
          setCurrentLanguage(lang);
        }
      },
      availableLanguages: SUPPORTED_LANGUAGES,
    }),
    [currentLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}