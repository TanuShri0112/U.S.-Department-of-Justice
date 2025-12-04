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
  [ROLES.ADMIN]: { en: 'Admin', uk: 'Адміністратор' },
  [ROLES.PROGRAM_MANAGER]: { en: 'Program Manager', uk: 'Керівник програми' },
  [ROLES.TRAINER]: { en: 'Trainer', uk: 'Тренер' },
  [ROLES.EVALUATOR]: { en: 'Evaluator', uk: 'Оцінювач' },
  [ROLES.LEARNER]: { en: 'Learner', uk: 'Здобувач освіти' },
  [ROLES.SUPPORT]: { en: 'Support', uk: 'Підтримка' },
  [ROLES.GUEST]: { en: 'Guest', uk: 'Гість' },
  [ROLES.COORDINATOR]: { en: 'Coordinator', uk: 'Координатор' },
};

export const ROLE_DESCRIPTIONS = {
  [ROLES.ADMIN]: {
    en: 'Full system administrator with access to all modules and governance tools.',
    uk: 'Повний адміністратор системи з доступом до всіх модулів та інструментів управління.',
  },
  [ROLES.PROGRAM_MANAGER]: {
    en: 'Oversees curricula, cohorts, and program performance analytics.',
    uk: 'Керує навчальними планами, наборами слухачів та аналітикою ефективності програм.',
  },
  [ROLES.TRAINER]: {
    en: 'Creates courses, delivers live sessions, and evaluates learner progress.',
    uk: 'Створює курси, проводить живі заняття та оцінює прогрес слухачів.',
  },
  [ROLES.EVALUATOR]: {
    en: 'Audits assessments, compliance checkpoints, and certification quality.',
    uk: 'Аудитує оцінювання, точки відповідності та якість сертифікацій.',
  },
  [ROLES.LEARNER]: {
    en: 'Consumes learning content, completes assignments, and earns credentials.',
    uk: 'Проходить навчальний контент, виконує завдання та отримує сертифікати.',
  },
  [ROLES.SUPPORT]: {
    en: 'Provides helpdesk assistance, knowledge base updates, and ticket triage.',
    uk: 'Надає підтримку сервіс-деску, оновлює базу знань та обробляє звернення.',
  },
  [ROLES.GUEST]: {
    en: 'Limited read-only access for demos or external reviewers.',
    uk: 'Обмежений доступ лише для перегляду для демо та зовнішніх аудиторів.',
  },
  [ROLES.COORDINATOR]: {
    en: 'Coordinates logistics, scheduling, and stakeholder communications.',
    uk: 'Координує логістику, графіки та комунікацію зі стейкхолдерами.',
  },
};

