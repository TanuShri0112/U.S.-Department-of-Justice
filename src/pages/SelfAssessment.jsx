import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Target,
  Award,
  TrendingUp,
  Brain,
  Users,
  Lightbulb
} from 'lucide-react';

const SelfAssessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({});

  const assessmentQuestions = [
    {
      id: 1,
      category: 'Communication Skills',
      question: 'How confident are you in delivering clear and effective presentations to diverse audiences?',
      options: [
        { value: 5, label: 'Very Confident', description: 'I can adapt my communication style for any audience' },
        { value: 4, label: 'Confident', description: 'I generally communicate well but could improve in some areas' },
        { value: 3, label: 'Moderately Confident', description: 'I can communicate adequately in most situations' },
        { value: 2, label: 'Somewhat Confident', description: 'I struggle with certain types of communication' },
        { value: 1, label: 'Not Confident', description: 'I need significant improvement in this area' }
      ]
    },
    {
      id: 2,
      category: 'Technical Knowledge',
      question: 'How well do you understand the latest policies and procedures in your field?',
      options: [
        { value: 5, label: 'Excellent', description: 'I stay current with all updates and best practices' },
        { value: 4, label: 'Good', description: 'I have solid knowledge with minor gaps' },
        { value: 3, label: 'Average', description: 'I know the basics but need to stay more current' },
        { value: 2, label: 'Below Average', description: 'I have significant knowledge gaps' },
        { value: 1, label: 'Poor', description: 'I need extensive training in this area' }
      ]
    },
    {
      id: 3,
      category: 'Leadership Skills',
      question: 'How effectively can you lead and motivate a team through challenging situations?',
      options: [
        { value: 5, label: 'Highly Effective', description: 'I excel at leading teams through difficult circumstances' },
        { value: 4, label: 'Effective', description: 'I can lead well in most situations' },
        { value: 3, label: 'Moderately Effective', description: 'I can lead but need improvement in some areas' },
        { value: 2, label: 'Somewhat Effective', description: 'I struggle with certain leadership challenges' },
        { value: 1, label: 'Not Effective', description: 'I need significant development in leadership' }
      ]
    },
    {
      id: 4,
      category: 'Problem Solving',
      question: 'How skilled are you at analyzing complex problems and developing innovative solutions?',
      options: [
        { value: 5, label: 'Highly Skilled', description: 'I excel at breaking down complex issues and finding creative solutions' },
        { value: 4, label: 'Skilled', description: 'I can handle most problems effectively' },
        { value: 3, label: 'Moderately Skilled', description: 'I can solve problems but may need guidance on complex ones' },
        { value: 2, label: 'Somewhat Skilled', description: 'I struggle with complex problem-solving' },
        { value: 1, label: 'Not Skilled', description: 'I need significant development in this area' }
      ]
    },
    {
      id: 5,
      category: 'Communication Skills',
      question: 'How well can you handle difficult conversations with colleagues or clients?',
      options: [
        { value: 5, label: 'Very Well', description: 'I navigate difficult conversations with ease and positive outcomes' },
        { value: 4, label: 'Well', description: 'I handle most difficult conversations effectively' },
        { value: 3, label: 'Moderately Well', description: 'I can manage difficult conversations but find them challenging' },
        { value: 2, label: 'Somewhat Well', description: 'I struggle with difficult conversations' },
        { value: 1, label: 'Not Well', description: 'I need significant improvement in this area' }
      ]
    },
    {
      id: 6,
      category: 'Technical Knowledge',
      question: 'How proficient are you with the technology tools and systems used in your role?',
      options: [
        { value: 5, label: 'Expert', description: 'I am highly proficient with all required technology' },
        { value: 4, label: 'Advanced', description: 'I can use most tools effectively with minor gaps' },
        { value: 3, label: 'Intermediate', description: 'I know the basics but could improve efficiency' },
        { value: 2, label: 'Beginner', description: 'I have significant gaps in technical proficiency' },
        { value: 1, label: 'Novice', description: 'I need extensive training in technology tools' }
      ]
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Communication Skills':
        return <Users className="h-5 w-5" />;
      case 'Technical Knowledge':
        return <Brain className="h-5 w-5" />;
      case 'Leadership Skills':
        return <Target className="h-5 w-5" />;
      case 'Problem Solving':
        return <Lightbulb className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Communication Skills':
        return 'text-blue-600 bg-blue-100';
      case 'Technical Knowledge':
        return 'text-purple-600 bg-purple-100';
      case 'Leadership Skills':
        return 'text-green-600 bg-green-100';
      case 'Problem Solving':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate scores by category
    const categoryScores = {};
    const categoryCounts = {};

    assessmentQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const score = parseInt(answer);
        if (!categoryScores[question.category]) {
          categoryScores[question.category] = 0;
          categoryCounts[question.category] = 0;
        }
        categoryScores[question.category] += score;
        categoryCounts[question.category] += 1;
      }
    });

    // Calculate average scores
    const averageScores = {};
    Object.keys(categoryScores).forEach(category => {
      averageScores[category] = Math.round((categoryScores[category] / categoryCounts[category]) * 20); // Convert to percentage
    });

    setScores(averageScores);
    setShowResults(true);
  };

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;
  const isAnswered = answers[currentQuestion.id] !== undefined;

  if (showResults) {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const averageScore = Math.round(totalScore / Object.keys(scores).length);

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => navigate('/evaluation')} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Evaluation
            </Button>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Award className="h-6 w-6 text-blue-600" />
              Self-Assessment Results
            </h1>
          </div>

          {/* Overall Score */}
          <Card className="bg-white shadow-lg mb-6">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <Award className="h-16 w-16 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">
                    {averageScore}%
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Overall Assessment Score
                  </p>
                </div>
                <div className="w-full max-w-md mx-auto">
                  <Progress value={averageScore} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {Object.entries(scores).map(([category, score]) => (
              <Card key={category} className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`p-2 rounded-full ${getCategoryColor(category)}`}>
                      {getCategoryIcon(category)}
                    </div>
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-800">{score}%</span>
                    <Badge 
                      className={
                        score >= 80 ? 'bg-green-100 text-green-800' :
                        score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {score >= 80 ? 'Strong' : score >= 60 ? 'Developing' : 'Needs Improvement'}
                    </Badge>
                  </div>
                  <Progress value={score} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recommendations */}
          <Card className="bg-white shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Improvement Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(scores).map(([category, score]) => {
                  if (score < 70) {
                    return (
                      <div key={category} className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded-r-lg">
                        <h4 className="font-medium text-orange-800">{category}</h4>
                        <p className="text-sm text-orange-700">
                          Consider focusing on {category.toLowerCase()} through targeted training and practice opportunities.
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
                
                {Object.values(scores).every(score => score >= 70) && (
                  <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                    <h4 className="font-medium text-green-800">Excellent Progress!</h4>
                    <p className="text-sm text-green-700">
                      You're performing well across all areas. Continue to seek opportunities for growth and development.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate('/evaluation')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Return to Evaluation
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => navigate('/evaluation')} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Evaluation
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              Self-Assessment
            </h1>
            <p className="text-gray-600">
              Evaluate your skills and identify areas for professional development
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-white shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${getCategoryColor(currentQuestion.category)}`}>
                {getCategoryIcon(currentQuestion.category)}
              </div>
              {currentQuestion.category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentQuestion.question}
            </h2>

            <RadioGroup 
              value={answers[currentQuestion.id] || ''} 
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} className="mt-1" />
                  <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-800">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {assessmentQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestionIndex 
                    ? 'bg-blue-600' 
                    : answers[assessmentQuestions[index].id] 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex items-center gap-2 ${
              isAnswered
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === assessmentQuestions.length - 1 ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Complete Assessment
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessment;
