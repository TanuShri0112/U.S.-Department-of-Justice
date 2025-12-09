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
  User,
} from "@/types/platform";
import {
  mockAnnouncements,
  mockCandidates,
  mockComplianceItems,
  mockCourses,
  mockDepartmentCompletion,
  mockJobs,
  mockLearningPaths,
  mockMobility,
  mockPopiaLogs,
  mockQuizScores,
  mockRecommendations,
  mockUsers,
} from "@/mock/data";

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

type MaybeError<T> = { data?: T; error?: string };

async function respond<T>(data: T, shouldError = false): Promise<MaybeError<T>> {
  await delay();
  if (shouldError) return { error: "Mock API error. Please retry." };
  return { data };
}

export const mockApi = {
  getCurrentUser: (roleOverride?: User["role"]) => {
    const user = mockUsers[0];
    return respond<User>({ ...user, role: roleOverride ?? user.role });
  },
  getCourses: () => respond<Course[]>(mockCourses),
  getCourse: (id: string) => respond<Course | undefined>(mockCourses.find((c) => c.id === id)),
  getLearningPaths: () => respond<LearningPath[]>(mockLearningPaths),
  getCompliance: () => respond<ComplianceItem[]>(mockComplianceItems),
  getRecommendations: () => respond<Recommendation[]>(mockRecommendations),
  getJobs: () => respond<Job[]>(mockJobs),
  getJob: (id: string) => respond<Job | undefined>(mockJobs.find((j) => j.id === id)),
  getCandidates: () => respond<Candidate[]>(mockCandidates),
  getMobilityPaths: () => respond<MobilityPath[]>(mockMobility),
  getAnnouncements: () => respond<Announcement[]>(mockAnnouncements),
  getDepartmentCompletion: () => respond<DepartmentCompletion[]>(mockDepartmentCompletion),
  getQuizScores: () => respond<QuizScore[]>(mockQuizScores),
  getPopiaLogs: () => respond<PopiaLog[]>(mockPopiaLogs),
};

