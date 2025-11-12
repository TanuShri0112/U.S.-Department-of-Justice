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
  Globe
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

  const overviewStats = [
    {
      label: currentLanguage === 'en' ? 'Active Curricula' : 'Активни наставни програми',
      value: '12',
      trend: currentLanguage === 'en' ? '+3 new this month' : '+3 нови овој месец',
      icon: Layers
    },
    {
      label: currentLanguage === 'en' ? 'Teacher Training Progress' : 'Напредок на обука на наставници',
      value: '68%',
      trend: currentLanguage === 'en' ? 'Average completion rate' : 'Просечна стапка на завршување',
      icon: Target
    },
    {
      label: currentLanguage === 'en' ? 'Courses Completed' : 'Завршени курсеви',
      value: '156',
      trend: currentLanguage === 'en' ? 'Across all cohorts' : 'Преку сите групи',
      icon: ClipboardCheck
    },
    {
      label: currentLanguage === 'en' ? 'Pending Reviews' : 'Прегледи на чекање',
      value: '9',
      trend: currentLanguage === 'en' ? 'Awaiting board approval' : 'Чека одобрување од одборот',
      icon: FileText
    }
  ];

  const notifications = [
    {
      title: currentLanguage === 'en' 
        ? 'Curriculum draft ready for review' 
        : 'Нацрт на наставна програма подготвен за преглед',
      detail: currentLanguage === 'en'
        ? 'Macedonian language arts module submitted by Design Team.'
        : 'Модул за македонски јазик и литература поднесен од тимот за дизајн.',
      time: currentLanguage === 'en' ? '2h ago' : 'Пред 2 часа'
    },
    {
      title: currentLanguage === 'en'
        ? 'Teacher workshop scheduled'
        : 'Закажана работилница за наставници',
      detail: currentLanguage === 'en'
        ? 'Digital Citizenship virtual workshop on Nov 18.'
        : 'Виртуелна работилница за дигитално граѓанство на 18 ноември.',
      time: currentLanguage === 'en' ? 'Yesterday' : 'Вчера'
    },
    {
      title: currentLanguage === 'en'
        ? 'Security policy update'
        : 'Ажурирање на политика за безбедност',
      detail: currentLanguage === 'en'
        ? 'GDPR compliance checklist refreshed—action required by Admins.'
        : 'Листата за усогласеност со GDPR е освежена—потребна е акција од администраторите.',
      time: currentLanguage === 'en' ? '2 days ago' : 'Пред 2 дена'
    }
  ];

  const rolloutPhases = [
    {
      phase: currentLanguage === 'en'
        ? 'Setup & Configuration (Month 1-2)'
        : 'Поставување и конфигурација (Месец 1-2)',
      detail: currentLanguage === 'en'
        ? 'Activate Admin/Designer roles, configure localization (MK & EN), import initial data.'
        : 'Активирајте улоги на администратор/дизајнер, конфигурирајте локализација (МК и АН), увезете почетни податоци.'
    },
    {
      phase: currentLanguage === 'en'
        ? 'Training Delivery (Month 3-4)'
        : 'Спроведување на обука (Месец 3-4)',
      detail: currentLanguage === 'en'
        ? 'Trainers onboard teachers, deliver blended learning sessions, gather feedback.'
        : 'Тренерите ги вклучуваат наставниците, спроведуваат мешани сесии за учење, собираат повратни информации.'
    },
    {
      phase: currentLanguage === 'en'
        ? 'Evaluation & Analytics (Month 5-6)'
        : 'Евалуација и аналитика (Месец 5-6)',
      detail: currentLanguage === 'en'
        ? 'Reviewers analyze progress dashboards, export reports, finalize curriculum approvals.'
        : 'Прегледувачите анализираат табла за напредок, извезуваат извештаи, финализираат одобрувања на наставни програми.'
    }
  ];

  const curriculumTemplates = currentLanguage === 'en'
    ? [
        'National standards alignment',
        'Digital safety competency map',
        'Inquiry-based learning framework'
      ]
    : [
        'Усогласување со национални стандарди',
        'Мапа на компетенции за дигитална безбедност',
        'Рамка за учење засновано на истражување'
      ];

  const teacherMilestones = [
    {
      title: currentLanguage === 'en' ? 'Certification Pathway' : 'Патека за сертификација',
      detail: currentLanguage === 'en'
        ? '4 of 6 micro-credentials earned'
        : '4 од 6 микро-акредитации заработени',
      progress: '67%'
    },
    {
      title: currentLanguage === 'en' ? 'Evaluation Scores' : 'Резултати од евалуација',
      detail: currentLanguage === 'en'
        ? 'Average peer review score 4.3/5'
        : 'Просечна оценка од колеги 4.3/5',
      progress: currentLanguage === 'en' ? 'Latest cycle Oct 2025' : 'Последен циклус окт 2025'
    },
    {
      title: currentLanguage === 'en' ? 'Engagement Heatmap' : 'Мапа на ангажман',
      detail: currentLanguage === 'en'
        ? 'High participation in virtual labs'
        : 'Високо учество во виртуелни лаборатории',
      progress: currentLanguage === 'en' ? 'Updated weekly' : 'Ажурирано неделно'
    }
  ];

  const analyticsWidgets = [
    {
      title: currentLanguage === 'en' ? 'Completion Rate' : 'Стапка на завршување',
      figure: '82%',
      description: currentLanguage === 'en'
        ? 'Blended learning modules'
        : 'Модули за мешано учење'
    },
    {
      title: currentLanguage === 'en' ? 'Engagement Index' : 'Индекс на ангажман',
      figure: '7.4',
      description: currentLanguage === 'en'
        ? 'Discussion activity level'
        : 'Ниво на активност во дискусии'
    },
    {
      title: currentLanguage === 'en' ? 'Assessment Insights' : 'Согледувања од проценка',
      figure: '22%',
      description: currentLanguage === 'en'
        ? 'Questions flagged for review'
        : 'Прашања означени за преглед'
    }
  ];

  const repositoryFilters = currentLanguage === 'en'
    ? [
        'Curriculum Documents',
        'Multimedia Resources',
        'Policy & Compliance',
        'Training Playbooks'
      ]
    : [
        'Документи за наставни програми',
        'Мултимедијални ресурси',
        'Политика и усогласеност',
        'Прирачници за обука'
      ];

  const collaborationTools = [
    {
      name: currentLanguage === 'en' ? 'Discussion Forums' : 'Форуми за дискусија',
      description: currentLanguage === 'en'
        ? 'Role-based threads for peer support'
        : 'Нишки засновани на улоги за поддршка од колеги'
    },
    {
      name: currentLanguage === 'en' ? 'Shared Lesson Planning' : 'Споделено планирање на часови',
      description: currentLanguage === 'en'
        ? 'Real-time co-authoring with version history'
        : 'Совместно авторство во реално време со историја на верзии'
    },
    {
      name: currentLanguage === 'en' ? 'Announcements' : 'Најави',
      description: currentLanguage === 'en'
        ? 'Notify cohorts and school boards instantly'
        : 'Веднаш известувајте ги групите и училишните одбори'
    },
    {
      name: currentLanguage === 'en' ? 'Helpdesk Chat' : 'Чет за поддршка',
      description: currentLanguage === 'en'
        ? 'Connect with support for technical guidance'
        : 'Поврзете се со поддршка за технички водич'
    }
  ];

  const roleDashboards = [
    {
      role: currentLanguage === 'en' ? 'Administrator' : 'Администратор',
      responsibilities: currentLanguage === 'en'
        ? 'Manage users, roles, compliance dashboards, data exports.'
        : 'Управувајте со корисници, улоги, табла за усогласеност, извоз на податоци.'
    },
    {
      role: currentLanguage === 'en' ? 'Curriculum Designer' : 'Дизајнер на наставни програми',
      responsibilities: currentLanguage === 'en'
        ? 'Build curriculum blueprints, maintain resource libraries, request approvals.'
        : 'Градете нацрти на наставни програми, одржувајте библиотеки на ресурси, побарајте одобрувања.'
    },
    {
      role: currentLanguage === 'en' ? 'Trainer / Instructor' : 'Тренер / Инструктор',
      responsibilities: currentLanguage === 'en'
        ? 'Deliver modules, grade assessments, monitor learner progress.'
        : 'Спроведувајте модули, оценувајте проценки, следете го напредокот на учесниците.'
    },
    {
      role: currentLanguage === 'en' ? 'Learner / Teacher' : 'Учесник / Наставник',
      responsibilities: currentLanguage === 'en'
        ? 'Complete modules, track milestones, download certificates.'
        : 'Завршете модули, следете ги пресвртниците, преземете сертификати.'
    },
    {
      role: currentLanguage === 'en' ? 'Reviewer / Board' : 'Прегледувач / Одбор',
      responsibilities: currentLanguage === 'en'
        ? 'Audit curricula, approve updates, validate compliance.'
        : 'Аудитирајте наставни програми, одобрувајте ажурирања, валидирајте усогласеност.'
    },
    {
      role: currentLanguage === 'en' ? 'Support / Helpdesk' : 'Поддршка / Служба за помош',
      responsibilities: currentLanguage === 'en'
        ? 'Handle tickets, monitor system health, assist users.'
        : 'Решавајте тикети, следете го здравјето на системот, помагајте на корисници.'
    }
  ];

  const mockCourses = [
    {
      id: 1,
      title:
        currentLanguage === 'en'
          ? 'Information Security and Cybersecurity'
          : 'Информациона безбедност и кибербезбедност',
      description:
        currentLanguage === 'en'
          ? 'Covers phishing recognition, GDPR, secure digital work practices, and incident response.'
          : 'Опишува препознавање на фишинг, GDPR, безбедни дигитални работни практики и одговор на инциденти.',
      students: 120,
      duration: '6 weeks',
      level: 'Beginner',
      status: 'Active',
      image:
        'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&h=750',
      catalog: 'Risk Reduction'
    },
    {
      id: 2,
      title:
        currentLanguage === 'en'
          ? 'Digital Pedagogy for Blended Learning'
          : 'Дигитална педагогија за мешано учење',
      description:
        currentLanguage === 'en'
          ? 'Plan modular content, virtual workshops, and self-paced assignments.'
          : 'Планирајте модуларна содржина, виртуелни работилници и самостојни задачи.',
      students: 86,
      duration: '4 weeks',
      level: 'Intermediate',
      status: 'Active',
      image:
        'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&h=750',
      catalog: 'Teacher Training'
    },
    {
      id: 3,
      title:
        currentLanguage === 'en'
          ? 'Learner Assessment with Instant Feedback'
          : 'Проценка на учесници со моментална повратна информација',
      description:
        currentLanguage === 'en'
          ? 'SCORM-compliant assessments, automated feedback, and certificate generation.'
          : 'SCORM-усогласени проценки, автоматизирана повратна информација и генерирање на сертификати.',
      students: 64,
      duration: '3 weeks',
      level: 'Advanced',
      status: 'Upcoming',
      image:
        'https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&h=750',
      catalog: 'Assessment Tools'
    }
  ];

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  const handleCatalogClick = () => {
    navigate('/catalog');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title={
          currentLanguage === 'en'
            ? 'LMS Dashboard'
            : 'LMS Табла'
        }
        description={
          currentLanguage === 'en'
            ? 'Track curriculum design, training delivery, and quality metrics.'
            : 'Следете дизајн на наставни програми, спроведување на обуки и квалитетни метрики.'
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map(({ label, value, trend, icon: Icon }) => (
          <Card key={label} className="border border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{value}</div>
              <p className="text-xs text-muted-foreground">{trend}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5 text-primary" />
                {currentLanguage === 'en' ? 'Notifications & Announcements' : 'Известувања и најави'}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'en'
                  ? 'Keep every role aligned with new curricula, training, and compliance alerts.'
                  : 'Одржувајте ја секоја улога усогласена со нови наставни програми, обуки и аларми за усогласеност.'}
              </p>
            </div>
            <Button variant="outline" size="sm">
              {currentLanguage === 'en' ? 'View all' : 'Види се'}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map(({ title, detail, time }) => (
              <div
                key={title}
                className="flex flex-col gap-1 rounded-lg border border-border/50 p-4 hover:bg-muted/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{title}</span>
                  <Badge variant="secondary">{time}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Phased Rollout Plan' : 'План за фазна имплементација'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? '6-month implementation roadmap aligned with tender milestones.'
                : 'Патна карта за имплементација од 6 месеци усогласена со пресвртниците на тендерот.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {rolloutPhases.map(({ phase, detail }) => (
              <div key={phase} className="space-y-1 border-l-2 border-primary/40 pl-4">
                <h4 className="text-sm font-semibold">{phase}</h4>
                <p className="text-xs text-muted-foreground">{detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-primary/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Curriculum Design Workspace' : 'Работна површина за дизајн на наставни програми'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Drag and drop modules, align learning outcomes, and integrate multimedia assets.'
                : 'Влечете и спуштајте модули, усогласете ги исходите од учење и интегрирајте мултимедијални ресурси.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {curriculumTemplates.map((template) => (
                <Badge key={template} variant="outline" className="border-primary/40 text-primary">
                  {template}
                </Badge>
              ))}
            </div>
            <div className="rounded-lg border border-dashed border-primary/30 p-6 text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Drop competencies, standards, and resources here to prototype the curriculum sequence.'
                : 'Спуштете компетенции, стандарди и ресурси овде за да прототипирате секвенцата на наставната програма.'}
            </div>
            <Button variant="default" className="w-full gap-2">
              <Plus className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Launch Curriculum Studio Prototype' : 'Лансирај прототип на студио за наставни програми'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Course Builder & Assessments' : 'Градител на курсеви и проценки'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Create SCORM/xAPI-ready lessons, define objectives, and configure automated feedback.'
                : 'Создадете часови подготвени за SCORM/xAPI, дефинирајте цели и конфигурирајте автоматизирана повратна информација.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border/70 p-3">
                <h4 className="font-semibold">
                  {currentLanguage === 'en' ? 'Lesson Templates' : 'Шаблони за часови'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentLanguage === 'en'
                    ? 'Objectives, outcomes, resources, blended steps.'
                    : 'Цели, исходи, ресурси, мешани чекори.'}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 p-3">
                <h4 className="font-semibold">
                  {currentLanguage === 'en' ? 'Assessment Library' : 'Библиотека за проценка'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentLanguage === 'en'
                    ? 'Quizzes, case studies, rubric-based evaluations.'
                    : 'Квизови, студиски случаи, проценки засновани на рубрики.'}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 p-3">
                <h4 className="font-semibold">
                  {currentLanguage === 'en' ? 'Certification Rules' : 'Правила за сертификација'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentLanguage === 'en'
                    ? 'Automate credential issuance after rubric thresholds.'
                    : 'Автоматизирајте издавање на акредитации по прагови на рубрики.'}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 p-3">
                <h4 className="font-semibold">
                  {currentLanguage === 'en' ? 'Digital Signature' : 'Дигитален потпис'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentLanguage === 'en'
                    ? 'Validate submissions before reviewer approval.'
                    : 'Валидирајте поднесоци пред одобрување од прегледувач.'}
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2">
              <FileText className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Browse Course Catalog Prototype' : 'Прегледај прототип на каталог на курсеви'}
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Teacher Progress Tracker' : 'Следбеник на напредок на наставници'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Visualize micro-credential progress, evaluation insights, and cohort health.'
                : 'Визуализирајте напредок на микро-акредитации, согледувања од евалуација и здравје на групите.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherMilestones.map(({ title, detail, progress }) => (
              <div key={title} className="rounded-lg border border-border/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{title}</span>
                  <Badge variant="outline">{progress}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Analytics & Reporting' : 'Аналитика и известување'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Present leadership-ready dashboards with exportable insights.'
                : 'Прикажете табла подготвени за лидерство со извозливи согледувања.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsWidgets.map(({ title, figure, description }) => (
              <div key={title} className="rounded-lg border border-border/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase text-muted-foreground">{title}</span>
                  <span className="text-xl font-semibold text-primary">{figure}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2">
              <BarChart3 className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Export Board Report (CSV/PDF)' : 'Извези извештај од одбор (CSV/PDF)'}
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FolderOpen className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Resource Library' : 'Библиотека на ресурси'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Searchable, tagged repository syncing policy, curriculum, and multimedia assets.'
                : 'Пребарувачка, обележана складишна база што синхронизира политика, наставни програми и мултимедијални ресурси.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {repositoryFilters.map((filter) => (
                <Badge key={filter} variant="outline">
                  {filter}
                </Badge>
              ))}
            </div>
            <Button variant="outline" className="w-full gap-2">
              <Search className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Explore Repository Prototype' : 'Истражете прототип на складишна база'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Collaboration & Communication' : 'Соработка и комуникација'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Enable cross-role teamwork, feedback loops, and knowledge sharing.'
                : 'Овозможете тимска работа преку улоги, јамки за повратна информација и споделување знаење.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {collaborationTools.map(({ name, description }) => (
              <div key={name} className="rounded-lg border border-border/70 p-4">
                <span className="font-medium">{name}</span>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Role-based Dashboards & Compliance' : 'Табла засновани на улоги и усогласеност'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Secure access, GDPR safeguards, and Macedonian/English localization coverage.'
                : 'Безбеден пристап, GDPR заштити и покриеност на локализација на македонски/англиски.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {roleDashboards.map(({ role, responsibilities }) => (
              <div key={role} className="rounded-lg border border-border/70 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{role}</h4>
                  <Badge variant="secondary">
                    {currentLanguage === 'en' ? 'Demo access' : 'Демо пристап'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{responsibilities}</p>
              </div>
            ))}
            <div className="rounded-lg border border-dashed border-primary/40 p-4 text-xs text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Simulate 25–30 demo accounts spanning all roles for tender presentation.'
                : 'Симулирајте 25–30 демо сметки кои опфаќаат сите улоги за презентација на тендерот.'}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-3 border border-primary/30 bg-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Localization & Accessibility' : 'Локализација и пристапност'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Showcase Macedonian & English UI, WCAG-compliant patterns, and scalable architecture.'
                : 'Прикажете кориснички интерфејс на македонски и англиски, WCAG-усогласени модели и скалабилна архитектура.'}
            </p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border/70 p-4 text-sm">
              <span className="font-semibold">
                {currentLanguage === 'en' ? 'Multilingual Toggle' : 'Префрлување на повеќе јазици'}
              </span>
              <p className="text-xs text-muted-foreground mt-2">
                {currentLanguage === 'en'
                  ? 'Demonstrate Macedonian (MK) and English (EN) translations across dashboards.'
                  : 'Демонстрирајте преводи на македонски (МК) и англиски (АН) преку таблата.'}
              </p>
            </div>
            <div className="rounded-lg border border-border/70 p-4 text-sm">
              <span className="font-semibold">
                {currentLanguage === 'en' ? 'Accessibility Checklist' : 'Листа за пристапност'}
              </span>
              <p className="text-xs text-muted-foreground mt-2">
                {currentLanguage === 'en'
                  ? 'Contrast, keyboard navigation, descriptive labeling per WCAG AA.'
                  : 'Контраст, навигација со тастатура, описни етикети според WCAG AA.'}
              </p>
            </div>
            <div className="rounded-lg border border-border/70 p-4 text-sm">
              <span className="font-semibold">
                {currentLanguage === 'en' ? 'Secure Data Flow' : 'Безбеден проток на податоци'}
              </span>
              <p className="text-xs text-muted-foreground mt-2">
                {currentLanguage === 'en'
                  ? 'GDPR-compliant hosting, audit logging, encrypted exports/imports.'
                  : 'GDPR-усогласено хостирање, аудит логирање, шифриран извоз/увоз.'}
              </p>
            </div>
            <div className="rounded-lg border border-border/70 p-4 text-sm">
              <span className="font-semibold">
                {currentLanguage === 'en' ? 'Blended Learning Support' : 'Поддршка за мешано учење'}
              </span>
              <p className="text-xs text-muted-foreground mt-2">
                {currentLanguage === 'en'
                  ? 'Combine virtual workshops with self-paced LMS modules in one calendar.'
                  : 'Комбинирајте виртуелни работилници со самостојни LMS модули во еден календар.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            {currentLanguage === 'en' ? 'Training Catalogue Preview' : 'Преглед на каталог за обука'}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={handleCatalogClick} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Browse full catalogue' : 'Прегледај целосен каталог'}
            </Button>
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Create new course' : 'Создади нов курс'}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder={currentLanguage === 'en' ? 'Search courses...' : 'Пребарај курсеви...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={currentLanguage === 'en' ? 'All levels' : 'Сите нивоа'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{currentLanguage === 'en' ? 'All levels' : 'Сите нивоа'}</SelectItem>
              <SelectItem value="beginner">{currentLanguage === 'en' ? 'Beginner' : 'Почетник'}</SelectItem>
              <SelectItem value="intermediate">{currentLanguage === 'en' ? 'Intermediate' : 'Средно'}</SelectItem>
              <SelectItem value="advanced">{currentLanguage === 'en' ? 'Advanced' : 'Напредно'}</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder={currentLanguage === 'en' ? 'All catalogs' : 'Сите каталози'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{currentLanguage === 'en' ? 'All catalogs' : 'Сите каталози'}</SelectItem>
              <SelectItem value="risk">{currentLanguage === 'en' ? 'Risk Reduction' : 'Намалување на ризик'}</SelectItem>
              <SelectItem value="training">{currentLanguage === 'en' ? 'Teacher Training' : 'Обука на наставници'}</SelectItem>
              <SelectItem value="assessment">{currentLanguage === 'en' ? 'Assessment Tools' : 'Алатки за проценка'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid	grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="relative overflow-hidden border border-border/60">
              <div className="h-40 overflow-hidden relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {course.status}
                  </Badge>
                </div>
              </div>

              <CardHeader className="space-y-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                  <CourseOptionsMenu courseId={course.id} />
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-primary/80" />
                    {course.students} {currentLanguage === 'en' ? 'enrolled' : 'вклучени'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary/80" />
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{currentLanguage === 'en' ? 'Level:' : 'Ниво:'} {course.level}</span>
                  <span>{currentLanguage === 'en' ? 'Catalog:' : 'Каталог:'} {course.catalog}</span>
                </div>
                <Button
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleCourseClick(course.id)}
                >
                  {currentLanguage === 'en' ? 'Continue learning' : 'Продолжи со учење'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Courses;