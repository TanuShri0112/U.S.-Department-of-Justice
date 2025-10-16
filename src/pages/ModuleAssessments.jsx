import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Clock, Target, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Module information mapping
const getModuleName = (courseId) => {
  const courseNames = {
    '1': 'Law Enforcement Training',
    '2': 'Educator Training', 
    '3': 'Youth Advocacy Training',
    '1757539': 'Advanced Credit Analysis'
  };
  return courseNames[courseId] || 'Training Module';
};

// Quiz questions for different modules
const getModuleQuestions = (courseId, moduleId) => {
  if (courseId === '1' || (courseId === '1757539' && moduleId === '1')) {
    return {
      id: 'module-1-quiz',
      title: 'Law Enforcement Training Assessment',
      description: 'Test your knowledge of law enforcement training principles, standards, and methodologies',
    type: 'general',
    timeLimit: '30 minutes',
    attempts: 'unlimited',
    questions: 10,
      difficulty: 'Medium',
      questionData: [
        {
          id: 1,
          type: 'multiple_choice',
          question: 'Which principle should law enforcement training emphasize to engage adult learners?',
          options: [
            'Memorization of facts',
            'Passive listening', 
            'Reflection, discussion, and practice-based scenarios',
            'Repetition of written policies'
          ],
          correct: 2
        },
        {
          id: 2,
          type: 'multiple_choice',
          question: 'According to U.S. standards, which topics are core to police training requirements?',
          options: [
            'Forensic photography and patrol tactics',
            'Use of force, ethics, civil rights, and bias awareness',
            'Advanced driving and weapon handling',
            'Criminal profiling and detective work'
          ],
          correct: 1
        },
        {
          id: 3,
          type: 'multiple_choice',
          question: 'What is a defining feature of trauma-informed instruction for first responders?',
          options: [
            'Strict grading',
            'Emphasizing physical fitness',
            'Creating a learning environment based on safety, trust, and respect',
            'Reducing training hours'
          ],
          correct: 2
        },
        {
          id: 4,
          type: 'multiple_choice',
          question: 'Which model focuses on context, input, process, and product for program evaluation?',
          options: [
            'Kirkpatrick Model',
            'CIPP Model',
            'ADDIE Model',
            'Bloom\'s Taxonomy'
          ],
          correct: 1
        },
        {
          id: 5,
          type: 'true_false',
          question: 'All law enforcement training must align with DOJ and POST standards.',
          correct: true
        },
        {
          id: 6,
          type: 'true_false',
          question: 'The Kirkpatrick model only examines the context of training, not outcomes.',
          correct: false
        },
        {
          id: 7,
          type: 'true_false',
          question: 'Scenario-based simulations help officers practice decision-making under pressure.',
          correct: true
        },
        {
          id: 8,
          type: 'fill_blank',
          question: 'Training programs begin with a comprehensive ___ to identify skill gaps and stakeholder expectations.',
          correct: 'needs assessment'
        },
        {
          id: 9,
          type: 'fill_blank',
          question: '_____ requires officers to practice fair treatment, clear communication, and impartial actions in all scenarios.',
          correct: 'Procedural justice'
        },
        {
          id: 10,
          type: 'fill_blank',
          question: '_____ in law enforcement combines in-person workshops with digital modules for flexibility and engagement.',
          correct: 'Blended learning'
        }
      ]
    };
  } else if (courseId === '2' || (courseId === '1757539' && moduleId === '2')) {
    return {
      id: 'module-2-quiz',
      title: 'Educator Training Assessment',
      description: 'Test your knowledge of educator training principles, regulations, and professional development frameworks',
    type: 'general',
      timeLimit: '30 minutes',
    attempts: 'unlimited',
      questions: 10,
      difficulty: 'Medium',
      questionData: [
        {
          id: 1,
          type: 'multiple_choice',
          question: 'Which principle makes professional learning more effective for educators?',
          options: [
            'Memorization of teaching standards',
            'Connection to classroom realities',
            'Focusing only on theory',
            'Avoiding reflection and collaboration'
          ],
          correct: 1
        },
        {
          id: 2,
          type: 'multiple_choice',
          question: 'Which regulation protects the privacy of student educational records?',
          options: [
            'IDEA',
            'FERPA',
            'ESSA',
            'ADA'
          ],
          correct: 1
        },
        {
          id: 3,
          type: 'multiple_choice',
          question: 'Which framework helps evaluate teacher performance through structured observation?',
          options: [
            'ADDIE Model',
            'Kirkpatrick Model',
            'Danielson Framework',
            'UDL (Universal Design for Learning)'
          ],
          correct: 2
        },
        {
          id: 4,
          type: 'multiple_choice',
          question: 'Which of the following tools supports hybrid or digital professional development?',
          options: [
            'Google Classroom',
            'Blackboard',
            'Zoom',
            'All of the above'
          ],
          correct: 3
        },
        {
          id: 5,
          type: 'true_false',
          question: 'Professional learning is most effective when connected to educators\' daily classroom realities.',
          correct: true
        },
        {
          id: 6,
          type: 'true_false',
          question: 'The ESSA law focuses primarily on student data privacy protections.',
          correct: false
        },
        {
          id: 7,
          type: 'true_false',
          question: 'Skilled facilitation requires balancing structure with empathy during professional development.',
          correct: true
        },
        {
          id: 8,
          type: 'fill_blank',
          question: '________ ensures students with disabilities receive proper support and access to education.',
          correct: 'IDEA'
        },
        {
          id: 9,
          type: 'fill_blank',
          question: 'A strong ____ ensures professional development initiatives are targeted, data-driven, and aligned with district priorities.',
          correct: 'needs assessment'
        },
        {
          id: 10,
          type: 'fill_blank',
          question: 'Professional learning programs should integrate __ at every stage to maintain compliance and protect both students and educators.',
          correct: 'policy awareness'
        }
      ]
    };
  } else if (courseId === '3' || (courseId === '1757539' && moduleId === '3')) {
    return {
      id: 'module-3-quiz',
      title: 'Youth Advocacy Training Assessment',
      description: 'Test your knowledge of youth advocacy principles, juvenile justice, and community engagement strategies',
      type: 'general',
      timeLimit: '30 minutes',
      attempts: 'unlimited',
      questions: 10,
      difficulty: 'Medium',
      questionData: [
        {
          id: 1,
          type: 'multiple_choice',
          question: 'Youth advocacy training programs should primarily focus on:',
          options: [
            'Youth as passive participants',
            'Youth as community consumers',
            'Youth as partners and active contributors',
            'Youth only in school settings'
          ],
          correct: 2
        },
        {
          id: 2,
          type: 'multiple_choice',
          question: 'Which approach does juvenile justice emphasize?',
          options: [
            'Punitive measures',
            'Restorative measures',
            'Detention only',
            'Zero tolerance'
          ],
          correct: 1
        },
        {
          id: 3,
          type: 'multiple_choice',
          question: 'What law sets clear boundaries on data sharing and confidentiality in youth advocacy?',
          options: [
            'FERPA',
            'IDEA',
            'COPPA',
            'HIPAA'
          ],
          correct: 2
        },
        {
          id: 4,
          type: 'multiple_choice',
          question: 'What is a key strategy to ensure youth advocacy programs are responsive and equitable?',
          options: [
            'Using only quantitative data',
            'Conducting comprehensive needs assessments including youth voices',
            'Designing programs without community input',
            'Limiting digital outreach'
          ],
          correct: 1
        },
        {
          id: 5,
          type: 'true_false',
          question: 'Youth engagement means recognizing young people as partners in decision-making.',
          correct: true
        },
        {
          id: 6,
          type: 'true_false',
          question: 'Digital outreach is not recommended for youth advocacy due to safety concerns.',
          correct: false
        },
        {
          id: 7,
          type: 'true_false',
          question: 'Evaluation of advocacy programs should include both qualitative and quantitative methods.',
          correct: true
        },
        {
          id: 8,
          type: 'fill_blank',
          question: '________ emphasizes belonging, competence, and contribution in youth development.',
          correct: 'Positive Youth Development'
        },
        {
          id: 9,
          type: 'fill_blank',
          question: 'Laws such as ________ and mandated reporting guidelines set confidentiality standards in youth advocacy.',
          correct: 'COPPA'
        },
        {
          id: 10,
          type: 'fill_blank',
          question: 'A comprehensive ________ includes both data and youth lived experiences to identify community needs.',
          correct: 'needs assessment'
        }
      ]
    };
  } else {
    // Fallback to Module 1 questions for any other module IDs
    return {
      id: 'module-1-quiz',
      title: 'Law Enforcement Training Assessment',
      description: 'Test your knowledge of law enforcement training principles, standards, and best practices',
      type: 'general',
      timeLimit: '30 minutes',
      attempts: 'unlimited',
      questions: 10,
      difficulty: 'Medium',
      questionData: [
        {
          id: 1,
          type: 'multiple_choice',
          question: 'Which principle should law enforcement training emphasize to engage adult learners?',
          options: [
            'Memorization of facts',
            'Passive listening', 
            'Reflection, discussion, and practice-based scenarios',
            'Repetition of written policies'
          ],
          correct: 2
        },
        {
          id: 2,
          type: 'multiple_choice',
          question: 'According to U.S. standards, which topics are core to police training requirements?',
          options: [
            'Forensic photography and patrol tactics',
            'Use of force, ethics, civil rights, and bias awareness',
            'Advanced driving and weapon handling',
            'Criminal profiling and detective work'
          ],
          correct: 1
        },
        {
          id: 3,
          type: 'multiple_choice',
          question: 'What is a defining feature of trauma-informed instruction for first responders?',
          options: [
            'Strict grading',
            'Emphasizing physical fitness',
            'Creating a learning environment based on safety, trust, and respect',
            'Reducing training hours'
          ],
          correct: 2
        },
        {
          id: 4,
          type: 'multiple_choice',
          question: 'Which model focuses on context, input, process, and product for program evaluation?',
          options: [
            'Kirkpatrick Model',
            'CIPP Model',
            'ADDIE Model',
            'Bloom\'s Taxonomy'
          ],
          correct: 1
        },
        {
          id: 5,
          type: 'true_false',
          question: 'All law enforcement training must align with DOJ and POST standards.',
          correct: true
        },
        {
          id: 6,
          type: 'true_false',
          question: 'The Kirkpatrick model only examines the context of training, not outcomes.',
          correct: false
        },
        {
          id: 7,
          type: 'true_false',
          question: 'Scenario-based simulations help officers practice decision-making under pressure.',
          correct: true
        },
        {
          id: 8,
          type: 'fill_blank',
          question: 'Training programs begin with a comprehensive ___ to identify skill gaps and stakeholder expectations.',
          correct: 'needs assessment'
        },
        {
          id: 9,
          type: 'fill_blank',
          question: '_____ requires officers to practice fair treatment, clear communication, and impartial actions in all scenarios.',
          correct: 'Procedural justice'
        },
        {
          id: 10,
          type: 'fill_blank',
          question: '_____ in law enforcement combines in-person workshops with digital modules for flexibility and engagement.',
          correct: 'Blended learning'
        }
      ]
    };
  }
};


const ModuleAssessments = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const [currentQuiz] = useState(() => getModuleQuestions(courseId, moduleId));
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    // Store quiz data in localStorage for the quiz page to access
    localStorage.setItem('currentQuiz', JSON.stringify(currentQuiz));
    // Navigate to quiz page
    navigate(`/courses/${courseId}/modules/${moduleId}/quiz`);
  };


  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuizTypeColor = (type) => {
    return type === 'final' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto">
      <div className="p-6 animate-fade-in max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            onClick={() => navigate(`/courses/view/${courseId}/modules`)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{getModuleName(courseId)} - Assessment</h1>
            <p className="text-gray-600">
              Complete your knowledge assessment for this module
            </p>
          </div>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">{getModuleName(courseId)}</CardTitle>
            <p className="text-purple-600">
              {courseId === '1' 
                ? 'Master the core principles of effective law enforcement training, including adult learning theory, standards compliance, and evidence-based methodologies.'
                : courseId === '2'
                ? 'Explore educator training principles, professional development frameworks, regulations compliance, and classroom-focused learning strategies.'
                : courseId === '3'
                ? 'Learn youth advocacy principles, juvenile justice approaches, community engagement strategies, and youth-centered program development.'
                : 'Test your knowledge of training principles and methodologies.'
              }
            </p>
            <div className="flex items-center gap-2 text-sm text-purple-600">
              <span>⏱️ Estimated time: 30 minutes</span>
            </div>
          </CardHeader>
        </Card>

        {/* Assessment Section */}
        <div className="space-y-6">
          {/* Quiz Instructions */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-800">Assessment Instructions</h3>
                  <p className="text-blue-600">Please read the instructions carefully before starting</p>
                                    </div>
                                  </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📝</span>
                  <span>Read each question carefully before selecting your answer.</span>
                                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">⏱️</span>
                  <span>Time limit: {currentQuiz.timeLimit}. You cannot submit after time expires.</span>
                        </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">🔄</span>
                  <span>Attempts: {currentQuiz.attempts}. Take your time to answer correctly.</span>
                                    </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">✅</span>
                  <span>Review your answers before submitting. Changes cannot be made after submission.</span>
                                  </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">📊</span>
                  <span>Your score will be displayed immediately after completion.</span>
                                    </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">🎯</span>
                  <span>This assessment contains {currentQuiz.questions} questions of various types.</span>
                                    </div>
                                </div>
                              </CardContent>
                            </Card>

          {/* Single Quiz Card */}
          <Card className="bg-white border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <FileText className="h-8 w-8 text-blue-600" />
                                    </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{currentQuiz.title}</h2>
                    <p className="text-gray-600">{currentQuiz.description}</p>
                                    </div>
                                  </div>
                                  
                <div className="flex items-center justify-center gap-8 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">{currentQuiz.timeLimit}</span>
                                </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Target className="h-5 w-5 text-green-500" />
                    <span className="font-medium">{currentQuiz.questions} Questions</span>
                        </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <RotateCcw className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">{currentQuiz.attempts} Attempts</span>
                                    </div>
                  <Badge className={`${getDifficultyColor(currentQuiz.difficulty)} px-3 py-1 text-sm font-medium`}>
                    {currentQuiz.difficulty}
                                    </Badge>
                                  </div>
                                  
                <div className="pt-4">
                                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={handleStartQuiz}
                  >
                    🚀 Start Assessment
                                  </Button>
                </div>
                                </div>
                              </CardContent>
                            </Card>
        </div>
      </div>
    </div>
  );
};

export default ModuleAssessments;