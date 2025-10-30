import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const metadata = {
  en: {
    title: "University Learning Management System - LMS",
    description: "Advanced Learning Management System for Higher Education",
    ogTitle: "University LMS",
    ogDescription: "Official Learning Platform with WCAG 2.1 Compliance and SCORM Integration"
  },
  fr: {
    title: "Système de gestion de l'apprentissage universitaire - SGA",
    description: "Système avancé de gestion de l'apprentissage pour l'enseignement supérieur",
    ogTitle: "SGA Universitaire",
    ogDescription: "Plateforme d'apprentissage officielle conforme WCAG 2.1 et intégration SCORM"
  }
};

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Update metadata when language changes
  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;

    // Update title and meta tags
    const meta = metadata[currentLanguage];
    document.title = meta.title;
    
    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', meta.description);
    }

    // Update OpenGraph meta tags
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', meta.ogTitle);
    }
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', meta.ogDescription);
    }

  }, [currentLanguage]);

  const value = {
    currentLanguage,
    setLanguage: (lang) => {
      setCurrentLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}