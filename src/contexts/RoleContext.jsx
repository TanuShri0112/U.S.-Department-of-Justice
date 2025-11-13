import React, { createContext, useContext, useMemo, useState } from 'react';
import { ROLES, ALL_ROLES } from '@/constants/roles';

const RoleContext = createContext(undefined);

const DEFAULT_USER = {
  id: 'demo-user',
  firstName: 'Elena',
  lastName: 'García',
  email: 'elena.garcia@athena-lms.eu',
  roles: [ROLES.ADMIN, ROLES.PROGRAM_MANAGER, ROLES.TRAINER],
  organization: 'Athena LMS',
};

export function RoleProvider({ children, initialUser = DEFAULT_USER }) {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [activeRole, setActiveRole] = useState(() => initialUser.roles?.[0] ?? ROLES.LEARNER);

  const assumeRole = (role) => {
    if (!currentUser?.roles?.includes(role)) {
      console.warn(`Attempted to assume unavailable role: ${role}`);
      return;
    }
    setActiveRole(role);
  };

  const updateUserRoles = (roles) => {
    const sanitizedRoles = roles.filter((role) => ALL_ROLES.includes(role));
    setCurrentUser((prev) => ({
      ...prev,
      roles: sanitizedRoles.length > 0 ? sanitizedRoles : prev.roles,
    }));
    if (!sanitizedRoles.includes(activeRole) && sanitizedRoles.length > 0) {
      setActiveRole(sanitizedRoles[0]);
    }
  };

  const hasRole = (role) => Boolean(currentUser?.roles?.includes(role));
  const hasAnyRole = (roles) => roles.some((role) => hasRole(role));

  const value = useMemo(
    () => ({
      currentUser,
      activeRole,
      assumeRole,
      hasRole,
      hasAnyRole,
      updateUserRoles,
      setCurrentUser,
      isAuthenticated: Boolean(currentUser),
    }),
    [currentUser, activeRole],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

