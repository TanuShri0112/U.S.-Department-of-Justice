import React from 'react';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  MoreVertical,
  Users,
  Clock,
  Target,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Wallet,
  FileText,
  BarChart3,
  Plus,
  Calendar
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Top row stat boxes data
const topStats = [
  {
    id: 1,
    icon: Wallet,
    iconColor: 'bg-blue-500',
    value: '25,370',
    label: 'Total Training Hours',
    trend: 'up',
    trendValue: '+12%'
  },
  {
    id: 2,
    icon: FileText,
    iconColor: 'bg-red-500',
    value: '5,370',
    label: 'Today\'s Completions',
    trend: 'down',
    trendValue: '-8%'
  },
  {
    id: 3,
    icon: Users,
    iconColor: 'bg-orange-500',
    value: '2,370',
    label: 'Active Learners',
    trend: 'down',
    trendValue: '-3%'
  },
  {
    id: 4,
    icon: CheckCircle,
    iconColor: 'bg-green-500',
    value: '863',
    label: 'Today\'s Assignments',
    trend: 'up',
    trendValue: '+15%'
  }
];

// Course enrollment data for bar chart
const enrollmentData = [
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
];

// Small spending-style boxes data
const moduleStats = [
  { label: 'Law Enforcement', value: '7,500' },
  { label: 'Community Outreach', value: '7,500' },
  { label: 'Legal Training', value: '7,500' }
];

// Today's tasks data
const todaysTasks = [
  {
    id: 1,
    title: 'Complete Law Enforcement Module 1',
    description: 'Foundations of Law Enforcement Training',
    time: '10:00 PM - 11:45 PM',
    completed: false,
    collaborators: 2
  },
  {
    id: 2,
    title: 'Review Educator Training Assessment',
    description: 'Professional Learning in Education',
    time: '2:00 PM - 3:30 PM',
    completed: false,
    collaborators: 1
  },
  {
    id: 3,
    title: 'Submit Community Outreach Report',
    description: 'Monthly progress review and documentation',
    time: '4:00 PM - 5:00 PM',
    completed: true,
    collaborators: 0
  }
];

const chartConfig = {
  enrolled: {
    label: "Enrolled",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed", 
    color: "hsl(var(--chart-2))",
  },
};

export default function EnhancedStatsSection() {
  return (
    <section className="mb-6 space-y-6">
      {/* Top Row - 4 Stat Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div
              key={stat.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${stat.iconColor} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{stat.trendValue}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Enrollment Chart - Full Width */}
      <div className="mt-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Course Enrollment</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Enrolled</span>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
            </div>
          </div>
          
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                className="text-xs text-gray-500"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs text-gray-500"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              
              <Bar 
                dataKey="enrolled" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
              <Bar 
                dataKey="completed" 
                fill="#F97316" 
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Small Stats Boxes - Above Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {moduleStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Task Section - Below Small Stats */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Today's Task</h3>
            <p className="text-sm text-gray-500">Wednesday, October 22</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        {/* Task Filters */}
        <div className="flex items-center gap-4 mb-6">
          <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            All 3
          </button>
          <button className="text-gray-500 px-3 py-1 rounded-full text-sm hover:bg-gray-100">
            Open 2
          </button>
          <button className="text-gray-500 px-3 py-1 rounded-full text-sm hover:bg-gray-100">
            Closed 1
          </button>
          <button className="text-gray-500 px-3 py-1 rounded-full text-sm hover:bg-gray-100">
            Archive
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {todaysTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <input 
                type="checkbox" 
                checked={task.completed}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800 mb-1">{task.title}</div>
                <div className="text-sm text-gray-600 mb-2">{task.description}</div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {task.time}
                  {task.collaborators > 0 && (
                    <div className="flex items-center gap-1 ml-4">
                      <div className="flex -space-x-2">
                        {Array.from({ length: task.collaborators }).map((_, i) => (
                          <div key={i} className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-white font-medium">{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}