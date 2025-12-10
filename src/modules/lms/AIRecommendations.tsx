import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { useMockRequest } from "@/hooks/useMockRequest";
import { mockApi } from "@/utils/mockApi";
import { Sparkles } from "lucide-react";

export const AIRecommendations = () => {
  const { data, loading, error, retry } = useMockRequest(() => mockApi.getRecommendations());

  return (
    <div className="space-y-4">
      <Section
        title="AI recommendations"
        description="AI skill-matching with dummy API responses"
        actions={
          <button onClick={retry} className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">
            Re-run matching
          </button>
        }
      >
        {loading && <p className="text-sm text-slate-500">Calculating matches...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.map((rec) => (
              <div key={rec.id} className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{rec.title}</p>
                    <p className="text-xs text-slate-500">Skill match score</p>
                  </div>
                  <StatusPill label={`${rec.matchScore}% match`} tone={rec.matchScore > 80 ? "success" : "info"} />
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {rec.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-blue-50 px-2 py-1 text-xs text-[#0033A1]">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-600">{rec.rationale}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <Sparkles size={14} className="text-[#0033A1]" /> AI match via dummy endpoint
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};


