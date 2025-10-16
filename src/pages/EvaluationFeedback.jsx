import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ClipboardCheck, 
  TrendingUp, 
  Star, 
  CheckSquare, 
  BarChart3,
  Users,
  Target,
  Award,
  ThumbsUp,
  MessageSquare,
  Calendar,
  Filter,
  Download
} from 'lucide-react';

const EvaluationFeedback = () => {
  const [activeTab, setActiveTab] = useState('learner');

  // Mock data for demonstration
  const mockData = {
    surveys: {
      completionRate: 87,
      averageSatisfaction: 4.2,
      totalResponses: 1247,
      recentResponses: [
        { id: 1, course: 'Law Enforcement Training', rating: 4.5, date: '2024-01-15', feedback: 'Excellent course content and practical examples.' },
        { id: 2, course: 'Educator Training', rating: 4.0, date: '2024-01-14', feedback: 'Very helpful for understanding student needs.' },
        { id: 3, course: 'Community Outreach', rating: 4.8, date: '2024-01-13', feedback: 'Outstanding program with real-world applications.' }
      ]
    },
    selfAssessments: {
      totalAssessments: 892,
      averageScore: 78,
      improvementAreas: [
        { topic: 'Communication Skills', percentage: 65 },
        { topic: 'Technical Knowledge', percentage: 82 },
        { topic: 'Leadership Skills', percentage: 71 },
        { topic: 'Problem Solving', percentage: 88 }
      ]
    },
    adminMetrics: {
      surveyCompletion: 87,
      averageSatisfaction: 4.2,
      totalAssessments: 892,
      improvementRate: 23
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <ClipboardCheck className="h-8 w-8 text-blue-600" />
          Evaluation & Feedback
        </h1>
        <p className="text-gray-600">
          Track learner progress, collect feedback, and analyze training effectiveness.
        </p>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="learner" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Learner View
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            DEA Admin View
          </TabsTrigger>
        </TabsList>

        {/* Learner View Tab */}
        <TabsContent value="learner" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Post-Training Surveys */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Post-Training Surveys
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <Badge variant="secondary">{mockData.surveys.completionRate}%</Badge>
                </div>
                
                <Progress value={mockData.surveys.completionRate} className="h-2" />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Average Satisfaction</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{mockData.surveys.averageSatisfaction}/5.0</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Responses</span>
                    <span className="font-medium">{mockData.surveys.totalResponses.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Take Survey
                </Button>
              </CardContent>
            </Card>

            {/* Self-Assessment Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Self-Assessment Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Score</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {mockData.selfAssessments.averageScore}%
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Improvement Areas</h4>
                  {mockData.selfAssessments.improvementAreas.map((area, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>{area.topic}</span>
                        <span>{area.percentage}%</span>
                      </div>
                      <Progress value={area.percentage} className="h-1" />
                    </div>
                  ))}
                </div>

                <Button className="w-full">
                  <Award className="h-4 w-4 mr-2" />
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Survey Responses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Recent Survey Responses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.surveys.recentResponses.map((response) => (
                  <div key={response.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{response.course}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{response.rating}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {new Date(response.date).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{response.feedback}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DEA Admin View Tab */}
        <TabsContent value="admin" className="space-y-6">
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
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Chart visualization would go here</p>
                    <p className="text-sm text-gray-400">Monthly satisfaction trends</p>
                  </div>
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
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Heatmap visualization would go here</p>
                    <p className="text-sm text-gray-400">Course/module performance metrics</p>
                  </div>
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
                <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded-r-lg">
                  <h4 className="font-medium text-orange-800">Communication Skills Module</h4>
                  <p className="text-sm text-orange-700">
                    Low satisfaction scores (3.2/5) - Consider updating content and adding more interactive exercises.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                  <h4 className="font-medium text-green-800">Law Enforcement Training</h4>
                  <p className="text-sm text-green-700">
                    High satisfaction scores (4.7/5) - Consider expanding this successful program.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                  <h4 className="font-medium text-blue-800">Self-Assessment Completion</h4>
                  <p className="text-sm text-blue-700">
                    Increase completion rates by adding progress reminders and incentives.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EvaluationFeedback;
