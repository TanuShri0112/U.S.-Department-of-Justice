import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, MessageSquare, Users, BarChart, Bell, ChevronRight, Plus, Play, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {WelcomeSection} from './WelcomeSection';
import { useLanguage } from '@/contexts/LanguageContext';

export function MaharashtraDashboard() {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      welcomeBack: "Welcome Back!",
      resumeLearning: "Resume Learning",
      continueCourse: "Continue where you left off",
      myCourses: "My Courses",
      quickAccess: "Quick Access",
      ongoingCourses: "Ongoing Courses",
      upcomingDeadlines: "Upcoming Deadlines",
      progress: "Progress",
      lastAccessed: "Last accessed",
      noCourses: "No courses in progress",
      startLearning: "Start Learning Now",
      languageToggle: "मराठी | English"
    },
    mr: {
      welcomeBack: "पुन्हा स्वागत आहे!",
      resumeLearning: "शिकणे पुन्हा सुरू करा",
      continueCourse: "तुम्ही जिथे सोडले होते तेथून पुढे चला",
      myCourses: "माझे अभ्यासक्रम",
      quickAccess: "त्वरित प्रवेश",
      ongoingCourses: "सुरू असलेले अभ्यासक्रम",
      upcomingDeadlines: "येणारे नियोजित अंतिम दिनांक",
      progress: "प्रगती",
      lastAccessed: "शेवटचा प्रवेश",
      noCourses: "कोणतीही अभ्यासक्रम प्रगतीत नाहीत",
      startLearning: "आता शिकणे सुरू करा",
      languageToggle: "मराठी | English"
    },
    mk: {
      welcomeBack: "Добредојдовте повторно!",
      resumeLearning: "Продолжи со учење",
      continueCourse: "Продолжете од каде што оставивте",
      myCourses: "Мои курсеви",
      quickAccess: "Брз пристап",
      ongoingCourses: "Тековни курсеви",
      upcomingDeadlines: "Престојни рокови",
      progress: "Напредок",
      lastAccessed: "Последен пристап",
      noCourses: "Нема курсеви во прогрес",
      startLearning: "Започнете да учите сега",
      languageToggle: "मराठी | English"
    }
  };

  const t = content[currentLanguage] ?? content.mr;

  // Mock data for ongoing courses
  const ongoingCourses = [
    {
      id: 1,
      title: {
        en: "AI Tools for Educators",
        mr: "शिक्षकांसाठी एआय साधने",
        mk: "AI алатки за образованици"
      },
      progress: 65,
      lastAccessed: "2 hours ago",
      timeRemaining: "45 min",
      thumbnail: "https://images.unsplash.com/photo-1523240795612-db22ac3d73b1?q=80&w=2070"
    },
    {
      id: 2,
      title: {
        en: "Digital Literacy Basics",
        mr: "डिजिटल साक्षरतेचे मूलतत्त्वे",
        mk: "Основи на дигитална писменост"
      },
      progress: 30,
      lastAccessed: "1 day ago",
      timeRemaining: "1.5 hr",
      thumbnail: "https://images.unsplash.com/photo-1543269865-cbf4ce698899?q=80&w=2070"
    }
  ];

  const quickActions = [
    {
      title: {
        en: "Continue Learning",
        mr: "शिकणे पुढे चालू ठेवा",
        mk: "Продолжи со учење"
      },
      icon: Play,
      action: () => navigate('/courses')
    },
    {
      title: {
        en: "My Progress",
        mr: "माझी प्रगती",
        mk: "Мој напредок"
      },
      icon: BarChart,
      action: () => navigate('/reports')
    },
    {
      title: {
        en: "Chat with Assistant",
        mr: "सहाय्यकाशी चॅट करा",
        mk: "Чат со асистент"
      },
      icon: MessageSquare,
      action: () => navigate('/chatbot')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
        {/* Main Content - Takes 2/3 of the space on large screens */}
        <div className="space-y-6 min-w-0 lg:col-span-8">
          <WelcomeSection />
          
          {/* Resume Learning Card */}
          <Card className="border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-orange-600" />
                  <span>{t.resumeLearning}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {ongoingCourses[0]?.title[currentLanguage] || t.noCourses}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{t.continueCourse}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {t.lastAccessed}: {ongoingCourses[0]?.lastAccessed || 'N/A'}
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/courses')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  {t.resumeLearning}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              {ongoingCourses[0] && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t.progress}: {ongoingCourses[0].progress}%</span>
                    <span>{ongoingCourses[0].timeRemaining} {t.continueCourse}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${ongoingCourses[0].progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ongoing Courses */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                {t.ongoingCourses}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ongoingCourses.length > 0 ? (
                <div className="space-y-4">
                  {ongoingCourses.map((course) => (
                    <div 
                      key={course.id} 
                      className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/courses/view/${course.id}`)}
                    >
                      <img 
                        src={course.thumbnail} 
                        alt={course.title[currentLanguage]}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {course.title[currentLanguage]}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="text-xs text-gray-500">
                            {t.lastAccessed}: {course.lastAccessed}
                          </div>
                          <div className="text-xs text-gray-500">
                            ~{course.timeRemaining} {t.continueCourse}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{course.progress}%</div>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{t.noCourses}</h3>
                  <p className="text-gray-500 mb-4">{t.startLearning}</p>
                  <Button 
                    onClick={() => navigate('/courses')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {t.startLearning}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Optimized width and spacing */}
        <div className="space-y-5 lg:col-span-4">
          <div className="lg:sticky lg:top-6 space-y-5">
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600" />
                  {t.quickAccess}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={action.action}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.title[currentLanguage]}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  {t.upcomingDeadlines}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">AI Ethics Module</div>
                      <div className="text-xs text-gray-500">Due in 3 days</div>
                    </div>
                    <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      75%
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">Final Assessment</div>
                      <div className="text-xs text-gray-500">Due in 1 week</div>
                    </div>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      40%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaharashtraDashboard;