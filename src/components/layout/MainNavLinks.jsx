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
    label: { no: 'Kontrollpanel', en: 'Dashboard', fr: 'Tableau de bord' },
    href: '/'
  },
  {
    icon: BookOpen,
    label: { no: 'Kurs', en: 'Courses', fr: 'Cours' },
    href: '/courses'
  },
  {
    icon: Users,
    label: { no: 'Grupper', en: 'Groups', fr: 'Groupes' },
    href: '/groups'
  },
  {
    icon: Calendar,
    label: { no: 'Kalender', en: 'Calendar', fr: 'Calendrier' },
    href: '/calendar'
  },
  {
    icon: Bell,
    label: { no: 'Kunngjøringer', en: 'Announcements', fr: 'Annonces' },
    href: '/announcements'
  },
  {
    icon: BarChart,
    label: { no: 'Rapporter', en: 'Reports', fr: 'Rapports' },
    href: '/reports'
  },
  {
    icon: FileText,
    label: { no: 'Ressurser', en: 'Resources', fr: 'Ressources' },
    href: '/resources'
  },
  {
    icon: Video,
    label: { no: 'Webinarer', en: 'Webinars', fr: 'Webinaires' },
    href: '/webinars'
  },
  {
    icon: MessageSquare,
    label: { no: 'Meldinger', en: 'Messages', fr: 'Messages' },
    href: '/messages'
  },
  {
    icon: HelpCircle,
    label: { no: 'Hjelp', en: 'Help', fr: 'Aide' },
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
