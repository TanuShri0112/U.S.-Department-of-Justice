import { Section } from "@/components/common/Section";
import { StatCard } from "@/components/common/StatCard";
import { AnnouncementsPanel, DeadlineList, LearningPathList, ProgressList } from "@/components/dashboard/widgets";
import { ClipboardCheck, Users, BarChart } from "lucide-react";

export const ManagerDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Team completion" value="76%" helper="Department roll-up" trend={2.4} icon={<ClipboardCheck size={18} />} />
      <StatCard title="Active learners" value="248" helper="Direct reports" trend={1.2} icon={<Users size={18} />} />
      <StatCard title="Skills coverage" value="83%" helper="Based on learning paths" icon={<BarChart size={18} />} />
    </div>

    <Section title="Team learning progress" description="Monitor SCORM/xAPI modules in progress">
      <ProgressList />
    </Section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Section title="Assigned paths" description="Mandatory vs optional tracking">
        <LearningPathList />
      </Section>
      <Section title="Deadlines & reminders">
        <DeadlineList />
      </Section>
    </div>

    <Section title="Announcements" description="Manager-facing communications">
      <AnnouncementsPanel />
    </Section>
  </div>
);

