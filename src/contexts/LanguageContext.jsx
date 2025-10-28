import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const metadata = {
  en: {
    title: "Saxon State Ministry for Social Affairs - LMS",
    description: "Learning Management System of the Saxon State Ministry for Social Affairs, Health, and Societal Cohesion",
    ogTitle: "Saxon State Ministry LMS",
    ogDescription: "Official Learning Platform of the Saxon State Ministry for Social Affairs"
  },
  de: {
    title: "Sächsisches Staatsministerium für Soziales - LMS",
    description: "Lernmanagementsystem des Sächsischen Staatsministeriums für Soziales, Gesundheit und Gesellschaftlichen Zusammenhalt",
    ogTitle: "Sächsisches Staatsministerium LMS",
    ogDescription: "Offizielle Lernplattform des Sächsischen Staatsministeriums für Soziales"
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