import React from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { Button } from './button';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle = ({ variant = 'default', size = 'sm', className = '' }) => {
  const { language, toggleLanguage, isLoading } = useLanguage();

  const getLanguageLabel = () => {
    return language === 'en' ? 'EN' : 'ES';
  };

  const getLanguageName = () => {
    return language === 'en' ? 'English' : 'Español';
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleLanguage}
      disabled={isLoading}
      className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 ${className}`}
      title={`Switch to ${language === 'en' ? 'Español' : 'English'}`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Globe className="h-4 w-4" />
      )}
      <span className="font-medium">{getLanguageLabel()}</span>
    </Button>
  );
};
