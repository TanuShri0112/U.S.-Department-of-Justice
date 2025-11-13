import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages, Check } from 'lucide-react';

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();

  const languages = availableLanguages.map((code) => {
    switch (code) {
      case 'es':
        return { code, name: 'Español', flag: '🇪🇸' };
      case 'en':
      default:
        return { code: 'en', name: 'English', flag: '🇺🇸' };
    }
  });

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 px-3 py-2 h-9"
          aria-label="Select language"
        >
          <Languages className="h-4 w-4" />
          <span role="img" aria-label={`${currentLang.name} flag`}>
            {currentLang.flag}
          </span>
          <span className="text-sm font-medium">{currentLang.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span role="img" aria-label={`${lang.name} flag`}>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
            {currentLanguage === lang.code && (
              <Check className="h-4 w-4 text-blue-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
