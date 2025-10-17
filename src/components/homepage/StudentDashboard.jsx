import React from 'react';
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

export function StudentDashboard() {
  const navigate = useNavigate();

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
              onClick={() => navigate('/notifications')}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;