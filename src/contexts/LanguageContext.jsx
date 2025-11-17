import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const LanguageContext = createContext();

const SUPPORTED_LANGUAGES = ['en', 'es'];
const STORAGE_KEY = 'athena-language';

const metadata = {
  en: {
    title: 'Ipswich Borough Council (IBC) - Learning Management System',
    description:
      'Ipswich Borough Council (IBC) - Corporate Learning Portal with WCAG 2.1 Compliance and SCORM Integration',
    ogTitle: 'Ipswich Borough Council (IBC)',
    ogDescription: 'Corporate Learning Management System for Staff Development, Onboarding, and Compliance Training',
  },
  es: {
    title: 'Ipswich Borough Council (IBC) - Sistema de Gestión del Aprendizaje',
    description:
      'Ipswich Borough Council (IBC) - Portal de Aprendizaje Corporativo con cumplimiento WCAG 2.1 e integración SCORM',
    ogTitle: 'Ipswich Borough Council (IBC)',
    ogDescription: 'Sistema de gestión del aprendizaje corporativo para desarrollo del personal, incorporación y formación en cumplimiento',
  },
};

const resolveInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
    return stored;
  }

  const browserLanguage = navigator.language?.slice(0, 2).toLowerCase();
  if (browserLanguage && SUPPORTED_LANGUAGES.includes(browserLanguage)) {
    return browserLanguage;
  }

  return 'en';
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