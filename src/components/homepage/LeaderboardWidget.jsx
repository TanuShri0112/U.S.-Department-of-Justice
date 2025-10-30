import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LeaderboardWidget = () => {
  const { currentLanguage } = useLanguage();

  // Mock leaderboard data
  const leaderboard = [
    {
      rank: 1,
      name: 'Sarah Johnson',
      points: 2850,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      badge: 'Gold',
      trend: '+245'
    },
    {
      rank: 2,
      name: 'Michael Chen',
      points: 2620,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      badge: 'Silver',
      trend: '+180'
    },
    {
      rank: 3,
      name: 'Emma Williams',
      points: 2410,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      badge: 'Bronze',
      trend: '+165'
    },
    {
      rank: 4,
      name: 'You',
      points: 2200,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      badge: null,
      trend: '+120',
      isCurrentUser: true
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-semibold text-gray-500">#{rank}</span>;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-lg">
              {currentLanguage === 'en' ? 'Leaderboard' : 'Classement'}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            {currentLanguage === 'en' ? 'Top 4' : 'Top 4'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                user.isCurrentUser
                  ? 'bg-blue-50 border-2 border-blue-300'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {/* Rank */}
              <div className="w-8 flex items-center justify-center">
                {getRankIcon(user.rank)}
              </div>

              {/* Avatar */}
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${user.isCurrentUser ? 'text-blue-700' : 'text-gray-900'}`}>
                  {user.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">{user.points.toLocaleString()} pts</span>
                  {user.trend && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      {user.trend}
                    </div>
                  )}
                </div>
              </div>

              {/* Badge */}
              {user.badge && (
                <Badge
                  className={`text-xs ${
                    user.badge === 'Gold'
                      ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                      : user.badge === 'Silver'
                      ? 'bg-gray-100 text-gray-700 border-gray-300'
                      : 'bg-amber-100 text-amber-700 border-amber-300'
                  }`}
                >
                  {user.badge}
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* Your Stats */}
        <div className="mt-4 pt-4 border-t bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
          <p className="text-xs font-medium text-gray-700 mb-2">
            {currentLanguage === 'en' ? 'Your Performance' : 'Votre performance'}
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-blue-600">4th</p>
              <p className="text-xs text-gray-600">
                {currentLanguage === 'en' ? 'Rank' : 'Rang'}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-purple-600">2,200</p>
              <p className="text-xs text-gray-600">
                {currentLanguage === 'en' ? 'Points' : 'Points'}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">+120</p>
              <p className="text-xs text-gray-600">
                {currentLanguage === 'en' ? 'This Week' : 'Cette semaine'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

