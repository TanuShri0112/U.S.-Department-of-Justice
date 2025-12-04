import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { PageHeader } from '@/components/shared/PageHeader';
import { useLanguage } from '@/contexts/LanguageContext';

const formatCopy = (value, language) => {
  if (typeof value === 'string') {
    return value;
  }
  return value?.[language] ?? value?.en ?? '';
};

const Courses = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const copy = useMemo(
    () => ({
      title: currentLanguage === 'en' ? 'My Courses' : 'دوراتي',
      subtitle:
        currentLanguage === 'en'
          ? 'Browse and launch the learning experiences you are enrolled in.'
          : 'استعرض وابدأ مسارات التعلم التي أنت مسجل بها.',
      searchPlaceholder: currentLanguage === 'en' ? 'Search my courses...' : 'ابحث في دوراتي...',
      emptyTitle: currentLanguage === 'en' ? 'No courses found' : 'لا توجد دورات',
      emptySubtitle:
        currentLanguage === 'en'
          ? 'Try a different keyword or contact the administrator for new enrollments.'
          : 'جرّب كلمة بحث مختلفة أو تواصل مع المشرف لإضافة تسجيلات جديدة.',
      openCourse: currentLanguage === 'en' ? 'Open course' : 'فتح الدورة',
    }),
    [currentLanguage],
  );

  const enrolledCourses = useMemo(
    () => [
      {
        id: 'clinical-safety',
        title: { en: 'Clinical Safety Refresher', ar: 'مراجعة السلامة السريرية' },
        summary: {
          en: 'Scenario drills on infection control, triage, and medication alerts.',
          ar: 'تمارين مبنية على سيناريوهات لمكافحة العدوى والتفرز وتنبيهات الأدوية.',
        },
        catalog: { en: 'Compliance', ar: 'الامتثال' },
        duration: { en: '6 lessons · 3h', ar: '6 دروس · 3 ساعات' },
        status: { en: 'In progress', ar: 'قيد التقدم' },
        lastAccessed: { en: 'Last accessed 2 days ago', ar: 'آخر دخول منذ يومين' },
        progress: 72,
        cover:
          'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&h=720',
        tags: [
          { en: 'Mandatory', ar: 'إلزامي' },
          { en: 'Clinical', ar: 'سريري' },
        ],
      },
      {
        id: 'onboarding-core',
        title: { en: 'Onboarding — Core eLearning', ar: 'الدورة التأسيسية للمنضمين الجدد' },
        summary: {
          en: 'Orientation path covering policy, LMS walkthrough, and proficiency quiz.',
          ar: 'مسار تهيئة يشمل السياسات وجولة في المنصة واختبار كفاءة.',
        },
        catalog: { en: 'Foundations', ar: 'الأساسيات' },
        duration: { en: '4 modules · 90 min', ar: '4 وحدات · 90 دقيقة' },
        status: { en: 'Not started', ar: 'لم يبدأ بعد' },
        lastAccessed: { en: 'Invite sent today', ar: 'تم إرسال الدعوة اليوم' },
        progress: 0,
        cover:
          'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&h=720',
        tags: [
          { en: 'Orientation', ar: 'تهيئة' },
          { en: 'Self-paced', ar: 'ذاتي' },
        ],
      },
      {
        id: 'clinical-safety-pro',
        title: { en: 'Clinical Safety Pro', ar: 'سلامة سريرية متقدمة' },
        summary: {
          en: 'Advanced cohort with live simulations, SCORM assessments, and certificates.',
          ar: 'دفعة متقدمة مع محاكاة مباشرة وتقييمات SCORM وشهادات اعتماد.',
        },
        catalog: { en: 'Professional Development', ar: 'التطوير المهني' },
        duration: { en: '8 weeks · blended', ar: '8 أسابيع · تعلّم مدمج' },
        status: { en: 'Ready to start', ar: 'جاهز للبدء' },
        lastAccessed: { en: 'Starts Monday', ar: 'يبدأ يوم الاثنين' },
        progress: 0,
        cover:
          'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&h=720',
        tags: [
          { en: 'Live cohort', ar: 'دفعة مباشرة' },
          { en: 'Certificate', ar: 'شهادة' },
        ],
      },
    ],
    [currentLanguage],
  );

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredCourses = enrolledCourses.filter((course) => {
    if (!normalizedQuery) return true;
    return (
      formatCopy(course.title, currentLanguage).toLowerCase().includes(normalizedQuery) ||
      formatCopy(course.summary, currentLanguage).toLowerCase().includes(normalizedQuery) ||
      course.tags.some((tag) => formatCopy(tag, currentLanguage).toLowerCase().includes(normalizedQuery))
    );
  });

  const handleOpenCourse = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader title={copy.title} description={copy.subtitle} />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder={copy.searchPlaceholder}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <Card className="text-center">
          <CardHeader>
            <CardTitle>{copy.emptyTitle}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            {copy.emptySubtitle}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden border border-border/60">
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={course.cover}
                  alt={formatCopy(course.title, currentLanguage)}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                  {formatCopy(course.status, currentLanguage)}
                </Badge>
              </div>

              <CardContent className="space-y-4 p-5">
                <div>
                  <CardTitle className="text-lg leading-tight">
                    {formatCopy(course.title, currentLanguage)}
                  </CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {formatCopy(course.summary, currentLanguage)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={`${course.id}-${formatCopy(tag, 'en')}`} variant="outline">
                      {formatCopy(tag, currentLanguage)}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatCopy(course.duration, currentLanguage)}</span>
                    <span>{formatCopy(course.lastAccessed, currentLanguage)}</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">
                      {formatCopy(course.status, currentLanguage)}
                    </span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                </div>

                <Button className="w-full" onClick={() => handleOpenCourse(course.id)}>
                  {copy.openCourse}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
