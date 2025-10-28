import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 px-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-pressed={currentLanguage === 'en'}
        aria-label="Switch to English"
      >
        <span role="img" aria-label="English flag">🇬🇧</span>
        <span>EN</span>
      </button>
      <button
        onClick={() => setLanguage('de')}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
          currentLanguage === 'de'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        aria-pressed={currentLanguage === 'de'}
        aria-label="Auf Deutsch umschalten"
      >
        <span role="img" aria-label="German flag">🇩🇪</span>
        <span>DE</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
