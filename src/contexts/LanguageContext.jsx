import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const metadata = {
  en: {
    title: "Norsk filminstitutt - Learning Management System",
    description: "NFI Information Security Training Platform with WCAG 2.1 Compliance",
    ogTitle: "NFI Training Platform",
    ogDescription: "Norwegian Film Institute Security Awareness and Compliance Training"
  },
  no: {
    title: "Norsk filminstitutt - Læringsplattform",
    description: "NFI Informasjonssikkerhet Opplæringsplattform med WCAG 2.1 Samsvar",
    ogTitle: "NFI Opplæringsplattform",
    ogDescription: "Norsk filminstitutts sikkerhetsbevissthet og overholdelse opplæring"
  },
  fr: {
    title: "Institut norvégien du film - Système de gestion de l'apprentissage",
    description: "Plateforme de formation en sécurité de l'information NFI conforme WCAG 2.1",
    ogTitle: "Plateforme de formation NFI",
    ogDescription: "Formation à la sensibilisation à la sécurité de l'Institut norvégien du film"
  }
};

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('no');

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