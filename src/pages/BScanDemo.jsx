import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Eye, 
  Award, 
  ArrowRight, 
  CheckCircle,
  Clock,
  X,
  Download
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations/translations';
import { XRayAnimation } from '@/components/courses/XRayAnimation';
import { SafetyTraining } from '@/components/courses/SafetyTraining';
import { BScanQuiz } from '@/components/courses/BScanQuiz';

export default function BScanDemo() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage].bscan;
  const [activeModule, setActiveModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  const modules = [
    {
      id: 'intro',
      title: t.xrayImaging,
      icon: Eye,
      color: 'blue',
      description: {
        en: 'Learn how X-ray scanning systems work',
        ru: 'Узнайте, как работают системы рентгеновского сканирования'
      },
      component: <XRayAnimation />
    },
    {
      id: 'safety',
      title: t.safetyPrinciples,
      icon: Shield,
      color: 'green',
      description: {
        en: 'Time, Distance, and Shielding principles',
        ru: 'Принципы времени, расстояния и экранирования'
      },
      component: <SafetyTraining onComplete={() => handleModuleComplete('safety')} />
    },
    {
      id: 'quiz',
      title: t.knowledgeCheck,
      icon: Award,
      color: 'purple',
      description: {
        en: 'Test your knowledge',
        ru: 'Проверьте свои знания'
      },
      component: <BScanQuiz onComplete={() => handleModuleComplete('quiz')} />
    }
  ];

  const handleModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    if (!completedModules.includes('intro') && moduleId === 'intro') {
      setTimeout(() => {
        handleModuleComplete('intro');
      }, 5000);
    }
  };

  const closeModule = () => {
    setActiveModule(null);
  };

  const downloadCertificate = () => {
    // Placeholder for certificate download
    alert(currentLanguage === 'en' ? 'Certificate download will be implemented' :
          currentLanguage === 'ru' ? 'Загрузка сертификата будет реализована' :
          'Zertifikat-Download wird implementiert');
  };

  if (activeModule) {
    const module = modules.find(m => m.id === activeModule);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">{module.title}</h2>
            <Button 
              onClick={closeModule}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4 mr-2" />
              {currentLanguage === 'en' ? 'Close' :
               'Закрыть'}
            </Button>
          </div>
          {module.component}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/20 text-blue-200 border-blue-500/30 text-base px-4 py-2">
              {currentLanguage === 'en' ? 'B-Scan & Uniqscan Training System' : 
               'Система обучения B-Scan и Uniqscan'}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t.welcome}
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6"
                onClick={() => handleModuleClick('intro')}
              >
                {t.startTraining}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">
                      {currentLanguage === 'en' ? 'Completed' :
                       'Завершено'}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {completedModules.length}/{modules.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <Clock className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-green-200">
                      {currentLanguage === 'en' ? 'Duration' :
                       'Продолжительность'}
                    </p>
                    <p className="text-2xl font-bold text-white">~45 min</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Award className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-200">
                      {currentLanguage === 'en' ? 'Certificate' :
                       'Сертификат'}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {completedModules.length === modules.length ? '✓' : '○'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Modules */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">{t.modules}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {modules.map((module, index) => {
                const Icon = module.icon;
                const isCompleted = completedModules.includes(module.id);
                
                return (
                  <Card 
                    key={module.id}
                    className="bg-white/10 border-white/20 backdrop-blur hover:bg-white/15 transition-all cursor-pointer group"
                    onClick={() => handleModuleClick(module.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 bg-${module.color}-500/20 rounded-lg group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-8 w-8 text-${module.color}-400`} />
                        </div>
                        {isCompleted && (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        )}
                      </div>
                      <CardTitle className="text-white text-xl mb-2">
                        {module.title}
                      </CardTitle>
                      <p className="text-sm text-blue-200">{module.description[currentLanguage]}</p>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
                        variant="outline"
                      >
                        {isCompleted ? 
                          (currentLanguage === 'en' ? 'Review' : 
                           'Повторить') : 
                          (currentLanguage === 'en' ? 'Start Module' : 
                           'Начать модуль')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Certificate Preview */}
          {completedModules.length === modules.length && (
            <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 backdrop-blur">
              <CardContent className="p-8 text-center">
                <Award className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentLanguage === 'en' ? 'Congratulations!' : 
                   'Поздравляем!'}
                </h3>
                <p className="text-blue-200 mb-6">
                  {currentLanguage === 'en' ? 'You have completed all training modules.' : 
                   'Вы завершили все учебные модули.'}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={downloadCertificate}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    {t.getCertificate}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

