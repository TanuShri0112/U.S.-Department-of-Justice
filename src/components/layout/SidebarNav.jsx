import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';
import { MainNavLinks } from './MainNavLinks';
import { ViewModeToggle } from '@/components/ui/ViewModeToggle';

export const SidebarNav = ({ onCloseMobile }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  
  const {
    isMainCollapsed,
    setMainCollapsed,
    setAdminSectionActive,
    setAdminSidebarOpen,
    setGroupSectionActive,
    setGroupSidebarOpen,
  } = useSidebar();

  const handleLogoClick = () => {
    navigate('/');
    onCloseMobile?.();
  };

  const handleCollapseClick = () => {
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
          "flex flex-col border-b border-gray-100 bg-white",
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
                src="/assets/image.png" 
                alt="sachsen.de" 
                className="h-8 w-auto"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <img 
                  src="/assets/image.png" 
                  alt="sachsen.de" 
                  className="h-8"
                />
                <span className="text-[#0B0C0C] text-sm font-medium">sachsen.de</span>
              </div>
              <h1 className="text-sm font-medium text-[#0B0C0C] leading-tight">
                {currentLanguage === 'en' ? (
                  "Saxon State Ministry for Social Affairs"
                ) : (
                  "Sächsisches Staatsministerium für Soziales"
                )}
              </h1>
            </div>
          )}
        </div>

        {!isMainCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:bg-gray-100"
            onClick={handleCollapseClick}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto">
        <MainNavLinks isCollapsed={isMainCollapsed} onCloseMobile={onCloseMobile} />
      </div>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-gray-100">
        <div className="p-3">
          <ViewModeToggle isCollapsed={isMainCollapsed} />
        </div>
        {isMainCollapsed && (
          <div className="p-3 border-t border-gray-100">
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-10 hover:bg-gray-100"
              onClick={handleCollapseClick}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SidebarNav;