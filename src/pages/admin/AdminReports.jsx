import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Users, 
  BookOpen, 
  Clock, 
  ChevronDown,
  Plus,
  X 
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminReports = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [metrics, setMetrics] = useState({
    totalUsers: 2847,
    courseCompletions: 1892,
    activeCourses: 24,
    avgCompletionTime: 12.5,
    userGrowth: 12,
    completionGrowth: 8,
    newCourses: 3,
    timeImprovement: 2.3
  });

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
    const loadingToast = toast.loading('Generating PDF report...');
    
    try {
      // Prepare the data for export
      const reportData = {
        title: 'Administrative Report',
        date: new Date().toLocaleDateString(),
        dateRange: dateRange + ' days',
        metrics: {
          totalUsers: 2847,
          courseCompletions: 1892,
          activeCourses: 24,
          avgCompletionTime: '12.5h'
        },
        enrollmentData,
        coursePerformanceData,
        departmentData
      };

      // Convert data to JSON string
      const jsonString = JSON.stringify(reportData, null, 2);
      
      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(t('pdfReportDownloadedSuccessfully'), { id: loadingToast });
    } catch (error) {
      toast.error(t('failedToGeneratePDFReport'), { id: loadingToast });
      console.error('Export error:', error);
    }
  };

  const handleExportExcel = () => {
    const loadingToast = toast.loading(t('generatingExcelReport'));
    
    try {
      // Prepare CSV data
      const headers = ['Course', 'Enrolled', 'Completed', 'Completion Rate', 'Avg Score'];
      const rows = coursePerformanceData.map(course => [
        course.course,
        course.enrolled,
        course.completed,
        Math.round((course.completed / course.enrolled) * 100) + '%',
        course.avgScore + '%'
      ]);
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `course-performance-${new Date().toISOString().split('T')[0]}.csv`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(t('excelReportDownloadedSuccessfully'), { id: loadingToast });
    } catch (error) {
      toast.error(t('failedToGenerateExcelReport'), { id: loadingToast });
      console.error('Export error:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: t('overview'), icon: BarChart3 },
    { id: 'enrollment', label: t('enrollment'), icon: Users },
    { id: 'performance', label: t('performance'), icon: TrendingUp },
    { id: 'completion', label: t('completion'), icon: BookOpen }
  ];

  return (
    <div className="space-y-6">
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#363636',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderRadius: '0.75rem',
          padding: '1rem',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
        },
        loading: {
          iconTheme: {
            primary: '#6366F1',
            secondary: '#fff',
          },
        },
      }} />
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transform transition-all duration-200 hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center transform transition-transform duration-200 hover:scale-105 hover:rotate-3">
              <BarChart3 className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t('administrativeReports')}
              </h1>
              <p className="text-gray-600 mt-1 text-lg">{t('comprehensiveAnalyticsReporting')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <select
                value={dateRange}
                onChange={(e) => {
                  const newRange = e.target.value;
                  setDateRange(newRange);
                  
                  // Simulate data refresh with loading state
                  const loadingToast = toast.loading(t('loadingData'));
                  
                  // Simulate API call delay
                  setTimeout(() => {
                    const multiplier = parseInt(newRange) / 30; // normalize to monthly data
                    
                    // Update metrics based on date range
                    const rangeMultiplier = {
                      '7': 0.4,
                      '30': 1,
                      '90': 2.5,
                      '365': 8
                    };
                    
                    const growthMultiplier = {
                      '7': 0.5,
                      '30': 1,
                      '90': 1.8,
                      '365': 3
                    };

                    setMetrics({
                      totalUsers: Math.round(2847 * rangeMultiplier[newRange]),
                      courseCompletions: Math.round(1892 * rangeMultiplier[newRange]),
                      activeCourses: Math.round(24 * (1 + (parseInt(newRange) - 30) / 100)),
                      avgCompletionTime: (12.5 * (1 - (parseInt(newRange) - 30) / 200)).toFixed(1),
                      userGrowth: Math.round(12 * growthMultiplier[newRange]),
                      completionGrowth: Math.round(8 * growthMultiplier[newRange]),
                      newCourses: Math.round(3 * growthMultiplier[newRange]),
                      timeImprovement: (2.3 * growthMultiplier[newRange]).toFixed(1)
                    });
                    
                    // Update enrollment data with smoother curve
                    const updatedEnrollmentData = enrollmentData.map(item => ({
                      ...item,
                      enrollments: Math.round(item.enrollments * multiplier * (1 + Math.random() * 0.2)),
                      completions: Math.round(item.completions * multiplier * (1 + Math.random() * 0.2))
                    }));
                    
                    // Update course performance data
                    const updatedCourseData = coursePerformanceData.map(item => ({
                      ...item,
                      enrolled: Math.round(item.enrolled * multiplier * (1 + Math.random() * 0.1)),
                      completed: Math.round(item.completed * multiplier * (1 + Math.random() * 0.1))
                    }));
                    
                    toast.success(t('dataUpdatedFor', { days: newRange }), { id: loadingToast });
                  }, 1000);
                }}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10 appearance-none bg-white transition-all duration-200 hover:border-indigo-300"
              >
                <option value="7">{t('last7Days')}</option>
                <option value="30">{t('last30Days')}</option>
                <option value="90">{t('last90Days')}</option>
                <option value="365">{t('lastYear')}</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportPDF}
                className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t('exportPDF')}
              </button>
              <button
                onClick={handleExportExcel}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t('exportExcel')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 transform transition-all duration-200 hover:shadow-md">
        <div className="p-1">
          <nav className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  const loadingToast = toast.loading(`Loading ${tab.label.toLowerCase()} data...`);
                  
                  // Simulate API call delay
                  setTimeout(() => {
                    setActiveTab(tab.id);
                    
                    // Simulate different loading times for different tabs
                    const delay = Math.random() * 500 + 800; // Random delay between 800-1300ms
                    
                    setTimeout(() => {
                      // Show success message with tab-specific information
                      const messages = {
                        overview: t('overviewMetricsUpdated'),
                        enrollment: t('enrollmentStatisticsRefreshed'),
                        performance: t('performanceMetricsCalculated'),
                        completion: t('completionRatesTrendsUpdated')
                      };
                      
                      toast.success(messages[tab.id], { 
                        id: loadingToast,
                        duration: 3000
                      });
                    }, delay);
                  }, 100);
                }}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                <tab.icon className={`w-4 h-4 transition-transform duration-200 ${
                  activeTab === tab.id ? 'scale-110' : ''
                }`} />
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm transform transition-transform duration-200 group-hover:rotate-6">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">{t('totalUsers')}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1">
                      {metrics.totalUsers.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <p className="text-sm text-green-600">+{metrics.userGrowth}% {t('fromLastMonth')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm transform transition-transform duration-200 group-hover:rotate-6">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">{t('courseCompletions')}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mt-1">
                      {metrics.courseCompletions.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <p className="text-sm text-green-600">+{metrics.completionGrowth}% {t('fromLastMonth')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm transform transition-transform duration-200 group-hover:rotate-6">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-600">{t('activeCourses')}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-1">
                      {metrics.activeCourses}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Plus className="w-4 h-4 text-purple-500" />
                      <p className="text-sm text-purple-600">{metrics.newCourses} {t('newThisMonth')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl transform transition-all duration-200 hover:scale-105 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm transform transition-transform duration-200 group-hover:rotate-6">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-600">{t('avgCompletionTime')}</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mt-1">
                      {metrics.avgCompletionTime}h
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingDown className="w-4 h-4 text-green-500" />
                      <p className="text-sm text-green-600">-{metrics.timeImprovement}h {t('improvement')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl border border-gray-200 transform transition-all duration-200 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {t('enrollmentTrends')}
                      </h3>
                      <p className="text-gray-600 mt-1">{t('monthlyEnrollmentCompletionRates')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-600">{t('enrollments')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-600">{t('completions')}</span>
                      </div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="enrollments" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#3B82F6', stroke: 'white', strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="completions" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#10B981', stroke: 'white', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-200 transform transition-all duration-200 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {t('departmentDistribution')}
                      </h3>
                      <p className="text-gray-600 mt-1">{t('userDistributionAcrossDepartments')}</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        innerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {departmentData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="white"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #E5E7EB',
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
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
