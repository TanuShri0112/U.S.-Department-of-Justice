import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertCircle, Info, CheckCircle, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';

export function AnnouncementSection() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const announcements = [
    {
      id: 1,
      title: t('newTrainingCatalogueModule'),
      source: t('uqtrTrainingCoordinator'),
      time: t('hoursAgo'),
      content: t('newTrainingCatalogueContent'),
      type: 'course',
      priority: 'high',
      course: t('trainingManagement')
    },
    {
      id: 4,
      title: t('scormIntegrationWorkshop'),
      source: t('uqtrContentDepartment'),
      time: t('daysAgo'),
      content: t('scormIntegrationContent'),
      type: 'workshop',
      priority: 'medium',
      course: t('contentManagement')
    },
    {
      id: 5,
      title: t('progressTrackingSurvey'),
      source: t('uqtrAnalyticsTeam'),
      time: t('weekAgo'),
      content: t('progressTrackingSurveyContent'),
      type: 'survey',
      priority: 'low',
      course: t('analytics')
    }
  ];

  const getAnnouncementTypeStyles = (type) => {
    switch (type) {
      case 'course':
        return {
          icon: Info,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700'
        };
      case 'deadline':
        return {
          icon: AlertCircle,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-700'
        };
      case 'workshop':
        return {
          icon: Calendar,
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          textColor: 'text-purple-700'
        };
      case 'survey':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-700'
        };
      default:
        return {
          icon: Bell,
          iconColor: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-700'
        };
    }
  };

  // Get the latest announcement for collapsed view
  const latestAnnouncement = announcements[0];

  if (!isExpanded) {
    return (
      <Card 
        className="shadow-sm border border-gray-100 bg-white overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center p-4 gap-3">
          <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-gray-900">
                {t('announcements')}
              </h3>
              {latestAnnouncement && (
                <>
                  <span className="text-gray-400">·</span>
                  <span className="text-sm text-gray-500 truncate">
                    {latestAnnouncement.title}
                  </span>
                  {latestAnnouncement.priority === 'high' && (
                    <Badge 
                      variant="destructive" 
                      className="text-[10px] px-1.5 py-0.5 font-medium bg-red-50 text-red-600 border border-red-100"
                    >
                      {t('high')}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white overflow-hidden">
      <CardHeader 
        className="pb-4 pt-5 px-6 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
        onClick={() => setIsExpanded(false)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-base font-medium text-gray-900">
              {t('announcements')}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full hover:bg-blue-50 hover:text-blue-600"
              onClick={(e) => e.stopPropagation()}
            >
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notification settings</span>
            </Button>
            <ChevronUp className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <ScrollArea className="h-[280px] pr-3">
          {announcements.length > 0 ? (
            <div className="space-y-3">
              {announcements.map((announcement) => {
                const typeStyles = getAnnouncementTypeStyles(announcement.type);
                const IconComponent = typeStyles.icon;
                
                return (
                  <div
                    key={announcement.id}
                    className="group bg-white rounded-lg border border-gray-100 p-3 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${typeStyles.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-4 h-4 ${typeStyles.iconColor}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {announcement.title}
                          </h3>
                          <div className="flex items-center gap-2 ml-2">
                            {announcement.priority === 'high' && (
                              <Badge 
                                variant="destructive" 
                                className="text-[10px] px-1.5 py-0.5 font-medium bg-red-50 text-red-600 border border-red-100"
                              >
                                {t('high')}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2">
                          {announcement.content}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{announcement.source}</span>
                          <span>{announcement.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <Bell className="h-12 w-12 mb-3 text-gray-300" />
              <p className="text-base font-medium mb-1">{t('noAnnouncements')}</p>
              <p className="text-sm">{t('checkBackLater')}</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}