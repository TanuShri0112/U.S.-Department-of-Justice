import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, School, Shield } from 'lucide-react';
import { usePortal } from '@/contexts/PortalContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function ViewModeToggle({ isCollapsed }) {
  const { portalMode, switchPortal } = usePortal();
  const { currentLanguage } = useLanguage();

  const modes = {
    student: {
      icon: School,
      label: { mr: 'विद्यार्थी दृष्टी', en: 'Student View' },
      color: 'text-[hsl(var(--sidebar-foreground))]'
    },
    instructor: {
      icon: Users,
      label: { mr: 'प्रशिक्षक दृष्टी', en: 'Instructor View' },
      color: 'text-[hsl(var(--sidebar-foreground))]'
    },
    admin: {
      icon: Shield,
      label: { mr: 'प्रशासक दृष्टी', en: 'Admin View' },
      color: 'text-[hsl(var(--sidebar-foreground))]'
    },
  };

  const CurrentIcon = modes[portalMode]?.icon || School;

  if (isCollapsed) {
    return (
      <div className="px-2">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "w-10 h-10 rounded-lg hover:bg-[hsl(var(--sidebar-hover))]",
                modes[portalMode]?.color
              )}
            >
              <CurrentIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-48">
            <DropdownMenuItem 
              onClick={() => switchPortal('student')}
              className="flex items-center gap-2"
            >
              <School className="h-4 w-4 text-green-600" />
              <span>{modes.student.label[currentLanguage] ?? modes.student.label.mr ?? modes.student.label.en}</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => switchPortal('instructor')}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4 text-blue-600" />
              <span>{modes.instructor.label[currentLanguage] ?? modes.instructor.label.mr ?? modes.instructor.label.en}</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => switchPortal('admin')}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4 text-purple-600" />
              <span>{modes.admin.label[currentLanguage] ?? modes.admin.label.mr ?? modes.admin.label.en}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="px-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start gap-2 h-10 rounded-lg hover:bg-[hsl(var(--sidebar-hover))]",
              modes[portalMode]?.color
            )}
          >
            <CurrentIcon className="h-5 w-5" />
            <span className="text-[hsl(var(--sidebar-foreground))]">
              {modes[portalMode]?.label[currentLanguage] ?? modes[portalMode]?.label.mr ?? modes[portalMode]?.label.en}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem 
            onClick={() => switchPortal('student')}
            className="flex items-center gap-2"
          >
            <School className="h-4 w-4 text-green-600" />
            <span>{modes.student.label[currentLanguage] ?? modes.student.label.en}</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => switchPortal('instructor')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4 text-blue-600" />
            <span>{modes.instructor.label[currentLanguage] ?? modes.instructor.label.en}</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => switchPortal('admin')}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4 text-purple-600" />
            <span>{modes.admin.label[currentLanguage] ?? modes.admin.label.en}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}