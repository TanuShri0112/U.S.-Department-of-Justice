export const ROLES = {
  ADMIN: 'admin',
  PROGRAM_MANAGER: 'programManager',
  TRAINER: 'trainer',
  EVALUATOR: 'evaluator',
  LEARNER: 'learner',
  SUPERVISOR: 'supervisor', // Teamleiter / HR
  SUPPORT: 'support',
  GUEST: 'guest',
  COORDINATOR: 'coordinator',
};

export const PRIMARY_ROLES = [
  ROLES.ADMIN,
  ROLES.PROGRAM_MANAGER,
  ROLES.TRAINER,
  ROLES.EVALUATOR,
  ROLES.LEARNER,
  ROLES.SUPERVISOR,
  ROLES.SUPPORT,
];

export const OPTIONAL_ROLES = [ROLES.GUEST, ROLES.COORDINATOR];

export const ALL_ROLES = [...PRIMARY_ROLES, ...OPTIONAL_ROLES];

export const ROLE_LABELS = {
  [ROLES.ADMIN]: { de: 'Systemadministrator', en: 'Admin', es: 'Administrador' },
  [ROLES.PROGRAM_MANAGER]: { de: 'Programmmanager', en: 'Program Manager', es: 'Gestor de programas' },
  [ROLES.TRAINER]: { de: 'Trainer / Kursautor', en: 'Trainer', es: 'Formador' },
  [ROLES.EVALUATOR]: { de: 'Evaluator', en: 'Evaluator', es: 'Evaluador' },
  [ROLES.LEARNER]: { de: 'Mitarbeiter', en: 'Learner', es: 'Alumno' },
  [ROLES.SUPERVISOR]: { de: 'Teamleiter / HR', en: 'Supervisor', es: 'Supervisor' },
  [ROLES.SUPPORT]: { de: 'Support', en: 'Support', es: 'Soporte' },
  [ROLES.GUEST]: { de: 'Gast', en: 'Guest', es: 'Invitado' },
  [ROLES.COORDINATOR]: { de: 'Koordinator', en: 'Coordinator', es: 'Coordinador' },
};

export const ROLE_DESCRIPTIONS = {
  [ROLES.ADMIN]: {
    de: 'Vollzugriff auf alle Systemmodule und Verwaltungstools.',
    en: 'Full system administrator with access to all modules and governance tools.',
    es: 'Administrador del sistema con acceso total a todos los módulos y herramientas de gobernanza.',
  },
  [ROLES.PROGRAM_MANAGER]: {
    de: 'Überwacht Lehrpläne, Kohorten und Programmanalysen.',
    en: 'Oversees curricula, cohorts, and program performance analytics.',
    es: 'Supervisa planes formativos, cohortes y analíticas de desempeño del programa.',
  },
  [ROLES.TRAINER]: {
    de: 'Erstellt Kurse, führt Live-Sitzungen durch und bewertet den Fortschritt der Lernenden.',
    en: 'Creates courses, delivers live sessions, and evaluates learner progress.',
    es: 'Crea cursos, imparte sesiones en directo y evalúa el progreso del alumnado.',
  },
  [ROLES.EVALUATOR]: {
    de: 'Prüft Bewertungen, Compliance-Prüfpunkte und Zertifizierungsqualität.',
    en: 'Audits assessments, compliance checkpoints, and certification quality.',
    es: 'Audita evaluaciones, puntos de cumplimiento y la calidad de las certificaciones.',
  },
  [ROLES.LEARNER]: {
    de: 'Nutzt Lerninhalte, absolviert Aufgaben und erwirbt Zertifikate.',
    en: 'Consumes learning content, completes assignments, and earns credentials.',
    es: 'Consume contenidos formativos, completa tareas y obtiene credenciales.',
  },
  [ROLES.SUPERVISOR]: {
    de: 'Überwacht Team-Schulungsstatus, anstehende Erneuerungen und Lücken in Pflichtschulungen. Eingeschränkte Admin-Rechte mit teambezogenen Berichten.',
    en: 'Monitors team course status, upcoming renewals, and gaps in mandatory training. Restricted admin with team-based reporting.',
    es: 'Supervisa el estado de los cursos del equipo, renovaciones próximas y brechas en la formación obligatoria. Admin restringido con informes basados en equipos.',
  },
  [ROLES.SUPPORT]: {
    de: 'Bietet Helpdesk-Unterstützung, aktualisiert die Wissensdatenbank und verwaltet Tickets.',
    en: 'Provides helpdesk assistance, knowledge base updates, and ticket triage.',
    es: 'Ofrece asistencia de mesa de ayuda, actualiza la base de conocimiento y gestiona incidencias.',
  },
  [ROLES.GUEST]: {
    de: 'Eingeschränkter Lesezugriff für Demos oder externe Prüfer.',
    en: 'Limited read-only access for demos or external reviewers.',
    es: 'Acceso limitado de solo lectura para demostraciones o revisores externos.',
  },
  [ROLES.COORDINATOR]: {
    de: 'Koordiniert Logistik, Terminplanung und Kommunikation mit Stakeholdern.',
    en: 'Coordinates logistics, scheduling, and stakeholder communications.',
    es: 'Coordina logística, programación y comunicaciones con los grupos de interés.',
  },
};

