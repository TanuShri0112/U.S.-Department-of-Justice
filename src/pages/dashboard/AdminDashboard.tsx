import { Section } from "@/components/common/Section";
import { StatCard } from "@/components/common/StatCard";
import { AnnouncementsPanel, DeadlineList, LearningPathList, ProgressList, RecruitmentFunnel } from "@/components/dashboard/widgets";
import { BarChart3, ShieldCheck, Users } from "lucide-react";

export const AdminDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Active users" value="12,430" helper="Across all departments" trend={3.2} icon={<Users size={18} />} />
      <StatCard title="Compliance" value="87%" helper="POPIA & security" trend={1.8} icon={<ShieldCheck size={18} />} />
      <StatCard title="Recruitment SLA" value="14 days" helper="Avg. time-to-fill" trend={-0.4} icon={<BarChart3 size={18} />} />
    </div>

    <Section title="Learning progress" description="Track SCORM/xAPI adoption across departments">
      <ProgressList />
    </Section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Section title="Assigned learning paths" description="Role-based mandatory and optional paths">
        <LearningPathList />
      </Section>
      <Section title="Upcoming deadlines" description="Auto-reminders configured for at-risk teams">
        <DeadlineList />
      </Section>
    </div>

    <Section title="Recruitment funnel" description="ATS pipeline health for open requisitions">
      <RecruitmentFunnel />
    </Section>

    <Section title="System announcements" description="Platform-wide broadcast messages">
      <AnnouncementsPanel />
    </Section>
  </div>
);

