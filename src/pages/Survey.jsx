import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Star,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';

const Survey = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const surveyQuestions = [
    {
      id: 1,
      type: 'rating',
      question: 'How satisfied are you with the overall training experience?',
      required: true,
      options: [
        { value: 5, label: 'Very Satisfied', icon: '😊' },
        { value: 4, label: 'Satisfied', icon: '🙂' },
        { value: 3, label: 'Neutral', icon: '😐' },
        { value: 2, label: 'Dissatisfied', icon: '😕' },
        { value: 1, label: 'Very Dissatisfied', icon: '😞' }
      ]
    },
    {
      id: 2,
      type: 'multiple_choice',
      question: 'Which aspect of the training was most valuable to you?',
      required: true,
      options: [
        'Practical exercises and simulations',
        'Theoretical knowledge and concepts',
        'Interactive discussions and case studies',
        'Assessment and feedback sessions',
        'Peer learning and collaboration'
      ]
    },
    {
      id: 3,
      type: 'rating',
      question: 'How would you rate the quality of the course materials?',
      required: true,
      options: [
        { value: 5, label: 'Excellent', icon: '⭐' },
        { value: 4, label: 'Good', icon: '⭐' },
        { value: 3, label: 'Average', icon: '⭐' },
        { value: 2, label: 'Below Average', icon: '⭐' },
        { value: 1, label: 'Poor', icon: '⭐' }
      ]
    },
    {
      id: 4,
      type: 'multiple_choice',
      question: 'How likely are you to recommend this training to others?',
      required: true,
      options: [
        'Very likely',
        'Likely',
        'Neutral',
        'Unlikely',
        'Very unlikely'
      ]
    },
    {
      id: 5,
      type: 'text',
      question: 'What suggestions do you have for improving the training program?',
      required: false,
      placeholder: 'Please share your thoughts and suggestions...'
    }
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
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
    setShowResults(true);
    // Here you would typically send the survey data to your backend
    console.log('Survey responses:', answers);
  };

  const currentQuestion = surveyQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100;
  const isAnswered = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== '';

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => navigate('/evaluation')} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Evaluation
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Survey Complete!</h1>
          </div>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Thank You!
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Your feedback has been successfully submitted.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    Your responses help us improve our training programs and better serve our community.
                  </p>
                </div>

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
            </CardContent>
          </Card>
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
              <MessageSquare className="h-6 w-6 text-blue-600" />
              Training Feedback Survey
            </h1>
            <p className="text-gray-600">
              Help us improve our training programs by sharing your experience
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {surveyQuestions.length}
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
              <div className="p-2 bg-blue-100 rounded-full">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              Survey Question
              {currentQuestion.required && (
                <Badge variant="destructive" className="ml-2">Required</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentQuestion.question}
            </h2>

            {/* Rating Question */}
            {currentQuestion.type === 'rating' && (
              <RadioGroup 
                value={answers[currentQuestion.id] || ''} 
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <RadioGroupItem value={option.value.toString()} id={`rating-${option.value}`} />
                    <Label htmlFor={`rating-${option.value}`} className="flex-1 flex items-center gap-3 cursor-pointer">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="text-gray-700">{option.label}</span>
                      <div className="flex ml-auto">
                        {[...Array(option.value)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Multiple Choice Question */}
            {currentQuestion.type === 'multiple_choice' && (
              <RadioGroup 
                value={answers[currentQuestion.id] || ''} 
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 text-gray-700 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Text Question */}
            {currentQuestion.type === 'text' && (
              <div className="space-y-3">
                <Textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="min-h-32"
                />
              </div>
            )}
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
            {surveyQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestionIndex 
                    ? 'bg-blue-600' 
                    : answers[surveyQuestions[index].id] 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNext}
            disabled={!isAnswered && currentQuestion.required}
            className={`flex items-center gap-2 ${
              isAnswered || !currentQuestion.required
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === surveyQuestions.length - 1 ? (
              <>
                <ThumbsUp className="h-4 w-4" />
                Submit Survey
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

export default Survey;
