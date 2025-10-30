import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const WCAGScoreWidget = () => {
  const { currentLanguage } = useLanguage();

  // Mock WCAG compliance data - in real app would come from accessibility audit
  const wcagScore = {
    overall: 94,
    levelA: 100,
    levelAA: 96,
    levelAAA: 86,
    issues: 3
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 75) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">
              {currentLanguage === 'en' ? 'WCAG 2.1 Compliance' : 'Conformité WCAG 2.1'}
            </CardTitle>
          </div>
          <Badge className={getScoreBadge(wcagScore.overall)}>
            {wcagScore.overall}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Score */}
        <div className="text-center py-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <div className={`text-4xl font-bold ${getScoreColor(wcagScore.overall)}`}>
            {wcagScore.overall}%
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {currentLanguage === 'en' ? 'Overall Accessibility Score' : 'Score global d\'accessibilité'}
          </p>
        </div>

        {/* Level Breakdown */}
        <div className="space-y-3">
          {/* Level A */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Level A</span>
              </div>
              <span className="text-sm font-semibold text-green-600">{wcagScore.levelA}%</span>
            </div>
            <Progress value={wcagScore.levelA} className="h-2" />
          </div>

          {/* Level AA */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Level AA</span>
              </div>
              <span className="text-sm font-semibold text-green-600">{wcagScore.levelAA}%</span>
            </div>
            <Progress value={wcagScore.levelAA} className="h-2" />
          </div>

          {/* Level AAA */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Level AAA</span>
              </div>
              <span className="text-sm font-semibold text-yellow-600">{wcagScore.levelAAA}%</span>
            </div>
            <Progress value={wcagScore.levelAAA} className="h-2" />
          </div>
        </div>

        {/* Issues Summary */}
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">
                {currentLanguage === 'en' ? 'Active Issues' : 'Problèmes actifs'}
              </span>
            </div>
            <Badge variant="outline" className="text-yellow-600 border-yellow-300">
              {wcagScore.issues}
            </Badge>
          </div>
        </div>

        {/* Features List */}
        <div className="pt-3 border-t space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span>{currentLanguage === 'en' ? 'Keyboard Navigation' : 'Navigation au clavier'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span>{currentLanguage === 'en' ? 'Screen Reader Support' : 'Support de lecteur d\'écran'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span>{currentLanguage === 'en' ? 'Alt Text for Images' : 'Texte alternatif pour les images'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

