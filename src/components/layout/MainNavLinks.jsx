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
    label: { en: 'Dashboard', mk: 'Контролна табла' },
    href: '/'
  },
  {
    icon: BookOpen,
    label: { en: 'Courses', mk: 'Курсеви' },
    href: '/courses'
  },
  {
    icon: Users,
    label: { en: 'Groups', mk: 'Групи' },
    href: '/groups'
  },
  {
    icon: Calendar,
    label: { en: 'Calendar', mk: 'Календар' },
    href: '/calendar'
  },
  {
    icon: Bell,
    label: { en: 'Announcements', mk: 'Известувања' },
    href: '/announcements'
  },
  {
    icon: BarChart,
    label: { en: 'Reports', mk: 'Извештаи' },
    href: '/reports'
  },
  {
    icon: FileText,
    label: { en: 'Resources', mk: 'Ресурси' },
    href: '/resources'
  },
  {
    icon: Video,
    label: { en: 'Webinars', mk: 'Вебинари' },
    href: '/webinars'
  },
  {
    icon: MessageSquare,
    label: { en: 'Messages', mk: 'Пораки' },
    href: '/messages'
  },
  {
    icon: HelpCircle,
    label: { en: 'Help', mk: 'Помош' },
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
              'flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg mx-2',
              isCollapsed ? 'justify-center px-2' : 'px-4',
              isActive
                ? 'bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-accent-foreground))] font-semibold'
                : 'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-hover))] hover:text-[hsl(var(--sidebar-accent-foreground))]'
            )
          }
        >
          <item.icon className={cn('h-5 w-5 flex-shrink-0')} />
          {!isCollapsed && <span>{item.label[currentLanguage] ?? item.label.en}</span>}
        </NavLink>
      ))}
    </div>
  );
}
