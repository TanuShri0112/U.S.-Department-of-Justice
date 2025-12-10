import { useState } from "react";
import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { mockPopiaLogs } from "@/mock/data";

export const PopiaLogs = () => {
  const [filter, setFilter] = useState("All");
  const filtered = mockPopiaLogs.filter((log) => filter === "All" || log.status === filter.toLowerCase());

  return (
    <div className="space-y-4">
      <Section
        title="POPIA compliance logs"
        description="Audit log table, consent records, filters and export"
        actions={
          <div className="flex items-center gap-2">
            <select className="rounded-lg border px-2 py-1 text-sm focus-ring" value={filter} onChange={(e) => setFilter(e.target.value)}>
              {["All", "success", "warning"].map((opt) => <option key={opt}>{opt}</option>)}
            </select>
            <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">Export</button>
          </div>
        }
      >
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Actor</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Action</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Consent</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Timestamp</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-900">{log.actor}</td>
                  <td className="px-4 py-3 text-slate-600">{log.action}</td>
                  <td className="px-4 py-3 text-slate-600">{log.consentType}</td>
                  <td className="px-4 py-3 text-slate-600">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <StatusPill label={log.status} tone={log.status === "success" ? "success" : "warning"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};


