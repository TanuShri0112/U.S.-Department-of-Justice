import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertCircle, Info, CheckCircle, Calendar } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

export function AnnouncementSection() {
  const navigate = useNavigate();
  
  const announcements = [
    {
      id: 1,
      title: 'New Law Enforcement Module Available',
      source: 'DOJ Training Coordinator',
      time: '2 hours ago',
      content: 'Advanced Law Enforcement Training Module 2: Stakeholder Analysis & Needs Assessment is now available for enrollment.',
      type: 'course',
      priority: 'high',
      course: 'Law Enforcement'
    },
    {
      id: 2,
      title: 'Educator Training Office Hours',
      source: 'Education Specialist',
      time: '1 day ago',
      content: 'Office hours will be held Tuesday and Thursday from 2-4 PM for educator training consultation and support.',
      type: 'general',
      priority: 'medium',
      course: 'Education'
    },
    {
      id: 3,
      title: 'Youth Advocate Certification Deadline',
      source: 'Training Manager',
      time: '3 days ago',
      content: 'Youth Advocate Training Module 1 final assessment is due next Friday. Complete all required modules to earn certification.',
      type: 'deadline',
      priority: 'high',
      course: 'Youth Development'
    },
    {
      id: 4,
      title: 'DOJ Compliance Updates Workshop',
      source: 'Legal Training Department',
      time: '5 days ago',
      content: 'Join our upcoming workshop on latest Department of Justice compliance requirements and regulatory updates.',
      type: 'workshop',
      priority: 'medium',
      course: 'Law Enforcement'
    },
    {
      id: 5,
      title: 'Professional Development Survey',
      source: 'Training Evaluation Team',
      time: '1 week ago',
      content: 'Please complete the training effectiveness survey to help us improve our professional development programs.',
      type: 'survey',
      priority: 'low',
      course: 'General'
    }
  ];

  const handleViewAllAnnouncements = () => {
    navigate('/announcements');
  };

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


  return (
    <Card className="shadow-lg border-0 bg-white overflow-hidden">
      <CardHeader className="pb-4 pt-5 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-3 text-slate-800 font-bold">
            <div className="p-2 bg-blue-500 rounded-lg shadow-md">
              <Bell className="h-5 w-5 text-white" />
            </div>
            Announcements
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 hover:scale-110">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notification settings</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <ScrollArea className="h-[280px] pr-3">
          {announcements.length > 0 ? (
            <div className="space-y-4">
              {announcements.slice(0, 4).map((announcement) => {
                const typeStyles = getAnnouncementTypeStyles(announcement.type);
                const IconComponent = typeStyles.icon;
                
                return (
                  <div
                    key={announcement.id}
                    className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${typeStyles.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-4 h-4 ${typeStyles.iconColor}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                            {announcement.title}
                          </h3>
                          <div className="flex items-center gap-2 ml-2">
                            {announcement.priority === 'high' && (
                              <Badge variant="destructive" className="text-xs">High</Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              {announcement.time}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {announcement.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <Bell className="h-12 w-12 mb-3 text-gray-300" />
              <p className="text-base font-medium mb-1">No announcements</p>
              <p className="text-sm">Check back later for updates</p>
            </div>
          )}
        </ScrollArea>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-300 font-semibold border-gray-200 rounded-lg"
          onClick={handleViewAllAnnouncements}
        >
          View All Announcements
        </Button>
      </CardContent>
    </Card>
  );
}