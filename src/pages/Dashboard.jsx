import React from 'react';
import { StudentDashboard } from '@/components/homepage/StudentDashboard';
import { SupervisorDashboard } from '@/components/supervisor/SupervisorDashboard';
import { useRole } from '@/contexts/RoleContext';
import { ROLES } from '@/constants/roles';

const Dashboard = () => {
  const { activeRole } = useRole();

  // Show supervisor dashboard for supervisor role
  if (activeRole === ROLES.SUPERVISOR) {
    return (
      <div className="animate-fade-in">
        <SupervisorDashboard />
      </div>
    );
  }

  // Default to student/learner dashboard
  return (
    <div className="animate-fade-in">
      <StudentDashboard />
    </div>
  );
};

export default Dashboard;