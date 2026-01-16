import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Target, 
  Trophy, 
  ChevronRight, 
  ArrowRight,
  CheckCircle,
  Circle,
  Clock,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Pathway = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyAnswers, setSurveyAnswers] = useState({});

  const content = {
    en: {
      title: "Successive Pathway",
      subtitle: "Personalized Learning Journey for Maharashtra Government School Teachers",
      personalizedPath: "Your Personalized Path",
      learningStyle: "Learning Style Assessment",
      startAssessment: "Start Assessment",
      viewPath: "View My Path",
      surveyTitle: "Learning Style Survey",
      surveySubtitle: "Help us understand your learning preferences",
      question1: "How do you prefer to learn new concepts?",
      question2: "What helps you retain information best?",
      question3: "How do you like to practice new skills?",
      option1a: "Through visual aids and diagrams",
      option1b: "By listening to explanations",
      option1c: "By reading and taking notes",
      option1d: "Through hands-on practice",
      option2a: "Creating mind maps and charts",
      option2b: "Recording and replaying information",
      option2c: "Writing summaries and notes",
      option2d: "Applying concepts in real situations",
      option3a: "Step-by-step tutorials",
      option3b: "Group discussions and peer learning",
      option3c: "Self-paced reading materials",
      option3d: "Trial and error experimentation",
      nextSteps: "Next Steps",
      recommendedCourses: "Recommended Courses",
      learningGoals: "Learning Goals",
      progressTracking: "Progress Tracking",
      pathwayOverview: "Pathway Overview",
      estimatedTime: "Estimated Time",
      prerequisiteSkills: "Prerequisite Skills",
      pathwayCompleted: "Pathway Completed!",
      continueLearning: "Continue Learning",
      course: "Course",
      duration: "Duration",
      difficulty: "Difficulty",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      completed: "Completed",
      inProgress: "In Progress",
      notStarted: "Not Started",
      setGoals: "Set Learning Goals",
      trackProgress: "Track Your Progress",
      achievement: "Achievement",
      milestone: "Milestone",
      congratulations: "Congratulations!"
    },
    mr: {
      title: "क्रमिक मार्ग",
      subtitle: "महाराष्ट्र सरकारच्या शाळांतील शिक्षकांसाठी वैयक्तिकृत शिकण्याचा प्रवास",
      personalizedPath: "तुमचा वैयक्तिकृत मार्ग",
      learningStyle: "शिकण्याच्या शैलीचे मूल्यांकन",
      startAssessment: "मूल्यांकन सुरू करा",
      viewPath: "माझा मार्ग पहा",
      surveyTitle: "शिकण्याच्या शैलीचे सर्वेक्षण",
      surveySubtitle: "तुमच्या शिकण्याच्या प्राधान्यांचे आम्हाला समजून घ्यायचे आहे",
      question1: "तुम्ही नवीन संकल्पना कशा शिकणे पसंत करता?",
      question2: "तुम्हाला माहिती कशाने सर्वोत्तम प्रकारे ठेवता येते?",
      question3: "तुम्ही नवीन कौशल्ये कशाप्रकारे सराव करणे पसंत करता?",
      option1a: "प्रात्यक्षिक साहित्य आणि आलेखांद्वारे",
      option1b: "स्पष्टीकरण ऐकून",
      option1c: "वाचून आणि टिप्पणी घेऊन",
      option1d: "हाताने सराव करून",
      option2a: "माइंड मॅप्स आणि चार्ट्स तयार करून",
      option2b: "माहिती रेकॉर्ड करून आणि पुन्हा प्ले करून",
      option2c: "सारांश आणि टिप्पणी लिहून",
      option2d: "वास्तविक परिस्थितीत संकल्पना लागू करून",
      option3a: "पायरी-पायरीने मार्गदर्शन",
      option3b: "गट चर्चा आणि सहकारी शिकणे",
      option3c: "स्व-वेगाने वाचन साहित्य",
      option3d: "प्रयोग आणि त्रुटी द्वारे प्रयत्न",
      nextSteps: "पुढील पायरी",
      recommendedCourses: "शिफारस केलेले अभ्यासक्रम",
      learningGoals: "शिकण्याचे उद्दिष्टे",
      progressTracking: "प्रगतीचे ट्रॅकिंग",
      pathwayOverview: "मार्गाचे अवलोकन",
      estimatedTime: "अंदाजे वेळ",
      prerequisiteSkills: "पूर्व आवश्यक कौशल्ये",
      pathwayCompleted: "मार्ग पूर्ण झाला!",
      continueLearning: "शिकणे पुढे चालू ठेवा",
      course: "अभ्यासक्रम",
      duration: "कालावधी",
      difficulty: "अडचण",
      beginner: "प्रारंभिक",
      intermediate: "मध्यम",
      advanced: "प्रगत",
      completed: "पूर्ण झाले",
      inProgress: "प्रगतीत आहे",
      notStarted: "सुरू केलेले नाही",
      setGoals: "शिकण्याचे उद्दिष्टे निश्चित करा",
      trackProgress: "तुमची प्रगती ट्रॅक करा",
      achievement: "यश",
      milestone: "मैलाचा दगड",
      congratulations: "अभिनंदन!"
    },
    mk: {
      title: "Последователна патека",
      subtitle: "Персонализирано учење за наставници во основните училишта на Владата на Махараштра",
      personalizedPath: "Вашиот персонализиран пат",
      learningStyle: "Оценка на стилот на учење",
      startAssessment: "Започни оценка",
      viewPath: "Погледни го мојот пат",
      surveyTitle: "Анкета за стил на учење",
      surveySubtitle: "Помогнете ни да ги разбереме вашите преференции за учење",
      question1: "Како сакате да учите нови концепти?",
      question2: "Што ви помага најдобро да ги задржите информациите?",
      question3: "Како сакате да вежбате нови вештини?",
      option1a: "Преку визуелни помагала и дијаграми",
      option1b: "Слушајќи објаснувања",
      option1c: "Читајќи и правејќи белешки",
      option1d: "Преку практично вежбање",
      option2a: "Креирање мапи на мислење и табели",
      option2b: "Снимање и репродукција на информации",
      option2c: "Пишување на резимија и белешки",
      option2d: "Примена на концепти во реални ситуации",
      option3a: "Обучни програми по чекор",
      option3b: "Групни дискусии и учење од колеги",
      option3c: "Материјали за читање по сопствен темпо",
      option3d: "Експериментирање со проба и грешка",
      nextSteps: "Следни чекори",
      recommendedCourses: "Препорачани курсеви",
      learningGoals: "Цели за учење",
      progressTracking: "Праќање на напредок",
      pathwayOverview: "Преглед на патеката",
      estimatedTime: "Проциенето време",
      prerequisiteSkills: "Предходни вештини",
      pathwayCompleted: "Патеката е завршена!",
      continueLearning: "Продолжи со учење",
      course: "Курс",
      duration: "Траење",
      difficulty: "Тежина",
      beginner: "Почетник",
      intermediate: "Средно ниво",
      advanced: "Напредно",
      completed: "Завршено",
      inProgress: "Во тек",
      notStarted: "Не започнато",
      setGoals: "Поставете цели за учење",
      trackProgress: "Следете го вашиот напредок",
      achievement: "Постигнување",
      milestone: "Милјански камен",
      congratulations: "Честитки!"
    }
  };

  const t = content[currentLanguage] ?? content.mr;

  // Mock pathway data
  const pathwayData = {
    overallProgress: 45,
    currentStage: 2,
    totalStages: 5,
    stages: [
      {
        id: 1,
        title: {
          en: "Foundation Skills",
          mr: "मूलभूत कौशल्ये",
          mk: "Основни вештини"
        },
        description: {
          en: "Building basic digital literacy and AI awareness",
          mr: "मूलभूत डिजिटल साक्षरता आणि एआय जाणीव वाढविणे",
          mk: "Градење на основна дигитална писменост и свесност за ИИ"
        },
        status: "completed",
        duration: "2 weeks",
        courses: 2,
        skills: ["Digital Basics", "AI Awareness", "Online Safety"]
      },
      {
        id: 2,
        title: {
          en: "AI Tools Exploration",
          mr: "एआय साधनांचे अन्वेषण",
          mk: "Истражување на АИ алатки"
        },
        description: {
          en: "Discovering and experimenting with various AI tools",
          mr: "विविध एआय साधनांचे शोध आणि प्रयोग करणे",
          mk: "Откривање и експериментирање со разни АИ алатки"
        },
        status: "in-progress",
        duration: "3 weeks",
        courses: 3,
        skills: ["ChatGPT", "Google Gemini", "Microsoft Copilot"]
      },
      {
        id: 3,
        title: {
          en: "Classroom Integration",
          mr: "वर्गात एकत्रीकरण",
          mk: "Интеграција во класата"
        },
        description: {
          en: "Applying AI tools in educational settings",
          mr: "शैक्षणिक सेटिंगमध्ये एआय साधनांचा वापर करणे",
          mk: "Примена на АИ алатки во образовни услови"
        },
        status: "not-started",
        duration: "2 weeks",
        courses: 2,
        skills: ["Lesson Planning", "Assessment Tools", "Student Engagement"]
      },
      {
        id: 4,
        title: {
          en: "Ethics & Safety",
          mr: "नैतिकता आणि सुरक्षितता",
          mk: "Етика и безбедност"
        },
        description: {
          en: "Understanding responsible AI usage in education",
          mr: "शिक्षणात जबाबदारीपूर्वक एआय वापर समजून घेणे",
          mk: "Разбирање на одговорно користење на ИИ во образование"
        },
        status: "not-started",
        duration: "1 week",
        courses: 1,
        skills: ["Privacy", "Bias Awareness", "Fair Usage"]
      },
      {
        id: 5,
        title: {
          en: "Advanced Applications",
          mr: "प्रगत अनुप्रयोग",
          mk: "Напредни апликации"
        },
        description: {
          en: "Mastering advanced AI applications for teaching",
          mr: "शिकवण्यासाठी प्रगत एआय अनुप्रयोगांचे पारंगतता",
          mk: "Мастеринг на напредни АИ апликации за настава"
        },
        status: "not-started",
        duration: "2 weeks",
        courses: 2,
        skills: ["Automation", "Personalization", "Analytics"]
      }
    ],
    recommendedCourses: [
      {
        id: 1,
        title: {
          en: "AI Fundamentals for Teachers",
          mr: "शिक्षकांसाठी एआय मूलभूत गोष्टी",
          mk: "Основи на ИИ за наставници"
        },
        difficulty: "beginner",
        duration: "2 weeks",
        progress: 100,
        status: "completed"
      },
      {
        id: 2,
        title: {
          en: "Practical AI Tools",
          mr: "व्यावहारिक एआय साधने",
          mk: "Практични АИ алатки"
        },
        difficulty: "intermediate",
        duration: "3 weeks",
        progress: 60,
        status: "in-progress"
      },
      {
        id: 3,
        title: {
          en: "AI Ethics in Education",
          mr: "शिक्षणात एआय नैतिकता",
          mk: "Етика на ИИ во образование"
        },
        difficulty: "intermediate",
        duration: "2 weeks",
        progress: 0,
        status: "not-started"
      }
    ]
  };

  const handleSurveyAnswer = (question, answer) => {
    setSurveyAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const handleSubmitSurvey = () => {
    // Here you would typically process the survey answers and generate a personalized pathway
    console.log('Survey submitted:', surveyAnswers);
    setShowSurvey(false);
    // Navigate to the personalized pathway
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <div className="w-5 h-5 rounded-full bg-blue-500 animate-pulse"></div>;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">{t.beginner}</Badge>;
      case 'intermediate':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">{t.intermediate}</Badge>;
      case 'advanced':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">{t.advanced}</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8 border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                {t.pathwayOverview}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">{pathwayData.overallProgress}%</div>
                <div className="text-sm text-gray-500">
                  {pathwayData.currentStage}/{pathwayData.totalStages} {t.nextSteps}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{t.progressTracking}</span>
                <span>{pathwayData.overallProgress}%</span>
              </div>
              <Progress value={pathwayData.overallProgress} className="h-2" />
            </div>
            <p className="text-gray-600">
              {pathwayData.stages[pathwayData.currentStage - 1]?.title[currentLanguage] || t.pathwayOverview}
            </p>
          </CardContent>
        </Card>

        {/* Personalized Path */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              {t.personalizedPath}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pathwayData.stages.map((stage, index) => (
                <div key={stage.id} className="relative">
                  {/* Connector line */}
                  {index < pathwayData.stages.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200 ml-[-1px]"></div>
                  )}
                  
                  <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stage.status === 'completed' ? 'bg-green-500' : 
                        stage.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}>
                        {getStatusIcon(stage.status)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {stage.title[currentLanguage]}
                        </h3>
                        <div className="flex items-center gap-2">
                          {stage.status === 'completed' ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">{t.completed}</Badge>
                          ) : stage.status === 'in-progress' ? (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">{t.inProgress}</Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-800">{t.notStarted}</Badge>
                          )}
                          <span className="text-sm text-gray-500">{stage.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mt-1">{stage.description[currentLanguage]}</p>
                      
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <BookOpen className="h-4 w-4" />
                          {stage.courses} {t.course}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Target className="h-4 w-4" />
                          {stage.skills.length} {t.skills}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button 
                          onClick={() => navigate(`/courses/view/stage-${stage.id}`)}
                          disabled={stage.status === 'not-started' && index > 0 && pathwayData.stages[index - 1].status !== 'completed'}
                          className={`${stage.status === 'not-started' && index > 0 && pathwayData.stages[index - 1].status !== 'completed' 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-orange-500 hover:bg-orange-600'} text-white`}
                        >
                          {stage.status === 'completed' ? t.viewPath : t.startAssessment}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Courses */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-purple-600" />
              {t.recommendedCourses}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pathwayData.recommendedCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{course.title[currentLanguage]}</h4>
                      {getDifficultyBadge(course.difficulty)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t.progressTracking}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <Button 
                      onClick={() => navigate(`/courses/view/${course.id}`)}
                      className="w-full"
                      variant={course.status === 'completed' ? 'outline' : 'default'}
                    >
                      {course.status === 'completed' ? t.viewPath : t.startAssessment}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Survey Dialog */}
        <Dialog open={showSurvey} onOpenChange={setShowSurvey}>
          <DialogTrigger asChild>
            <div className="fixed bottom-6 right-6">
              <Button 
                onClick={() => setShowSurvey(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg rounded-full h-14 w-14 flex items-center justify-center"
              >
                <Target className="h-6 w-6" />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t.surveyTitle}</DialogTitle>
              <p className="text-sm text-gray-500">{t.surveySubtitle}</p>
            </DialogHeader>
            
            <RadioGroup 
              value={surveyAnswers.q1} 
              onValueChange={(value) => handleSurveyAnswer('q1', value)}
              className="space-y-4"
            >
              <h3 className="font-medium">{t.question1}</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="visual" id="q1a" />
                  <Label htmlFor="q1a">{t.option1a}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="auditory" id="q1b" />
                  <Label htmlFor="q1b">{t.option1b}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reading" id="q1c" />
                  <Label htmlFor="q1c">{t.option1c}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kinesthetic" id="q1d" />
                  <Label htmlFor="q1d">{t.option1d}</Label>
                </div>
              </div>
            </RadioGroup>
            
            <RadioGroup 
              value={surveyAnswers.q2} 
              onValueChange={(value) => handleSurveyAnswer('q2', value)}
              className="space-y-4"
            >
              <h3 className="font-medium">{t.question2}</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="visual" id="q2a" />
                  <Label htmlFor="q2a">{t.option2a}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="auditory" id="q2b" />
                  <Label htmlFor="q2b">{t.option2b}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reading" id="q2c" />
                  <Label htmlFor="q2c">{t.option2c}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kinesthetic" id="q2d" />
                  <Label htmlFor="q2d">{t.option2d}</Label>
                </div>
              </div>
            </RadioGroup>
            
            <RadioGroup 
              value={surveyAnswers.q3} 
              onValueChange={(value) => handleSurveyAnswer('q3', value)}
              className="space-y-4"
            >
              <h3 className="font-medium">{t.question3}</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tutorial" id="q3a" />
                  <Label htmlFor="q3a">{t.option3a}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="discussion" id="q3b" />
                  <Label htmlFor="q3b">{t.option3b}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reading" id="q3c" />
                  <Label htmlFor="q3c">{t.option3c}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="experimentation" id="q3d" />
                  <Label htmlFor="q3d">{t.option3d}</Label>
                </div>
              </div>
            </RadioGroup>
            
            <Button 
              onClick={handleSubmitSurvey}
              disabled={!surveyAnswers.q1 || !surveyAnswers.q2 || !surveyAnswers.q3}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              {t.startAssessment} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Pathway;