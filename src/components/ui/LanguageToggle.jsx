import React from 'react';
import { Globe, Loader2, Languages, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle = ({ className = '' }) => {
  const { language, toggleLanguage, isLoading } = useLanguage();

  const getLanguageLabel = () => {
    return language === 'en' ? 'EN' : 'ES';
  };

  const getLanguageName = () => {
    return language === 'en' ? 'English' : 'Español';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Subtle outer glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      
      <button
        onClick={toggleLanguage}
        disabled={isLoading}
        className={`
          group relative overflow-hidden
          bg-gradient-to-br from-white via-gray-50/50 to-white
          hover:from-blue-50/30 hover:via-purple-50/20 hover:to-indigo-50/30
          border border-gray-200/80
          hover:border-blue-300/40
          text-gray-700 hover:text-gray-900
          px-4 py-2.5 rounded-xl
          shadow-sm hover:shadow-lg hover:shadow-blue-500/10
          transition-all duration-300 ease-out
          transform hover:scale-[1.02] active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-3
          min-w-[90px]
          font-medium
        `}
        title={`Switch to ${language === 'en' ? 'Español' : 'English'}`}
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-1 right-1 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse" />
          <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-purple-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        {/* Content */}
        <div className="relative flex items-center gap-3">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              <Sparkles className="h-3 w-3 animate-pulse text-purple-400" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Languages className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-sm font-semibold tracking-wide bg-gradient-to-r from-gray-700 to-gray-900 group-hover:from-blue-700 group-hover:to-purple-700 bg-clip-text text-transparent transition-all duration-200">
                  {getLanguageLabel()}
                </span>
              </div>
              <div className="relative">
                <Globe className="h-3 w-3 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200" />
                <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </>
          )}
        </div>
        
        {/* Click ripple effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-indigo-200/30 scale-0 group-active:scale-100 transition-transform duration-200 ease-out rounded-xl" />
      </button>
    </div>
  );
};
