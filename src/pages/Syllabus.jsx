import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookText, 
  GraduationCap, 
  FileText, 
  Clock, 
  Users, 
  Award, 
  ChevronDown, 
  Download,
  Play,
  CheckCircle,
  Circle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Syllabus = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('curriculum');

  const content = {
    en: {
      title: "Syllabus",
      subtitle: "AI-Enabled Learning Management System for Maharashtra Government School Teachers",
      overview: "Course Overview",
      curriculum: "Curriculum",
      resources: "Resources",
      assessments: "Assessments",
      certification: "Certification",
      duration: "Duration",
      prerequisites: "Prerequisites",
      targetAudience: "Target Audience",
      learningObjectives: "Learning Objectives",
      chapter: "Chapter",
      lessons: "Lessons",
      durationLabel: "Duration",
      status: "Status",
      completed: "Completed",
      inProgress: "In Progress",
      notStarted: "Not Started",
      downloadMaterials: "Download Materials",
      startLearning: "Start Learning",
      viewDetails: "View Details",
      courseStructure: "Course Structure",
      aiTools: "AI Tools for Education",
      ethics: "AI Ethics & Safety",
      digitalLiteracy: "Digital Literacy",
      practicalApplications: "Practical Applications",
      assessmentMethods: "Assessment Methods",
      module: "Module",
      topics: "Topics Covered",
      activities: "Activities",
      assignments: "Assignments",
      quizzes: "Quizzes"
    },
    mr: {
      title: "अभ्यासक्रम",
      subtitle: "महाराष्ट्र सरकारच्या शाळांतील शिक्षकांसाठी एआय-सक्षम शिक्षण व्यवस्थापन प्रणाली",
      overview: "अभ्यासक्रमाचे अवलोकन",
      curriculum: "पाठ्यक्रम",
      resources: "संसाधने",
      assessments: "मूल्यांकन",
      certification: "प्रमाणपत्रीकरण",
      duration: "कालावधी",
      prerequisites: "पूर्व आवश्यकता",
      targetAudience: "लक्ष्यित प्रकाशक",
      learningObjectives: "शिकण्याचे उद्दिष्टे",
      chapter: "अध्याय",
      lessons: "पाठ",
      durationLabel: "कालावधी",
      status: "स्थिती",
      completed: "पूर्ण झाले",
      inProgress: "प्रगतीत आहे",
      notStarted: "सुरू केलेले नाही",
      downloadMaterials: "सामग्री डाउनलोड करा",
      startLearning: "शिकणे सुरू करा",
      viewDetails: "तपशील पहा",
      courseStructure: "अभ्यासक्रमाची रचना",
      aiTools: "शिक्षणासाठी एआय साधने",
      ethics: "एआय नैतिकता आणि सुरक्षितता",
      digitalLiteracy: "डिजिटल साक्षरता",
      practicalApplications: "व्यावहारिक अनुप्रयोग",
      assessmentMethods: "मूल्यांकन पद्धती",
      module: "मॉड्यूल",
      topics: "समाविष्टीत विषय",
      activities: "उपक्रम",
      assignments: "सोपवलेले काम",
      quizzes: "क्विझेस"
    },
    mk: {
      title: "Список на настава",
      subtitle: "Систем за електронско учење овозможен со ИИ за наставници во основните училишта на Владата на Махараштра",
      overview: "Преглед на курсот",
      curriculum: "Наставен план",
      resources: "Ресурси",
      assessments: "Оценувања",
      certification: "Сертификација",
      duration: "Траење",
      prerequisites: "Предуслови",
      targetAudience: "Целна јавност",
      learningObjectives: "Цели на учење",
      chapter: "Поглавје",
      lessons: "Лекции",
      durationLabel: "Траење",
      status: "Статус",
      completed: "Завршено",
      inProgress: "Во тек",
      notStarted: "Не започнато",
      downloadMaterials: "Преземи материјали",
      startLearning: "Започни со учење",
      viewDetails: "Погледни детали",
      courseStructure: "Структура на курсот",
      aiTools: "АИ алатки за образование",
      ethics: "АИ етика и безбедност",
      digitalLiteracy: "Дигитална писменост",
      practicalApplications: "Практични примени",
      assessmentMethods: "Методи на оценување",
      module: "Модул",
      topics: "Теми покриени",
      activities: "Активности",
      assignments: "Задачи",
      quizzes: "Квизови"
    }
  };

  const t = content[currentLanguage] ?? content.mr;

  // Mock syllabus data
  const syllabusData = {
    overview: {
      duration: "8 weeks",
      prerequisites: t.prerequisites,
      targetAudience: t.targetAudience,
      objectives: [
        t.learningObjectives,
        "Understand AI fundamentals for education | शिक्षणासाठी एआय मूलभूत गोष्टी समजून घ्या",
        "Apply AI tools in classroom settings | वर्गात एआय साधनांचा वापर करा",
        "Ensure ethical AI usage | नैतिक एआय वापर सुनिश्चित करा",
        "Develop digital literacy skills | डिजिटल साक्षरता कौशल्ये विकसित करा"
      ]
    },
    modules: [
      {
        id: 1,
        title: {
          en: "Introduction to AI in Education",
          mr: "शिक्षणात एआयची माहिती",
          mk: "Вовед во ИИ во образованието"
        },
        duration: "2 weeks",
        lessons: 5,
        status: "completed",
        topics: [
          "What is AI? | एआय म्हणजे काय?",
          "AI in daily life | दैनंदिन जीवनात एआय",
          "AI benefits for teachers | शिक्षकांसाठी एआय फायदे",
          "Basic AI concepts | एआय ची मूलभूत संकल्पना",
          "Safety considerations | सुरक्षिततेची बाब"
        ]
      },
      {
        id: 2,
        title: {
          en: "AI Tools for Classroom Management",
          mr: "वर्गाच्या व्यवस्थापनासाठी एआय साधने",
          mk: "АИ алатки за менаџмент на класата"
        },
        duration: "2 weeks",
        lessons: 4,
        status: "in-progress",
        topics: [
          "Automated grading systems | स्वयंचलित ग्रेडिंग प्रणाली",
          "Student progress tracking | विद्यार्थ्याच्या प्रगतीचे ट्रॅकिंग",
          "Personalized learning paths | वैयक्तिकृत शिकण्याचे मार्ग",
          "Communication tools | संपर्क साधने"
        ]
      },
      {
        id: 3,
        title: {
          en: "Ethical AI Usage in Schools",
          mr: "शाळांमध्ये नैतिक एआय वापर",
          mk: "Етичен користење на АИ во училиштата"
        },
        duration: "2 weeks",
        lessons: 3,
        status: "not-started",
        topics: [
          "Privacy considerations | गोपनीयतेची बाब",
          "Bias awareness | पक्षपाताची जाणीव",
          "Fair usage policies | न्याय्य वापराचे धोरण",
          "Student consent | विद्यार्थ्यांची परवानगी"
        ]
      },
      {
        id: 4,
        title: {
          en: "Practical AI Applications",
          mr: "व्यावहारिक एआय अनुप्रयोग",
          mk: "Практични апликации на АИ"
        },
        duration: "2 weeks",
        lessons: 6,
        status: "not-started",
        topics: [
          "Lesson planning assistance | पाठ योजना सहाय्य",
          "Content creation tools | सामग्री निर्माण साधने",
          "Assessment generation | मूल्यांकन निर्माण",
          "Parent communication | पालकांशी संपर्क",
          "Administrative tasks | प्रशासकीय कार्ये",
          "Final project | अंतिम प्रकल्प"
        ]
      }
    ],
    resources: [
      {
        id: 1,
        title: {
          en: "AI Tools Guide",
          mr: "एआय साधनांचे मार्गदर्शन",
          mk: "Водич за АИ алатки"
        },
        type: "PDF",
        size: "2.4 MB",
        downloadLink: "#"
      },
      {
        id: 2,
        title: {
          en: "Ethics Framework",
          mr: "नैतिकता चौकट",
          mk: "Рамка за етика"
        },
        type: "PDF",
        size: "1.8 MB",
        downloadLink: "#"
      },
      {
        id: 3,
        title: {
          en: "Classroom Templates",
          mr: "वर्गाचे साचे",
          mk: "Шаблони за класата"
        },
        type: "ZIP",
        size: "5.2 MB",
        downloadLink: "#"
      }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">{t.completed}</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">{t.inProgress}</Badge>;
      default:
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">{t.notStarted}</Badge>;
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

        {/* Overview Card */}
        <Card className="mb-8 border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookText className="h-5 w-5 text-orange-600" />
              {t.overview}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t.duration}</h4>
                <p className="text-lg font-semibold text-orange-600">{syllabusData.overview.duration}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t.prerequisites}</h4>
                <p className="text-gray-700">{syllabusData.overview.prerequisites}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t.targetAudience}</h4>
                <p className="text-gray-700">{syllabusData.overview.targetAudience}</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">{t.learningObjectives}</h4>
              <ul className="space-y-2">
                {syllabusData.overview.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="curriculum">{t.curriculum}</TabsTrigger>
            <TabsTrigger value="resources">{t.resources}</TabsTrigger>
            <TabsTrigger value="assessments">{t.assessments}</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Curriculum Tab */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            {syllabusData.modules.map((module) => (
              <Card key={module.id} className="bg-white/80 backdrop-blur-sm shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-orange-600" />
                      </div>
                      <span>{module.title[currentLanguage]}</span>
                    </CardTitle>
                    <div className="flex items-center gap-4">
                      {getStatusBadge(module.status)}
                      <span className="text-sm text-gray-500">{module.duration}</span>
                      <span className="text-sm text-gray-500">{module.lessons} {t.lessons}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`module-${module.id}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(module.status)}
                          {t.topics}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {module.topics.map((topic, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{topic}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-3 mt-4">
                          <Button 
                            onClick={() => navigate(`/courses/view/module-${module.id}`)}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            {module.status === 'completed' ? t.viewDetails : t.startLearning}
                          </Button>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            {t.downloadMaterials}
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                {t.resources}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {syllabusData.resources.map((resource) => (
                  <div 
                    key={resource.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {resource.title[currentLanguage]}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {resource.type} • {resource.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      {t.downloadMaterials}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assessments Tab */}
        {activeTab === 'assessments' && (
          <Card className="bg-white/80 backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                {t.assessmentMethods}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <FileText className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{t.quizzes}</h3>
                  <p className="text-sm text-gray-600">Multiple choice and short answer assessments</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{t.assignments}</h3>
                  <p className="text-sm text-gray-600">Practical teaching assignments</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Award className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{t.certification}</h3>
                  <p className="text-sm text-gray-600">Completion certificate upon finishing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Syllabus;