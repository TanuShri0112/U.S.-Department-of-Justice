import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const XRayAnimation = () => {
  const { currentLanguage } = useLanguage();
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: {
        en: 'X-Ray Source',
        ru: 'Источник рентгеновского излучения'
      },
      description: {
        en: 'High-energy photons are generated from the X-ray tube',
        ru: 'Высокоэнергетические фотоны генерируются из рентгеновской трубки'
      }
    },
    {
      title: {
        en: 'Object Scanning',
        ru: 'Сканирование объекта'
      },
      description: {
        en: 'X-rays pass through the object, with different materials absorbing different amounts',
        ru: 'Рентгеновские лучи проходят через объект, различные материалы поглощают разное количество'
      }
    },
    {
      title: {
        en: 'Detection',
        ru: 'Обнаружение'
      },
      description: {
        en: 'Detectors capture the transmitted X-rays and convert them to digital signals',
        ru: 'Детекторы улавливают прошедшие рентгеновские лучи и преобразуют их в цифровые сигналы'
      }
    },
    {
      title: {
        en: 'Image Processing',
        ru: 'Обработка изображения'
      },
      description: {
        en: 'Computer processes the data to create a detailed image showing internal structure',
        ru: 'Компьютер обрабатывает данные для создания детального изображения внутренней структуры'
      }
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => (prev + 1) % steps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 border-white/20 backdrop-blur">
        <CardContent className="p-8">
          {/* Animation Display */}
          <div className="relative bg-slate-800 rounded-lg p-8 mb-6 min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg"></div>
            
            {/* Animated X-Ray Process */}
            <div className="relative w-full max-w-2xl">
              <div className="flex items-center justify-between">
                {/* X-Ray Source */}
                <div className={`transition-all duration-500 ${step >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-12 h-12 bg-yellow-300 rounded-full"></div>
                  </div>
                  <p className="text-white text-sm mt-2 text-center">Source</p>
                </div>

                {/* X-Ray Beams */}
                <div className={`flex-1 mx-4 transition-all duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="h-1 bg-gradient-to-r from-yellow-400 to-blue-400 animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Object */}
                <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <div className="w-24 h-32 bg-gradient-to-b from-slate-600 to-slate-700 rounded-lg border-2 border-slate-500 relative">
                    <div className="absolute inset-2 border border-dashed border-slate-400 rounded"></div>
                  </div>
                  <p className="text-white text-sm mt-2 text-center">Object</p>
                </div>

                {/* Transmitted Beams */}
                <div className={`flex-1 mx-4 transition-all duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="h-1 bg-gradient-to-r from-blue-400 to-green-400 animate-pulse"
                        style={{ 
                          animationDelay: `${i * 0.2}s`,
                          opacity: 1 - (i * 0.15)
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Detector */}
                <div className={`transition-all duration-500 ${step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <div className="w-20 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg mb-2"></div>
                    <div className="text-xs text-white">Detector</div>
                  </div>
                </div>
              </div>

              {/* Processed Image */}
              {step >= 3 && (
                <div className="mt-8 transition-all duration-500 animate-fade-in">
                  <div className="bg-slate-700 p-4 rounded-lg border-2 border-green-500">
                    <div className="grid grid-cols-8 gap-1">
                      {[...Array(64)].map((_, i) => (
                        <div 
                          key={i}
                          className="aspect-square rounded"
                          style={{
                            backgroundColor: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 1)`
                          }}
                        ></div>
                      ))}
                    </div>
                    <p className="text-green-400 text-center mt-2 text-sm font-semibold">
                      {currentLanguage === 'en' ? 'Processed X-Ray Image' :
                       'Обработанное рентгеновское изображение'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step Information */}
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {steps[step].title[currentLanguage]}
            </h3>
            <p className="text-blue-200">
              {steps[step].description[currentLanguage]}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                onClick={() => { setStep(0); setIsPlaying(false); }}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={prevStep}
                disabled={step === 0}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
              >
                Previous
              </Button>
              <Button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-12 rounded-full transition-all ${
                  i === step ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

