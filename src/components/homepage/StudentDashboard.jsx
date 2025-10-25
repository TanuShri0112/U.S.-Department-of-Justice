import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, MessageSquare, Users, BarChart, Bell, ChevronRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {WelcomeSection} from './WelcomeSection';
import QuickStatsSection from './QuickStatsSection';
import TrainingSessions from '@/components/ui/TrainingSessions';
import OngoingCourses from '@/components/ui/OngoingCourses';
import TaskListSection from './TaskListSection';
import {CalendarSection} from './CalendarSection';

export function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
        {/* Main Content - Takes 2/3 of the space on large screens */}
        <div className="space-y-6 min-w-0 lg:col-span-8">
          <WelcomeSection />
          <QuickStatsSection />
          <TrainingSessions />
          <OngoingCourses />
        </div>
        
        {/* Right Column - Optimized width and spacing */}
        <div className="space-y-5 lg:col-span-4">
          <div className="lg:sticky lg:top-6 space-y-5">
            <CalendarSection />
            <TaskListSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;