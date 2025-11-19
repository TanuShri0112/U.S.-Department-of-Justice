import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const LanguageContext = createContext();

const SUPPORTED_LANGUAGES = ['de', 'en', 'es'];
const STORAGE_KEY = 'athena-language';

const metadata = {
  de: {
    title: 'Kreis Wesel – Lernportal',
    description:
      'Kreis Wesel – Lernportal - Fortgeschrittene Lernplattform mit WCAG 2.1 Konformität und SCORM Integration',
    ogTitle: 'Kreis Wesel – Lernportal',
    ogDescription: 'Professionelles Lernmanagementsystem für Schulung und Entwicklung',
  },
  en: {
    title: 'Kreis Wesel – Lernportal',
    description:
      'Kreis Wesel – Lernportal - Advanced Learning Platform with WCAG 2.1 Compliance and SCORM Integration',
    ogTitle: 'Kreis Wesel – Lernportal',
    ogDescription: 'Professional Learning Management System for Training and Development',
  },
  es: {
    title: 'Kreis Wesel – Lernportal',
    description:
      'Kreis Wesel – Lernportal - Plataforma avanzada de aprendizaje con cumplimiento WCAG 2.1 e integración SCORM',
    ogTitle: 'Kreis Wesel – Lernportal',
    ogDescription: 'Sistema profesional de gestión del aprendizaje para formación y desarrollo',
  },
};

const resolveInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'de'; // Default to German
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }

  // Always default to German for Kreis Wesel, regardless of browser language
  return 'de';
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