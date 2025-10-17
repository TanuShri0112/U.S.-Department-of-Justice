import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle, Trophy, Star } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';

const QuizPage = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Load quiz data from localStorage
    const savedQuiz = localStorage.getItem('currentQuiz');
    if (savedQuiz) {
      const quizData = JSON.parse(savedQuiz);
      setCurrentQuiz(quizData);
    } else {
      // If no quiz data, redirect back
      navigate(`/courses/${courseId}/modules/${moduleId}/assessments`);
    }
  }, [courseId, moduleId, navigate]);

  useEffect(() => {
    // Timer countdown
    if (timeRemaining > 0 && !isQuizCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsQuizCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, isQuizCompleted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questionData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsQuizCompleted(true);
    calculateScore();
    setShowResults(true);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    const totalQuestions = currentQuiz.questionData.length;

    currentQuiz.questionData.forEach(question => {
      const userAnswer = answers[question.id];
      let isCorrect = false;

      if (question.type === 'multiple_choice') {
        isCorrect = userAnswer === question.correct.toString();
      } else if (question.type === 'true_false') {
        isCorrect = userAnswer === question.correct.toString();
      } else if (question.type === 'fill_blank') {
        isCorrect = userAnswer?.toLowerCase().trim() === question.correct.toLowerCase().trim();
      }

      if (isCorrect) correctAnswers++;
    });

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    setScore({ correct: correctAnswers, total: totalQuestions, percentage });
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
    setScore(null);
    setShowResults(false);
    setTimeRemaining(30 * 60);
  };

  if (!currentQuiz || !currentQuiz.questionData || currentQuiz.questionData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading quiz...</p>
          {!currentQuiz && <p className="text-red-500 mt-2">No quiz data found</p>}
          {currentQuiz && (!currentQuiz.questionData || currentQuiz.questionData.length === 0) && (
            <p className="text-red-500 mt-2">No questions available for this module</p>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questionData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuiz.questionData.length - 1;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/assessments`)} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Assessment
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">{t('quizCompleted')}</h1>
          </div>

          {/* Score Summary Card */}
          <Card className="bg-white shadow-lg mb-6">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  {score.percentage >= 70 ? (
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  ) : (
                    <XCircle className="h-16 w-16 text-red-500" />
                  )}
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800">
                      {score.percentage}%
                    </h2>
                    <p className="text-gray-600">
                      {score.correct} {t('correctAnswers')} {score.total} {t('totalQuestions')}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className={`text-lg font-semibold ${score.percentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                    {score.percentage >= 70 ? 'Congratulations! You passed!' : 'Please review and try again.'}
                  </p>
                  <p className="text-gray-600">
                    Passing score: 70%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={handleRestart}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Retake Quiz
            </Button>
            <Button 
              onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/assessments`)}
              variant="outline"
            >
              Back to Module
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const hasAnswer = answers[currentQuestion.id] && answers[currentQuestion.id].trim() !== '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/assessments`)} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Assessment
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {currentQuiz.title}
              </h1>
              <p className="text-gray-600">
                {t('question')} {currentQuestionIndex + 1} {t('of')} {currentQuiz.questionData.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-red-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">{formatTime(timeRemaining)}</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {currentQuiz.difficulty}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">{t('progress')}</span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentQuestionIndex + 1) / currentQuiz.questionData.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questionData.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-white shadow-lg mb-6">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                {currentQuestion.type === 'multiple_choice' && (
                  <RadioGroup 
                    value={answers[currentQuestion.id] || ''} 
                    onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 text-gray-700 cursor-pointer">
                          {String.fromCharCode(97 + index)}. {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentQuestion.type === 'true_false' && (
                  <RadioGroup 
                    value={answers[currentQuestion.id] || ''} 
                    onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                      <RadioGroupItem value="true" id="true" />
                      <Label htmlFor="true" className="flex-1 text-gray-700 cursor-pointer">True</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors">
                      <RadioGroupItem value="false" id="false" />
                      <Label htmlFor="false" className="flex-1 text-gray-700 cursor-pointer">False</Label>
                    </div>
                  </RadioGroup>
                )}

                {currentQuestion.type === 'fill_blank' && (
                  <div className="space-y-3">
                    <Input
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full max-w-md"
                    />
                    {!hasAnswer && (
                      <p className="text-sm text-gray-500">
                        Please enter your answer to continue
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            {t('previousQuestion')}
          </Button>

          <div className="flex items-center gap-2">
            {currentQuiz.questionData.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestionIndex 
                    ? 'bg-blue-600' 
                    : answers[currentQuiz.questionData[index].id] 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNextQuestion}
            disabled={!hasAnswer}
            className={`${
              hasAnswer 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? t('finishQuiz') : t('nextQuestion')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;