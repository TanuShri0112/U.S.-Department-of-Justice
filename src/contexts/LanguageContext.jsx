import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const metadata = {
  en: {
    title: "Athena LMS - Learning Management System",
    description: "Athena LMS - Advanced Learning Platform with WCAG 2.1 Compliance and SCORM Integration",
    ogTitle: "Athena LMS",
    ogDescription: "Professional Learning Management System for Training and Development"
  },
  mr: {
    title: "अथेना एलएमएस - शिक्षण व्यवस्थापन प्रणाली",
    description: "अथेना एलएमएस - डब्ल्यूसीएजी 2.1 सुसंगतता आणि एससीओआरएम एकत्रीकरणासह प्रगत शिक्षण प्लॅटफॉर्म",
    ogTitle: "अथेना एलएमएस",
    ogDescription: "प्रशिक्षण आणि विकासासाठी व्यावसायिक शिक्षण व्यवस्थापन प्रणाली"
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