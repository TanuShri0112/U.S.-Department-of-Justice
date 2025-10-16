import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3,
  Users,
  Target,
  Award,
  ThumbsUp,
  MessageSquare,
  Calendar,
  Filter,
  Download,
  TrendingUp,
  Star,
  CheckSquare
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const DEAAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for DEA Admin
  const mockData = {
    adminMetrics: {
      surveyCompletion: 87,
      averageSatisfaction: 4.2,
      totalAssessments: 892,
      improvementRate: 23
    },
    satisfactionTrends: [
      { month: 'Jan', satisfaction: 3.8, completion: 72 },
      { month: 'Feb', satisfaction: 4.0, completion: 75 },
      { month: 'Mar', satisfaction: 3.9, completion: 78 },
      { month: 'Apr', satisfaction: 4.2, completion: 82 },
      { month: 'May', satisfaction: 4.3, completion: 85 },
      { month: 'Jun', satisfaction: 4.1, completion: 87 }
    ],
    coursePerformance: [
      { course: 'Law Enforcement', satisfaction: 4.7, completion: 95, enrollments: 245 },
      { course: 'Educator Training', satisfaction: 4.0, completion: 88, enrollments: 189 },
      { course: 'Community Outreach', satisfaction: 4.8, completion: 92, enrollments: 156 },
      { course: 'Ethics Training', satisfaction: 3.8, completion: 76, enrollments: 134 },
      { course: 'Leadership Dev', satisfaction: 4.3, completion: 89, enrollments: 98 }
    ],
    surveyResults: [
      { id: 1, course: 'Law Enforcement Training', rating: 4.5, responses: 245, date: '2024-01-15' },
      { id: 2, course: 'Educator Training', rating: 4.0, responses: 189, date: '2024-01-14' },
      { id: 3, course: 'Community Outreach', rating: 4.8, responses: 156, date: '2024-01-13' },
      { id: 4, course: 'Ethics Training', rating: 3.8, responses: 134, date: '2024-01-12' },
      { id: 5, course: 'Leadership Development', rating: 4.3, responses: 98, date: '2024-01-11' }
    ],
    selfAssessmentTrends: [
      { month: 'Jan', completions: 145, avgScore: 78 },
      { month: 'Feb', completions: 167, avgScore: 82 },
      { month: 'Mar', completions: 189, avgScore: 79 },
      { month: 'Apr', completions: 203, avgScore: 85 },
      { month: 'May', completions: 178, avgScore: 81 },
      { month: 'Jun', completions: 156, avgScore: 83 }
    ],
    recommendations: [
      {
        type: 'attention',
        title: 'Communication Skills Module',
        description: 'Low satisfaction scores (3.2/5) - Consider updating content and adding more interactive exercises.',
        priority: 'High',
        action: 'Review and update module content'
      },
      {
        type: 'success',
        title: 'Law Enforcement Training',
        description: 'High satisfaction scores (4.7/5) - Consider expanding this successful program.',
        priority: 'Low',
        action: 'Scale program to additional regions'
      },
      {
        type: 'improvement',
        title: 'Self-Assessment Completion',
        description: 'Increase completion rates by adding progress reminders and incentives.',
        priority: 'Medium',
        action: 'Implement automated reminders'
      }
    ]
  };

  const getRecommendationStyles = (type) => {
    switch (type) {
      case 'attention':
        return {
          border: 'border-orange-500',
          bg: 'bg-orange-50',
          title: 'text-orange-800',
          desc: 'text-orange-700',
          priority: 'bg-orange-100 text-orange-800'
        };
      case 'success':
        return {
          border: 'border-green-500',
          bg: 'bg-green-50',
          title: 'text-green-800',
          desc: 'text-green-700',
          priority: 'bg-green-100 text-green-800'
        };
      case 'improvement':
        return {
          border: 'border-blue-500',
          bg: 'bg-blue-50',
          title: 'text-blue-800',
          desc: 'text-blue-700',
          priority: 'bg-blue-100 text-blue-800'
        };
      default:
        return {
          border: 'border-gray-500',
          bg: 'bg-gray-50',
          title: 'text-gray-800',
          desc: 'text-gray-700',
          priority: 'bg-gray-100 text-gray-800'
        };
    }
  };

  // Heatmap component
  const CourseHeatmap = () => {
    const getHeatmapColor = (value, maxValue) => {
      const intensity = value / maxValue;
      if (intensity >= 0.8) return 'bg-green-600';
      if (intensity >= 0.6) return 'bg-green-500';
      if (intensity >= 0.4) return 'bg-yellow-500';
      if (intensity >= 0.2) return 'bg-orange-500';
      return 'bg-red-500';
    };

    const maxSatisfaction = Math.max(...mockData.coursePerformance.map(c => c.satisfaction));
    const maxCompletion = Math.max(...mockData.coursePerformance.map(c => c.completion));

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-6 gap-2 text-xs">
          <div></div>
          <div className="text-center font-medium">Jan</div>
          <div className="text-center font-medium">Feb</div>
          <div className="text-center font-medium">Mar</div>
          <div className="text-center font-medium">Apr</div>
          <div className="text-center font-medium">May</div>
        </div>
        {mockData.coursePerformance.map((course, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 items-center">
            <div className="text-xs font-medium truncate">{course.course}</div>
            {[4.7, 4.0, 4.8, 3.8, 4.3].map((value, monthIndex) => (
              <div
                key={monthIndex}
                className={`h-8 rounded flex items-center justify-center text-white text-xs font-medium ${getHeatmapColor(value, 5)}`}
                title={`${course.course} - ${value}/5.0`}
              >
                {value.toFixed(1)}
              </div>
            ))}
          </div>
        ))}
        <div className="flex items-center gap-4 text-xs text-gray-600 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Low (1.0-2.0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>Below Avg (2.0-3.0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Average (3.0-4.0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Good (4.0-4.5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded"></div>
            <span>Excellent (4.5+)</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          Feedback Reports
        </h1>
        <p className="text-gray-600">
          Review aggregated learner feedback and impact metrics for training effectiveness.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Survey Completion</p>
                <p className="text-3xl font-bold text-gray-900">{mockData.adminMetrics.surveyCompletion}%</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Satisfaction</p>
                <p className="text-3xl font-bold text-gray-900">{mockData.adminMetrics.averageSatisfaction}/5</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Self-Assessments</p>
                <p className="text-3xl font-bold text-gray-900">{mockData.adminMetrics.totalAssessments}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Improvement Rate</p>
                <p className="text-3xl font-bold text-gray-900">+{mockData.adminMetrics.improvementRate}%</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="surveys" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Survey Results
          </TabsTrigger>
          <TabsTrigger value="assessments" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Assessment Trends
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Charts & Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Satisfaction Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.satisfactionTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[3, 5]} />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'satisfaction' ? `${value}/5.0` : `${value}%`,
                          name === 'satisfaction' ? 'Satisfaction' : 'Completion Rate'
                        ]}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="satisfaction" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Satisfaction"
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="completion" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        name="Completion %"
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Course Performance Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-auto">
                  <CourseHeatmap />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-orange-600" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recommendations.map((rec, index) => {
                  const styles = getRecommendationStyles(rec.type);
                  return (
                    <div key={index} className={`border-l-4 ${styles.border} pl-4 py-2 ${styles.bg} rounded-r-lg`}>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${styles.title}`}>{rec.title}</h4>
                        <Badge className={styles.priority}>{rec.priority}</Badge>
                      </div>
                      <p className={`text-sm ${styles.desc} mb-2`}>{rec.description}</p>
                      <p className={`text-xs ${styles.desc} font-medium`}>Action: {rec.action}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Survey Results Tab */}
        <TabsContent value="surveys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Survey Results Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.surveyResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{result.course}</h4>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{result.rating}/5</span>
                        </div>
                        <Badge variant="outline">{result.responses} responses</Badge>
                        <Badge variant="secondary" className="text-xs">
                          {new Date(result.date).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(result.rating / 5) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assessment Trends Tab */}
        <TabsContent value="assessments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Assessment Completion Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.selfAssessmentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'completions' ? value : `${value}%`,
                          name === 'completions' ? 'Completions' : 'Average Score'
                        ]}
                      />
                      <Legend />
                      <Bar 
                        dataKey="completions" 
                        fill="#3b82f6" 
                        name="Completions"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Average Score Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.selfAssessmentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 90]} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Average Score']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="avgScore" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        name="Average Score"
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Detailed Assessment Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.selfAssessmentTrends.map((trend, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{trend.month} 2024</h4>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{trend.completions} completions</Badge>
                        <Badge className="bg-green-100 text-green-800">
                          {trend.avgScore}% avg score
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Completions</span>
                          <span>{trend.completions}</span>
                        </div>
                        <Progress value={(trend.completions / 250) * 100} className="h-1" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Average Score</span>
                          <span>{trend.avgScore}%</span>
                        </div>
                        <Progress value={trend.avgScore} className="h-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Filters & Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            Export & Analysis Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Filter by Date
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Filter by Course
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Excel
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DEAAdmin;
