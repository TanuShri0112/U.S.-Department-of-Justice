import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Section } from "@/components/common/Section";

const timeToFill = [
  { month: "Jul", days: 18 },
  { month: "Aug", days: 16 },
  { month: "Sep", days: 15 },
  { month: "Oct", days: 14 },
];

const funnelConversion = [
  { name: "Applied", value: 100 },
  { name: "Screening", value: 68 },
  { name: "Interview", value: 34 },
  { name: "Offer", value: 12 },
];

const equityMetrics = [
  { name: "Women", value: 52 },
  { name: "Youth", value: 33 },
  { name: "Persons with disabilities", value: 6 },
  { name: "Other", value: 9 },
];

const COLORS = ["#0033A1", "#60a5fa", "#22c55e", "#f59e0b"];

export const RecruitmentAnalytics = () => (
  <div className="space-y-4">
    <Section
      title="Recruitment analytics"
      description="Time-to-fill, funnel conversion, equity metrics dashboard"
      actions={
        <div className="flex gap-2">
          <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">Export PDF</button>
          <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">Export Excel</button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-4 h-80">
          <p className="text-sm font-semibold text-slate-900 mb-2">Time-to-fill metrics</p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeToFill}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="days" stroke="#0033A1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-white p-4 h-80">
          <p className="text-sm font-semibold text-slate-900 mb-2">Funnel conversion</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={funnelConversion} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {funnelConversion.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 h-80">
        <p className="text-sm font-semibold text-slate-900 mb-2">Equity metrics</p>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={equityMetrics} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {equityMetrics.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Section>
  </div>
);


