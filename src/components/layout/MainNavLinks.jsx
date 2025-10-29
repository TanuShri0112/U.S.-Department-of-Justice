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
  Video,
  Scan
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  {
    icon: Home,
    label: { en: 'Dashboard', ru: 'Панель управления' },
    href: '/'
  },
  {
    icon: Scan,
    label: { en: 'B-Scan Demo', ru: 'Демо B-Scan' },
    href: '/bscan-demo'
  },
  {
    icon: BookOpen,
    label: { en: 'Courses', ru: 'Курсы' },
    href: '/courses'
  },
  {
    icon: Users,
    label: { en: 'Groups', ru: 'Группы' },
    href: '/groups'
  },
  {
    icon: Calendar,
    label: { en: 'Calendar', ru: 'Календарь' },
    href: '/calendar'
  },
  {
    icon: Bell,
    label: { en: 'Announcements', ru: 'Объявления' },
    href: '/announcements'
  },
  {
    icon: BarChart,
    label: { en: 'Reports', ru: 'Отчеты' },
    href: '/reports'
  },
  {
    icon: FileText,
    label: { en: 'Resources', ru: 'Ресурсы' },
    href: '/resources'
  },
  {
    icon: Video,
    label: { en: 'Webinars', ru: 'Вебинары' },
    href: '/webinars'
  },
  {
    icon: MessageSquare,
    label: { en: 'Messages', ru: 'Сообщения' },
    href: '/messages'
  },
  {
    icon: HelpCircle,
    label: { en: 'Help', ru: 'Помощь' },
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
          {!isCollapsed && <span>{item.label[currentLanguage]}</span>}
        </NavLink>
      ))}
    </div>
  );
}
