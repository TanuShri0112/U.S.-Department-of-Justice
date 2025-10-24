import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function WelcomeSection() {
  const { t } = useLanguage();

  return (
    <section className="mb-6">
      {/* Main Welcome Card */}
      <Card className="w-full shadow-sm border-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="relative p-8 min-h-[200px] overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute right-6 top-6 opacity-20">
              <Sparkles size={32} className="text-white animate-pulse" />
            </div>
            <div className="absolute right-12 bottom-8 opacity-15">
              <Star size={24} className="text-white animate-pulse delay-1000" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="mb-6">
                {/* Online Course Tag */}
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                  <span className="text-white text-sm font-semibold uppercase tracking-wide">
                    {t('onlineCourse')}
                  </span>
                </div>
                
                {/* Main Headline */}
                <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-3">
                  <span className="block">{t('welcomeToUQTR')}</span>
                  <span className="block">{t('learningPlatform')}</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-white/90 text-base leading-relaxed max-w-lg">
                  {t('welcomeMessage')}
                </p>
              </div>
            </div>
            
            {/* Additional decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-4 left-8 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
              <div className="absolute bottom-8 left-12 w-1 h-1 bg-white/30 rounded-full animate-ping delay-500"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}