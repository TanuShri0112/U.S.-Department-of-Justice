import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { mockComplianceItems } from "@/mock/data";

const toneMap = {
  active: "success",
  due: "warning",
  expired: "danger",
} as const;

export const ComplianceTraining = () => (
  <div className="space-y-4">
    <Section
      title="Compliance training"
      description="Expiry alerts, mandatory training table, auto-reminder status"
      actions={
        <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">
          Export CSV (mock)
        </button>
      }
    >
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Department</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Expiry</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Auto reminder</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {mockComplianceItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">{item.title}</td>
                <td className="px-4 py-3 text-slate-600">{item.department}</td>
                <td className="px-4 py-3 text-slate-600">{item.expiryDate}</td>
                <td className="px-4 py-3">
                  <StatusPill label={item.status} tone={toneMap[item.status]} />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      item.autoReminder ? "bg-green-50 text-green-700 border border-green-100" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.autoReminder ? "Enabled" : "Off"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  </div>
);


