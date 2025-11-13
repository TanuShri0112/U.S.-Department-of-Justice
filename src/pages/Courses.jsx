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
      label: currentLanguage === 'en' ? 'Active Curricula' : 'Planes formativos activos',
      value: '12',
      trend: currentLanguage === 'en' ? '+3 new this month' : '+3 nuevos este mes',
      icon: Layers
    },
    {
      label: currentLanguage === 'en' ? 'Teacher Training Progress' : 'Progreso de formación docente',
      value: '68%',
      trend: currentLanguage === 'en' ? 'Average completion rate' : 'Tasa media de finalización',
      icon: Target
    },
    {
      label: currentLanguage === 'en' ? 'Courses Completed' : 'Cursos completados',
      value: '156',
      trend: currentLanguage === 'en' ? 'Across all cohorts' : 'En todos los grupos',
      icon: ClipboardCheck
    },
    {
      label: currentLanguage === 'en' ? 'Pending Reviews' : 'Revisiones pendientes',
      value: '9',
      trend: currentLanguage === 'en' ? 'Awaiting board approval' : 'En espera de aprobación del comité',
      icon: FileText
    }
  ];

  const notifications = [
    {
      title: currentLanguage === 'en' 
        ? 'Curriculum draft ready for review' 
        : 'Borrador de currículo listo para revisión',
      detail: currentLanguage === 'en'
        ? 'Macedonian language arts module submitted by Design Team.'
        : 'Módulo de lengua y literatura presentado por el equipo de diseño.',
      time: currentLanguage === 'en' ? '2h ago' : 'Hace 2 h'
    },
    {
      title: currentLanguage === 'en'
        ? 'Teacher workshop scheduled'
        : 'Taller docente programado',
      detail: currentLanguage === 'en'
        ? 'Digital Citizenship virtual workshop on Nov 18.'
        : 'Taller virtual de ciudadanía digital el 18 de noviembre.',
      time: currentLanguage === 'en' ? 'Yesterday' : 'Ayer'
    },
    {
      title: currentLanguage === 'en'
        ? 'Security policy update'
        : 'Actualización de política de seguridad',
      detail: currentLanguage === 'en'
        ? 'GDPR compliance checklist refreshed—action required by Admins.'
        : 'Lista de verificación de cumplimiento RGPD actualizada—se requiere acción de los administradores.',
      time: currentLanguage === 'en' ? '2 days ago' : 'Hace 2 días'
    }
  ];

  const rolloutPhases = [
    {
      phase: currentLanguage === 'en'
        ? 'Setup & Configuration (Month 1-2)'
        : 'Configuración inicial (Meses 1-2)',
      detail: currentLanguage === 'en'
        ? 'Activate Admin/Designer roles, configure localization (MK & EN), import initial data.'
        : 'Activa los roles de administrador/diseñador, configura la localización (ES e EN) e importa datos iniciales.'
    },
    {
      phase: currentLanguage === 'en'
        ? 'Training Delivery (Month 3-4)'
        : 'Impartición de la formación (Meses 3-4)',
      detail: currentLanguage === 'en'
        ? 'Trainers onboard teachers, deliver blended learning sessions, gather feedback.'
        : 'Los formadores incorporan al profesorado, imparten sesiones híbridas y recogen retroalimentación.'
    },
    {
      phase: currentLanguage === 'en'
        ? 'Evaluation & Analytics (Month 5-6)'
        : 'Evaluación y analítica (Meses 5-6)',
      detail: currentLanguage === 'en'
        ? 'Reviewers analyze progress dashboards, export reports, finalize curriculum approvals.'
        : 'Los evaluadores analizan paneles de progreso, exportan informes y validan las aprobaciones curriculares.'
    }
  ];

  const curriculumTemplates = currentLanguage === 'en'
    ? [
        'National standards alignment',
        'Digital safety competency map',
        'Inquiry-based learning framework'
      ]
    : [
        'Alineación con estándares nacionales',
        'Mapa de competencias en seguridad digital',
        'Marco de aprendizaje basado en la indagación'
      ];

  const teacherMilestones = [
    {
      title: currentLanguage === 'en' ? 'Certification Pathway' : 'Ruta de certificación',
      detail: currentLanguage === 'en'
        ? '4 of 6 micro-credentials earned'
        : '4 de 6 microcredenciales obtenidas',
      progress: '67%'
    },
    {
      title: currentLanguage === 'en' ? 'Evaluation Scores' : 'Resultados de evaluación',
      detail: currentLanguage === 'en'
        ? 'Average peer review score 4.3/5'
        : 'Puntuación media de revisión por pares 4,3/5',
      progress: currentLanguage === 'en' ? 'Latest cycle Oct 2025' : 'Último ciclo oct 2025'
    },
    {
      title: currentLanguage === 'en' ? 'Engagement Heatmap' : 'Mapa de participación',
      detail: currentLanguage === 'en'
        ? 'High participation in virtual labs'
        : 'Alta participación en laboratorios virtuales',
      progress: currentLanguage === 'en' ? 'Updated weekly' : 'Actualizado semanalmente'
    }
  ];

  const analyticsWidgets = [
    {
      title: currentLanguage === 'en' ? 'Completion Rate' : 'Tasa de finalización',
      figure: '82%',
      description: currentLanguage === 'en'
        ? 'Blended learning modules'
        : 'Módulos de aprendizaje combinado'
    },
    {
      title: currentLanguage === 'en' ? 'Engagement Index' : 'Índice de participación',
      figure: '7.4',
      description: currentLanguage === 'en'
        ? 'Discussion activity level'
        : 'Nivel de actividad en foros'
    },
    {
      title: currentLanguage === 'en' ? 'Assessment Insights' : 'Información de evaluaciones',
      figure: '22%',
      description: currentLanguage === 'en'
        ? 'Questions flagged for review'
        : 'Preguntas marcadas para revisión'
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
        'Documentos curriculares',
        'Recursos multimedia',
        'Política y cumplimiento',
        'Guías de formación'
      ];

  const collaborationTools = [
    {
      name: currentLanguage === 'en' ? 'Discussion Forums' : 'Foros de discusión',
      description: currentLanguage === 'en'
        ? 'Role-based threads for peer support'
        : 'Hilos por roles para apoyo entre pares'
    },
    {
      name: currentLanguage === 'en' ? 'Shared Lesson Planning' : 'Planificación de clases colaborativa',
      description: currentLanguage === 'en'
        ? 'Real-time co-authoring with version history'
        : 'Coautoría en tiempo real con historial de versiones'
    },
    {
      name: currentLanguage === 'en' ? 'Announcements' : 'Anuncios',
      description: currentLanguage === 'en'
        ? 'Notify cohorts and school boards instantly'
        : 'Notifica al instante a cohortes y juntas escolares'
    },
    {
      name: currentLanguage === 'en' ? 'Helpdesk Chat' : 'Chat de soporte',
      description: currentLanguage === 'en'
        ? 'Connect with support for technical guidance'
        : 'Conéctate con soporte para guía técnica'
    }
  ];

  const roleDashboards = [
    {
      role: currentLanguage === 'en' ? 'Administrator' : 'Administrador',
      responsibilities: currentLanguage === 'en'
        ? 'Manage users, roles, compliance dashboards, data exports.'
        : 'Gestiona usuarios, roles, tableros de cumplimiento y exportaciones de datos.'
    },
    {
      role: currentLanguage === 'en' ? 'Curriculum Designer' : 'Diseñador curricular',
      responsibilities: currentLanguage === 'en'
        ? 'Build curriculum blueprints, maintain resource libraries, request approvals.'
        : 'Diseña planes curriculares, mantiene bibliotecas de recursos y solicita aprobaciones.'
    },
    {
      role: currentLanguage === 'en' ? 'Trainer / Instructor' : 'Formador / Instructor',
      responsibilities: currentLanguage === 'en'
        ? 'Deliver modules, grade assessments, monitor learner progress.'
        : 'Imparte módulos, califica evaluaciones y supervisa el progreso del alumnado.'
    },
    {
      role: currentLanguage === 'en' ? 'Learner / Teacher' : 'Alumno / Docente',
      responsibilities: currentLanguage === 'en'
        ? 'Complete modules, track milestones, download certificates.'
        : 'Completa módulos, sigue hitos y descarga certificados.'
    },
    {
      role: currentLanguage === 'en' ? 'Reviewer / Board' : 'Evaluador / Comité',
      responsibilities: currentLanguage === 'en'
        ? 'Audit curricula, approve updates, validate compliance.'
        : 'Audita planes, aprueba actualizaciones y valida el cumplimiento.'
    },
    {
      role: currentLanguage === 'en' ? 'Support / Helpdesk' : 'Soporte / Mesa de ayuda',
      responsibilities: currentLanguage === 'en'
        ? 'Handle tickets, monitor system health, assist users.'
        : 'Gestiona tickets, monitoriza la salud del sistema y asiste a los usuarios.'
    }
  ];

  const mockCourses = [
    {
      id: 1,
      title:
        currentLanguage === 'en'
          ? 'Information Security and Cybersecurity'
          : 'Seguridad de la información y ciberseguridad',
      description:
        currentLanguage === 'en'
          ? 'Covers phishing recognition, GDPR, secure digital work practices, and incident response.'
          : 'Incluye reconocimiento de phishing, RGPD, buenas prácticas digitales y respuesta a incidentes.',
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
          : 'Pedagogía digital para aprendizaje combinado',
      description:
        currentLanguage === 'en'
          ? 'Plan modular content, virtual workshops, and self-paced assignments.'
          : 'Planifica contenido modular, talleres virtuales y actividades auto-dirigidas.',
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
          : 'Evaluación del alumnado con retroalimentación inmediata',
      description:
        currentLanguage === 'en'
          ? 'SCORM-compliant assessments, automated feedback, and certificate generation.'
          : 'Evaluaciones compatibles con SCORM, retroalimentación automática y emisión de certificados.',
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
            : 'Panel LMS'
        }
        description={
          currentLanguage === 'en'
            ? 'Track curriculum design, training delivery, and quality metrics.'
            : 'Supervisa el diseño curricular, la impartición de la formación y las métricas de calidad.'
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
                {currentLanguage === 'en' ? 'Notifications & Announcements' : 'Notificaciones y anuncios'}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'en'
                  ? 'Keep every role aligned with new curricula, training, and compliance alerts.'
                  : 'Mantén a cada rol alineado con nuevos planes, formaciones y alertas de cumplimiento.'}
              </p>
            </div>
            <Button variant="outline" size="sm">
              {currentLanguage === 'en' ? 'View all' : 'Ver todo'}
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
              {currentLanguage === 'en' ? 'Phased Rollout Plan' : 'Plan de despliegue por fases'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? '6-month implementation roadmap aligned with tender milestones.'
                : 'Hoja de ruta de 6 meses alineada con los hitos del pliego.'}
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
              {currentLanguage === 'en' ? 'Curriculum Design Workspace' : 'Área de diseño curricular'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Drag and drop modules, align learning outcomes, and integrate multimedia assets.'
                : 'Arrastra módulos, alinea resultados de aprendizaje e integra recursos multimedia.'}
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
                : 'Suelta competencias, estándares y recursos aquí para prototipar la secuencia curricular.'}
            </div>
            <Button variant="default" className="w-full gap-2">
              <Plus className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Launch Curriculum Studio Prototype' : 'Lanzar prototipo del estudio curricular'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Course Builder & Assessments' : 'Constructor de cursos y evaluaciones'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Create SCORM/xAPI-ready lessons, define objectives, and configure automated feedback.'
                : 'Crea lecciones listas para SCORM/xAPI, define objetivos y configura retroalimentación automática.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border/70 p-3">
                <h4 className="font-semibold">
                  {currentLanguage === 'en' ? 'Lesson Templates' : 'Plantillas de lecciones'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentLanguage === 'en'
                    ? 'Objectives, outcomes, resources, blended steps.'
                    : 'Objetivos, resultados, recursos y pasos híbridos.'}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 p-3">
                <h4 className="font-semibold">
                  {currentLanguage === 'en' ? 'Assessment Library' : 'Biblioteca de evaluaciones'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentLanguage === 'en'
                    ? 'Quizzes, case studies, rubric-based evaluations.'
                    : 'Cuestionarios, estudios de caso y evaluaciones basadas en rúbricas.'}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 p-3">
                <h4 className="font-semibold">
                  {currentLanguage === 'en' ? 'Certification Rules' : 'Reglas de certificación'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentLanguage === 'en'
                    ? 'Automate credential issuance after rubric thresholds.'
                    : 'Automatiza la emisión de credenciales al alcanzar los umbrales de la rúbrica.'}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 p-3">
                <h4 className="font-semibold">
                  {currentLanguage === 'en' ? 'Digital Signature' : 'Firma digital'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {currentLanguage === 'en'
                    ? 'Validate submissions before reviewer approval.'
                    : 'Valida envíos antes de la aprobación del evaluador.'}
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2">
              <FileText className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Browse Course Catalog Prototype' : 'Ver prototipo del catálogo de cursos'}
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Teacher Progress Tracker' : 'Seguimiento del progreso docente'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Visualize micro-credential progress, evaluation insights, and cohort health.'
                : 'Visualiza el avance en microcredenciales, los insights de evaluación y la salud de las cohortes.'}
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
              {currentLanguage === 'en' ? 'Analytics & Reporting' : 'Analítica e informes'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Present leadership-ready dashboards with exportable insights.'
                : 'Presenta paneles listos para la dirección con insights exportables.'}
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
              {currentLanguage === 'en' ? 'Export Board Report (CSV/PDF)' : 'Exportar informe para el comité (CSV/PDF)'}
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FolderOpen className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Resource Library' : 'Biblioteca de recursos'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Searchable, tagged repository syncing policy, curriculum, and multimedia assets.'
                : 'Repositorio etiquetado y buscable que sincroniza políticas, currículo y recursos multimedia.'}
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
              {currentLanguage === 'en' ? 'Explore Repository Prototype' : 'Explorar prototipo del repositorio'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Collaboration & Communication' : 'Colaboración y comunicación'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Enable cross-role teamwork, feedback loops, and knowledge sharing.'
                : 'Facilita el trabajo entre roles, los bucles de feedback y el intercambio de conocimiento.'}
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
              {currentLanguage === 'en' ? 'Role-based Dashboards & Compliance' : 'Paneles por rol y cumplimiento'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Secure access, GDPR safeguards, and Macedonian/English localization coverage.'
                : 'Acceso seguro, salvaguardas RGPD y cobertura de localización en español/inglés.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {roleDashboards.map(({ role, responsibilities }) => (
              <div key={role} className="rounded-lg border border-border/70 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{role}</h4>
                  <Badge variant="secondary">
                    {currentLanguage === 'en' ? 'Demo access' : 'Acceso demo'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{responsibilities}</p>
              </div>
            ))}
            <div className="rounded-lg border border-dashed border-primary/40 p-4 text-xs text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Simulate 25–30 demo accounts spanning all roles for tender presentation.'
                : 'Simula 25-30 cuentas demo que cubren todos los roles para la presentación.'}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-3 border border-primary/30 bg-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              {currentLanguage === 'en' ? 'Localization & Accessibility' : 'Localización y accesibilidad'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en'
                ? 'Showcase Macedonian & English UI, WCAG-compliant patterns, and scalable architecture.'
                : 'Muestra interfaz en español e inglés, patrones conformes a WCAG y arquitectura escalable.'}
            </p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border/70 p-4 text-sm">
              <span className="font-semibold">
                {currentLanguage === 'en' ? 'Multilingual Toggle' : 'Selector multilingüe'}
              </span>
              <p className="text-xs text-muted-foreground mt-2">
                {currentLanguage === 'en'
                  ? 'Demonstrate Macedonian (MK) and English (EN) translations across dashboards.'
                  : 'Demuestra traducciones en español (ES) e inglés (EN) en los paneles.'}
              </p>
            </div>
            <div className="rounded-lg border border-border/70 p-4 text-sm">
              <span className="font-semibold">
                {currentLanguage === 'en' ? 'Accessibility Checklist' : 'Lista de accesibilidad'}
              </span>
              <p className="text-xs text-muted-foreground mt-2">
                {currentLanguage === 'en'
                  ? 'Contrast, keyboard navigation, descriptive labeling per WCAG AA.'
                  : 'Contraste, navegación por teclado y etiquetas descriptivas según WCAG AA.'}
              </p>
            </div>
            <div className="rounded-lg border border-border/70 p-4 text-sm">
              <span className="font-semibold">
                {currentLanguage === 'en' ? 'Secure Data Flow' : 'Flujo de datos seguro'}
              </span>
              <p className="text-xs text-muted-foreground mt-2">
                {currentLanguage === 'en'
                  ? 'GDPR-compliant hosting, audit logging, encrypted exports/imports.'
                  : 'Alojamiento conforme al RGPD, registro de auditoría y exportaciones/importaciones cifradas.'}
              </p>
            </div>
            <div className="rounded-lg border border-border/70 p-4 text-sm">
              <span className="font-semibold">
                {currentLanguage === 'en' ? 'Blended Learning Support' : 'Soporte para aprendizaje combinado'}
              </span>
              <p className="text-xs text-muted-foreground mt-2">
                {currentLanguage === 'en'
                  ? 'Combine virtual workshops with self-paced LMS modules in one calendar.'
                  : 'Combina talleres virtuales con módulos autodirigidos en un único calendario.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            {currentLanguage === 'en' ? 'Training Catalogue Preview' : 'Vista previa del catálogo de formación'}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={handleCatalogClick} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Browse full catalogue' : 'Ver catálogo completo'}
            </Button>
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Create new course' : 'Crear nuevo curso'}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder={currentLanguage === 'en' ? 'Search courses...' : 'Buscar cursos...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={currentLanguage === 'en' ? 'All levels' : 'Todos los niveles'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{currentLanguage === 'en' ? 'All levels' : 'Todos los niveles'}</SelectItem>
              <SelectItem value="beginner">{currentLanguage === 'en' ? 'Beginner' : 'Principiante'}</SelectItem>
              <SelectItem value="intermediate">{currentLanguage === 'en' ? 'Intermediate' : 'Intermedio'}</SelectItem>
              <SelectItem value="advanced">{currentLanguage === 'en' ? 'Advanced' : 'Avanzado'}</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder={currentLanguage === 'en' ? 'All catalogs' : 'Todos los catálogos'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{currentLanguage === 'en' ? 'All catalogs' : 'Todos los catálogos'}</SelectItem>
              <SelectItem value="risk">{currentLanguage === 'en' ? 'Risk Reduction' : 'Reducción de riesgos'}</SelectItem>
              <SelectItem value="training">{currentLanguage === 'en' ? 'Teacher Training' : 'Formación docente'}</SelectItem>
              <SelectItem value="assessment">{currentLanguage === 'en' ? 'Assessment Tools' : 'Herramientas de evaluación'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid	grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredCourses.map((course) => {
            const statusLabel =
              currentLanguage === 'en'
                ? course.status
                : course.status === 'Active'
                  ? 'Activo'
                  : course.status === 'Upcoming'
                    ? 'Próximo'
                    : course.status;
            const levelLabel =
              currentLanguage === 'en'
                ? course.level
                : course.level === 'Beginner'
                  ? 'Principiante'
                  : course.level === 'Intermediate'
                    ? 'Intermedio'
                    : course.level === 'Advanced'
                      ? 'Avanzado'
                      : course.level;
            const catalogLabel =
              currentLanguage === 'en'
                ? course.catalog
                : course.catalog === 'Risk Reduction'
                  ? 'Reducción de riesgos'
                  : course.catalog === 'Teacher Training'
                    ? 'Formación docente'
                    : course.catalog === 'Assessment Tools'
                      ? 'Herramientas de evaluación'
                      : course.catalog;

            return (
            <Card key={course.id} className="relative overflow-hidden border border-border/60">
              <div className="h-40 overflow-hidden relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {statusLabel}
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
                    {course.students} {currentLanguage === 'en' ? 'enrolled' : 'inscritos'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary/80" />
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{currentLanguage === 'en' ? 'Level:' : 'Nivel:'} {levelLabel}</span>
                  <span>{currentLanguage === 'en' ? 'Catalog:' : 'Catálogo:'} {catalogLabel}</span>
                </div>
                <Button
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleCourseClick(course.id)}
                >
                  {currentLanguage === 'en' ? 'Continue learning' : 'Continuar aprendiendo'}
                </Button>
              </CardContent>
            </Card>
          )})}
        </div>
      </section>
    </div>
  );
};

export default Courses;