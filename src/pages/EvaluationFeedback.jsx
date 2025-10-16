import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ClipboardCheck, 
  TrendingUp, 
  Star, 
  CheckSquare,
  Users,
  Target,
  Award,
  MessageSquare,
  BarChart3,
  Clock,
  User
} from 'lucide-react';

const EvaluationFeedback = () => {
  const navigate = useNavigate();

  const handleTakeSurvey = () => {
    navigate('/survey');
  };

  const handleStartAssessment = () => {
    navigate('/self-assessment');
  };

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
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Evaluation & Feedback</h1>
          <p className="text-gray-600">Monitor your learning progress and training effectiveness.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Post-Training Surveys</h3>
                    <p className="text-sm text-gray-500">Share your training experience</p>
                  </div>
                </div>
                <Button onClick={handleTakeSurvey} className="bg-blue-600 hover:bg-blue-700">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Take Survey
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Self-Assessment</h3>
                    <p className="text-sm text-gray-500">Evaluate your skills and progress</p>
                  </div>
                </div>
                <Button onClick={handleStartAssessment} className="bg-green-600 hover:bg-green-700">
                  <Award className="h-4 w-4 mr-2" />
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Survey Completion</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.surveys.completionRate}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    {mockData.surveys.averageSatisfaction}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Responses</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.surveys.totalResponses.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Score</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.selfAssessments.averageScore}%</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills Assessment */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Skill Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.selfAssessments.improvementAreas.map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{area.topic}</span>
                    <span className="text-gray-900">{area.percentage}%</span>
                  </div>
                  <Progress value={area.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Recent Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.surveys.recentResponses.map((response) => (
                  <div key={response.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{response.course}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-900">{response.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{response.feedback}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {new Date(response.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EvaluationFeedback;