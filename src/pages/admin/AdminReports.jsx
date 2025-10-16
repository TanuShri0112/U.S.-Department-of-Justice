import React, { useState } from 'react';
import { BarChart3, Download, Filter, Calendar, TrendingUp, Users, BookOpen, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const AdminReports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Mock data for charts
  const enrollmentData = [
    { month: 'Jan', enrollments: 120, completions: 98 },
    { month: 'Feb', enrollments: 135, completions: 112 },
    { month: 'Mar', enrollments: 148, completions: 125 },
    { month: 'Apr', enrollments: 162, completions: 140 },
    { month: 'May', enrollments: 175, completions: 155 },
    { month: 'Jun', enrollments: 189, completions: 168 }
  ];

  const coursePerformanceData = [
    { course: 'Law Enforcement', enrolled: 245, completed: 198, avgScore: 87 },
    { course: 'Education', enrolled: 189, completed: 156, avgScore: 92 },
    { course: 'Youth Advocacy', enrolled: 156, completed: 134, avgScore: 85 }
  ];

  const departmentData = [
    { name: 'Police Departments', value: 45, color: '#3B82F6' },
    { name: 'Educational Institutions', value: 32, color: '#10B981' },
    { name: 'Community Organizations', value: 23, color: '#F59E0B' }
  ];

  const completionTrendData = [
    { week: 'Week 1', completions: 45 },
    { week: 'Week 2', completions: 52 },
    { week: 'Week 3', completions: 48 },
    { week: 'Week 4', completions: 61 },
    { week: 'Week 5', completions: 55 },
    { week: 'Week 6', completions: 67 }
  ];

  const handleExportPDF = () => {
    // PDF export functionality
    console.log('Exporting PDF...');
  };

  const handleExportExcel = () => {
    // Excel export functionality
    console.log('Exporting Excel...');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'enrollment', label: 'Enrollment', icon: Users },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'completion', label: 'Completion', icon: BookOpen }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administrative Reports</h1>
              <p className="text-gray-600">Comprehensive analytics and reporting dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <button
              onClick={handleExportPDF}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={handleExportExcel}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Users</p>
                      <p className="text-3xl font-bold text-blue-900">2,847</p>
                      <p className="text-sm text-blue-600">+12% from last month</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Course Completions</p>
                      <p className="text-3xl font-bold text-green-900">1,892</p>
                      <p className="text-sm text-green-600">+8% from last month</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Active Courses</p>
                      <p className="text-3xl font-bold text-purple-900">24</p>
                      <p className="text-sm text-purple-600">3 new this month</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Avg. Completion Time</p>
                      <p className="text-3xl font-bold text-orange-900">12.5h</p>
                      <p className="text-sm text-orange-600">-2.3h improvement</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="enrollments" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="completions" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Enrollment Tab */}
          {activeTab === 'enrollment' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment by Course</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={coursePerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="course" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="enrolled" fill="#3B82F6" name="Enrolled" />
                    <Bar dataKey="completed" fill="#10B981" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Enrollment Sources</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Direct Registration</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Department Referral</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Email Campaign</span>
                      <span className="font-medium">23%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Geographic Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Northeast</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Southwest</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Midwest</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">West Coast</span>
                      <span className="font-medium">25%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Enrollment Trends</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-medium text-green-600">+15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="font-medium text-blue-600">+8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">3-Month Avg</span>
                      <span className="font-medium text-purple-600">+12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance Metrics</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Course</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Enrolled</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Completed</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Completion Rate</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Avg Score</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Avg Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coursePerformanceData.map((course, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-900">{course.course}</td>
                          <td className="py-3 px-4 text-gray-600">{course.enrolled}</td>
                          <td className="py-3 px-4 text-gray-600">{course.completed}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              (course.completed / course.enrolled * 100) >= 80 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {Math.round(course.completed / course.enrolled * 100)}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{course.avgScore}%</td>
                          <td className="py-3 px-4 text-gray-600">12.5h</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Performance Trends</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={completionTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="completions" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Score Distribution</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">90-100%</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '35%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">80-89%</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '42%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">70-79%</span>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '18%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Below 70%</span>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{width: '5%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Completion Tab */}
          {activeTab === 'completion' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Overall Completion Rate</p>
                      <p className="text-3xl font-bold text-green-900">78%</p>
                      <p className="text-sm text-green-600">+5% from last month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Avg. Time to Complete</p>
                      <p className="text-3xl font-bold text-blue-900">12.5h</p>
                      <p className="text-sm text-blue-600">-2.3h improvement</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Certificates Issued</p>
                      <p className="text-3xl font-bold text-purple-900">1,847</p>
                      <p className="text-sm text-purple-600">+12% from last month</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Timeline</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={completionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completions" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Completion by Department</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Police Departments</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Educational Institutions</span>
                      <span className="font-medium">76%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Community Organizations</span>
                      <span className="font-medium">71%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Completion Factors</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Course Difficulty</span>
                      <span className="font-medium">High Impact</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Time Availability</span>
                      <span className="font-medium">Medium Impact</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Support Quality</span>
                      <span className="font-medium">High Impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
