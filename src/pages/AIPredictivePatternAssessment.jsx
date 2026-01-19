import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

const AIPredictivePatternAssessment = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    answers: Array(10).fill(null)
  });

  const translations = {
    en: {
      title: 'AI Predictive Pattern Assessment',
      subtitle: 'Discover your learning profile and personalized training recommendations',
      name: 'Full Name',
      email: 'Email Address',
      startAssessment: 'Start Assessment',
      previous: 'Previous',
      next: 'Next',
      submit: 'Submit Assessment',
      progress: 'Question {current} of 10',
      questions: [
        {
          question: 'How do you prefer to learn new concepts?',
          options: ['Reading textbooks/manuals', 'Watching videos/demonstrations', 'Hands-on practice', 'Group discussions']
        },
        {
          question: 'When faced with a problem, you typically:',
          options: ['Analyze it step by step', 'Try different solutions', 'Ask for help immediately', 'Research similar problems']
        },
        {
          question: 'Your ideal training environment includes:',
          options: ['Quiet individual space', 'Collaborative group setting', 'Interactive workshops', 'Online self-paced learning']
        },
        {
          question: 'How do you handle feedback?',
          options: ['Appreciate detailed written feedback', 'Prefer verbal discussions', 'Like immediate responses', 'Need time to process']
        },
        {
          question: 'Your motivation for learning comes from:',
          options: ['Career advancement', 'Personal growth', 'Practical application', 'Recognition and achievement']
        },
        {
          question: 'When learning technical skills, you prefer:',
          options: ['Structured curriculum', 'Real-world projects', 'Mentorship programs', 'Trial and error']
        },
        {
          question: 'Your communication style is:',
          options: ['Formal and detailed', 'Casual and conversational', 'Visual and demonstrative', 'Direct and concise']
        },
        {
          question: 'How do you approach new technology?',
          options: ['Read documentation first', 'Jump in and explore', 'Watch tutorials', 'Take formal training']
        },
        {
          question: 'Your preferred assessment method is:',
          options: ['Written exams', 'Practical demonstrations', 'Peer evaluations', 'Portfolio reviews']
        },
        {
          question: 'Learning retention works best for you through:',
          options: ['Note-taking and review', 'Teaching others', 'Practical application', 'Visual aids and diagrams']
        }
      ]
    },
    mr: {
      title: 'AI भविष्यसूचक पॅटर्न मूल्यांकन',
      subtitle: 'आपले शिक्षण प्रोफाइल आणि वैयक्तिकृत प्रशिक्षण शिफारसी शोधा',
      name: 'पूर्ण नाव',
      email: 'ईमेल पत्ता',
      startAssessment: 'मूल्यांकन सुरू करा',
      previous: 'मागील',
      next: 'पुढील',
      submit: 'मूल्यांकन सबमिट करा',
      progress: 'प्रश्न {current} पैकी १०',
      questions: [
        {
          question: 'तुम्ही नवीन संकल्पना शिकण्यासाठी कोणत्या पद्धतीना पसंत करता?',
          options: ['पुस्तके/मॅन्युअल वाचून', 'व्हिडिओ/डेमॉन्स्ट्रेशन पाहून', 'व्यावहारिक सराव करून', 'गट चर्चा करून']
        },
        {
          question: 'समस्येला सामोरे जाताना तुम्ही सहसा:',
          options: ['चरण-चरणाने विश्लेषण करता', 'वेगवेगळ्या उपायांचा प्रयत्न करता', 'त्वरित मदत मागता', 'समान समस्यांचा अभ्यास करता']
        },
        {
          question: 'तुमचे आदर्श प्रशिक्षण वातावरण समाविष्टीत आहे:',
          options: ['शांत वैयक्तिक जागा', 'सहयोगी गट सेटिंग', 'इंटरॅक्टिव्ह वर्कशॉप', 'ऑनलाइन स्व-गती शिक्षण']
        },
        {
          question: 'तुम्ही फीडबॅक कशी हाताळता?',
          options: ['तपशीलवार लिखित फीडबॅक आवडते', 'मौखिक चर्चा पसंत करता', 'त्वरित प्रतिसाद आवडतो', 'प्रक्रिया करण्यासाठी वेळ लागतो']
        },
        {
          question: 'शिक्षणासाठी तुमची प्रेरणा येते:',
          options: ['करिअरची प्रगती', 'वैयक्तिक विकास', 'व्यावहारिक अनुप्रयोग', 'मान्यता आणि सिद्धता']
        },
        {
          question: 'तांत्रिक कौशल्ये शिकताना तुम्हाला आवडते:',
          options: ['संरचित अभ्यासक्रम', 'वास्तव-जगातील प्रकल्प', 'मेंटरशिप प्रोग्राम', 'चाचणी आणि त्रुटी']
        },
        {
          question: 'तुमची संवाद शैली आहे:',
          options: ['औपचारिक आणि तपशीलवार', 'अनौपचारिक आणि संभाषणात्मक', 'दृश्य आणि प्रदर्शनात्मक', 'थेट आणि संक्षिप्त']
        },
        {
          question: 'तुम्ही नवीन तंत्रज्ञानाचा अभ्यास कसा करता?',
          options: ['प्रथम दस्तऐवज वाचून', 'उतरून आणि एक्सप्लोर करून', 'ट्यूटोरियल पाहून', 'औपचारिक प्रशिक्षण घेऊन']
        },
        {
          question: 'तुमची पसंतीची मूल्यांकन पद्धत आहे:',
          options: ['लिखित परीक्षा', 'व्यावहारिक प्रदर्शन', 'सहकारी मूल्यांकन', 'पोर्टफोलिओ समीक्षा']
        },
        {
          question: 'शिक्षण राखण्यासाठी तुम्हाला सर्वोत्तम काम करते:',
          options: ['नोट्स घेऊन आणि समीक्षा करून', 'इतरांना शिकवून', 'व्यावहारिक अनुप्रयोग करून', 'दृश्य साधने आणि आकृत्या']
        }
      ]
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnswerChange = (answerIndex) => {
    const newAnswers = [...formData.answers];
    newAnswers[currentQuestion] = answerIndex;
    setFormData(prev => ({
      ...prev,
      answers: newAnswers
    }));
  };

  const handleNext = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleStartAssessment = () => {
    if (formData.name.trim() && formData.email.trim()) {
      setCurrentQuestion(0);
    }
  };

  const handleSubmit = () => {
    // Calculate results based on answers
    const results = calculateResults(formData.answers);
    navigate('/ai-predictive-pattern-results', { 
      state: { 
        formData: formData,
        results: results 
      } 
    });
  };

  const calculateResults = (answers) => {
    // Teacher-specific scoring based on assessment answers
    let pedagogicalScore = 0;
    let classroomManagementScore = 0;
    let technologyIntegrationScore = 0;
    
    // Question 1: Learning preference (affects pedagogical knowledge)
    if (answers[0] === 2) pedagogicalScore += 10; // Hands-on practice
    else if (answers[0] === 3) pedagogicalScore += 8; // Group discussions
    else if (answers[0] === 1) pedagogicalScore += 6; // Videos/demonstrations
    else pedagogicalScore += 4; // Reading textbooks
    
    // Question 2: Problem-solving approach (affects classroom management)
    if (answers[1] === 0) classroomManagementScore += 10; // Step by step analysis
    else if (answers[1] === 3) classroomManagementScore += 8; // Research similar problems
    else if (answers[1] === 1) classroomManagementScore += 6; // Try different solutions
    else classroomManagementScore += 4; // Ask for help immediately
    
    // Question 3: Training environment (affects technology integration)
    if (answers[2] === 2) technologyIntegrationScore += 10; // Interactive workshops
    else if (answers[2] === 3) technologyIntegrationScore += 8; // Online self-paced
    else if (answers[2] === 1) technologyIntegrationScore += 6; // Collaborative setting
    else technologyIntegrationScore += 4; // Quiet individual space
    
    // Question 4: Feedback handling (affects classroom management)
    if (answers[3] === 1) classroomManagementScore += 10; // Verbal discussions
    else if (answers[3] === 2) classroomManagementScore += 8; // Immediate responses
    else if (answers[3] === 0) classroomManagementScore += 6; // Written feedback
    else classroomManagementScore += 4; // Need time to process
    
    // Question 5: Motivation (affects pedagogical knowledge)
    if (answers[4] === 2) pedagogicalScore += 10; // Practical application
    else if (answers[4] === 1) pedagogicalScore += 8; // Personal growth
    else if (answers[4] === 0) pedagogicalScore += 6; // Career advancement
    else pedagogicalScore += 4; // Recognition and achievement
    
    // Question 6: Technical skills learning (affects technology integration)
    if (answers[5] === 1) technologyIntegrationScore += 10; // Real-world projects
    else if (answers[5] === 2) technologyIntegrationScore += 8; // Mentorship programs
    else if (answers[5] === 0) technologyIntegrationScore += 6; // Structured curriculum
    else technologyIntegrationScore += 4; // Trial and error
    
    // Question 7: Communication style (affects classroom management)
    if (answers[6] === 2) classroomManagementScore += 10; // Visual and demonstrative
    else if (answers[6] === 1) classroomManagementScore += 8; // Casual and conversational
    else if (answers[6] === 3) classroomManagementScore += 6; // Direct and concise
    else classroomManagementScore += 4; // Formal and detailed
    
    // Question 8: Technology approach (affects technology integration)
    if (answers[7] === 1) technologyIntegrationScore += 10; // Jump in and explore
    else if (answers[7] === 2) technologyIntegrationScore += 8; // Watch tutorials
    else if (answers[7] === 3) technologyIntegrationScore += 6; // Formal training
    else technologyIntegrationScore += 4; // Read documentation
    
    // Question 9: Assessment preference (affects pedagogical knowledge)
    if (answers[8] === 1) pedagogicalScore += 10; // Practical demonstrations
    else if (answers[8] === 2) pedagogicalScore += 8; // Peer evaluations
    else if (answers[8] === 3) pedagogicalScore += 6; // Portfolio reviews
    else pedagogicalScore += 4; // Written exams
    
    // Question 10: Learning retention (affects all areas)
    if (answers[9] === 2) {
      pedagogicalScore += 8;
      classroomManagementScore += 8;
      technologyIntegrationScore += 8;
    } // Practical application
    else if (answers[9] === 1) {
      pedagogicalScore += 6;
      classroomManagementScore += 6;
      technologyIntegrationScore += 6;
    } // Teaching others
    else if (answers[9] === 3) {
      pedagogicalScore += 4;
      classroomManagementScore += 4;
      technologyIntegrationScore += 4;
    } // Visual aids
    else {
      pedagogicalScore += 2;
      classroomManagementScore += 2;
      technologyIntegrationScore += 2;
    } // Note-taking
    
    // Normalize scores to 0-100 range
    const normalizeScore = (score) => Math.min(100, Math.max(0, score + 40)); // Add base score of 40
    
    const scores = {
      pedagogicalKnowledge: normalizeScore(pedagogicalScore),
      classroomManagement: normalizeScore(classroomManagementScore),
      technologyIntegration: normalizeScore(technologyIntegrationScore)
    };
    
    // Determine learning style based on answers
    const learningStyles = ['Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing'];
    const communicationStyles = ['Formal', 'Collaborative', 'Direct', 'Adaptive'];
    
    // Calculate learning style based on question patterns
    let learningStyleIndex = 0;
    if (answers[0] === 1 || answers[7] === 2) learningStyleIndex = 0; // Visual
    else if (answers[0] === 3 || answers[3] === 1) learningStyleIndex = 1; // Auditory
    else if (answers[0] === 2 || answers[9] === 2) learningStyleIndex = 2; // Kinesthetic
    else learningStyleIndex = 3; // Reading/Writing
    
    // Calculate communication style based on answers
    let communicationStyleIndex = 0;
    if (answers[6] === 0) communicationStyleIndex = 0; // Formal
    else if (answers[2] === 1 || answers[6] === 1) communicationStyleIndex = 1; // Collaborative
    else if (answers[6] === 3) communicationStyleIndex = 2; // Direct
    else communicationStyleIndex = 3; // Adaptive
    
    // Determine strengths and development areas
    const sortedScores = Object.entries(scores).sort(([,a], [,b]) => b - a);
    const strengths = [sortedScores[0][0].replace(/([A-Z])/g, ' $1').trim()];
    const developmentAreas = [sortedScores[2][0].replace(/([A-Z])/g, ' $1').trim()];
    
    return {
      overallScore: Math.round((scores.pedagogicalKnowledge + scores.classroomManagement + scores.technologyIntegration) / 3),
      learningStyle: learningStyles[learningStyleIndex],
      communicationStyle: communicationStyles[communicationStyleIndex],
      categoryScores: scores,
      strengths: strengths,
      developmentAreas: developmentAreas
    };
  };

  const progress = currentQuestion >= 0 ? ((currentQuestion + 1) / 10) * 100 : 0;

  if (currentQuestion === -1) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Card className="shadow-xl bg-white">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Brain className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                {t.title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {t.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    {t.name}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                    placeholder={t.name}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                    placeholder={t.email}
                  />
                </div>
              </div>
              <Button 
                onClick={() => setCurrentQuestion(0)}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!formData.name || !formData.email}
              >
                {t.startAssessment}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto pt-20">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {t.progress.replace('{current}', currentQuestion + 1)}
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestion(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Info
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              {t.questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={formData.answers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerChange(parseInt(value))}
              className="space-y-3"
            >
              {t.questions[currentQuestion].options.map((option, index) => {
                const isSelected = formData.answers[currentQuestion] === index;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className={`flex-1 cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                        isSelected 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-gray-900 border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                      }`}
                    >
                      {option}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.previous}
              </Button>

              {currentQuestion === 9 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  disabled={formData.answers[currentQuestion] === null}
                >
                  {t.submit}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={formData.answers[currentQuestion] === null}
                  className="flex items-center gap-2"
                >
                  {t.next}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIPredictivePatternAssessment;
