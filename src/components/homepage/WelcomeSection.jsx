import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Plus, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function WelcomeSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const handleNewTaskClick = () => {
    navigate('/tasks');
  };

  return (
    <section className="mb-6">
      {/* Top Welcome Card - Full Width */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Student Dashboard Pill */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {t('studentDashboard')}
            </div>
            
            {/* Greeting */}
            <h1 className="text-xl font-semibold text-gray-800">
              {t('haveProductiveDay')}
            </h1>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleCalendarClick}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-gray-200 hover:bg-gray-50"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('calendar')}</span>
            </Button>
            
            <Button
              onClick={handleNewTaskClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{t('newTask')}</span>
            </Button>
          </div>
        </div>
      </div>

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