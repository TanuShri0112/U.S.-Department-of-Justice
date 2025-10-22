import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-2 px-3 py-2 bg-blue-50 border-blue-200 hover:bg-blue-100 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Languages className="w-4 h-4 text-blue-600" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
          <span className="font-semibold text-blue-700">
            {language === 'en' ? 'EN' : 'FR'}
          </span>
          <Globe className="w-4 h-4 text-blue-600" />
        </div>
      </Button>

      {/* Hover UI */}
      {isHovered && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Languages className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {language === 'en' ? 'Switch to French' : 'Passer à l\'anglais'}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? 'Click to change language' : 'Cliquez pour changer de langue'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>
                {language === 'en' ? 'Current: English' : 'Actuel: Français'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>
                {language === 'en' ? 'Next: Français' : 'Suivant: English'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
