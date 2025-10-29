import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function WelcomeSection() {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();

  const handleJoinNow = () => {
    navigate('/courses');
  };

  const content = {
    en: {
      tag: "X-Ray Security Training",
      welcome: "Welcome to",
      ministry: "Regional Command \"Shygys\" – National Guard of Kazakhstan",
      subtitle: "Access your comprehensive X-ray security and safety training. Learn essential scanning procedures, threat detection, and safety protocols for baggage and cargo inspection systems.",
      button: "Start Training"
    },
    ru: {
      tag: "Обучение рентгеновской безопасности",
      welcome: "Добро пожаловать в",
      ministry: "Региональное командование «Шығыс» – Национальная гвардия Казахстана",
      subtitle: "Получите доступ к комплексному обучению рентгеновской безопасности. Изучите основные процедуры сканирования, обнаружение угроз и протоколы безопасности для систем досмотра багажа и грузов.",
      button: "Начать обучение"
    }
  };

  const t = content[currentLanguage];

  return (
    <section className="mb-4">
      <Card className="w-full shadow-sm">
        <CardContent className="p-4">
          <div className="relative bg-gradient-to-br from-[hsl(var(--secondary))] via-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-3xl p-6 min-h-[200px] overflow-hidden">
            {/* Starburst/Sparkle Graphics */}
            <div className="absolute right-4 top-8 opacity-20">
              <Sparkles size={32} className="text-white animate-pulse" />
            </div>
            <div className="absolute right-8 bottom-6 opacity-15">
              <Star size={24} className="text-white animate-pulse delay-1000" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="mb-6">
                {/* Course Tag */}
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                  <span className="text-white text-xs font-semibold uppercase tracking-wide">
                    {t.tag}
                  </span>
                </div>
                
                {/* Main Headline */}
                <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3">
                  <span className="block">{t.welcome}</span>
                  <span className="block">{t.ministry}</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-md">
                  {t.subtitle}
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="flex items-center">
                <button
                  onClick={handleJoinNow}
                  className="group bg-white text-[hsl(var(--secondary))] px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <span>{t.button}</span>
                  <div className="w-5 h-5 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200">
                    <ArrowRight size={12} className="text-white" />
                  </div>
                </button>
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