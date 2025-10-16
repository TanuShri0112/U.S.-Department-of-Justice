import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainNavigation } from './MainNavigation';
import { ChevronLeft, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAdminPortal } from '@/contexts/AdminPortalContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const SidebarNav = ({ onCloseMobile }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { 
    isMainCollapsed, 
    setMainCollapsed
  } = useSidebar();
  
  const { isAdminPortalEnabled, setIsAdminPortalEnabled } = useAdminPortal();
  
  const handleClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    if (isMainCollapsed) {
      setMainCollapsed(false);
    }
  };

  const toggleCollapsed = () => {
    setMainCollapsed(!isMainCollapsed);
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
  
  // Check if we're in unit creator mode
  const isUnitCreator = pathname.includes('/units/creator');
  
  return (
    <nav 
      className={cn(
        "h-full flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300",
        isMainCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div 
        className={cn(
          "flex h-20 items-center border-b border-gray-100 bg-blue-600",
          isMainCollapsed ? "px-3 justify-center" : "px-6 justify-between"
        )}
      >
        <div 
          className="cursor-pointer flex items-center gap-3"
          onClick={handleLogoClick}
        >
          {isMainCollapsed ? (
            <img 
              src="/assets/Image_20251016_124608_576-removebg-preview.png" 
              alt="DOJ Logo" 
              className="w-12 h-12 object-contain"
            />
          ) : (
            <div className="flex items-center gap-4">
              <img 
                src="/assets/Image_20251016_124608_576-removebg-preview.png" 
                alt="DOJ Logo" 
                className="w-12 h-12 object-contain"
              />
              <div className="text-white">
                <h1 className="text-lg font-semibold leading-tight">U.S. Department of Justice</h1>
              </div>
            </div>
          )}
        </div>

        {!isMainCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Navigation content */}
      <div className="flex-1 overflow-y-auto py-4">
        <MainNavigation pathname={pathname} onItemClick={handleClick} />
      </div>
      
      {/* Admin Portal Toggle at Bottom */}
      <div className="border-t border-gray-200 p-4">
        {renderTooltip("Admin Portal", (
          <div className={cn(
            "flex items-center gap-3 bg-blue-50 rounded-lg px-3 py-2 border border-blue-200 hover:bg-blue-100 transition-colors",
            isMainCollapsed && "justify-center px-2"
          )}>
            <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" />
            {!isMainCollapsed && (
              <span className="text-sm font-medium text-blue-700 flex-1">Admin Portal</span>
            )}
            <Switch
              checked={isAdminPortalEnabled}
              onCheckedChange={setIsAdminPortalEnabled}
              className="scale-75"
            />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default SidebarNav;