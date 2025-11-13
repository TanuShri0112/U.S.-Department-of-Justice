import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';

export const ProtectedRoute = ({ allowedRoles, fallback = '/', children }) => {
  const location = useLocation();
  const { isAuthenticated, hasAnyRole } = useRole();

  if (!isAuthenticated) {
    return <Navigate to={fallback} replace state={{ from: location }} />;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!hasAnyRole(allowedRoles)) {
      return <Navigate to="/access-denied" replace state={{ from: location }} />;
    }
  }

  return children;
};

export default ProtectedRoute;

