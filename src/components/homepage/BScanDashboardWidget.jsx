import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Scan, 
  Award, 
  Shield, 
  TrendingUp, 
  Clock, 
  Download,
  ArrowRight,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations/translations';

export const BScanDashboardWidget = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage].dashboard;

  // Mock data - in real app, this would come from user progress
  const trainingProgress = {
    completedModules: 2,
    totalModules: 3,
    safetyScore: 92,
    certificatesEarned: 0,
    lastTrainingDate: '2025-10-28',
    xrayProficiency: 85
  };

  const progressPercentage = (trainingProgress.completedModules / trainingProgress.totalModules) * 100;

  return (
    <div className="space-y-6">
      {/* Main B-Scan Training Card */}
      <Card className="overflow-hidden border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Scan className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">B-Scan Training</CardTitle>
                <p className="text-sm text-gray-600">
                  {currentLanguage === 'en' ? 'X-Ray System Training' :
                   currentLanguage === 'ru' ? 'Обучение рентгеновской системе' :
                   'Röntgensystem-Schulung'}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {trainingProgress.completedModules}/{trainingProgress.totalModules} {t.completed}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{t.myProgress}</span>
              <span className="text-sm font-semibold text-blue-600">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* X-Ray Proficiency */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-900">{t.xrayProficiency}</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">{trainingProgress.xrayProficiency}%</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+5% {currentLanguage === 'en' ? 'this week' : currentLanguage === 'ru' ? 'на этой неделе' : 'diese Woche'}</span>
              </div>
            </div>

            {/* Safety Score */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-green-900">{t.safetyScore}</span>
              </div>
              <p className="text-2xl font-bold text-green-700">{trainingProgress.safetyScore}%</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">{currentLanguage === 'en' ? 'Excellent' : currentLanguage === 'ru' ? 'Отлично' : 'Ausgezeichnet'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate('/bscan-demo')}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {t.continueTraining}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Section */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            {t.myCertificates}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {trainingProgress.certificatesEarned === 0 ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {currentLanguage === 'en' ? 'Complete all training modules to earn your certificate' :
                 currentLanguage === 'ru' ? 'Завершите все модули обучения, чтобы получить сертификат' :
                 'Absolvieren Sie alle Schulungsmodule, um Ihr Zertifikat zu erhalten'}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/bscan-demo')}
              >
                {currentLanguage === 'en' ? 'Start Training' :
                 currentLanguage === 'ru' ? 'Начать обучение' :
                 'Schulung starten'}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {currentLanguage === 'en' ? 'B-Scan Operator Certificate' :
                       currentLanguage === 'ru' ? 'Сертификат оператора B-Scan' :
                       'B-Scan Operator-Zertifikat'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {currentLanguage === 'en' ? 'Issued:' :
                       currentLanguage === 'ru' ? 'Выдано:' :
                       'Ausgestellt:'} {trainingProgress.lastTrainingDate}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Safety Status Card */}
      <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            {t.safetyTraining}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Safety Principles Checklist */}
            <div className="space-y-2">
              {['Time', 'Distance', 'Shielding'].map((principle, idx) => (
                <div key={principle} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {idx === 0 && <Clock className="h-4 w-4 text-green-600" />}
                    {idx === 1 && <ArrowRight className="h-4 w-4 text-green-600" />}
                    {idx === 2 && <Shield className="h-4 w-4 text-green-600" />}
                    <span className="text-sm font-medium text-gray-700">
                      {currentLanguage === 'en' ? principle :
                       currentLanguage === 'ru' ? 
                         (principle === 'Time' ? 'Время' : principle === 'Distance' ? 'Расстояние' : 'Экранирование') :
                         (principle === 'Time' ? 'Zeit' : principle === 'Distance' ? 'Abstand' : 'Abschirmung')}
                    </span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {trainingProgress.completedModules > 1 ? '✓' : '○'}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Last Training Info */}
            <div className="flex items-center gap-2 text-xs text-gray-600 pt-2 border-t">
              <Clock className="h-3 w-3" />
              <span>
                {currentLanguage === 'en' ? 'Last training:' :
                 currentLanguage === 'ru' ? 'Последнее обучение:' :
                 'Letzte Schulung:'} {trainingProgress.lastTrainingDate}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

