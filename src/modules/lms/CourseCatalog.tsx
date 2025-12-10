import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { useMockRequest } from "@/hooks/useMockRequest";
import { mockApi } from "@/utils/mockApi";

const filters = {
  department: ["All", "ICT", "Finance", "HR", "L&D"],
  role: ["All", "admin", "manager", "learner", "recruiter"],
  mode: ["All", "video", "scorm", "docs"],
};

export const CourseCatalog = () => {
  const { data: courses, loading, error, retry } = useMockRequest(() => mockApi.getCourses());
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [role, setRole] = useState("All");
  const [mode, setMode] = useState("All");

  const filtered = useMemo(
    () =>
      (courses ?? []).filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
        const matchesDept = department === "All" || course.department === department;
        const matchesRole = role === "All" || course.roles.includes(role as any);
        const matchesMode = mode === "All" || course.mode === mode;
        return matchesSearch && matchesDept && matchesRole && matchesMode;
      }),
    [courses, search, department, role, mode]
  );

  return (
    <div className="space-y-4">
      <Section
        title="Course catalog"
        description="SCORM/xAPI ready content with department and mode filters"
        actions={
          <button onClick={retry} className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">
            Refresh mock data
          </button>
        }
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 bg-slate-50">
            <Search size={16} className="text-slate-500" />
            <input
              placeholder="Search courses"
              className="w-full bg-transparent text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Filter size={16} className="text-slate-400" />
            <select className="rounded-lg border px-2 py-1 text-sm focus-ring" value={department} onChange={(e) => setDepartment(e.target.value)}>
              {filters.department.map((opt) => <option key={opt}>{opt}</option>)}
            </select>
            <select className="rounded-lg border px-2 py-1 text-sm focus-ring" value={role} onChange={(e) => setRole(e.target.value)}>
              {filters.role.map((opt) => <option key={opt}>{opt}</option>)}
            </select>
            <select className="rounded-lg border px-2 py-1 text-sm focus-ring" value={mode} onChange={(e) => setMode(e.target.value)}>
              {filters.mode.map((opt) => <option key={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {loading && <p className="text-sm text-slate-500">Loading catalog...</p>}
        {error && (
          <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error} <button onClick={retry} className="underline font-semibold">Retry</button>
          </div>
        )}
        {!loading && !error && filtered.length === 0 && <p className="text-sm text-slate-500">No courses match your filters.</p>}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <div key={course.id} className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                <StatusPill label={course.mode.toUpperCase()} tone="info" />
              </div>
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">{course.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-[#0033A1]">{course.department}</span>
                {course.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{course.duration}</span>
                <span className="font-semibold text-[#0033A1]">{course.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};


