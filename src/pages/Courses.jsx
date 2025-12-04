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

  const copy = useMemo(() => {
    const messages = {
      en: {
        title: 'My Courses',
        subtitle: 'Browse and launch the learning experiences you are enrolled in.',
        searchPlaceholder: 'Search my courses...',
        emptyTitle: 'No courses found',
        emptySubtitle: 'Try a different keyword or contact the administrator for new enrollments.',
        openCourse: 'Open course',
      },
      uk: {
        title: 'Мої курси',
        subtitle: 'Переглядайте та запускайте навчальні програми, на які ви зараховані.',
        searchPlaceholder: 'Пошук моїх курсів...',
        emptyTitle: 'Курсів не знайдено',
        emptySubtitle: 'Спробуйте інший запит або зверніться до адміністратора для нових записів.',
        openCourse: 'Відкрити курс',
      },
    };
    return messages[currentLanguage] ?? messages.en;
  }, [currentLanguage]);

  const enrolledCourses = useMemo(
    () => [
      {
        id: 'clinical-safety',
        title: { en: 'Clinical Safety Refresher', uk: 'Поновлення знань з клінічної безпеки' },
        summary: {
          en: 'Scenario drills on infection control, triage, and medication alerts.',
          uk: 'Сценарні тренування з інфекційного контролю, сортування пацієнтів і попереджень щодо ліків.',
        },
        catalog: { en: 'Compliance', uk: 'Відповідність' },
        duration: { en: '6 lessons · 3h', uk: '6 уроків · 3 год' },
        status: { en: 'In progress', uk: 'У процесі' },
        lastAccessed: { en: 'Last accessed 2 days ago', uk: 'Останній перегляд 2 дні тому' },
        progress: 72,
        cover:
          'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&h=720',
        tags: [
          { en: 'Mandatory', uk: 'Обов’язково' },
          { en: 'Clinical', uk: 'Клінічний' },
        ],
      },
      {
        id: 'onboarding-core',
        title: { en: 'Onboarding — Core eLearning', uk: 'Вступний курс — базове eLearning' },
        summary: {
          en: 'Orientation path covering policy, LMS walkthrough, and proficiency quiz.',
          uk: 'Орієнтаційний маршрут із політиками, оглядом LMS і тестом на компетентність.',
        },
        catalog: { en: 'Foundations', uk: 'Основи' },
        duration: { en: '4 modules · 90 min', uk: '4 модулі · 90 хв' },
        status: { en: 'Not started', uk: 'Не розпочато' },
        lastAccessed: { en: 'Invite sent today', uk: 'Запрошення надіслано сьогодні' },
        progress: 0,
        cover:
          'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&h=720',
        tags: [
          { en: 'Orientation', uk: 'Орієнтація' },
          { en: 'Self-paced', uk: 'У власному темпі' },
        ],
      },
      {
        id: 'clinical-safety-pro',
        title: { en: 'Clinical Safety Pro', uk: 'Клінічна безпека Pro' },
        summary: {
          en: 'Advanced cohort with live simulations, SCORM assessments, and certificates.',
          uk: 'Просунутий потік із живими симуляціями, оцінюваннями SCORM та сертифікатами.',
        },
        catalog: { en: 'Professional Development', uk: 'Професійний розвиток' },
        duration: { en: '8 weeks · blended', uk: '8 тижнів · змішаний формат' },
        status: { en: 'Ready to start', uk: 'Готово до старту' },
        lastAccessed: { en: 'Starts Monday', uk: 'Починається у понеділок' },
        progress: 0,
        cover:
          'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&h=720',
        tags: [
          { en: 'Live cohort', uk: 'Живий потік' },
          { en: 'Certificate', uk: 'Сертифікат' },
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
