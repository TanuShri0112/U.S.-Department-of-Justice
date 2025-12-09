import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from "recharts";
import { Section } from "@/components/common/Section";
import { mockDepartmentCompletion, mockQuizScores } from "@/mock/data";

const heatmapData = [
  { day: "Mon", activity: 14 },
  { day: "Tue", activity: 18 },
  { day: "Wed", activity: 21 },
  { day: "Thu", activity: 17 },
  { day: "Fri", activity: 12 },
];

export const LmsAnalytics = () => (
  <div className="space-y-4">
    <Section
      title="LMS analytics"
      description="Department completion, quiz score analytics, heatmaps"
      actions={
        <div className="flex gap-2">
          <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">Export PDF</button>
          <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">Export Excel</button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-4 h-80">
          <p className="text-sm font-semibold text-slate-900 mb-2">Department completion</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockDepartmentCompletion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completion" fill="#0033A1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-white p-4 h-80">
          <p className="text-sm font-semibold text-slate-900 mb-2">Quiz score analytics</p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockQuizScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="averageScore" stroke="#0033A1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm font-semibold text-slate-900 mb-2">Engagement heatmap (mock)</p>
        <div className="grid grid-cols-5 gap-3">
          {heatmapData.map((item) => (
            <div key={item.day} className="rounded-lg border bg-slate-50 p-3 text-center">
              <p className="text-xs text-slate-500">{item.day}</p>
              <p className="text-lg font-bold text-slate-900">{item.activity}</p>
              <p className="text-xs text-slate-500">sessions</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  </div>
);

