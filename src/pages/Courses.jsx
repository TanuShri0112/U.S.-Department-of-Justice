import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Clock,
  Filter,
  Search,
  Plus,
  Compass,
  FileText,
  Bell,
  Target,
  Layers,
  BarChart3,
  ClipboardCheck,
  FolderOpen,
  MessageCircle,
  ShieldCheck,
  Globe,
  Play,
  Download,
  ExternalLink,
  CheckCircle,
  Circle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { CourseOptionsMenu } from '@/components/courses/CourseOptionsMenu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      title: "My Course Catalogue | माझे अभ्यासक्रम",
      subtitle: "AI-Enabled Learning Management System for Maharashtra Government School Teachers",
      searchPlaceholder: "Search courses... | अभ्यासक्रम शोधा...",
      allLevels: "All levels | सर्व पातळ्या",
      beginner: "Beginner | प्रारंभिक",
      intermediate: "Intermediate | मध्यम",
      advanced: "Advanced | प्रगत",
      allCatalogs: "All catalogs | सर्व संग्रह",
      continueLearning: "Continue learning | शिकणे पुढे चालू ठेवा",
      enrolled: "enrolled | नोंदणीकृत",
      level: "Level: | पातळी:",
      duration: "Duration: | कालावधी:",
      status: "Status | स्थिती",
      completed: "Completed | पूर्ण झाले",
      inProgress: "In Progress | प्रगतीत आहे",
      notStarted: "Not Started | सुरू केलेले नाही",
      myProgress: "My Progress | माझी प्रगती",
      startCourse: "Start Course | अभ्यासक्रम सुरू करा",
      viewDetails: "View Details | तपशील पहा",
      rise360Integrated: "Rise 360 Integrated | राइझ 360 एकत्रित",
      mobileFriendly: "Mobile Friendly | मोबाईल अनुकूल",
      scormCompliant: "SCORM Compliant | एससीओआरएम सुसंगत",
      aiTools: "AI Tools for Education | शिक्षणासाठी एआय साधने",
      digitalLiteracy: "Digital Literacy | डिजिटल साक्षरता",
      aiEthics: "AI Ethics & Safety | एआय नैतिकता आणि सुरक्षा",
      practicalApplications: "Practical Applications | व्यावहारिक अनुप्रयोग"
    },
    mr: {
      title: "माझे अभ्यासक्रम",
      subtitle: "महाराष्ट्र सरकारच्या शाळांतील शिक्षकांसाठी एआय-सक्षम शिक्षण व्यवस्थापन प्रणाली",
      searchPlaceholder: "अभ्यासक्रम शोधा...",
      allLevels: "सर्व पातळ्या",
      beginner: "प्रारंभिक",
      intermediate: "मध्यम",
      advanced: "प्रगत",
      allCatalogs: "सर्व संग्रह",
      continueLearning: "शिकणे पुढे चालू ठेवा",
      enrolled: "नोंदणीकृत",
      level: "पातळी:",
      duration: "कालावधी:",
      status: "स्थिती",
      completed: "पूर्ण झाले",
      inProgress: "प्रगतीत आहे",
      notStarted: "सुरू केलेले नाही",
      myProgress: "माझी प्रगती",
      startCourse: "अभ्यासक्रम सुरू करा",
      viewDetails: "तपशील पहा",
      rise360Integrated: "राइझ 360 एकत्रित",
      mobileFriendly: "मोबाईल अनुकूल",
      scormCompliant: "एससीओआरएम सुसंगत",
      aiTools: "शिक्षणासाठी एआय साधने",
      digitalLiteracy: "डिजिटल साक्षरता",
      aiEthics: "एआय नैतिकता आणि सुरक्षा",
      practicalApplications: "व्यावहारिक अनुप्रयोग"
    },
    mk: {
      title: "Мои курсеви",
      subtitle: "Систем за електронско учење овозможен со ИИ за наставници во основните училишта на Владата на Махараштра",
      searchPlaceholder: "Пребарувај курсеви...",
      allLevels: "Сите нивоа",
      beginner: "Почетник",
      intermediate: "Средно",
      advanced: "Напредно",
      allCatalogs: "Сите каталози",
      continueLearning: "Продолжи со учење",
      enrolled: "зачленети",
      level: "Ниво:",
      duration: "Траење:",
      status: "Статус",
      completed: "Завршено",
      inProgress: "Во тек",
      notStarted: "Не започнато",
      myProgress: "Мој напредок",
      startCourse: "Започни курс",
      viewDetails: "Погледни детали",
      rise360Integrated: "Интегриран Rise 360",
      mobileFriendly: "Мобилен прилагоден",
      scormCompliant: "SCORM компатибилен",
      aiTools: "АИ алатки за образование",
      digitalLiteracy: "Дигитална писменост",
      aiEthics: "АИ етика и безбедност",
      practicalApplications: "Практични примени"
    }
  };

  const t = content[currentLanguage] ?? content.mr;

  // Mock course data
  const mockCourses = [
    {
      id: 1,
      title: {
        en: 'AI Tools for Educators',
        mr: 'शिक्षकांसाठी एआय साधने',
        mk: 'АИ алатки за образованици'
      },
      description: {
        en: 'Learn how to integrate AI tools in your classroom to enhance teaching and learning experiences.',
        mr: 'शिकवणे आणि शिकणे अनुभव सुधारण्यासाठी तुमच्या वर्गात एआय साधने कशी एकत्रित करायची ते शिका.',
        mk: 'Научете како да ги интегрирате АИ алатките во вашата класа за подобрување на искуствата на учителство и учење.'
      },
      students: 245,
      duration: '4 weeks',
      level: 'beginner',
      status: 'in-progress',
      progress: 65,
      image: 'https://media.assettype.com/esakal%2F2023-12%2Fe0e2b445-5100-4396-887a-c19ee6cb6ef6%2FRushikesh_Salvi__7_.jpg?w=1024&auto=format%2Ccompress&fit=max',
      category: t.aiTools,
      features: ['Rise 360', 'Mobile', 'SCORM'],
      lastAccessed: '2 hours ago'
    },
    {
      id: 2,
      title: {
        en: 'Digital Literacy for Teachers',
        mr: 'शिक्षकांसाठी डिजिटल साक्षरता',
        mk: 'Дигитална писменост за наставници'
      },
      description: {
        en: 'Essential digital skills for educators in the modern classroom environment.',
        mr: 'आधुनिक वर्गातील परिस्थितीत शिक्षकांसाठी आवश्यक डिजिटल कौशल्ये.',
        mk: 'Основни дигитални вештини за образовници во современата класна просторија.'
      },
      students: 189,
      duration: '3 weeks',
      level: 'beginner',
      status: 'not-started',
      progress: 0,
      image: 'https://media.licdn.com/dms/image/v2/D4D12AQGlaZd38B6Jlw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1710781276793?e=2147483647&v=beta&t=UpC9YHGX45MH70f0DArlGh9GHWhwqZW9Y-G3LYF08DA',
      category: t.digitalLiteracy,
      features: ['Rise 360', 'Mobile', 'SCORM'],
      lastAccessed: 'Never'
    },
    {
      id: 3,
      title: {
        en: 'AI Ethics and Safety in Education',
        mr: 'शिक्षणात एआय नैतिकता आणि सुरक्षा',
        mk: 'АИ етика и безбедност во образование'
      },
      description: {
        en: 'Understanding ethical implications and safety measures when using AI in educational settings.',
        mr: 'शैक्षणिक सेटिंगमध्ये एआयचा वापर करताना नैतिक परिणाम आणि सुरक्षा उपाययोजना समजून घेणे.',
        mk: 'Разбирање на етичките импликации и мерките за безбедност при користење на АИ во образовни услови.'
      },
      students: 156,
      duration: '2 weeks',
      level: 'intermediate',
      status: 'completed',
      progress: 100,
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070',
      category: t.aiEthics,
      features: ['Rise 360', 'Mobile', 'SCORM'],
      lastAccessed: 'Completed yesterday'
    },
    {
      id: 4,
      title: {
        en: 'Practical AI Applications',
        mr: 'व्यावहारिक एआय अनुप्रयोग',
        mk: 'Практични АИ апликации'
      },
      description: {
        en: 'Real-world applications of AI tools in educational contexts with hands-on practice.',
        mr: 'हाताने सरावासह शैक्षणिक संदर्भात एआय साधनांचे वास्तविक जगातील अनुप्रयोग.',
        mk: 'Апликации на АИ алатки во образовни контексти со практично вежбање.'
      },
      students: 132,
      duration: '5 weeks',
      level: 'intermediate',
      status: 'in-progress',
      progress: 30,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070',
      category: t.practicalApplications,
      features: ['Rise 360', 'Mobile', 'SCORM'],
      lastAccessed: '1 day ago'
    },
    {
      id: 5,
      title: {
        en: 'Advanced AI Concepts for Educators',
        mr: 'शिक्षकांसाठी प्रगत एआय संकल्पना',
        mk: 'Напредни АИ концепти за образовници'
      },
      description: {
        en: 'Deep dive into advanced AI concepts and their pedagogical applications.',
        mr: 'प्रगत एआय संकल्पनांमध्ये आणि त्यांच्या शैक्षणिक अनुप्रयोगांमध्ये खोल उतरा.',
        mk: 'Длабоко нуркање во напредни АИ концепти и нивни педагошки применливи.'
      },
      students: 87,
      duration: '6 weeks',
      level: 'advanced',
      status: 'not-started',
      progress: 0,
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070',
      category: t.aiTools,
      features: ['Rise 360', 'Mobile', 'SCORM'],
      lastAccessed: 'Never'
    },
    {
      id: 6,
      title: {
        en: 'AI-Powered Assessment Strategies',
        mr: 'एआय-सक्षम मूल्यांकन धोरणे',
        mk: 'АИ-овозможени стратегии за оценување'
      },
      description: {
        en: 'Learn to create and utilize AI-powered assessment tools for better student evaluation.',
        mr: 'विद्यार्थ्यांच्या चांगल्या मूल्यांकनासाठी एआय-सक्षम मूल्यांकन साधने तयार करणे आणि वापरणे शिका.',
        mk: 'Научете да создавате и користите алатки за оценување овозможени со АИ за подобро оценување на студентите.'
      },
      students: 112,
      duration: '4 weeks',
      level: 'advanced',
      status: 'in-progress',
      progress: 15,
      image: 'https://media.licdn.com/dms/image/v2/D4D12AQGlaZd38B6Jlw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1710781276793?e=2147483647&v=beta&t=UpC9YHGX45MH70f0DArlGh9GHWhwqZW9Y-G3LYF08DA',
      category: t.aiTools,
      features: ['Rise 360', 'Mobile', 'SCORM'],
      lastAccessed: '3 days ago'
    }
  ];

  const filteredCourses = mockCourses.filter((course) => {
    const title = course.title[currentLanguage];
    const description = course.description[currentLanguage];
    
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
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

  const getLevelBadge = (level) => {
    switch (level) {
      case 'beginner':
        return <Badge variant="outline" className="border-green-200 text-green-800">{t.beginner}</Badge>;
      case 'intermediate':
        return <Badge variant="outline" className="border-yellow-200 text-yellow-800">{t.intermediate}</Badge>;
      case 'advanced':
        return <Badge variant="outline" className="border-red-200 text-red-800">{t.advanced}</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getFeatureBadges = (features) => {
    return features.map((feature, index) => (
      <Badge key={index} variant="secondary" className="text-xs">
        {feature}
      </Badge>
    ));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Compass className="h-5 w-5 text-orange-600" />
            {t.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={t.allLevels} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allLevels}</SelectItem>
              <SelectItem value="beginner">{t.beginner}</SelectItem>
              <SelectItem value="intermediate">{t.intermediate}</SelectItem>
              <SelectItem value="advanced">{t.advanced}</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder={t.allCatalogs} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allCatalogs}</SelectItem>
              <SelectItem value="ai-tools">{t.aiTools}</SelectItem>
              <SelectItem value="digital-literacy">{t.digitalLiteracy}</SelectItem>
              <SelectItem value="ai-ethics">{t.aiEthics}</SelectItem>
              <SelectItem value="practical-applications">{t.practicalApplications}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="relative overflow-hidden border border-border/60 hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={course.image}
                  alt={course.title[currentLanguage]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {getStatusIcon(course.status)}
                  {getFeatureBadges(course.features)}
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg font-semibold line-clamp-2">
                        {course.title[currentLanguage]}
                      </CardTitle>
                      {getStatusBadge(course.status)}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {course.description[currentLanguage]}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {course.students} {t.enrolled}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">{t.level} {getLevelBadge(course.level)}</span>
                  <span className="text-xs text-gray-500">{course.category}</span>
                </div>
                
                {course.status === 'in-progress' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t.myProgress}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    {course.status === 'completed' 
                      ? <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t.viewDetails}
                        </>
                      : course.status === 'in-progress'
                        ? <>
                            <Play className="h-4 w-4 mr-2" />
                            {t.continueLearning}
                          </>
                        : <>
                            <Play className="h-4 w-4 mr-2" />
                            {t.startCourse}
                          </>
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Courses;