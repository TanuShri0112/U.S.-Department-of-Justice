import { Section } from "@/components/common/Section";
import { StatCard } from "@/components/common/StatCard";
import { AnnouncementsPanel, RecruitmentFunnel } from "@/components/dashboard/widgets";
import { Briefcase, Timer, Users } from "lucide-react";
import { mockJobs, mockCandidates } from "@/mock/data";

export const RecruiterDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Open requisitions" value={mockJobs.filter((j) => j.status === "Open").length} helper="Public + internal" trend={1.1} icon={<Briefcase size={18} />} />
      <StatCard title="Average time-to-fill" value="14 days" helper="Rolling 30 days" icon={<Timer size={18} />} />
      <StatCard title="Active candidates" value={mockCandidates.length} helper="Talent pool" icon={<Users size={18} />} />
    </div>

    <Section title="Recruitment funnel" description="Pipeline board snapshot">
      <RecruitmentFunnel />
    </Section>

    <Section title="System announcements">
      <AnnouncementsPanel />
    </Section>
  </div>
);


