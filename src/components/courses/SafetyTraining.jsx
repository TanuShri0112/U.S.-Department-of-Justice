import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Maximize, Shield, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations/translations';

export const SafetyTraining = ({ onComplete }) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage].bscan;
  const [selectedPrinciple, setSelectedPrinciple] = useState(null);
  const [completedPrinciples, setCompletedPrinciples] = useState([]);

  const safetyPrinciples = [
    {
      id: 'time',
      title: t.timeLabel,
      icon: Clock,
      color: 'blue',
      description: {
        en: 'Minimize exposure time to reduce radiation dose',
        ru: 'Минимизируйте время воздействия для снижения дозы облучения'
      },
      safeExample: {
        en: 'Quick scanning procedures (< 5 seconds)',
        ru: 'Быстрые процедуры сканирования (< 5 секунд)'
      },
      unsafeExample: {
        en: 'Prolonged unnecessary exposure',
        ru: 'Длительное ненужное воздействие'
      }
    },
    {
      id: 'distance',
      title: t.distanceLabel,
      icon: Maximize,
      color: 'green',
      description: {
        en: 'Maintain safe distance from radiation source',
        ru: 'Поддерживайте безопасное расстояние от источника излучения'
      },
      safeExample: {
        en: 'Operating from control room (> 3 meters away)',
        ru: 'Работа из диспетчерской (> 3 метров)'
      },
      unsafeExample: {
        en: 'Standing directly next to X-ray source',
        ru: 'Стояние непосредственно рядом с источником рентгеновского излучения'
      }
    },
    {
      id: 'shielding',
      title: t.shieldingLabel,
      icon: Shield,
      color: 'purple',
      description: {
        en: 'Use proper shielding barriers and protective equipment',
        ru: 'Используйте надлежащие защитные барьеры и защитное оборудование'
      },
      safeExample: {
        en: 'Lead barriers, protective aprons, and shielded enclosures',
        ru: 'Свинцовые барьеры, защитные фартуки и экранированные корпуса'
      },
      unsafeExample: {
        en: 'No protective barriers or equipment',
        ru: 'Отсутствие защитных барьеров или оборудования'
      }
    }
  ];

  const handlePrincipleClick = (principle) => {
    setSelectedPrinciple(principle);
  };

  const markAsComplete = (principleId) => {
    if (!completedPrinciples.includes(principleId)) {
      const newCompleted = [...completedPrinciples, principleId];
      setCompletedPrinciples(newCompleted);
      
      if (newCompleted.length === safetyPrinciples.length && onComplete) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="bg-white/10 border-white/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-400" />
            {t.safetyTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-200 mb-4">
            {currentLanguage === 'en' ? 'The three fundamental principles of radiation safety:' :
             'Три основных принципа радиационной безопасности:'}
          </p>
          
          {/* Principle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {safetyPrinciples.map((principle) => {
              const Icon = principle.icon;
              const isCompleted = completedPrinciples.includes(principle.id);
              
              return (
                <Card 
                  key={principle.id}
                  className={`bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer transition-all ${
                    selectedPrinciple?.id === principle.id ? 'ring-2 ring-blue-400' : ''
                  }`}
                  onClick={() => handlePrincipleClick(principle)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 bg-${principle.color}-500/20 rounded-lg`}>
                        <Icon className={`h-6 w-6 text-${principle.color}-400`} />
                      </div>
                      {isCompleted && (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{principle.title}</h3>
                    <p className="text-blue-200 text-sm">{principle.description[currentLanguage]}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed View */}
          {selectedPrinciple && (
            <Card className="bg-slate-800/50 border-blue-500/30 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">{selectedPrinciple.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPrinciple(null)}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-blue-200 mb-8">{selectedPrinciple.description[currentLanguage]}</p>

                {/* Interactive Examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Safe Example */}
                  <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-400" />
                      <h4 className="text-green-400 font-semibold text-lg">{t.safeExample}</h4>
                    </div>
                    <div className="bg-green-900/30 rounded-lg p-4 mb-4">
                      <div className="w-full h-32 bg-gradient-to-br from-green-600 to-green-800 rounded flex items-center justify-center">
                        <CheckCircle className="h-16 w-16 text-white animate-pulse" />
                      </div>
                    </div>
                    <p className="text-green-200">{selectedPrinciple.safeExample[currentLanguage]}</p>
                  </div>

                  {/* Unsafe Example */}
                  <div className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-400" />
                      <h4 className="text-red-400 font-semibold text-lg">{t.unsafeExample}</h4>
                    </div>
                    <div className="bg-red-900/30 rounded-lg p-4 mb-4">
                      <div className="w-full h-32 bg-gradient-to-br from-red-600 to-red-800 rounded flex items-center justify-center">
                        <AlertTriangle className="h-16 w-16 text-white animate-pulse" />
                      </div>
                    </div>
                    <p className="text-red-200">{selectedPrinciple.unsafeExample[currentLanguage]}</p>
                  </div>
                </div>

                {/* Action Button */}
                {!completedPrinciples.includes(selectedPrinciple.id) && (
                  <Button
                    onClick={() => markAsComplete(selectedPrinciple.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    {currentLanguage === 'en' ? 'Mark as Understood' :
                     'Отметить как понято'}
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Progress */}
          <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">
                {currentLanguage === 'en' ? 'Progress' :
                 'Прогресс'}
              </span>
              <span className="text-blue-200">
                {completedPrinciples.length}/{safetyPrinciples.length}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedPrinciples.length / safetyPrinciples.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

