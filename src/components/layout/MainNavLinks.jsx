import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  BookOpen,
  GraduationCap,
  FileText,
  MessageSquare,
  Bot,
  BookText
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const navItems = [
  {
    icon: Home,
    label: { 
      en: 'Home', 
      mr: 'मुख्यपृष्ठ',
      mk: 'मुख्यपृष्ठ' 
    },
    href: '/'
  },
  {
    icon: BookText,
    label: { 
      en: 'Syllabus', 
      mr: 'अभ्यासक्रम',
      mk: 'अभ्यासक्रम' 
    },
    href: '/syllabus'
  },
  {
    icon: GraduationCap,
    label: { 
      en: 'Successive Pathway', 
      mr: 'क्रमिक मार्ग',
      mk: 'क्रमिक मार्ग' 
    },
    href: '/pathway'
  },
  {
    icon: BookOpen,
    label: { 
      en: 'My Course Catalogue | माझे अभ्यासक्रम', 
      mr: 'माझे अभ्यासक्रम',
      mk: 'माझे अभ्यासक्रम' 
    },
    href: '/courses'
  },
  {
    icon: Bot,
    label: { 
      en: 'Chatbot', 
      mr: 'चॅटबॉट',
      mk: 'चॅटबॉट' 
    },
    href: '/chatbot'
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
                : 'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-hover))] hover:text-[hsl(var(--sidebar-foreground))]'
            )
          }
        >
          <item.icon className={cn('h-5 w-5 flex-shrink-0')} />
          {!isCollapsed && <span>{item.label[currentLanguage] ?? item.label.mr ?? item.label.en}</span>}
        </NavLink>
      ))}
    </div>
  );
}
