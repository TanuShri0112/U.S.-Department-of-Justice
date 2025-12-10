import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { mockCandidates } from "@/mock/data";

const stages = ["Applied", "Screening", "Interview", "Offer"] as const;

export const PipelineBoard = () => (
  <div className="space-y-4">
    <Section title="Applicant tracking board" description="Kanban view: Applied → Screening → Interview → Offer">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => (
          <div key={stage} className="rounded-xl border bg-white p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{stage}</p>
              <StatusPill label={`${mockCandidates.filter((c) => c.stage === stage).length} candidates`} tone="info" />
            </div>
            <div className="mt-3 space-y-3">
              {mockCandidates
                .filter((c) => c.stage === stage)
                .map((c) => (
                  <div key={c.id} className="rounded-lg border bg-slate-50 px-3 py-2">
                    <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.role} • {c.experience}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {c.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-white px-2 py-1 text-[11px] text-slate-700 border">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                      <span>Rating: {c.rating}</span>
                      <button className="text-[#0033A1] font-semibold">Notes</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  </div>
);


