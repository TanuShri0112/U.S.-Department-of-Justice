import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Target, BarChart3, MessageSquare, Sparkles, ArrowRight, BarChart as IconBarChart } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';

const enrollmentTrend = [
  { month: 'Jan', enroll: 120, complete: 92 },
  { month: 'Feb', enroll: 150, complete: 110 },
  { month: 'Mar', enroll: 180, complete: 140 },
  { month: 'Apr', enroll: 210, complete: 170 },
  { month: 'May', enroll: 240, complete: 200 }
];

const prePostData = [
  { name: 'Module 1', pre: 62, post: 81 },
  { name: 'Module 2', pre: 58, post: 79 },
  { name: 'Module 3', pre: 64, post: 84 }
];

const engagementByRegion = [
  { region: 'Kenya', value: 78 },
  { region: 'Bangladesh', value: 66 },
  { region: 'Philippines', value: 72 },
  { region: 'Nepal', value: 59 }
];

const sentimentTrend = [
  { week: 'W1', positive: 62, neutral: 28, negative: 10 },
  { week: 'W2', positive: 64, neutral: 27, negative: 9 },
  { week: 'W3', positive: 66, neutral: 25, negative: 9 },
  { week: 'W4', positive: 69, neutral: 23, negative: 8 }
];

const KPI = ({ icon: Icon, label, value, accent = 'text-green-600' }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-5 flex items-center justify-between">
      <div className="space-y-1">
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <Icon className={`h-6 w-6 ${accent}`} />
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="p-2 md:p-0 space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <Card className="overflow-hidden border-0 shadow-sm">
        <CardContent className="p-6 md:p-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 md:p-8">
            <div className="absolute right-6 top-6 opacity-30">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/80 mb-2">MEL Insights</div>
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">Welcome to DAI Global Dashboard</h1>
                <p className="text-white/90 mt-2 text-sm md:text-base max-w-2xl">
                  Track learning progress and program impact with indicators, outcomes, and evidence logs.
                </p>
              </div>
              <div className="flex gap-3">
                <a href="/courses" className="inline-flex items-center gap-2 bg-white text-green-700 px-4 py-2 rounded-full font-semibold shadow hover:shadow-md transition">
                  Browse Modules <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/reports" className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/20 text-white px-4 py-2 rounded-full font-semibold border border-white/30 transition">
                  Open Reports <IconBarChart className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPI icon={Users} label="Enrollments (YTD)" value={"1,245"} />
        <KPI icon={Target} label="Completion Rate" value={"82%"} />
        <KPI icon={BarChart3} label="Avg. Assessment Score" value={"78%"} />
      </div>

      {/* Clean Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Progress</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="enroll" stroke="#16a34a" name="Enrollments" />
                  <Line type="monotone" dataKey="complete" stroke="#059669" name="Completions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle>Pre vs Post Assessments</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prePostData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pre" fill="#94a3b8" name="Pre" />
                  <Bar dataKey="post" fill="#16a34a" name="Post" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Participation by Region</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" name="Participation" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment from Reflections</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sentimentTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="positive" stroke="#10b981" name="Positive" />
                  <Line type="monotone" dataKey="neutral" stroke="#94a3b8" name="Neutral" />
                  <Line type="monotone" dataKey="negative" stroke="#ef4444" name="Negative" />
                </LineChart>
              </ResponsiveContainer>
              <div className="text-xs text-gray-500 mt-3">Simulated sentiment over time; supports qualitative analysis.</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;