import { Section } from "@/components/common/Section";
import { mockMobility } from "@/mock/data";

export const InternalMobility = () => (
  <div className="space-y-4">
    <Section title="Internal mobility" description="Career path visualizer, skills gap UI, recommended roles">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockMobility.map((path) => (
          <div key={path.id} className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Current: {path.currentRole}</p>
            <p className="text-sm text-[#0033A1] font-semibold">Target: {path.targetRole}</p>
            <div className="mt-2">
              <p className="text-xs uppercase text-slate-500">Skills gap</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {path.skillsGap.map((gap) => (
                  <span key={gap} className="rounded-full bg-amber-50 px-2 py-1 text-[11px] text-amber-700 border border-amber-100">
                    {gap}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs uppercase text-slate-500">Recommended actions</p>
              <ul className="mt-1 list-disc pl-4 text-sm text-slate-600 space-y-1">
                {path.recommendedActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border bg-blue-50 p-4 text-sm text-slate-800">
        Simple graph placeholder: current role → upskilling → target role. Full visualization to be connected to org data sources.
      </div>
    </Section>
  </div>
);

