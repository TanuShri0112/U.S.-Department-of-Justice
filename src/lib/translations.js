// Translation utilities and language files

export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    courses: "Courses",
    users: "Users",
    groups: "Groups",
    reports: "Reports",
    settings: "Settings",
    help: "Help",
    home: "Home",
    communityResources: "Community Resources",
    catalog: "Catalog",
    messages: "Messages",
    games: "Games",
    evaluationFeedback: "Evaluation & Feedback",
    helpSupport: "Help & Support",
    faqs: "FAQs",
    contactSupport: "Contact Support",
    userGuides: "User Guides",
    supportTicket: "Support Ticket",
    
    // Common
    search: "Search...",
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    create: "Create",
    update: "Update",
    
    // Company
    companyName: "Corporación Municipal de Desarrollo Social de Antofagasta",
    companyNameShort: "CMDS Antofagasta",
    
    // Dashboard Banner
    welcomeTitle: "Welcome to Corporación Municipal de Desarrollo Social de Antofagasta Training",
    welcomeSubtitle: "We're glad to see you here. Explore your courses, track your progress, and continue your professional development journey with us.",
    joinNow: "Join Now",
    onlineCourse: "Online Course",
    
    // Language
    language: "Language",
    english: "English",
    spanish: "Español",
    
    // Admin
    adminPortal: "Admin Portal",
    adminDashboard: "Admin Dashboard",
    
    // Training
    training: "Training",
    modules: "Modules",
    lessons: "Lessons",
    assessments: "Assessments",
    
    // Status
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    completed: "Completed",
    
    // Dashboard Components
    announcements: "Announcements",
    todaysTask: "Today's Task",
    newTask: "New Task",
    all: "All",
    open: "Open",
    closed: "Closed",
    archived: "Archived",
    noAnnouncements: "No announcements",
    checkBackLater: "Check back later for updates",
    zoomClassesManagement: "Zoom Classes Management",
    upcomingClasses: "Upcoming Classes",
    completedClasses: "Completed Classes",
    joinClass: "Join Class",
    viewRecording: "View Recording",
    downloadRecording: "Download Recording",
    editClass: "Edit Class",
    deleteClass: "Delete Class",
    addNewClass: "Add New Class",
    classTitle: "Class Title",
    classDate: "Class Date",
    classTime: "Class Time",
    classDuration: "Duration",
    classDescription: "Description",
    instructor: "Instructor",
    course: "Course",
    high: "High",
    medium: "Medium",
    low: "Low",
  },
  
  es: {
    // Navigation
    dashboard: "Panel de Control",
    courses: "Cursos",
    users: "Usuarios",
    groups: "Grupos",
    reports: "Reportes",
    settings: "Configuración",
    help: "Ayuda",
    home: "Inicio",
    communityResources: "Recursos Comunitarios",
    catalog: "Catálogo",
    messages: "Mensajes",
    games: "Juegos",
    evaluationFeedback: "Evaluación y Retroalimentación",
    helpSupport: "Ayuda y Soporte",
    faqs: "Preguntas Frecuentes",
    contactSupport: "Contactar Soporte",
    userGuides: "Guías de Usuario",
    supportTicket: "Ticket de Soporte",
    
    // Common
    search: "Buscar...",
    loading: "Cargando...",
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    create: "Crear",
    update: "Actualizar",
    
    // Company
    companyName: "Corporación Municipal de Desarrollo Social de Antofagasta",
    companyNameShort: "CMDS Antofagasta",
    
    // Dashboard Banner
    welcomeTitle: "Bienvenido a la Capacitación de la Corporación Municipal de Desarrollo Social de Antofagasta",
    welcomeSubtitle: "Nos alegra verte aquí. Explora tus cursos, rastrea tu progreso y continúa tu viaje de desarrollo profesional con nosotros.",
    joinNow: "Únete Ahora",
    onlineCourse: "Curso en Línea",
    
    // Language
    language: "Idioma",
    english: "English",
    spanish: "Español",
    
    // Admin
    adminPortal: "Portal de Administración",
    adminDashboard: "Panel de Administración",
    
    // Training
    training: "Capacitación",
    modules: "Módulos",
    lessons: "Lecciones",
    assessments: "Evaluaciones",
    
    // Status
    active: "Activo",
    inactive: "Inactivo",
    pending: "Pendiente",
    completed: "Completado",
    
    // Dashboard Components
    announcements: "Anuncios",
    todaysTask: "Tarea de Hoy",
    newTask: "Nueva Tarea",
    all: "Todas",
    open: "Abiertas",
    closed: "Cerradas",
    archived: "Archivadas",
    noAnnouncements: "Sin anuncios",
    checkBackLater: "Vuelve más tarde para actualizaciones",
    zoomClassesManagement: "Gestión de Clases Zoom",
    upcomingClasses: "Clases Próximas",
    completedClasses: "Clases Completadas",
    joinClass: "Unirse a la Clase",
    viewRecording: "Ver Grabación",
    downloadRecording: "Descargar Grabación",
    editClass: "Editar Clase",
    deleteClass: "Eliminar Clase",
    addNewClass: "Agregar Nueva Clase",
    classTitle: "Título de la Clase",
    classDate: "Fecha de la Clase",
    classTime: "Hora de la Clase",
    classDuration: "Duración",
    classDescription: "Descripción",
    instructor: "Instructor",
    course: "Curso",
    high: "Alta",
    medium: "Media",
    low: "Baja",
  }
};

// Translation hook - to be used in components
export const createTranslationHook = (useLanguage) => {
  return () => {
    const { language } = useLanguage();
    
    const t = (key) => {
      const keys = key.split('.');
      let value = translations[language];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return value || key;
    };
    
    return { t, language };
  };
};

// Helper function to get translation
export const getTranslation = (key, language = 'en') => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
