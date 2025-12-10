import { Section } from "@/components/common/Section";
import { StatCard } from "@/components/common/StatCard";
import { AnnouncementsPanel, DeadlineList, LearningPathList, ProgressList } from "@/components/dashboard/widgets";
import { GraduationCap, Clock, ShieldCheck } from "lucide-react";

export const LearnerDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Learning progress" value="68%" helper="Across all assigned courses" trend={3.1} icon={<GraduationCap size={18} />} />
      <StatCard title="Hours logged" value="12.5h" helper="This month" icon={<Clock size={18} />} />
      <StatCard title="Compliance" value="2 expiring" helper="Auto-reminders enabled" icon={<ShieldCheck size={18} />} />
    </div>

    <Section title="My courses" description="Continue SCORM/xAPI modules">
      <ProgressList />
    </Section>

    <Section title="My learning paths">
      <LearningPathList />
    </Section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Section title="Deadlines">
        <DeadlineList />
      </Section>
      <Section title="Announcements">
        <AnnouncementsPanel />
      </Section>
    </div>
  </div>
);


