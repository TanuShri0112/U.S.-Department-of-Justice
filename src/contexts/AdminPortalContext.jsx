import React, { createContext, useContext, useState } from 'react';

const AdminPortalContext = createContext(undefined);

export function AdminPortalProvider({ children }) {
  const [isAdminPortalEnabled, setIsAdminPortalEnabled] = useState(false);

  const toggleAdminPortal = () => {
    setIsAdminPortalEnabled(!isAdminPortalEnabled);
  };

  const closeAdminPortal = () => {
    setIsAdminPortalEnabled(false);
  };

  return (
    <AdminPortalContext.Provider
      value={{
        isAdminPortalEnabled,
        setIsAdminPortalEnabled,
        toggleAdminPortal,
        closeAdminPortal,
      }}
    >
      {children}
    </AdminPortalContext.Provider>
  );
}

export function useAdminPortal() {
  const context = useContext(AdminPortalContext);
  if (context === undefined) {
    throw new Error('useAdminPortal must be used within an AdminPortalProvider');
  }
  return context;
}
