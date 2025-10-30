import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Star, Zap, Target, Trophy, Medal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const GamificationWidget = () => {
  const { currentLanguage } = useLanguage();

  // Mock gamification data
  const gameData = {
    totalPoints: 2200,
    level: 12,
    nextLevelPoints: 2500,
    badges: [
      { id: 1, name: 'Quick Learner', icon: Zap, color: 'yellow', earned: true },
      { id: 2, name: 'Perfect Score', icon: Star, color: 'purple', earned: true },
      { id: 3, name: 'Course Master', icon: Trophy, color: 'blue', earned: true },
      { id: 4, name: 'Top Contributor', icon: Medal, color: 'green', earned: false }
    ],
    achievements: 15,
    streak: 7
  };

  const progressToNextLevel = ((gameData.totalPoints % 500) / 500) * 100;

  return (
    <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg">
              {currentLanguage === 'en' ? 'Achievements' : 'Réalisations'}
            </CardTitle>
          </div>
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            {currentLanguage === 'en' ? `Level ${gameData.level}` : `Niveau ${gameData.level}`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level Progress */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-900">
              {currentLanguage === 'en' ? 'Level Progress' : 'Progression de niveau'}
            </span>
            <span className="text-sm font-semibold text-purple-700">
              {gameData.totalPoints} / {gameData.nextLevelPoints}
            </span>
          </div>
          <Progress value={progressToNextLevel} className="h-2 bg-purple-200" />
          <p className="text-xs text-purple-600 mt-1">
            {gameData.nextLevelPoints - gameData.totalPoints} {currentLanguage === 'en' ? 'points to next level' : 'points au prochain niveau'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <Star className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-yellow-700">{gameData.totalPoints}</p>
            <p className="text-xs text-yellow-600">
              {currentLanguage === 'en' ? 'Total Points' : 'Points totaux'}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-green-700">{gameData.achievements}</p>
            <p className="text-xs text-green-600">
              {currentLanguage === 'en' ? 'Achievements' : 'Réalisations'}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            {currentLanguage === 'en' ? 'Recent Badges' : 'Badges récents'}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {gameData.badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`relative p-3 rounded-lg text-center transition-all ${
                    badge.earned
                      ? `bg-${badge.color}-50 hover:scale-105`
                      : 'bg-gray-100 opacity-50'
                  }`}
                  title={badge.name}
                >
                  <Icon
                    className={`h-6 w-6 mx-auto ${
                      badge.earned ? `text-${badge.color}-600` : 'text-gray-400'
                    }`}
                  />
                  {badge.earned && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak */}
        <div className="pt-3 border-t bg-orange-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-semibold text-orange-700">
                  {gameData.streak} {currentLanguage === 'en' ? 'Day Streak' : 'Jours d\'affilée'}
                </p>
                <p className="text-xs text-orange-600">
                  {currentLanguage === 'en' ? 'Keep it going!' : 'Continuez!'}
                </p>
              </div>
            </div>
            <div className="text-2xl">🔥</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

