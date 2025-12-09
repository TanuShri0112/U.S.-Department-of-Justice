export type Role = "admin" | "manager" | "learner" | "recruiter";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  audience: Role[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  department: string;
  skills: string[];
  roles: Role[];
  mode: "video" | "scorm" | "docs";
  duration: string;
  progress: number;
  scormPackage?: string;
  status: "active" | "upcoming" | "archived";
}

export interface LearningPath {
  id: string;
  title: string;
  role: Role;
  progress: number;
  skills: string[];
  mandatory: boolean;
  courses: string[];
}

export interface ComplianceItem {
  id: string;
  title: string;
  department: string;
  expiryDate: string;
  status: "active" | "due" | "expired";
  autoReminder: boolean;
}

export interface Recommendation {
  id: string;
  title: string;
  matchScore: number;
  skills: string[];
  rationale: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  roleType: "Public" | "Internal";
  location: string;
  status: "Open" | "Closed" | "On Hold";
  description: string;
  skills: string[];
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  skills: string[];
  stage: "Applied" | "Screening" | "Interview" | "Offer";
  rating: number;
  notes?: string;
}

export interface MobilityPath {
  id: string;
  currentRole: string;
  targetRole: string;
  skillsGap: string[];
  recommendedActions: string[];
}

export interface Metric {
  label: string;
  value: number | string;
  trend?: number;
  helper?: string;
}

export interface DepartmentCompletion {
  department: string;
  completion: number;
}

export interface QuizScore {
  course: string;
  averageScore: number;
}

export interface PopiaLog {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
  status: "success" | "warning";
  consentType: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  status?: "active" | "invited" | "disabled";
}

export interface SystemSetting {
  key: string;
  label: string;
  value: string | boolean;
  description?: string;
}

