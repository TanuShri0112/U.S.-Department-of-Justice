import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainNavigation } from './MainNavigation';
import { ChevronLeft, Shield, GraduationCap, User } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';
import { usePortal } from '@/contexts/PortalContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const SidebarNav = ({ onCloseMobile }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { 
    isMainCollapsed, 
    setMainCollapsed
  } = useSidebar();
  
  const { portalMode, switchPortal } = usePortal();
  
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
          "flex h-20 items-center border-b border-gray-100 bg-green-600",
          isMainCollapsed ? "px-3 justify-center" : "px-6 justify-between"
        )}
      >
        <div 
          className="cursor-pointer flex items-center gap-3"
          onClick={handleLogoClick}
        >
          {isMainCollapsed ? (
              <img 
              src="/assets/Updated-dai-logo.png" 
              alt="DAI Global Logo" 
              className="w-12 h-12 object-contain"
            />
          ) : (
            <div className="flex items-center gap-4">
              <img 
                src="/assets/Updated-dai-logo.png" 
                alt="DAI Global Logo" 
                className="w-12 h-12 object-contain"
              />
              <div className="text-white">
                <h1 className="text-sm font-semibold leading-tight">DAI Global</h1>
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
      
      {/* Portal Switcher at Bottom */}
      <div className="border-t border-gray-200 p-4">
        {isMainCollapsed ? (
          renderTooltip("Switch Portal", (
            <div className="flex justify-center">
              <div 
                className="flex flex-col gap-2 w-full"
              >
                <button
                  onClick={() => switchPortal('student')}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    portalMode === 'student' 
                      ? "bg-slate-100 text-slate-700" 
                      : "hover:bg-gray-100 text-gray-600"
                  )}
                >
                  <User className="h-4 w-4" />
                </button>
                <button
                  onClick={() => switchPortal('instructor')}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    portalMode === 'instructor' 
                      ? "bg-green-100 text-green-700" 
                      : "hover:bg-gray-100 text-gray-600"
                  )}
                >
                  <GraduationCap className="h-4 w-4" />
                </button>
                <button
                  onClick={() => switchPortal('admin')}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    portalMode === 'admin' 
                      ? "bg-blue-100 text-blue-700" 
                      : "hover:bg-gray-100 text-gray-600"
                  )}
                >
                  <Shield className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Portal Mode
            </label>
            <Select value={portalMode} onValueChange={switchPortal}>
              <SelectTrigger className="w-full bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="student" className="cursor-pointer hover:bg-slate-100 focus:bg-slate-100">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-600" />
                    <span>Student Mode</span>
                  </div>
                </SelectItem>
                <SelectItem value="instructor" className="cursor-pointer hover:bg-green-50 focus:bg-green-50">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-green-600" />
                    <span>Instructor Portal</span>
                  </div>
                </SelectItem>
                <SelectItem value="admin" className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>Admin Portal</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SidebarNav;