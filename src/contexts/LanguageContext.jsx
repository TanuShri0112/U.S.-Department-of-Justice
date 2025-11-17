import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const LanguageContext = createContext();

// IBC Tender Requirement: Multilingual Support
// Supported languages for Ipswich Borough Council staff
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'pl', 'ro', 'bg', 'hi', 'ur', 'ar'];
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
  fr: {
    title: 'Ipswich Borough Council (IBC) - Système de Gestion de l\'Apprentissage',
    description:
      'Ipswich Borough Council (IBC) - Portail d\'Apprentissage Corporatif conforme WCAG 2.1 avec intégration SCORM',
    ogTitle: 'Ipswich Borough Council (IBC)',
    ogDescription: 'Système de gestion de l\'apprentissage corporatif pour le développement du personnel, l\'intégration et la formation à la conformité',
  },
  de: {
    title: 'Ipswich Borough Council (IBC) - Lernmanagementsystem',
    description:
      'Ipswich Borough Council (IBC) - Unternehmenslernportal mit WCAG 2.1-Konformität und SCORM-Integration',
    ogTitle: 'Ipswich Borough Council (IBC)',
    ogDescription: 'Unternehmenslernmanagementsystem für Personalentwicklung, Onboarding und Compliance-Schulungen',
  },
  pl: {
    title: 'Ipswich Borough Council (IBC) - System Zarządzania Nauczaniem',
    description:
      'Ipswich Borough Council (IBC) - Korporacyjny Portal Edukacyjny zgodny z WCAG 2.1 z integracją SCORM',
    ogTitle: 'Ipswich Borough Council (IBC)',
    ogDescription: 'Korporacyjny system zarządzania nauczaniem dla rozwoju personelu, wdrażania i szkoleń zgodności',
  },
  ro: {
    title: 'Ipswich Borough Council (IBC) - Sistem de Management al Învățării',
    description:
      'Ipswich Borough Council (IBC) - Portal Corporativ de Învățare conform WCAG 2.1 cu integrare SCORM',
    ogTitle: 'Ipswich Borough Council (IBC)',
    ogDescription: 'Sistem corporativ de management al învățării pentru dezvoltarea personalului, onboarding și formare privind conformitatea',
  },
  bg: {
    title: 'Ipswich Borough Council (IBC) - Система за управление на обучението',
    description:
      'Ipswich Borough Council (IBC) - Корпоративен портал за обучение, съответстващ на WCAG 2.1 с интеграция SCORM',
    ogTitle: 'Ipswich Borough Council (IBC)',
    ogDescription: 'Корпоративна система за управление на обучението за развитие на персонала, адаптация и обучение за съответствие',
  },
  hi: {
    title: 'Ipswich Borough Council (IBC) - लर्निंग मैनेजमेंट सिस्टम',
    description:
      'Ipswich Borough Council (IBC) - WCAG 2.1 अनुपालन और SCORM एकीकरण के साथ कॉर्पोरेट लर्निंग पोर्टल',
    ogTitle: 'Ipswich Borough Council (IBC)',
    ogDescription: 'स्टाफ विकास, ऑनबोर्डिंग और अनुपालन प्रशिक्षण के लिए कॉर्पोरेट लर्निंग मैनेजमेंट सिस्टम',
  },
  ur: {
    title: 'Ipswich Borough Council (IBC) - لرننگ مینجمنٹ سسٹم',
    description:
      'Ipswich Borough Council (IBC) - WCAG 2.1 تعمیل اور SCORM انضمام کے ساتھ کارپوریٹ لرننگ پورٹل',
    ogTitle: 'Ipswich Borough Council (IBC)',
    ogDescription: 'اسٹاف کی ترقی، آن بورڈنگ اور تعمیل کی تربیت کے لیے کارپوریٹ لرننگ مینجمنٹ سسٹم',
  },
  ar: {
    title: 'Ipswich Borough Council (IBC) - نظام إدارة التعلم',
    description:
      'Ipswich Borough Council (IBC) - بوابة التعلم المؤسسية المتوافقة مع WCAG 2.1 مع تكامل SCORM',
    ogTitle: 'Ipswich Borough Council (IBC)',
    ogDescription: 'نظام إدارة التعلم المؤسسي لتطوير الموظفين والانضمام والتدريب على الامتثال',
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
    
    // Set text direction for RTL languages
    const rtlLanguages = ['ar', 'ur', 'he', 'fa'];
    if (rtlLanguages.includes(currentLanguage)) {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    
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