export const ROLES = {
  ADMIN: 'admin',
  PROGRAM_MANAGER: 'programManager',
  TRAINER: 'trainer',
  EVALUATOR: 'evaluator',
  LEARNER: 'learner',
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
  ROLES.SUPPORT,
];

export const OPTIONAL_ROLES = [ROLES.GUEST, ROLES.COORDINATOR];

export const ALL_ROLES = [...PRIMARY_ROLES, ...OPTIONAL_ROLES];

export const ROLE_LABELS = {
  [ROLES.ADMIN]: { en: 'Admin', es: 'Administrador' },
  [ROLES.PROGRAM_MANAGER]: { en: 'Program Manager', es: 'Gestor de programas' },
  [ROLES.TRAINER]: { en: 'Trainer', es: 'Formador' },
  [ROLES.EVALUATOR]: { en: 'Evaluator', es: 'Evaluador' },
  [ROLES.LEARNER]: { en: 'Learner', es: 'Alumno' },
  [ROLES.SUPPORT]: { en: 'Support', es: 'Soporte' },
  [ROLES.GUEST]: { en: 'Guest', es: 'Invitado' },
  [ROLES.COORDINATOR]: { en: 'Coordinator', es: 'Coordinador' },
};

export const ROLE_DESCRIPTIONS = {
  [ROLES.ADMIN]: {
    en: 'Full system administrator with access to all modules and governance tools.',
    es: 'Administrador del sistema con acceso total a todos los módulos y herramientas de gobernanza.',
  },
  [ROLES.PROGRAM_MANAGER]: {
    en: 'Oversees curricula, cohorts, and program performance analytics.',
    es: 'Supervisa planes formativos, cohortes y analíticas de desempeño del programa.',
  },
  [ROLES.TRAINER]: {
    en: 'Creates courses, delivers live sessions, and evaluates learner progress.',
    es: 'Crea cursos, imparte sesiones en directo y evalúa el progreso del alumnado.',
  },
  [ROLES.EVALUATOR]: {
    en: 'Audits assessments, compliance checkpoints, and certification quality.',
    es: 'Audita evaluaciones, puntos de cumplimiento y la calidad de las certificaciones.',
  },
  [ROLES.LEARNER]: {
    en: 'Consumes learning content, completes assignments, and earns credentials.',
    es: 'Consume contenidos formativos, completa tareas y obtiene credenciales.',
  },
  [ROLES.SUPPORT]: {
    en: 'Provides helpdesk assistance, knowledge base updates, and ticket triage.',
    es: 'Ofrece asistencia de mesa de ayuda, actualiza la base de conocimiento y gestiona incidencias.',
  },
  [ROLES.GUEST]: {
    en: 'Limited read-only access for demos or external reviewers.',
    es: 'Acceso limitado de solo lectura para demostraciones o revisores externos.',
  },
  [ROLES.COORDINATOR]: {
    en: 'Coordinates logistics, scheduling, and stakeholder communications.',
    es: 'Coordina logística, programación y comunicaciones con los grupos de interés.',
  },
};

