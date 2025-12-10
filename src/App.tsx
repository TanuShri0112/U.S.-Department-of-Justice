import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppLayout } from "@/layouts/AppLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { MfaPage } from "@/pages/auth/MfaPage";
import { AdminDashboard } from "@/pages/dashboard/AdminDashboard";
import { ManagerDashboard } from "@/pages/dashboard/ManagerDashboard";
import { LearnerDashboard } from "@/pages/dashboard/LearnerDashboard";
import { RecruiterDashboard } from "@/pages/dashboard/RecruiterDashboard";
import { CourseCatalog } from "@/modules/lms/CourseCatalog";
import { CourseView } from "@/modules/lms/CourseView";
import { LearningPaths } from "@/modules/lms/LearningPaths";
import { ComplianceTraining } from "@/modules/lms/ComplianceTraining";
import { AIRecommendations } from "@/modules/lms/AIRecommendations";
import { JobVacancies } from "@/modules/ats/JobVacancies";
import { JobDetails } from "@/modules/ats/JobDetails";
import { PipelineBoard } from "@/modules/ats/PipelineBoard";
import { TalentPool } from "@/modules/ats/TalentPool";
import { InternalMobility } from "@/modules/ats/InternalMobility";
import { LmsAnalytics } from "@/modules/analytics/LmsAnalytics";
import { RecruitmentAnalytics } from "@/modules/analytics/RecruitmentAnalytics";
import { PopiaLogs } from "@/modules/analytics/PopiaLogs";
import { UserManagement } from "@/modules/admin/UserManagement";
import { ContentManagement } from "@/modules/admin/ContentManagement";
import { SystemSettings } from "@/modules/admin/SystemSettings";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/mfa" element={<MfaPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="manager/dashboard" element={<ManagerDashboard />} />
        <Route path="learner/dashboard" element={<LearnerDashboard />} />
        <Route path="recruiter/dashboard" element={<RecruiterDashboard />} />

        <Route path="lms/catalog" element={<CourseCatalog />} />
        <Route path="lms/course/:courseId" element={<CourseView />} />
        <Route path="lms/paths" element={<LearningPaths />} />
        <Route path="lms/compliance" element={<ComplianceTraining />} />
        <Route path="lms/ai" element={<AIRecommendations />} />

        <Route path="ats/jobs" element={<JobVacancies />} />
        <Route path="ats/jobs/:jobId" element={<JobDetails />} />
        <Route path="ats/pipeline" element={<PipelineBoard />} />
        <Route path="ats/talent" element={<TalentPool />} />
        <Route path="ats/internal-mobility" element={<InternalMobility />} />

        <Route path="analytics/lms" element={<LmsAnalytics />} />
        <Route path="analytics/recruitment" element={<RecruitmentAnalytics />} />
        <Route path="analytics/popia" element={<PopiaLogs />} />

        <Route path="admin/users" element={<UserManagement />} />
        <Route path="admin/content" element={<ContentManagement />} />
        <Route path="admin/settings" element={<SystemSettings />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  </AuthProvider>
);

export default App;


