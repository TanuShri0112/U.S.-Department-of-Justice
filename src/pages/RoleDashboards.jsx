import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { StudentDashboard } from '@/components/homepage/StudentDashboard';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  BarChart,
  Bar,
  Tooltip,
} from 'recharts';
import { Activity, Shield, Users, Layers } from 'lucide-react';

const ROLE_VARIANTS = {
  superAdmin: {
    title: 'Super Admin Dashboard',
    description: 'Department-wide view across all training institutes.',
    stats: [
      { label: 'Institutions Onboarded', value: '128', delta: '+6 this month' },
      { label: 'Active Learners', value: '32,450', delta: '+1,120 active' },
      { label: 'Compliance Rate', value: '96.4%', delta: '+1.8% vs last quarter' },
      { label: 'Incidents Flagged', value: '12', delta: '-4 resolved' },
    ],
    quickActions: ['Create Institute', 'View Compliance', 'Publish Advisory'],
    trendData: [
      { name: 'W1', completion: 72, compliance: 90 },
      { name: 'W2', completion: 78, compliance: 92 },
      { name: 'W3', completion: 81, compliance: 94 },
      { name: 'W4', completion: 86, compliance: 96 },
    ],
    distributionData: [
      { name: 'NCR', learners: 5200 },
      { name: 'East', learners: 8400 },
      { name: 'South', learners: 9100 },
      { name: 'West', learners: 7700 },
    ],
  },
  institutionAdmin: {
    title: 'Institution Admin Dashboard',
    description: 'Manage institute operations, enrollments, and audits.',
    stats: [
      { label: 'Active Programs', value: '24', delta: '+3 new' },
      { label: 'Pending Approvals', value: '18', delta: '5 urgent' },
      { label: 'Trainer Availability', value: '87%', delta: '12 trainers online' },
      { label: 'Compliance Score', value: '94%', delta: 'Target 95%' },
    ],
    quickActions: ['Approve Courses', 'Audit Logs', 'Notify Trainers'],
    trendData: [
      { name: 'Week 1', completion: 62, compliance: 88 },
      { name: 'Week 2', completion: 68, compliance: 90 },
      { name: 'Week 3', completion: 71, compliance: 92 },
      { name: 'Week 4', completion: 74, compliance: 94 },
    ],
    distributionData: [
      { name: 'Nurses', learners: 1200 },
      { name: 'Doctors', learners: 650 },
      { name: 'Technicians', learners: 940 },
      { name: 'Support', learners: 420 },
    ],
  },
  trainer: {
    title: 'Trainer Dashboard',
    description: 'Live sessions, cohorts, and assessment readiness.',
    stats: [
      { label: 'Upcoming Sessions', value: '5', delta: 'Next at 14:00' },
      { label: 'Active Cohorts', value: '12', delta: '3 need attention' },
      { label: 'Pending Evaluations', value: '28', delta: 'Due in 48h' },
      { label: 'Feedback Score', value: '4.7/5', delta: 'Top 10%' },
    ],
    quickActions: ['Schedule Live Class', 'Grade Assessments', 'Upload Content'],
    trendData: [
      { name: 'Mon', completion: 58, compliance: 76 },
      { name: 'Tue', completion: 65, compliance: 80 },
      { name: 'Wed', completion: 70, compliance: 84 },
      { name: 'Thu', completion: 73, compliance: 85 },
      { name: 'Fri', completion: 78, compliance: 88 },
    ],
    distributionData: [
      { name: 'Module 1', learners: 280 },
      { name: 'Module 2', learners: 310 },
      { name: 'Module 3', learners: 260 },
      { name: 'Module 4', learners: 180 },
    ],
  },
  learner: {
    title: 'Learner Dashboard',
    description: 'Personalized progress overview and quick actions.',
    stats: [
      { label: 'Assigned Courses', value: '8', delta: '3 due this week' },
      { label: 'Overall Progress', value: '62%', delta: '+12% vs last week' },
      { label: 'Certificates Earned', value: '4', delta: '2 expiring soon' },
      { label: 'Live Sessions Today', value: '1', delta: 'Join at 15:30' },
    ],
    quickActions: ['Continue Learning', 'View Certificates', 'Ask for Support'],
    trendData: [
      { name: 'Mon', completion: 40, compliance: 70 },
      { name: 'Tue', completion: 55, compliance: 74 },
      { name: 'Wed', completion: 60, compliance: 78 },
      { name: 'Thu', completion: 62, compliance: 82 },
      { name: 'Fri', completion: 65, compliance: 85 },
    ],
    distributionData: [
      { name: 'Course A', learners: 65 },
      { name: 'Course B', learners: 55 },
      { name: 'Course C', learners: 40 },
      { name: 'Course D', learners: 30 },
    ],
  },
  evaluator: {
    title: 'Evaluator Dashboard',
    description: 'Audit checklists, practical evaluations, and SLAs.',
    stats: [
      { label: 'Assessments to Review', value: '46', delta: '12 critical' },
      { label: 'Practical Audits', value: '18', delta: '5 scheduled' },
      { label: 'Evaluation SLA', value: '92%', delta: 'Target 95%' },
      { label: 'Red Flags', value: '6', delta: 'Escalate 2' },
    ],
    quickActions: ['Open Checklist', 'View Audit Log', 'Escalate Case'],
    trendData: [
      { name: 'Week 1', completion: 52, compliance: 80 },
      { name: 'Week 2', completion: 57, compliance: 83 },
      { name: 'Week 3', completion: 60, compliance: 86 },
      { name: 'Week 4', completion: 63, compliance: 88 },
    ],
    distributionData: [
      { name: 'Practical', learners: 120 },
      { name: 'Theory', learners: 180 },
      { name: 'Simulation', learners: 95 },
      { name: 'Field Visit', learners: 60 },
    ],
  },
  technicalSupport: {
    title: 'Technical Support Dashboard',
    description: 'Track uptime, tickets, and integration status.',
    stats: [
      { label: 'Active Tickets', value: '34', delta: '8 high priority' },
      { label: 'Avg Resolution', value: '2.4h', delta: '-0.3h vs last week' },
      { label: 'Platform Uptime', value: '99.91%', delta: '+0.02%' },
      { label: 'Integrations Monitoring', value: 'All systems nominal', delta: 'Last check 10 mins ago' },
    ],
    quickActions: ['View Ticket Queue', 'Run Diagnostics', 'Notify Stakeholders'],
    trendData: [
      { name: 'Mon', completion: 82, compliance: 95 },
      { name: 'Tue', completion: 85, compliance: 96 },
      { name: 'Wed', completion: 88, compliance: 97 },
      { name: 'Thu', completion: 90, compliance: 98 },
      { name: 'Fri', completion: 92, compliance: 99 },
    ],
    distributionData: [
      { name: 'Network', learners: 8 },
      { name: 'Content', learners: 12 },
      { name: 'Users', learners: 9 },
      { name: 'Integrations', learners: 5 },
    ],
  },
};

const RoleDashboardView = ({ variant }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">{variant.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{variant.description}</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {variant.stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">{stat.delta}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Weekly Performance</CardTitle>
          <p className="text-xs text-gray-500">Completion vs compliance</p>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={variant.trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <Tooltip />
              <Area type="monotone" dataKey="completion" stroke="#2563EB" fill="#DBEAFE" />
              <Area type="monotone" dataKey="compliance" stroke="#16A34A" fill="#DCFCE7" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Distribution Overview</CardTitle>
          <p className="text-xs text-gray-500">Latest snapshot</p>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={variant.distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <Tooltip />
              <Bar dataKey="learners" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Quick Actions</CardTitle>
        <p className="text-xs text-gray-500">Prototype actions for this persona</p>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {variant.quickActions.map((action) => (
          <Button key={action} variant="outline" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            {action}
          </Button>
        ))}
      </CardContent>
    </Card>
  </div>
);

const RoleDashboards = () => {
  const [role, setRole] = useState('superAdmin');
  const variant = useMemo(() => ROLE_VARIANTS[role], [role]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl">Role-Based Dashboard Preview</CardTitle>
            <p className="text-sm text-gray-500">Aligns with Department of Health & Family Welfare tender personas.</p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="superAdmin">Super Admin</SelectItem>
                <SelectItem value="institutionAdmin">Institution Admin</SelectItem>
                <SelectItem value="trainer">Trainer</SelectItem>
                <SelectItem value="learner">Learner</SelectItem>
                <SelectItem value="evaluator">Evaluator</SelectItem>
                <SelectItem value="technicalSupport">Technical Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Tender Persona Preview
          </Badge>
        </CardContent>
      </Card>

      <RoleDashboardView variant={variant} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-600" />
            Sample Learner Experience
          </CardTitle>
          <p className="text-sm text-gray-500">
            The existing learner dashboard is shown below to keep the prototype grounded in the current LMS experience.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <StudentDashboard />
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleDashboards;

