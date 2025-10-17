import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, MessageSquare, Users, BarChart, Bell, ChevronRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {WelcomeSection} from './WelcomeSection';
import QuickStatsSection from './QuickStatsSection';
import TeachingCoursesSection from './TeachingCoursesSection';
import ZoomClassesSection from './ZoomClassesSection';
import TaskListSection from './TaskListSection';
import {AnnouncementSection} from './AnnouncementSection';
import {CalendarSection} from './CalendarSection';
import WidgetsSection from './WidgetsSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';

export function StudentDashboard() {
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { t, language } = useTranslation();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      titleKey: 'notifNewCourseTitle',
      descKey: 'notifNewCourseDesc',
      time: { value: 5, unit: 'minute' },
      color: 'bg-blue-50',
      dot: 'bg-blue-500',
      read: false
    },
    {
      id: 2,
      titleKey: 'notifAssignmentGradedTitle',
      descKey: 'notifAssignmentGradedDesc',
      time: { value: 1, unit: 'hour' },
      color: 'bg-green-50',
      dot: 'bg-green-500',
      read: false
    },
    {
      id: 3,
      titleKey: 'notifReminderTitle',
      descKey: 'notifReminderDesc',
      time: { value: 30, unit: 'minute' },
      color: 'bg-yellow-50',
      dot: 'bg-yellow-500',
      read: false
    }
  ]);

  const formatRelativeTime = (timeObj) => {
    const { value, unit } = timeObj;
    try {
      const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });
      // Use negative value to represent time in the past
      return rtf.format(-value, unit);
    } catch {
      // Fallback simple strings
      if (language === 'es') {
        if (unit === 'minute') return `hace ${value} minuto${value === 1 ? '' : 's'}`;
        if (unit === 'hour') return `hace ${value} hora${value === 1 ? '' : 's'}`;
        return `hace ${value}`;
      }
      if (unit === 'minute') return `${value} minute${value === 1 ? '' : 's'} ago`;
      if (unit === 'hour') return `${value} hour${value === 1 ? '' : 's'} ago`;
      return `${value} ago`;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl animate-pulse [animation-delay:700ms]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
        {/* Top header bar */}
        <div className="lg:col-span-12">
          <div className="flex items-center justify-between rounded-2xl border bg-white/70 backdrop-blur px-4 sm:px-6 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white shadow-sm">Student Dashboard</span>
              <span className="hidden sm:inline text-slate-600">Have a productive day!</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2 hover:shadow-sm" onClick={() => navigate('/calendar')}>
                <Calendar className="h-4 w-4" /> Calendar
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md" onClick={() => navigate('/tasks')}>
                <Plus className="h-4 w-4" /> New Task
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content - Takes 2/3 of the space on large screens */}
        <div className="space-y-6 min-w-0 lg:col-span-8">
          <div className="transition-shadow hover:shadow-lg rounded-2xl">
            <WelcomeSection />
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              className="group rounded-xl border bg-white/70 backdrop-blur px-4 py-3 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              onClick={() => navigate('/courses')}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-slate-800">Browse Courses</div>
                <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="mt-1 text-sm text-slate-500">Find your next lesson</div>
            </button>
            <button
              className="group rounded-xl border bg-white/70 backdrop-blur px-4 py-3 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              onClick={() => navigate('/messages')}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-slate-800">Messages</div>
                <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="mt-1 text-sm text-slate-500">Connect with instructors</div>
            </button>
            <button
              className="group rounded-xl border bg-white/70 backdrop-blur px-4 py-3 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              onClick={() => setIsNotificationsOpen(true)}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-slate-800">Notifications</div>
                <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="mt-1 text-sm text-slate-500">Stay up to date</div>
            </button>
          </div>

          <div className="transition-shadow hover:shadow-lg rounded-2xl">
            <QuickStatsSection />
          </div>
          <div className="transition-shadow hover:shadow-lg rounded-2xl">
            <TeachingCoursesSection />
          </div>
          <div className="transition-shadow hover:shadow-lg rounded-2xl">
            <ZoomClassesSection />
          </div>
        </div>
        
        {/* Right Column - Optimized width and spacing */}
        <div className="space-y-5 lg:col-span-4">
          <div className="lg:sticky lg:top-6 space-y-5">
            <div className="transition-shadow hover:shadow-lg rounded-2xl">
              <CalendarSection />
            </div>
            <div className="transition-shadow hover:shadow-lg rounded-2xl">
              <TaskListSection />
            </div>
            <div className="transition-shadow hover:shadow-lg rounded-2xl">
              <AnnouncementSection />
            </div>
            <div className="transition-shadow hover:shadow-lg rounded-2xl">
              <WidgetsSection />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" /> {t('notificationsTitle')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className={`rounded-lg p-4 border border-gray-100 ${n.read ? 'bg-gray-50' : n.color}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${n.read ? 'bg-gray-300' : n.dot}`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${n.read ? 'text-gray-600' : 'text-gray-800'}`}>{t(n.titleKey)}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{t(n.descKey)}</p>
                    <p className={`text-xs mt-2 ${n.read ? 'text-gray-400' : 'text-blue-600'}`}>{formatRelativeTime(n.time)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-4 w-full rounded-lg border bg-white text-gray-700 hover:bg-gray-50 py-2 text-sm font-semibold transition-colors"
            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
          >
            {t('markAllAsRead')}
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentDashboard;