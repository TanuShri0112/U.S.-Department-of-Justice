import React, { useMemo } from 'react';
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
import { useRole } from '@/contexts/RoleContext';
import { ROLES } from '@/constants/roles';

const COURSE_ROLES = [ROLES.ADMIN, ROLES.PROGRAM_MANAGER, ROLES.TRAINER, ROLES.LEARNER];
const GROUP_ROLES = [ROLES.ADMIN, ROLES.PROGRAM_MANAGER, ROLES.TRAINER, ROLES.LEARNER, ROLES.SUPPORT];
const REPORT_ROLES = [ROLES.ADMIN, ROLES.PROGRAM_MANAGER, ROLES.EVALUATOR];
const COMMUNICATION_ROLES = [ROLES.ADMIN, ROLES.PROGRAM_MANAGER, ROLES.TRAINER, ROLES.SUPPORT];

const navItems = [
  {
    icon: Home,
    label: { en: 'Dashboard', es: 'Panel' },
    href: '/',
    allowedRoles: null,
  },
  {
    icon: BookOpen,
    label: { en: 'Courses', es: 'Cursos' },
    href: '/courses',
    allowedRoles: COURSE_ROLES,
  },
  {
    icon: Users,
    label: { en: 'Groups', es: 'Grupos' },
    href: '/groups',
    allowedRoles: GROUP_ROLES,
  },
  {
    icon: Calendar,
    label: { en: 'Calendar', es: 'Calendario' },
    href: '/calendar',
    allowedRoles: GROUP_ROLES,
  },
  {
    icon: Bell,
    label: { en: 'Announcements', es: 'Anuncios' },
    href: '/announcements',
    allowedRoles: COMMUNICATION_ROLES,
  },
  {
    icon: BarChart,
    label: { en: 'Reports', es: 'Informes' },
    href: '/reports',
    allowedRoles: REPORT_ROLES,
  },
  {
    icon: FileText,
    label: { en: 'Resources', es: 'Recursos' },
    href: '/resources',
    allowedRoles: null,
  },
  {
    icon: Video,
    label: { en: 'Webinars', es: 'Webinarios' },
    href: '/webinars',
    allowedRoles: COURSE_ROLES,
  },
  {
    icon: MessageSquare,
    label: { en: 'Messages', es: 'Mensajes' },
    href: '/messages',
    allowedRoles: COMMUNICATION_ROLES,
  },
  {
    icon: HelpCircle,
    label: { en: 'Help', es: 'Ayuda' },
    href: '/help',
    allowedRoles: null,
  }
];

export function MainNavLinks({ isCollapsed, onCloseMobile }) {
  const { currentLanguage } = useLanguage();
  const { hasAnyRole } = useRole();

  const items = useMemo(() => navItems.filter((item) => {
    if (!item.allowedRoles || item.allowedRoles.length === 0) {
      return true;
    }
    return hasAnyRole(item.allowedRoles);
  }), [hasAnyRole]);

  return (
    <div className="space-y-1 py-2">
      {items.map((item) => (
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
