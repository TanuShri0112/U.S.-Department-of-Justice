import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Plus,
  Filter,
  Users,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
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

  const mockCourses = [
    {
      id: 1,
      title: currentLanguage === 'de' 
        ? 'Datenschutz & IT-Sicherheit'
        : currentLanguage === 'en'
        ? 'Information Security and Cybersecurity'
        : 'Seguridad de la información y ciberseguridad',
      description: currentLanguage === 'de'
        ? 'Umfasst Phishing-Erkennung, DSGVO, sichere digitale Arbeitspraktiken und Incident Response.'
        : currentLanguage === 'en'
        ? 'Covers phishing recognition, GDPR, secure digital work practices, and incident response.'
        : 'Incluye reconocimiento de phishing, RGPD, buenas prácticas digitales y respuesta a incidentes.',
      students: 120,
      duration: currentLanguage === 'de' ? '6 Wochen' : currentLanguage === 'en' ? '6 weeks' : '6 semanas',
      level: currentLanguage === 'de' ? 'Anfänger' : currentLanguage === 'en' ? 'Beginner' : 'Principiante',
      status: currentLanguage === 'de' ? 'Aktiv' : currentLanguage === 'en' ? 'Active' : 'Activo',
      image: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&h=750',
      catalog: currentLanguage === 'de' ? 'Risikominderung' : currentLanguage === 'en' ? 'Risk Reduction' : 'Reducción de riesgos'
    },
    {
      id: 2,
      title: currentLanguage === 'de'
        ? 'Digitale Pädagogik für Blended Learning'
        : currentLanguage === 'en'
        ? 'Digital Pedagogy for Blended Learning'
        : 'Pedagogía digital para aprendizaje combinado',
      description: currentLanguage === 'de'
        ? 'Planen Sie modulare Inhalte, virtuelle Workshops und selbstgesteuerte Aufgaben.'
        : currentLanguage === 'en'
        ? 'Plan modular content, virtual workshops, and self-paced assignments.'
        : 'Planifica contenido modular, talleres virtuales y actividades auto-dirigidas.',
      students: 86,
      duration: currentLanguage === 'de' ? '4 Wochen' : currentLanguage === 'en' ? '4 weeks' : '4 semanas',
      level: currentLanguage === 'de' ? 'Mittelstufe' : currentLanguage === 'en' ? 'Intermediate' : 'Intermedio',
      status: currentLanguage === 'de' ? 'Aktiv' : currentLanguage === 'en' ? 'Active' : 'Activo',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&h=750',
      catalog: currentLanguage === 'de' ? 'Lehrerausbildung' : currentLanguage === 'en' ? 'Teacher Training' : 'Formación docente'
    },
    {
      id: 3,
      title: currentLanguage === 'de'
        ? 'Lernendenbewertung mit sofortigem Feedback'
        : currentLanguage === 'en'
        ? 'Learner Assessment with Instant Feedback'
        : 'Evaluación del alumnado con retroalimentación inmediata',
      description: currentLanguage === 'de'
        ? 'SCORM-konforme Bewertungen, automatisierte Rückmeldungen und Zertifikatsgenerierung.'
        : currentLanguage === 'en'
        ? 'SCORM-compliant assessments, automated feedback, and certificate generation.'
        : 'Evaluaciones compatibles con SCORM, retroalimentación automática y emisión de certificados.',
      students: 64,
      duration: currentLanguage === 'de' ? '3 Wochen' : currentLanguage === 'en' ? '3 weeks' : '3 semanas',
      level: currentLanguage === 'de' ? 'Fortgeschritten' : currentLanguage === 'en' ? 'Advanced' : 'Avanzado',
      status: currentLanguage === 'de' ? 'Bevorstehend' : currentLanguage === 'en' ? 'Upcoming' : 'Próximo',
      image: 'https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&h=750',
      catalog: currentLanguage === 'de' ? 'Bewertungstools' : currentLanguage === 'en' ? 'Assessment Tools' : 'Herramientas de evaluación'
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

  const handleCreateCourse = () => {
    navigate('/courses/create');
  };

  const getStatusColor = (status) => {
    if (status === currentLanguage === 'de' ? 'Aktiv' : currentLanguage === 'en' ? 'Active' : 'Activo') {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-yellow-100 text-yellow-800';
  };

  const texts = {
    de: {
      title: 'Kurse',
      description: 'Durchsuchen und verwalten Sie alle verfügbaren Kurse',
      searchPlaceholder: 'Kurse durchsuchen...',
      allLevels: 'Alle Niveaus',
      allCatalogs: 'Alle Kataloge',
      beginner: 'Anfänger',
      intermediate: 'Mittelstufe',
      advanced: 'Fortgeschritten',
      riskReduction: 'Risikominderung',
      teacherTraining: 'Lehrerausbildung',
      assessmentTools: 'Bewertungstools',
      createCourse: 'Neuen Kurs erstellen',
      browseCatalog: 'Vollständigen Katalog durchsuchen',
      students: 'Teilnehmer',
      duration: 'Dauer',
      level: 'Niveau',
      viewCourse: 'Kurs anzeigen'
    },
    en: {
      title: 'Courses',
      description: 'Browse and manage all available courses',
      searchPlaceholder: 'Search courses...',
      allLevels: 'All levels',
      allCatalogs: 'All catalogs',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      riskReduction: 'Risk Reduction',
      teacherTraining: 'Teacher Training',
      assessmentTools: 'Assessment Tools',
      createCourse: 'Create new course',
      browseCatalog: 'Browse full catalog',
      students: 'Students',
      duration: 'Duration',
      level: 'Level',
      viewCourse: 'View Course'
    },
    es: {
      title: 'Cursos',
      description: 'Explora y gestiona todos los cursos disponibles',
      searchPlaceholder: 'Buscar cursos...',
      allLevels: 'Todos los niveles',
      allCatalogs: 'Todos los catálogos',
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      riskReduction: 'Reducción de riesgos',
      teacherTraining: 'Formación docente',
      assessmentTools: 'Herramientas de evaluación',
      createCourse: 'Crear nuevo curso',
      browseCatalog: 'Ver catálogo completo',
      students: 'Estudiantes',
      duration: 'Duración',
      level: 'Nivel',
      viewCourse: 'Ver Curso'
    }
  };

  const t = texts[currentLanguage] || texts.de;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title={t.title}
        description={t.description}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[220px]">
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
              <SelectItem value="risk">{t.riskReduction}</SelectItem>
              <SelectItem value="training">{t.teacherTraining}</SelectItem>
              <SelectItem value="assessment">{t.assessmentTools}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/catalog')} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            {t.browseCatalog}
          </Button>
          <Button variant="default" onClick={handleCreateCourse} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t.createCourse}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredCourses.map((course) => (
          <Card 
            key={course.id} 
            className="relative overflow-hidden border border-border/60 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCourseClick(course.id)}
          >
            <div className="h-40 overflow-hidden relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className={getStatusColor(course.status)}>
                  {course.status}
                </Badge>
              </div>
            </div>

            <CardHeader className="space-y-1">
              <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <Badge variant="outline">{course.level}</Badge>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <Badge variant="secondary">{course.catalog}</Badge>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  {t.viewCourse}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            {currentLanguage === 'de' 
              ? 'Keine Kurse gefunden. Versuchen Sie eine andere Suche.'
              : currentLanguage === 'en'
              ? 'No courses found. Try a different search.'
              : 'No se encontraron cursos. Intenta con otra búsqueda.'}
          </p>
        </Card>
      )}
    </div>
  );
};

export default Courses;
