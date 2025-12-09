import { Outlet } from "react-router-dom";
import {
  Activity,
  BarChart3,
  BookOpen,
  Briefcase,
  FileStack,
  Gauge,
  LayoutDashboard,
  Lock,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Topbar } from "@/components/navigation/Topbar";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/platform";

export const AppLayout = () => {
  const { user, switchRole } = useAuth();
  const role: Role = user?.role ?? "admin";

  const nav = [
    {
      section: "Dashboards",
      items: [
        { label: "Admin", to: "/admin/dashboard", icon: <LayoutDashboard size={16} />, roles: ["admin"] },
        { label: "Manager", to: "/manager/dashboard", icon: <Gauge size={16} />, roles: ["manager"] },
        { label: "Learner", to: "/learner/dashboard", icon: <BookOpen size={16} />, roles: ["learner"] },
        { label: "Recruiter", to: "/recruiter/dashboard", icon: <Briefcase size={16} />, roles: ["recruiter"] },
      ],
    },
    {
      section: "LMS",
      items: [
        { label: "Course Catalog", to: "/lms/catalog", icon: <BookOpen size={16} /> },
        { label: "Course View", to: "/lms/course/c-1", icon: <FileStack size={16} /> },
        { label: "Learning Paths", to: "/lms/paths", icon: <Activity size={16} /> },
        { label: "Compliance Training", to: "/lms/compliance", icon: <Shield size={16} /> },
        { label: "AI Recommendations", to: "/lms/ai", icon: <Lock size={16} /> },
      ],
    },
    {
      section: "Recruitment & ATS",
      items: [
        { label: "Job Vacancies", to: "/ats/jobs", icon: <Briefcase size={16} /> },
        { label: "Pipeline Board", to: "/ats/pipeline", icon: <Activity size={16} /> },
        { label: "Talent Pool", to: "/ats/talent", icon: <Users size={16} /> },
        { label: "Internal Mobility", to: "/ats/internal-mobility", icon: <BarChart3 size={16} /> },
      ],
    },
    {
      section: "Analytics & Admin",
      items: [
        { label: "LMS Analytics", to: "/analytics/lms", icon: <BarChart3 size={16} /> },
        { label: "Recruitment Analytics", to: "/analytics/recruitment", icon: <BarChart3 size={16} /> },
        { label: "POPIA Logs", to: "/analytics/popia", icon: <Shield size={16} /> },
        { label: "User Management", to: "/admin/users", icon: <Users size={16} />, roles: ["admin"] },
        { label: "Content Management", to: "/admin/content", icon: <FileStack size={16} />, roles: ["admin"] },
        { label: "System Settings", to: "/admin/settings", icon: <Settings size={16} />, roles: ["admin"] },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar items={nav} role={role} />
      <div className="flex flex-1 flex-col">
        <Topbar onRoleChange={switchRole} />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 custom-scrollbar">
          <div className="mx-auto max-w-7xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

