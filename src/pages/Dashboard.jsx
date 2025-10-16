import React, { useState } from 'react';
import { StudentDashboard } from '@/components/homepage/StudentDashboard';
import { AdminPortal } from '@/components/admin/AdminPortal';
import { Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Dashboard = () => {
  const [isAdminPortalEnabled, setIsAdminPortalEnabled] = useState(false);

  // When admin portal is enabled, render it as a full-screen overlay
  if (isAdminPortalEnabled) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <AdminPortal onToggle={() => setIsAdminPortalEnabled(false)} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Admin Portal Toggle */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-[1600px] mx-auto flex justify-end">
          <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-2 border border-blue-200">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Admin Portal</span>
            <Switch
              checked={isAdminPortalEnabled}
              onCheckedChange={setIsAdminPortalEnabled}
              className="scale-90"
            />
          </div>
        </div>
      </div>
      
      <StudentDashboard />
    </div>
  );
};

export default Dashboard;