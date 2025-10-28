import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  BookOpen,
  Users,
  BarChart,
  FileText,
  MessageSquare,
  HelpCircle,
  Settings,
  Calendar,
  Bell,
  Folder,
  Video
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  {
    icon: Home,
    label: { en: 'Dashboard', de: 'Dashboard' },
    href: '/'
  },
  {
    icon: BookOpen,
    label: { en: 'Courses', de: 'Kurse' },
    href: '/courses'
  },
  {
    icon: Users,
    label: { en: 'Groups', de: 'Gruppen' },
    href: '/groups'
  },
  {
    icon: Calendar,
    label: { en: 'Calendar', de: 'Kalender' },
    href: '/calendar'
  },
  {
    icon: Bell,
    label: { en: 'Announcements', de: 'Ankündigungen' },
    href: '/announcements'
  },
  {
    icon: BarChart,
    label: { en: 'Reports', de: 'Berichte' },
    href: '/reports'
  },
  {
    icon: FileText,
    label: { en: 'Resources', de: 'Ressourcen' },
    href: '/resources'
  },
  {
    icon: Video,
    label: { en: 'Webinars', de: 'Webinare' },
    href: '/webinars'
  },
  {
    icon: MessageSquare,
    label: { en: 'Messages', de: 'Nachrichten' },
    href: '/messages'
  },
  {
    icon: HelpCircle,
    label: { en: 'Help', de: 'Hilfe' },
    href: '/help'
  }
];

export function MainNavLinks({ isCollapsed, onCloseMobile }) {
  const { currentLanguage } = useLanguage();

  return (
    <div className="space-y-1 py-2">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          onClick={onCloseMobile}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 text-sm transition-colors',
              isCollapsed ? 'justify-center px-2' : 'px-4',
              isActive
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            )
          }
        >
          <item.icon className={cn('h-5 w-5 flex-shrink-0')} />
          {!isCollapsed && <span>{item.label[currentLanguage]}</span>}
        </NavLink>
      ))}
    </div>
  );
}
