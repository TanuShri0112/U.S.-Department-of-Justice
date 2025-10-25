import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WelcomeSection() {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    // Navigate to courses or appropriate section
    navigate('/courses');
  };

  return (
    <section className="mb-4">
      <Card className="w-full shadow-sm">
        <CardContent className="p-4">
          <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-6 min-h-[200px] overflow-hidden">
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
                    Occupational Safety Training
                  </span>
                </div>
                
                {/* Main Headline */}
                <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3">
                  <span className="block">Welcome to</span>
                  <span className="block">Bau- und Liegenschaftsbetrieb NRW Zentral</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-md">
                  Access your legally compliant occupational safety training. Learn essential workplace safety practices, guidelines, and protocols in accordance with German occupational health and safety laws.
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="flex items-center">
                <button
                  onClick={handleJoinNow}
                  className="group bg-white text-teal-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-teal-50 transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <span>Start Training</span>
                  <div className="w-5 h-5 bg-teal-700 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200">
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