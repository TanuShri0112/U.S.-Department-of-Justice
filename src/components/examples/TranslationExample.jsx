import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';

export const TranslationExample = () => {
  const { t } = useTranslation();
  const { language, isEnglish, isSpanish } = useLanguage();

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-4">
        {t('language')}: {language.toUpperCase()}
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Navigation Items:</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {t('dashboard')}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {t('courses')}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {t('users')}
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              {t('groups')}
            </span>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Common Actions:</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {t('save')}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {t('edit')}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {t('create')}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {t('delete')}
            </span>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Company Information:</h3>
          <p className="text-sm text-gray-600">
            {t('companyName')}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Short: {t('companyNameShort')}
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Training Status:</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {t('active')}
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              {t('pending')}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {t('completed')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
