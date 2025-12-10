import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { mockJobs } from "@/mock/data";

export const JobVacancies = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("All");
  const [roleType, setRoleType] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(
    () =>
      mockJobs.filter((job) => {
        const d = department === "All" || job.department === department;
        const r = roleType === "All" || job.roleType === roleType;
        const s = status === "All" || job.status === status;
        return d && r && s;
      }),
    [department, roleType, status]
  );

  return (
    <div className="space-y-4">
      <Section title="Job vacancies" description="Public + internal postings with filters">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Filter size={16} className="text-slate-400" />
          <select className="rounded-lg border px-2 py-1 text-sm focus-ring" value={department} onChange={(e) => setDepartment(e.target.value)}>
            {["All", "ICT", "HR", "L&D"].map((opt) => <option key={opt}>{opt}</option>)}
          </select>
          <select className="rounded-lg border px-2 py-1 text-sm focus-ring" value={roleType} onChange={(e) => setRoleType(e.target.value)}>
            {["All", "Public", "Internal"].map((opt) => <option key={opt}>{opt}</option>)}
          </select>
          <select className="rounded-lg border px-2 py-1 text-sm focus-ring" value={status} onChange={(e) => setStatus(e.target.value)}>
            {["All", "Open", "Closed", "On Hold"].map((opt) => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((job) => (
            <div key={job.id} className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{job.title}</p>
                  <p className="text-xs text-slate-500">{job.department} • {job.location}</p>
                </div>
                <StatusPill label={job.roleType} tone="info" />
              </div>
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">{job.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-blue-50 px-2 py-1 text-xs text-[#0033A1]">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <StatusPill label={job.status} tone={job.status === "Open" ? "success" : "warning"} />
                <button onClick={() => navigate(`/ats/jobs/${job.id}`)} className="text-[#0033A1] font-semibold hover:underline">
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};


