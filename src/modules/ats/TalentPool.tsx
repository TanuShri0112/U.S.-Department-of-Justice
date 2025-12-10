import { useState } from "react";
import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { mockCandidates } from "@/mock/data";

export const TalentPool = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const activeCandidate = mockCandidates.find((c) => c.id === selected);

  return (
    <div className="space-y-4">
      <Section title="Talent pool" description="Candidate list, profile modal, skills extraction, rating & ranking UI">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            {mockCandidates.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className="w-full rounded-lg border bg-white px-3 py-2 text-left hover:shadow focus-ring"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.role} • {c.experience}</p>
                  </div>
                  <StatusPill label={`Rating ${c.rating}`} tone="info" />
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {c.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-blue-50 px-2 py-1 text-[11px] text-[#0033A1]">
                      {skill}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-xl border bg-white p-4 h-fit">
            {!activeCandidate && <p className="text-sm text-slate-500">Select a candidate to view profile.</p>}
            {activeCandidate && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{activeCandidate.name}</p>
                    <p className="text-xs text-slate-500">{activeCandidate.role}</p>
                  </div>
                  <StatusPill label={activeCandidate.stage} tone="info" />
                </div>
                <p className="text-sm text-slate-600">Notes: {activeCandidate.notes ?? "N/A"}</p>
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">Skills extraction</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {activeCandidate.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase text-slate-500">Rating & ranking</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#0033A1]" style={{ width: `${(activeCandidate.rating / 5) * 100}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{activeCandidate.rating}/5</span>
                  </div>
                  <p className="text-xs text-slate-500">Ranking is mocked for demo purposes.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};


