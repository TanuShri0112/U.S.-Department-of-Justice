import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PortalContext = createContext(undefined);

export function PortalProvider({ children }) {
  // Portal modes: 'student', 'instructor', 'admin'
  const [portalMode, setPortalMode] = useState('student');

  const switchPortal = (mode) => {
    setPortalMode(mode);
    
    // If switching to student mode, navigate to dashboard
    if (mode === 'student') {
      // Use setTimeout to ensure navigation happens after state update
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
  };

  const closePortal = () => {
    setPortalMode('student');
    // Navigate to dashboard when closing portal
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  const isInstructorPortal = portalMode === 'instructor';
  const isAdminPortal = portalMode === 'admin';
  const isStudentMode = portalMode === 'student';

  return (
    <PortalContext.Provider
      value={{
        portalMode,
        setPortalMode,
        switchPortal,
        closePortal,
        isInstructorPortal,
        isAdminPortal,
        isStudentMode,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (context === undefined) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}

