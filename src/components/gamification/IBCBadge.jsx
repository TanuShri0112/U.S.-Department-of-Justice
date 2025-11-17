// IBC Tender Requirement: Customize badges with IBC insignia
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Award, Star, Trophy, Shield, CheckCircle } from 'lucide-react';

/**
 * IBC-branded badge component with council insignia
 * Supports various achievement types with IBC styling
 */
export const IBCBadge = ({ 
  type = 'default', 
  label, 
  className,
  showInsignia = true,
  size = 'default'
}) => {
  const badgeConfig = {
    achievement: {
      icon: Award,
      colors: 'bg-blue-600 text-white border-blue-700',
      insignia: '🏆'
    },
    completion: {
      icon: CheckCircle,
      colors: 'bg-green-600 text-white border-green-700',
      insignia: '✓'
    },
    excellence: {
      icon: Star,
      colors: 'bg-yellow-500 text-white border-yellow-600',
      insignia: '⭐'
    },
    certification: {
      icon: Shield,
      colors: 'bg-purple-600 text-white border-purple-700',
      insignia: '🛡️'
    },
    milestone: {
      icon: Trophy,
      colors: 'bg-orange-600 text-white border-orange-700',
      insignia: '🏅'
    },
    default: {
      icon: Award,
      colors: 'bg-indigo-600 text-white border-indigo-700',
      insignia: 'IBC'
    }
  };

  const config = badgeConfig[type] || badgeConfig.default;
  const Icon = config.icon;
  const sizeClasses = {
    small: 'text-xs px-2 py-0.5',
    default: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-1.5'
  };

  return (
    <Badge
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold',
        config.colors,
        sizeClasses[size],
        'border-2 shadow-sm',
        className
      )}
    >
      {showInsignia && (
        <span className="text-lg" aria-hidden="true">
          {config.insignia}
        </span>
      )}
      <Icon className="h-3 w-3" />
      <span>{label || 'IBC Achievement'}</span>
    </Badge>
  );
};

/**
 * IBC Achievement Badge - For course completions
 */
export const IBCAchievementBadge = ({ achievement, className }) => {
  const achievementTypes = {
    'First Course': 'milestone',
    'Perfect Score': 'excellence',
    'Course Complete': 'completion',
    'Certified': 'certification',
    'Top Performer': 'excellence'
  };

  const type = achievementTypes[achievement] || 'default';
  
  return (
    <IBCBadge
      type={type}
      label={achievement}
      className={className}
    />
  );
};

/**
 * IBC Council Insignia Badge - Official council branding
 */
export const IBCCouncilBadge = ({ className }) => {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
      'bg-gradient-to-r from-blue-600 to-indigo-700 text-white',
      'border-2 border-blue-800 shadow-md',
      'font-semibold text-sm',
      className
    )}>
      <span className="text-lg" aria-label="Ipswich Borough Council">🏛️</span>
      <span>Ipswich Borough Council</span>
    </div>
  );
};

export default IBCBadge;

