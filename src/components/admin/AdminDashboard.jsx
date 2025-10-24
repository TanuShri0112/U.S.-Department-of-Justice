import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, FileText, BarChart as BarChartIcon, Settings, Bell, HelpCircle, DollarSign, TrendingUp, CreditCard } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Training Hours', value: '25,370', icon: FileText, change: '+12%', changeType: 'increase' },
    { label: "Today's Completions", value: '5,370', icon: BookOpen, change: '-8%', changeType: 'decrease' },
    { label: 'Active Learners', value: '2,370', icon: Users, change: '-3%', changeType: 'decrease' },
    { label: "Today's Assignments", value: '863', icon: FileText, change: '+15%', changeType: 'increase' },
    { label: 'Performance', value: '72%', icon: TrendingUp, change: '+23%', changeType: 'increase' },
    { label: 'Total Revenue', value: '$45,678', icon: DollarSign, change: '+18%', changeType: 'increase' },
    { label: 'Monthly Revenue', value: '$12,345', icon: TrendingUp, change: '+8%', changeType: 'increase' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'purchased "DOJ Training" course', time: '2 minutes ago', amount: '$299.99' },
    { id: 2, user: 'Jane Smith', action: 'completed "Introduction to React"', time: '1 hour ago' },
    { id: 3, user: 'Mike Johnson', action: 'uploaded a new resource', time: '3 hours ago' },
    { id: 4, user: 'Sarah Williams', action: 'purchased "Training Catalogue"', time: '5 hours ago', amount: '$199.99' },
    { id: 5, user: 'David Brown', action: 'commented on a discussion', time: '1 day ago' },
  ];

  const chartData = [
    { name: 'Jan', users: 4000, courses: 2400, revenue: 8500 },
    { name: 'Feb', users: 3000, courses: 1398, revenue: 9200 },
    { name: 'Mar', users: 2000, courses: 9800, revenue: 10800 },
    { name: 'Apr', users: 2780, courses: 3908, revenue: 12300 },
    { name: 'May', users: 1890, courses: 4800, revenue: 14500 },
    { name: 'Jun', users: 2390, courses: 3800, revenue: 16700 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Course Enrollment</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { month: 'Jan', enrolled: 120, completed: 85 },
                  { month: 'Feb', enrolled: 95, completed: 70 },
                  { month: 'Mar', enrolled: 140, completed: 110 },
                  { month: 'Apr', enrolled: 110, completed: 95 },
                  { month: 'May', enrolled: 160, completed: 125 },
                  { month: 'Jun', enrolled: 180, completed: 145 },
                  { month: 'Jul', enrolled: 200, completed: 165 },
                  { month: 'Aug', enrolled: 175, completed: 150 },
                  { month: 'Sep', enrolled: 190, completed: 160 },
                  { month: 'Oct', enrolled: 220, completed: 180 },
                  { month: 'Nov', enrolled: 210, completed: 175 },
                  { month: 'Dec', enrolled: 240, completed: 200 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrolled" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user} <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                      {activity.amount && (
                        <span className="text-sm font-semibold text-green-600">{activity.amount}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;