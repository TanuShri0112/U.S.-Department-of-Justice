import React, { useState } from 'react';
import { MessageSquare, Star, TrendingUp, Users, Download, Filter, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminFeedbackReports = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30');
  const [metrics, setMetrics] = useState({
    avgSatisfaction: 4.3,
    totalResponses: 1247,
    responseRate: 78,
    positiveSentiment: 72,
    satisfactionChange: 0.2,
    responseGrowth: 15,
    rateChange: 3,
    sentimentChange: 5
  });

  // Mock data for feedback analytics
  const satisfactionData = [
    { month: 'Jan', rating: 4.2, responses: 145 },
    { month: 'Feb', rating: 4.3, responses: 162 },
    { month: 'Mar', rating: 4.4, responses: 178 },
    { month: 'Apr', rating: 4.3, responses: 195 },
    { month: 'May', rating: 4.5, responses: 203 },
    { month: 'Jun', rating: 4.4, responses: 189 }
  ];

  const feedbackCategories = [
    { category: 'Content Quality', positive: 78, negative: 12, neutral: 10 },
    { category: 'Instructor Performance', positive: 85, negative: 8, neutral: 7 },
    { category: 'Course Structure', positive: 72, negative: 15, neutral: 13 },
    { category: 'Technical Issues', positive: 68, negative: 22, neutral: 10 },
    { category: 'Learning Materials', positive: 81, negative: 9, neutral: 10 }
  ];

  const courseFeedback = [
    { course: 'Law Enforcement', rating: 4.5, reviews: 234, improvements: 12 },
    { course: 'Education', rating: 4.3, reviews: 189, improvements: 8 },
    { course: 'Youth Advocacy', rating: 4.2, reviews: 156, improvements: 15 }
  ];

  const sentimentData = [
    { name: 'Positive', value: 72, color: '#10B981' },
    { name: 'Neutral', value: 18, color: '#F59E0B' },
    { name: 'Negative', value: 10, color: '#EF4444' }
  ];

  const responseTrendData = [
    { week: 'Week 1', responses: 45, completion: 89 },
    { week: 'Week 2', responses: 52, completion: 92 },
    { week: 'Week 3', responses: 48, completion: 87 },
    { week: 'Week 4', responses: 61, completion: 94 },
    { week: 'Week 5', responses: 55, completion: 91 },
    { week: 'Week 6', responses: 67, completion: 96 }
  ];

  const recentFeedback = [
    {
      id: 1,
      user: 'Sarah Johnson',
      course: 'Law Enforcement Training',
      rating: 5,
      comment: 'Excellent course content and very practical examples. The instructor was knowledgeable and engaging.',
      date: '2024-01-15',
      sentiment: 'positive'
    },
    {
      id: 2,
      user: 'Mike Chen',
      course: 'Education Training',
      rating: 4,
      comment: 'Good overall, but some technical issues with the video playback. Content was relevant and useful.',
      date: '2024-01-14',
      sentiment: 'neutral'
    },
    {
      id: 3,
      user: 'Lisa Rodriguez',
      course: 'Youth Advocacy',
      rating: 3,
      comment: 'The course was okay, but I expected more interactive elements. Some modules felt too theoretical.',
      date: '2024-01-13',
      sentiment: 'negative'
    }
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp className="w-4 h-4" />;
      case 'negative': return <ThumbsDown className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'overview', label: t('overview'), icon: TrendingUp },
    { id: 'satisfaction', label: t('satisfaction'), icon: Star },
    { id: 'categories', label: t('categories'), icon: MessageSquare },
    { id: 'courses', label: t('courses'), icon: Users }
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
            primary: '#EC4899',
            secondary: '#fff',
          },
        },
        loading: {
          iconTheme: {
            primary: '#EC4899',
            secondary: '#fff',
          },
        },
      }} />
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('feedbackReports')}</h1>
              <p className="text-gray-600">{t('analyzeLearnerFeedback')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => {
                const newRange = e.target.value;
                setDateRange(newRange);
                
                // Simulate data refresh with loading state
                const loadingToast = toast.loading(t('loadingFeedbackData'));
                
                setTimeout(() => {
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
                    avgSatisfaction: (4.3 * (1 + (Math.random() * 0.1 - 0.05))).toFixed(1),
                    totalResponses: Math.round(1247 * rangeMultiplier[newRange]),
                    responseRate: Math.min(100, Math.round(78 * (1 + (Math.random() * 0.1 - 0.05)))),
                    positiveSentiment: Math.min(100, Math.round(72 * (1 + (Math.random() * 0.1 - 0.05)))),
                    satisfactionChange: (0.2 * growthMultiplier[newRange]).toFixed(1),
                    responseGrowth: Math.round(15 * growthMultiplier[newRange]),
                    rateChange: Math.round(3 * growthMultiplier[newRange]),
                    sentimentChange: Math.round(5 * growthMultiplier[newRange])
                  });

                  toast.success(t('dataUpdatedFor', { days: newRange }), { id: loadingToast });
                }, 1000);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 hover:border-pink-400 transition-colors cursor-pointer"
            >
              <option value="7">{t('last7Days')}</option>
              <option value="30">{t('last30Days')}</option>
              <option value="90">{t('last90Days')}</option>
              <option value="365">{t('lastYear')}</option>
            </select>
            <button 
              onClick={() => {
                const loadingToast = toast.loading(t('preparingExport'));
                
                setTimeout(() => {
                  try {
                    // Prepare export data
                    const exportData = {
                      reportDate: new Date().toISOString(),
                      dateRange: `Last ${dateRange} days`,
                      metrics: {
                        avgSatisfaction: metrics.avgSatisfaction,
                        totalResponses: metrics.totalResponses,
                        responseRate: metrics.responseRate,
                        positiveSentiment: metrics.positiveSentiment
                      },
                      satisfactionTrend: satisfactionData,
                      feedbackCategories,
                      courseFeedback,
                      recentFeedback
                    };

                    // Create and download file
                    const jsonString = JSON.stringify(exportData, null, 2);
                    const blob = new Blob([jsonString], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `feedback-report-${new Date().toISOString().split('T')[0]}.json`;
                    
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);

                    toast.success(t('reportExportedSuccessfully'), { id: loadingToast });
                  } catch (error) {
                    toast.error(t('failedToExportReport'), { id: loadingToast });
                    console.error('Export error:', error);
                  }
                }, 1500);
              }}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all duration-200 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4" />
              {t('export')}
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
                onClick={() => {
                  const loadingToast = toast.loading(t('loadingData'));
                  
                  setTimeout(() => {
                    setActiveTab(tab.id);
                    
                    // Simulate different loading times for different tabs
                    const delay = Math.random() * 500 + 800; // Random delay between 800-1300ms
                    
                    setTimeout(() => {
                      // Show success message with tab-specific information
                      const messages = {
                        overview: t('overviewMetricsUpdated'),
                        satisfaction: t('satisfactionMetricsRefreshed'),
                        categories: t('categoryAnalysisUpdated'),
                        courses: t('courseFeedbackDataLoaded')
                      };
                      
                      toast.success(messages[tab.id], { 
                        id: loadingToast,
                        duration: 3000
                      });
                    }, delay);
                  }, 100);
                }}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
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
                <div className="bg-pink-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-pink-600">{t('avgSatisfaction')}</p>
                      <p className="text-3xl font-bold text-pink-900">{metrics.avgSatisfaction}/5</p>
                      <p className="text-sm text-pink-600">+{metrics.satisfactionChange} {t('fromLastMonth')}</p>
                    </div>
                    <Star className="w-8 h-8 text-pink-600" />
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg transform transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">{t('totalResponses')}</p>
                      <p className="text-3xl font-bold text-green-900">{metrics.totalResponses.toLocaleString()}</p>
                      <p className="text-sm text-green-600">+{metrics.responseGrowth}% {t('fromLastMonth')}</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg transform transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">{t('responseRate')}</p>
                      <p className="text-3xl font-bold text-blue-900">{metrics.responseRate}%</p>
                      <p className="text-sm text-blue-600">+{metrics.rateChange}% {t('fromLastMonth')}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg transform transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">{t('positiveSentiment')}</p>
                      <p className="text-3xl font-bold text-purple-900">{metrics.positiveSentiment}%</p>
                      <p className="text-sm text-purple-600">+{metrics.sentimentChange}% {t('fromLastMonth')}</p>
                    </div>
                    <ThumbsUp className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('satisfactionTrend')}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={satisfactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[3.5, 5]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="rating" stroke="#EC4899" fill="#EC4899" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Feedback */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
                <div className="space-y-4">
                  {recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {feedback.user.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{feedback.user}</p>
                            <p className="text-sm text-gray-600">{feedback.course}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getSentimentColor(feedback.sentiment)}`}>
                            {feedback.sentiment}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{feedback.comment}</p>
                      <p className="text-xs text-gray-500">{feedback.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Satisfaction Tab */}
          {activeTab === 'satisfaction' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfaction Over Time</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={satisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.5, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rating" stroke="#EC4899" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Rating Distribution</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">5 Stars</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">4 Stars</span>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{width: '32%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">3 Stars</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{width: '15%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">2 Stars</span>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{width: '5%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">1 Star</span>
                        <span className="text-sm font-medium">3%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{width: '3%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Response Trends</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={responseTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="responses" fill="#EC4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback by Category</h3>
                <div className="space-y-6">
                  {feedbackCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{category.category}</h4>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600">+{category.positive}%</span>
                          <span className="text-yellow-600">~{category.neutral}%</span>
                          <span className="text-red-600">-{category.negative}%</span>
                        </div>
                      </div>
                      <div className="flex h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500 h-full" 
                          style={{width: `${category.positive}%`}}
                          title={`Positive: ${category.positive}%`}
                        ></div>
                        <div 
                          className="bg-yellow-500 h-full" 
                          style={{width: `${category.neutral}%`}}
                          title={`Neutral: ${category.neutral}%`}
                        ></div>
                        <div 
                          className="bg-red-500 h-full" 
                          style={{width: `${category.negative}%`}}
                          title={`Negative: ${category.negative}%`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Top Positive Feedback</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-700">"Excellent course content and very practical examples."</p>
                      <p className="text-xs text-gray-500 mt-1">Content Quality</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-700">"Instructor was knowledgeable and engaging throughout."</p>
                      <p className="text-xs text-gray-500 mt-1">Instructor Performance</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-700">"Great learning materials and resources provided."</p>
                      <p className="text-xs text-gray-500 mt-1">Learning Materials</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Areas for Improvement</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-700">"Technical issues with video playback need fixing."</p>
                      <p className="text-xs text-gray-500 mt-1">Technical Issues</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-700">"Course structure could be more interactive."</p>
                      <p className="text-xs text-gray-500 mt-1">Course Structure</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-700">"Some modules felt too theoretical."</p>
                      <p className="text-xs text-gray-500 mt-1">Content Quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Feedback Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Course</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Reviews</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Improvements</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courseFeedback.map((course, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-900">{course.course}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-medium">{course.rating}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{course.reviews}</td>
                          <td className="py-3 px-4 text-gray-600">{course.improvements}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              course.rating >= 4.3 
                                ? 'bg-green-100 text-green-700' 
                                : course.rating >= 4.0
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {course.rating >= 4.3 ? 'Excellent' : course.rating >= 4.0 ? 'Good' : 'Needs Improvement'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Recommendations</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">Improve technical infrastructure for better video streaming</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">Add more interactive elements to course structure</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">Provide additional practical examples in theoretical modules</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Success Factors</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-700">High-quality content with practical examples</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-700">Engaging and knowledgeable instructors</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-700">Comprehensive learning materials</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Action Items</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-700">Fix video playback technical issues</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-700">Develop interactive course modules</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-700">Enhance practical application sections</p>
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

export default AdminFeedbackReports;
