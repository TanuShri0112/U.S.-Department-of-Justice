import { useParams } from "react-router-dom";
import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { mockJobs } from "@/mock/data";

export const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job = mockJobs.find((j) => j.id === jobId) ?? mockJobs[0];

  return (
    <div className="space-y-4">
      <Section title={job.title} description="Job details with equity tags">
        <div className="flex flex-wrap gap-2">
          <StatusPill label={job.roleType} tone="info" />
          <StatusPill label={job.status} tone={job.status === "Open" ? "success" : "warning"} />
        </div>
        <p className="mt-3 text-sm text-slate-600">{job.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-blue-50 px-2 py-1 text-xs text-[#0033A1]">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Candidate profile viewer</p>
            <p className="text-xs text-slate-500">Placeholder to preview CV/LinkedIn</p>
            <div className="mt-2 h-32 rounded border border-dashed text-slate-500 flex items-center justify-center bg-slate-50">
              Profile viewer mock
            </div>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Resume parser</p>
            <p className="text-xs text-slate-500">Drag & drop files to parse (mock)</p>
            <div className="mt-2 h-32 rounded border border-dashed text-slate-500 flex items-center justify-center bg-slate-50">
              Drop CV here
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};


