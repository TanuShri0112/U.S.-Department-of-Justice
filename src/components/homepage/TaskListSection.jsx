import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export function TaskListSection() {
  const [tasks] = useState([
    {
      id: 1,
      title: 'Confirm SSO metadata with Parliament HRIS',
      description: 'Exchange entityID, ACS URL, signing certificate, and RBAC mapping for Admin / Recruiter / Trainer / Learner / Manager.',
      dueDate: 'Week 1',
      owner: 'Security + HRIS',
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'POPIA consent + audit logging baseline',
      description: 'Enable consent banner, retention rules, and audit export for POPIA/GDPR with SIEM feed confirmation.',
      dueDate: 'Week 1',
      owner: 'Compliance',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Recruitment workflow (F7–F11) definition',
      description: 'Post → screening → interview scheduling → offer with equity metrics and talent pool tagging.',
      dueDate: 'Week 2',
      owner: 'Recruitment',
      status: 'planned'
    },
    {
      id: 4,
      title: 'LMS learning paths & certificates (F1–F6)',
      description: 'Publish compliance modules, expiry alerts, certificate templates, and mobile validation.',
      dueDate: 'Week 3',
      owner: 'LMS',
      status: 'planned'
    },
    {
      id: 5,
      title: 'Analytics pack for governance committees',
      description: 'Time-to-fill, completion %, POPIA consent export, PDF/Excel templates for quarterly reporting.',
      dueDate: 'Week 4',
      owner: 'Analytics',
      status: 'planned'
    }
  ]);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'in-progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'planned':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'done':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDueDate = (dateString) => {
    if (dateString.includes('Week')) return dateString;
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTodayDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <Card className="border-0 shadow-lg bg-white overflow-hidden">
      <CardHeader className="pb-4 pt-5 px-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800 mb-1">
              Next delivery actions
            </CardTitle>
            <p className="text-sm text-gray-500">{getTodayDate()}</p>
          </div>
        </div>

        {/* Task Count */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-600">All Tasks</span>
          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
            {tasks.length}
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {/* Task Cards */}
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {task.description}
                    </p>
                    
                    {/* Task Details */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-gray-700">
                        <Clock className="h-3 w-3" />
                        <span>Due: {formatDueDate(task.dueDate)}</span>
                      </span>
                      <span className="px-2 py-1 rounded-full bg-slate-50 text-gray-700 border border-slate-200">
                        Owner: {task.owner}
                      </span>
                      <span className={`px-2 py-1 rounded-full border ${getStatusStyles(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}

export default TaskListSection;
