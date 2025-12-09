import {
  Announcement,
  Candidate,
  ComplianceItem,
  Course,
  DepartmentCompletion,
  Job,
  LearningPath,
  MobilityPath,
  PopiaLog,
  QuizScore,
  Recommendation,
  Role,
  User,
} from "@/types/platform";

export const mockUsers: User[] = [
  { id: "u-1", name: "Naledi Mokoena", email: "naledi@gov.za", role: "admin", department: "ICT", status: "active" },
  { id: "u-2", name: "Sipho Dlamini", email: "sipho@gov.za", role: "manager", department: "HR", status: "active" },
  { id: "u-3", name: "Aisha Patel", email: "aisha@gov.za", role: "learner", department: "Finance", status: "invited" },
  { id: "u-4", name: "Thomas Jacobs", email: "thomas@gov.za", role: "recruiter", department: "Recruitment", status: "active" },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "POPIA refresher training now mandatory",
    content: "All staff must complete the POPIA refresher by 30 Nov 2025.",
    date: "2025-10-12",
    audience: ["admin", "manager", "learner", "recruiter"],
  },
  {
    id: "ann-2",
    title: "System maintenance",
    content: "Planned maintenance this Saturday 22:00 - 02:00.",
    date: "2025-10-10",
    audience: ["admin", "manager"],
  },
];

export const mockCourses: Course[] = [
  {
    id: "c-1",
    title: "Cybersecurity Essentials",
    description: "SCORM-ready course covering phishing, MFA, and endpoint security.",
    department: "ICT",
    skills: ["Security", "SCORM"],
    roles: ["admin", "manager"],
    mode: "scorm",
    duration: "2h",
    progress: 72,
    scormPackage: "scorm-package-url",
    status: "active",
  },
  {
    id: "c-2",
    title: "Financial Compliance 101",
    description: "xAPI modules with interactive quizzes on Treasury frameworks.",
    department: "Finance",
    skills: ["Compliance", "Audit"],
    roles: ["learner", "manager"],
    mode: "docs",
    duration: "1.5h",
    progress: 45,
    status: "active",
  },
  {
    id: "c-3",
    title: "Inclusive Hiring Practices",
    description: "Video-based course focused on equity and fair recruitment.",
    department: "HR",
    skills: ["Recruitment", "Equity"],
    roles: ["recruiter", "manager"],
    mode: "video",
    duration: "1h",
    progress: 90,
    status: "upcoming",
  },
];

export const mockLearningPaths: LearningPath[] = [
  {
    id: "lp-1",
    title: "Manager Onboarding",
    role: "manager",
    progress: 60,
    skills: ["Leadership", "Compliance"],
    mandatory: true,
    courses: ["c-1", "c-2"],
  },
  {
    id: "lp-2",
    title: "Recruiter Excellence",
    role: "recruiter",
    progress: 40,
    skills: ["Recruitment", "Equity"],
    mandatory: false,
    courses: ["c-3"],
  },
];

export const mockComplianceItems: ComplianceItem[] = [
  {
    id: "cmp-1",
    title: "POPIA Essentials",
    department: "All",
    expiryDate: "2025-12-01",
    status: "due",
    autoReminder: true,
  },
  {
    id: "cmp-2",
    title: "SCORM Security Training",
    department: "ICT",
    expiryDate: "2025-11-10",
    status: "active",
    autoReminder: true,
  },
  {
    id: "cmp-3",
    title: "Fraud Prevention",
    department: "Finance",
    expiryDate: "2025-09-20",
    status: "expired",
    autoReminder: false,
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    title: "Advanced SCORM Packaging",
    matchScore: 92,
    skills: ["SCORM", "LMS"],
    rationale: "Aligns with your recent security course completions.",
  },
  {
    id: "rec-2",
    title: "Data Privacy for Managers",
    matchScore: 81,
    skills: ["POPIA", "Governance"],
    rationale: "Skill gaps detected in consent handling.",
  },
];

export const mockJobs: Job[] = [
  {
    id: "j-1",
    title: "Senior Cloud Engineer",
    department: "ICT",
    roleType: "Public",
    location: "Pretoria",
    status: "Open",
    description: "Lead cloud modernization for secure workloads.",
    skills: ["Azure", "Security", "Automation"],
  },
  {
    id: "j-2",
    title: "Equity & Inclusion Officer",
    department: "HR",
    roleType: "Internal",
    location: "Cape Town",
    status: "Open",
    description: "Champion equitable hiring across departments.",
    skills: ["Equity", "Analytics", "Policy"],
  },
  {
    id: "j-3",
    title: "Learning Experience Designer",
    department: "L&D",
    roleType: "Public",
    location: "Hybrid",
    status: "On Hold",
    description: "Design SCORM/xAPI learning paths for departments.",
    skills: ["Instructional Design", "SCORM", "xAPI"],
  },
];

export const mockCandidates: Candidate[] = [
  {
    id: "cand-1",
    name: "Kabelo Sithole",
    role: "Cloud Engineer",
    experience: "6 years",
    skills: ["Azure", "Terraform", "Security"],
    stage: "Screening",
    rating: 4.5,
    notes: "Strong security background, needs Gov clearance.",
  },
  {
    id: "cand-2",
    name: "Lerato Maseko",
    role: "HR Business Partner",
    experience: "8 years",
    skills: ["Equity", "Labour Law", "Analytics"],
    stage: "Interview",
    rating: 4.2,
    notes: "Great equity experience, schedule panel interview.",
  },
  {
    id: "cand-3",
    name: "Neo Khumalo",
    role: "LXD",
    experience: "5 years",
    skills: ["SCORM", "Storyline", "Video"],
    stage: "Applied",
    rating: 3.8,
  },
];

export const mockMobility: MobilityPath[] = [
  {
    id: "mb-1",
    currentRole: "Helpdesk Agent",
    targetRole: "Cloud Support Engineer",
    skillsGap: ["Scripting", "Cloud basics"],
    recommendedActions: ["Complete Cybersecurity Essentials", "Enroll in Azure Fundamentals"],
  },
  {
    id: "mb-2",
    currentRole: "HR Generalist",
    targetRole: "Recruiter",
    skillsGap: ["ATS workflows", "Equity metrics"],
    recommendedActions: ["Take Inclusive Hiring Practices", "Shadow recruiter for 2 weeks"],
  },
];

export const mockDepartmentCompletion: DepartmentCompletion[] = [
  { department: "ICT", completion: 84 },
  { department: "Finance", completion: 71 },
  { department: "HR", completion: 76 },
  { department: "Legal", completion: 63 },
];

export const mockQuizScores: QuizScore[] = [
  { course: "Cybersecurity", averageScore: 82 },
  { course: "Compliance 101", averageScore: 75 },
  { course: "Recruitment Equity", averageScore: 88 },
];

export const mockPopiaLogs: PopiaLog[] = [
  { id: "log-1", actor: "Naledi", action: "Exported audit log", timestamp: "2025-10-12T08:30:00Z", status: "success", consentType: "Audit" },
  { id: "log-2", actor: "Sipho", action: "Updated consent record", timestamp: "2025-10-11T12:15:00Z", status: "warning", consentType: "Consent" },
  { id: "log-3", actor: "System", action: "Auto-reminder sent", timestamp: "2025-10-10T06:00:00Z", status: "success", consentType: "Reminder" },
];

export const mockRecruitmentFunnel = [
  { stage: "Applied", count: 32 },
  { stage: "Screening", count: 18 },
  { stage: "Interview", count: 9 },
  { stage: "Offer", count: 3 },
];

export const mockDeadlines = [
  { id: "d-1", title: "POPIA refresher", due: "2025-11-30" },
  { id: "d-2", title: "Cybersecurity quiz", due: "2025-10-25" },
];

export const mockSystemMetrics: Record<Role, string[]> = {
  admin: ["Platform uptime 99.9%", "14 pending access requests"],
  manager: ["2 teams below target", "3 approvals pending"],
  learner: ["You are 60% compliant", "2 courses expiring soon"],
  recruiter: ["4 offers awaiting approval", "1 interview overdue"],
};

