// IBC Tender Requirement: Add council branding to mobile app
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

/**
 * IBC Mobile Header with Council Branding
 */
export const IBCMobileHeader = ({ className }) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className={cn(
      'sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700',
      'text-white shadow-lg border-b-2 border-blue-800',
      className
    )}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-label="Ipswich Borough Council">🏛️</span>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight">Ipswich Borough</span>
            <span className="text-xs leading-tight opacity-90">Council</span>
          </div>
        </div>
        <div className="text-xs opacity-90">
          Learning Portal
        </div>
      </div>
    </div>
  );
};

/**
 * IBC Mobile Footer with Council Information
 */
export const IBCMobileFooter = ({ className }) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <footer className={cn(
      'bg-gray-900 text-white border-t-2 border-blue-600',
      'px-4 py-6 space-y-4',
      className
    )}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl" aria-label="Ipswich Borough Council">🏛️</span>
        <div>
          <div className="font-bold text-sm">Ipswich Borough Council</div>
          <div className="text-xs opacity-75">Corporate Learning Portal</div>
        </div>
      </div>
      
      <div className="text-xs space-y-1 opacity-75">
        <p>Grafton House, 15-17 Russell Road</p>
        <p>Ipswich IP1 2DE</p>
        <p className="mt-2">© {new Date().getFullYear()} Ipswich Borough Council</p>
      </div>

      <div className="pt-4 border-t border-gray-700">
        <a 
          href="/gdpr-compliance" 
          className="text-xs text-blue-400 hover:text-blue-300 underline"
        >
          Privacy & GDPR Compliance
        </a>
      </div>
    </footer>
  );
};

/**
 * IBC Mobile Branding Wrapper
 * Wraps mobile components with IBC branding
 */
export const IBCMobileBrandingWrapper = ({ children, showHeader = true, showFooter = true }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && isMobile && <IBCMobileHeader />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && isMobile && <IBCMobileFooter />}
    </div>
  );
};

export default IBCMobileBrandingWrapper;

