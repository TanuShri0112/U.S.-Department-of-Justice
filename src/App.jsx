import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { SidebarProvider } from "./contexts/SidebarContext";
import { UserFilterProvider } from "./contexts/UserFilterContext";
import { CourseSidebarProvider } from "./contexts/CourseSidebarContext";
import { PortalProvider } from "./contexts/PortalContext";
import { RoleProvider } from "./contexts/RoleContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied.jsx";
import { ROLES } from "./constants/roles";
// ECPAT update start - Assessment components removed
// Assessment functionality disabled as per ECPAT requirements
// ECPAT update end

// Import pages
import Dashboard from "./pages/Dashboard.jsx";
import Courses from "./pages/Courses.jsx";
import Groups from "./pages/Groups.jsx";
import Users from "./pages/Users";
import Reports from "./pages/Reports.jsx";
import EvaluationFeedback from "./pages/EvaluationFeedback.jsx";
import DEAAdmin from "./pages/DEAAdmin.jsx";
import Survey from "./pages/Survey.jsx";
import SelfAssessment from "./pages/SelfAssessment.jsx";
import Resources from "./pages/Resources.jsx";
import Messages from "./pages/Messages.jsx";
import Help from "./pages/Help.jsx";
import ModuleAssessments from "./pages/ModuleAssessments.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import DebateInstructorPage from "./pages/DebateInstructorPage";
import Catalog from "./pages/Catalog.jsx";
import CategoryDetail from "./pages/CategoryDetail.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import CourseNewsPage from "./pages/courses/CourseNewsPage";
import Profile from "./pages/Profile.jsx";
import GroupDetail from "./pages/GroupDetail.jsx";
import GroupCatalog from "./pages/GroupCatalog.jsx";
import TaskManagement from "./pages/TaskManagement";
import AnnouncementManagement from "./pages/AnnouncementManagement";
import CalendarManagement from "./pages/CalendarManagement.jsx";
import ModuleUnits from "./pages/ModuleUnits.jsx";
import CourseLessons from "./pages/CourseLessons.jsx";
import LessonContent from "./pages/LessonContent.jsx";
import CourseCreation from "./pages/CourseCreation.jsx";
import CourseBuilder from "./pages/CourseBuilder.jsx";
import UnitsBuilder from "./pages/UnitsBuilder";
import UnitCreator from "./pages/UnitCreator";
import AssessmentsBuilder from "./pages/AssessmentsBuilder";

// Import group pages
import GroupOverviewPage from "./pages/groups/GroupOverviewPage";
import GroupNewsPage from "./pages/groups/GroupNewsPage";
import GroupCalendarPage from "./pages/groups/GroupCalendarPage";
import GroupMembersPage from "./pages/groups/GroupMembersPage";
import GroupAdminsPage from "./pages/groups/GroupAdminsPage";
import GroupResourcesPage from "./pages/groups/GroupResourcesPage";
import GroupForumsPage from "./pages/groups/GroupForumsPage";
import GroupAboutPage from "./pages/groups/GroupAboutPage";
import GroupChatPage from "./pages/groups/GroupChatPage";
import GroupRssFeeds from "./pages/groups/GroupRssFeeds";

import AssessmentCreator from "./pages/AssessmentCreator";

import QuizInstructorPage from "./pages/QuizInstructorPage";

import EssayInstructorPage from "./pages/EssayInstructorPage";
import AssignmentInstructorPage from "./pages/AssignmentInstructorPage";
import SurveyInstructorPage from "./pages/SurveyInstructorPage";

// Import course components
import CourseAttendance from "./components/courses/CourseAttendance";
import CourseEdit from "./pages/CourseEdit";
import EditModulePage from './pages/EditModulePage';
import Chatbot from './pages/Chatbot.jsx';
import Webinars from './pages/Webinars.jsx';
import GDPRCompliance from './pages/GDPRCompliance.jsx';
import TechnicalRequirements from './pages/TechnicalRequirements.jsx';
import AccessibilityFeatures from './pages/AccessibilityFeatures.jsx';
import AccessibilityToolbar from './components/accessibility/AccessibilityToolbar';
import SkipLinks from './components/accessibility/SkipLinks';
import { AppWithAccessibility } from './components/AppWithAccessibility';

const queryClient = new QueryClient();
const COURSE_AUTHOR_ROLES = [ROLES.ADMIN, ROLES.PROGRAM_MANAGER, ROLES.TRAINER];
const USER_ADMIN_ROLES = [ROLES.ADMIN, ROLES.PROGRAM_MANAGER, ROLES.SUPPORT];
const REPORTING_ROLES = [ROLES.ADMIN, ROLES.PROGRAM_MANAGER, ROLES.EVALUATOR];
const EVALUATION_ROLES = [ROLES.ADMIN, ROLES.PROGRAM_MANAGER, ROLES.EVALUATOR];
const SCHEDULER_ROLES = [ROLES.ADMIN, ROLES.PROGRAM_MANAGER, ROLES.TRAINER];

const App = () => (
  <LanguageProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppWithAccessibility>
          <SkipLinks />
          <SidebarProvider>
            <UserFilterProvider>
              <CourseSidebarProvider>
                <RoleProvider>
                  <PortalProvider>
                  <AccessibilityToolbar />
                  <Routes>
                  <Route path="/" element={<AdminLayout />}>
                    {/* Main pages */}
                    <Route index element={<Dashboard />} />
                    <Route path="courses" element={<Courses />} />
                    <Route
                      path="courses/create"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <CourseCreation />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/edit/:courseId"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <CourseEdit />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/:courseId/modules/:moduleId/edit"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <EditModulePage />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/builder/:courseId"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <CourseBuilder />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/builder/:courseId/modules/:moduleId/units"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <UnitsBuilder />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/builder/:courseId/modules/:moduleId/units/creator"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <UnitCreator />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/builder/:courseId/modules/:moduleId/units/creator/:unitId"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <UnitCreator />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/builder/:courseId/modules/:moduleId/assessments"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <AssessmentsBuilder />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/builder/:courseId/modules/:moduleId/assessments/creator"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <AssessmentCreator />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/builder/:courseId/modules/:moduleId/assessments/creator/:assessmentId"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <AssessmentCreator />
                        </ProtectedRoute>
                      )}
                    />
                    <Route path="courses/view/:courseId/*" element={<CourseDetail />} />
                    <Route path="courses/view/:courseId/news" element={<CourseNewsPage />} />
                    <Route
                      path="courses/view/:courseId/attendance"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <CourseAttendance />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/:courseId/modules/:moduleId/assessments"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <ModuleAssessments />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/:courseId/modules/:moduleId/quiz"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <QuizPage />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/modules/:moduleId/assignments/:assignmentId"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <AssignmentInstructorPage />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/modules/:moduleId/debates/:debateId"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <DebateInstructorPage />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/modules/:moduleId/quizzes/:quizId"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <QuizInstructorPage />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/modules/:moduleId/essays/:essayId"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <EssayInstructorPage />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/modules/:moduleId/surveys/:surveyId"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <SurveyInstructorPage />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="courses/modules/:moduleId/units"
                      element={(
                        <ProtectedRoute allowedRoles={COURSE_AUTHOR_ROLES}>
                          <ModuleUnits />
                        </ProtectedRoute>
                      )}
                    />

                    <Route path="catalog" element={<Catalog />} />
                    <Route path="catalog/:categoryId" element={<CategoryDetail />} />
                    <Route path="catalog/:courseId/:moduleId/:unitId" element={<CourseLessons />} />
                    <Route
                      path="catalog/:courseId/:moduleId/:unitId/:lessonId"
                      element={<LessonContent />}
                    />
                    <Route path="groups" element={<Groups />} />
                    <Route path="groups/catalog" element={<GroupCatalog />} />

                    {/* Group Detail Routes */}
                    <Route path="groups/view/:groupId" element={<GroupDetail />}>
                      <Route path="overview" element={<GroupOverviewPage />} />
                      <Route path="about" element={<GroupAboutPage />} />
                      <Route path="news" element={<GroupNewsPage />} />
                      <Route path="calendar" element={<GroupCalendarPage />} />
                      <Route path="members" element={<GroupMembersPage />} />
                      <Route path="admins" element={<GroupAdminsPage />} />
                      <Route path="resources" element={<GroupResourcesPage />} />
                      <Route path="forums" element={<GroupForumsPage />} />
                      <Route path="chat" element={<GroupChatPage />} />
                      <Route path="rss" element={<GroupRssFeeds />} />
                    </Route>

                    <Route
                      path="users"
                      element={(
                        <ProtectedRoute allowedRoles={USER_ADMIN_ROLES}>
                          <Users />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="reports"
                      element={(
                        <ProtectedRoute allowedRoles={REPORTING_ROLES}>
                          <Reports />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="evaluation"
                      element={(
                        <ProtectedRoute allowedRoles={EVALUATION_ROLES}>
                          <EvaluationFeedback />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="feedback-reports"
                      element={(
                        <ProtectedRoute allowedRoles={EVALUATION_ROLES}>
                          <DEAAdmin />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="survey"
                      element={(
                        <ProtectedRoute allowedRoles={EVALUATION_ROLES}>
                          <Survey />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="self-assessment"
                      element={(
                        <ProtectedRoute allowedRoles={EVALUATION_ROLES}>
                          <SelfAssessment />
                        </ProtectedRoute>
                      )}
                    />
                    <Route path="resources" element={<Resources />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="help" element={<Help />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="chatbot" element={<Chatbot />} />
                    <Route path="webinars" element={<Webinars />} />
                    <Route path="gdpr-compliance" element={<GDPRCompliance />} />
                    <Route path="technical-requirements" element={<TechnicalRequirements />} />
                    <Route path="accessibility" element={<AccessibilityFeatures />} />

                    {/* New Instructor Dashboard Routes */}
                    <Route
                      path="tasks"
                      element={(
                        <ProtectedRoute allowedRoles={SCHEDULER_ROLES}>
                          <TaskManagement />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="announcements"
                      element={(
                        <ProtectedRoute allowedRoles={SCHEDULER_ROLES}>
                          <AnnouncementManagement />
                        </ProtectedRoute>
                      )}
                    />
                    <Route
                      path="calendar"
                      element={(
                        <ProtectedRoute allowedRoles={SCHEDULER_ROLES}>
                          <CalendarManagement />
                        </ProtectedRoute>
                      )}
                    />
                    <Route path="access-denied" element={<AccessDenied />} />

                    {/* ECPAT update start - Assessment routes removed */}
                    {/* Assessment functionality disabled as per ECPAT requirements */}
                    {/* ECPAT update end */}
                  </Route>
                  </Routes>
                  </PortalProvider>
                </RoleProvider>
              </CourseSidebarProvider>
            </UserFilterProvider>
          </SidebarProvider>
        </AppWithAccessibility>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </LanguageProvider>
);

export default App;