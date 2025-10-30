import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { MainNavLinks } from './MainNavLinks';
import { ViewModeToggle } from '@/components/ui/ViewModeToggle';

export const SidebarNav = ({ onCloseMobile }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  
  const {
    isMainCollapsed,
  } = useSidebar();

  const handleLogoClick = () => {
    navigate('/');
    onCloseMobile?.();
  };

  const renderTooltip = (content, children) => {
    if (isMainCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-white border shadow-sm">
            {content}
          </TooltipContent>
        </Tooltip>
      );
    }
    return children;
  };
  
  return (
    <nav 
      className={cn(
        "h-full flex flex-col bg-[hsl(var(--sidebar))] border-r border-[hsl(var(--sidebar-border))] shadow-lg transition-all duration-300",
        isMainCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div 
        className={cn(
          "flex flex-col border-b border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar))]",
          isMainCollapsed ? "p-2" : "p-4"
        )}
      >
        <div 
          className="cursor-pointer flex items-center"
          onClick={handleLogoClick}
        >
          {isMainCollapsed ? (
            <div className="w-full flex justify-center">
              <img 
                src="/assets/logo.png" 
                alt="National Guard of Kazakhstan Logo" 
                className="h-10 w-auto"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/logo.png" 
                  alt="National Guard of Kazakhstan Logo" 
                  className="h-12 w-auto"
                />
              </div>
              <h1 className="text-xs font-semibold text-[hsl(var(--sidebar-foreground))] leading-tight">
                University Learning Platform
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto">
        <MainNavLinks isCollapsed={isMainCollapsed} onCloseMobile={onCloseMobile} />
      </div>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-[hsl(var(--sidebar-border))]">
        <div className="p-3">
          <ViewModeToggle isCollapsed={isMainCollapsed} />
        </div>
      </div>
    </nav>
  );
};

export default SidebarNav;