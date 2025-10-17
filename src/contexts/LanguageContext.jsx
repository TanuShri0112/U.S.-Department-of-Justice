import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to 'es' (Spanish)
    return localStorage.getItem('app-language') || 'es';
  });

  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = async (newLanguage) => {
    setIsLoading(true);
    try {
      // Save to localStorage
      localStorage.setItem('app-language', newLanguage);
      setLanguage(newLanguage);
      
      // Optional: Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    changeLanguage(newLanguage);
  };

  const isEnglish = language === 'en';
  const isSpanish = language === 'es';

  const value = {
    language,
    setLanguage: changeLanguage,
    toggleLanguage,
    isEnglish,
    isSpanish,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
