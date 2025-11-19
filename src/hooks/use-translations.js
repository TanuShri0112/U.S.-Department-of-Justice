import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations/translations';

/**
 * Hook to get translations for the current language
 * @returns {object} Translation object for current language
 */
export const useTranslations = () => {
  const { currentLanguage } = useLanguage();
  return translations[currentLanguage] || translations.de;
};

/**
 * Helper function to get nested translation value
 * @param {string} path - Dot-separated path to translation (e.g., 'common.save')
 * @param {string} language - Language code (optional, defaults to current)
 * @returns {string} Translated string
 */
export const getTranslation = (path, language = null) => {
  const lang = language || (typeof window !== 'undefined' ? localStorage.getItem('athena-language') || 'de' : 'de');
  const t = translations[lang] || translations.de;
  const keys = path.split('.');
  let value = t;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path; // Return path if translation not found
    }
  }
  
  return typeof value === 'string' ? value : path;
};

