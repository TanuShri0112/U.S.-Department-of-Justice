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
  [ROLES.ADMIN]: { en: 'Admin', ar: 'مسؤول النظام' },
  [ROLES.PROGRAM_MANAGER]: { en: 'Program Manager', ar: 'مدير البرنامج' },
  [ROLES.TRAINER]: { en: 'Trainer', ar: 'مدرب' },
  [ROLES.EVALUATOR]: { en: 'Evaluator', ar: 'مقيم' },
  [ROLES.LEARNER]: { en: 'Learner', ar: 'متعلم' },
  [ROLES.SUPPORT]: { en: 'Support', ar: 'الدعم' },
  [ROLES.GUEST]: { en: 'Guest', ar: 'زائر' },
  [ROLES.COORDINATOR]: { en: 'Coordinator', ar: 'منسق' },
};

export const ROLE_DESCRIPTIONS = {
  [ROLES.ADMIN]: {
    en: 'Full system administrator with access to all modules and governance tools.',
    ar: 'مسؤول نظام شامل يتمتع بإمكانية الوصول إلى جميع الوحدات وأدوات الحوكمة.',
  },
  [ROLES.PROGRAM_MANAGER]: {
    en: 'Oversees curricula, cohorts, and program performance analytics.',
    ar: 'يشرف على المناهج والفِرق وتحليلات أداء البرنامج.',
  },
  [ROLES.TRAINER]: {
    en: 'Creates courses, delivers live sessions, and evaluates learner progress.',
    ar: 'ينشئ الدورات ويقدم الجلسات المباشرة ويقيّم تقدم المتعلمين.',
  },
  [ROLES.EVALUATOR]: {
    en: 'Audits assessments, compliance checkpoints, and certification quality.',
    ar: 'يراجع التقييمات ونقاط الامتثال وجودة الشهادات.',
  },
  [ROLES.LEARNER]: {
    en: 'Consumes learning content, completes assignments, and earns credentials.',
    ar: 'يستهلك المحتوى التدريبي ويكمل الواجبات ويحصل على الاعتمادات.',
  },
  [ROLES.SUPPORT]: {
    en: 'Provides helpdesk assistance, knowledge base updates, and ticket triage.',
    ar: 'يقدم دعم مركز المساعدة ويحدّث قاعدة المعرفة ويرتب التذاكر.',
  },
  [ROLES.GUEST]: {
    en: 'Limited read-only access for demos or external reviewers.',
    ar: 'وصول محدود للعرض فقط مخصص للعروض التوضيحية أو المراجعين الخارجيين.',
  },
  [ROLES.COORDINATOR]: {
    en: 'Coordinates logistics, scheduling, and stakeholder communications.',
    ar: 'ينسق الجوانب اللوجستية والجدولة والتواصل مع أصحاب المصلحة.',
  },
};

