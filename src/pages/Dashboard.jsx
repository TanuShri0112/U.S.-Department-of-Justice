import React from 'react';
import { StudentDashboard } from '@/components/homepage/StudentDashboard';

const Dashboard = () => {
  return (
    <main id="main-content" className="animate-fade-in" role="main" tabIndex={-1}>
      <StudentDashboard />
    </main>
  );
};

export default Dashboard;