import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const translations = {
    en: {
      // Header
      search: 'Search...',
      calendar: 'Calendar',
      inbox: 'Inbox',
      notifications: 'Notifications',
      profile: 'Profile',
      logout: 'Log out',
      universityName: 'University of Quebec in Trois-Rivières (UQTR)',
      
      // Dashboard
      welcome: 'Welcome back',
      studentDashboard: 'Student Dashboard',
      haveProductiveDay: 'Have a productive day!',
      newTask: 'New Task',
      onlineCourse: 'Online Course',
      welcomeToUQTR: 'Welcome to UQTR',
      learningPlatform: 'Learning Platform',
      welcomeMessage: 'We\'re glad to see you here. Explore your courses, track your progress, and continue your professional development journey with us.',
      trainingCatalogue: 'Training Catalogue',
      selfRegistration: 'Self-Registration',
      progressTracking: 'Progress Tracking',
      multiFormatContent: 'Multi-Format Content',
      courseEnrollment: 'Course Enrollment',
      enrolled: 'Enrolled',
      completed: 'Completed',
      performance: 'Performance',
      myCourses: 'My Courses',
      viewAll: 'View All',
      todaysTask: 'Today\'s Task',
      newTask: 'New Task',
      all: 'All',
      open: 'Open',
      closed: 'Closed',
      archive: 'Archive',
      
      // Course details
      modules: 'modules',
      students: 'students',
      
      // Task details
      completeTrainingCatalogue: 'Complete Training Catalogue Setup',
      trainingCatalogueDescription: 'Configure course catalog for UQTR learners',
      reviewSelfRegistration: 'Review Self-Registration System',
      selfRegistrationDescription: 'Test and validate learner enrollment process',
      updateProgressReports: 'Update Progress Tracking Reports',
      progressReportsDescription: 'Generate monthly learning progress analytics',
      
      // Small stats
      integrationCapabilities: 'Integration Capabilities',
      ecommerceSupport: 'eCommerce Support',
      scormContent: 'SCORM Content',
      
      // Performance
      growthComparison: 'You have a 23% growth in comparison with last month.',
      
      // Calendar
      eventsFor: 'Events for',
      noEventsScheduled: 'No events scheduled',
      trainingCatalogueSetup: 'Training Catalogue Setup',
      selfRegistrationTraining: 'Self-Registration System Training',
      progressTrackingWorkshop: 'Progress Tracking Workshop',
      scormContentIntegration: 'SCORM Content Integration',
      ecommerceSupportTraining: 'eCommerce Support Training',
      integrationCapabilitiesWorkshop: 'Integration Capabilities Workshop',
      multiFormatContentTraining: 'Multi-Format Content Training',
      customizedCurriculum: 'Customized Curriculum & Scenario Design',
      assessmentWorkshop: 'Assessment & Evaluation Workshop',
      finalCertificationAssessment: 'Final Certification Assessment',
      module: 'module',
      workshop: 'workshop',
      
      // Months
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
      
      // Announcements
      announcements: 'Announcements',
      newTrainingCatalogueModule: 'New UQTR Training Catalogue Module Available',
      uqtrTrainingCoordinator: 'UQTR Training Coordinator',
      newTrainingCatalogueContent: 'Advanced UQTR Training Catalogue Module 2: Self-Registration & Progress Tracking is now available for enrollment.',
      scormIntegrationWorkshop: 'SCORM Content Integration Workshop',
      uqtrContentDepartment: 'UQTR Content Department',
      scormIntegrationContent: 'Join our upcoming workshop on SCORM 1.2/2004 content integration and multi-format support.',
      progressTrackingSurvey: 'Progress Tracking Analytics Survey',
      uqtrAnalyticsTeam: 'UQTR Analytics Team',
      progressTrackingSurveyContent: 'Please complete the progress tracking effectiveness survey to help us improve our analytics and reporting systems.',
      trainingManagement: 'Training Management',
      contentManagement: 'Content Management',
      analytics: 'Analytics',
      noAnnouncements: 'No announcements',
      checkBackLater: 'Check back later for updates',
      weekAgo: '1 week ago',
      hoursAgo: '2 hours ago',
      high: 'High',
      daysAgo: '5 days ago',
      
      // Zoom Classes
      zoomClassesManagement: 'Zoom Classes Management',
      upcomingClasses: 'Upcoming Classes',
      completedClasses: 'Completed Classes',
      noUpcomingClasses: 'No upcoming classes scheduled',
      scheduleFirstClass: 'Schedule your first class to get started',
      noCompletedClasses: 'No completed classes yet',
      completeFirstClass: 'Complete your first class to see it here',
      instructor: 'Instructor',
      joinViaZoom: 'Join via Zoom',
      viewRecording: 'View Recording',
      download: 'Download',
      completed: 'Completed',
      editClass: 'Edit Class',
      updateClass: 'Update Class',
      cancel: 'Cancel',
      recording: 'Recording',
      recordingPlayer: 'Recording Player',
      classHeldOn: 'Class held on',
      attendance: 'Attendance',
      students: 'students',
      downloadRecording: 'Download Recording',
      
      // Sidebar Navigation
      home: 'Home',
      courses: 'Courses',
      communityResources: 'Community Resources',
      catalog: 'Catalog',
      messages: 'Messages',
      games: 'Games',
      evaluationFeedback: 'Evaluation & Feedback',
      helpSupport: 'Help & Support',
      adminPortal: 'Admin Portal',
      faqs: 'FAQs',
      contactSupport: 'Contact Support',
      userGuides: 'User Guides',
      supportTicket: 'Support Ticket'
    },
    fr: {
      // Header
      search: 'Rechercher...',
      calendar: 'Calendrier',
      inbox: 'Boîte de réception',
      notifications: 'Notifications',
      profile: 'Profil',
      logout: 'Se déconnecter',
      universityName: 'University of Quebec in Trois-Rivières (UQTR)',
      
      // Dashboard
      welcome: 'Bon retour',
      studentDashboard: 'Tableau de bord étudiant',
      haveProductiveDay: 'Passez une journée productive !',
      newTask: 'Nouvelle tâche',
      onlineCourse: 'Cours en ligne',
      welcomeToUQTR: 'Bienvenue à l\'UQTR',
      learningPlatform: 'Plateforme d\'apprentissage',
      welcomeMessage: 'Nous sommes heureux de vous voir ici. Explorez vos cours, suivez vos progrès et continuez votre parcours de développement professionnel avec nous.',
      trainingCatalogue: 'Catalogue de formation',
      selfRegistration: 'Auto-inscription',
      progressTracking: 'Suivi des progrès',
      multiFormatContent: 'Contenu multi-format',
      courseEnrollment: 'Inscription aux cours',
      enrolled: 'Inscrit',
      completed: 'Terminé',
      performance: 'Performance',
      myCourses: 'Mes cours',
      viewAll: 'Voir tout',
      todaysTask: 'Tâche d\'aujourd\'hui',
      newTask: 'Nouvelle tâche',
      all: 'Tout',
      open: 'Ouvert',
      closed: 'Fermé',
      archive: 'Archives',
      
      // Course details
      modules: 'modules',
      students: 'étudiants',
      
      // Task details
      completeTrainingCatalogue: 'Compléter la configuration du catalogue de formation',
      trainingCatalogueDescription: 'Configurer le catalogue de cours pour les apprenants UQTR',
      reviewSelfRegistration: 'Examiner le système d\'auto-inscription',
      selfRegistrationDescription: 'Tester et valider le processus d\'inscription des apprenants',
      updateProgressReports: 'Mettre à jour les rapports de suivi des progrès',
      progressReportsDescription: 'Générer les analyses mensuelles des progrès d\'apprentissage',
      
      // Small stats
      integrationCapabilities: 'Capacités d\'intégration',
      ecommerceSupport: 'Support eCommerce',
      scormContent: 'Contenu SCORM',
      
      // Performance
      growthComparison: 'Vous avez une croissance de 23% par rapport au mois dernier.',
      
      // Calendar
      eventsFor: 'Événements pour le',
      noEventsScheduled: 'Aucun événement programmé',
      trainingCatalogueSetup: 'Configuration du catalogue de formation',
      selfRegistrationTraining: 'Formation au système d\'auto-inscription',
      progressTrackingWorkshop: 'Atelier de suivi des progrès',
      scormContentIntegration: 'Intégration de contenu SCORM',
      ecommerceSupportTraining: 'Formation au support eCommerce',
      integrationCapabilitiesWorkshop: 'Atelier sur les capacités d\'intégration',
      multiFormatContentTraining: 'Formation au contenu multi-format',
      customizedCurriculum: 'Conception de programme et de scénario personnalisé',
      assessmentWorkshop: 'Atelier d\'évaluation et d\'évaluation',
      finalCertificationAssessment: 'Évaluation de certification finale',
      module: 'module',
      workshop: 'atelier',
      
      // Months
      january: 'Janvier',
      february: 'Février',
      march: 'Mars',
      april: 'Avril',
      may: 'Mai',
      june: 'Juin',
      july: 'Juillet',
      august: 'Août',
      september: 'Septembre',
      october: 'Octobre',
      november: 'Novembre',
      december: 'Décembre',
      
      // Announcements
      announcements: 'Annonces',
      newTrainingCatalogueModule: 'Nouveau module de catalogue de formation UQTR disponible',
      uqtrTrainingCoordinator: 'Coordinateur de formation UQTR',
      newTrainingCatalogueContent: 'Module avancé de catalogue de formation UQTR 2: Auto-inscription et suivi des progrès est maintenant disponible pour inscription.',
      scormIntegrationWorkshop: 'Atelier d\'intégration de contenu SCORM',
      uqtrContentDepartment: 'Département de contenu UQTR',
      scormIntegrationContent: 'Rejoignez notre prochain atelier sur l\'intégration de contenu SCORM 1.2/2004 et le support multi-format.',
      progressTrackingSurvey: 'Enquête sur les analyses de suivi des progrès',
      uqtrAnalyticsTeam: 'Équipe d\'analyses UQTR',
      progressTrackingSurveyContent: 'Veuillez compléter l\'enquête sur l\'efficacité du suivi des progrès pour nous aider à améliorer nos systèmes d\'analyses et de rapports.',
      trainingManagement: 'Gestion de formation',
      contentManagement: 'Gestion de contenu',
      analytics: 'Analyses',
      noAnnouncements: 'Aucune annonce',
      checkBackLater: 'Revenez plus tard pour les mises à jour',
      weekAgo: 'il y a 1 semaine',
      hoursAgo: 'il y a 2 heures',
      high: 'Élevé',
      daysAgo: 'il y a 5 jours',
      
      // Zoom Classes
      zoomClassesManagement: 'Gestion des classes Zoom',
      upcomingClasses: 'Classes à venir',
      completedClasses: 'Classes terminées',
      noUpcomingClasses: 'Aucune classe à venir programmée',
      scheduleFirstClass: 'Programmez votre première classe pour commencer',
      noCompletedClasses: 'Aucune classe terminée pour le moment',
      completeFirstClass: 'Terminez votre première classe pour la voir ici',
      instructor: 'Instructeur',
      joinViaZoom: 'Rejoindre via Zoom',
      viewRecording: 'Voir l\'enregistrement',
      download: 'Télécharger',
      completed: 'Terminé',
      editClass: 'Modifier la classe',
      updateClass: 'Mettre à jour la classe',
      cancel: 'Annuler',
      recording: 'Enregistrement',
      recordingPlayer: 'Lecteur d\'enregistrement',
      classHeldOn: 'Classe tenue le',
      attendance: 'Présence',
      students: 'étudiants',
      downloadRecording: 'Télécharger l\'enregistrement',
      
      // Sidebar Navigation
      home: 'Accueil',
      courses: 'Cours',
      communityResources: 'Ressources communautaires',
      catalog: 'Catalogue',
      messages: 'Messages',
      games: 'Jeux',
      evaluationFeedback: 'Évaluation et commentaires',
      helpSupport: 'Aide et support',
      adminPortal: 'Portail administrateur',
      faqs: 'FAQ',
      contactSupport: 'Contacter le support',
      userGuides: 'Guides utilisateur',
      supportTicket: 'Ticket de support'
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
