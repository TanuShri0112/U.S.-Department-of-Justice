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
  MessageSquare
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

      {/* Learner View Content */}
      <div className="space-y-6">
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

                <Button className="w-full" variant="outline" onClick={handleTakeSurvey}>
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

                <Button className="w-full" onClick={handleStartAssessment}>
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
      </div>
    </div>
  );
};

export default EvaluationFeedback;
