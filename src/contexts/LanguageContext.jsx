import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const metadata = {
  en: {
    title: "Regional Command \"Shygys\" – National Guard of Kazakhstan - LMS",
    description: "Learning Management System of Regional Command \"Shygys\" – National Guard of Kazakhstan",
    ogTitle: "Regional Command \"Shygys\" LMS",
    ogDescription: "Official Learning Platform of Regional Command \"Shygys\" – National Guard of Kazakhstan"
  },
  ru: {
    title: "Региональное командование «Шығыс» – Национальная гвардия Казахстана - СДО",
    description: "Система дистанционного обучения Регионального командования «Шығыс» – Национальной гвардии Казахстана",
    ogTitle: "Региональное командование «Шығыс» СДО",
    ogDescription: "Официальная обучающая платформа Регионального командования «Шығыс» – Национальной гвардии Казахстана"
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