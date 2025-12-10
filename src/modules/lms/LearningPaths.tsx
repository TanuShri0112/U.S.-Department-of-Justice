import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { mockLearningPaths } from "@/mock/data";

export const LearningPaths = () => (
  <div className="space-y-4">
    <Section title="Learning paths" description="Role-based assigned paths with skill tags and badges">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockLearningPaths.map((path) => (
          <div key={path.id} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{path.title}</p>
                <p className="text-xs text-slate-500 capitalize">{path.role} role</p>
              </div>
              <StatusPill label={path.mandatory ? "Mandatory" : "Optional"} tone={path.mandatory ? "warning" : "info"} />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {path.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-blue-50 px-2 py-1 text-xs text-[#0033A1]">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#0033A1]" style={{ width: `${path.progress}%` }} />
              </div>
              <p className="mt-1 text-xs text-slate-500">{path.progress}% complete</p>
              <p className="mt-1 text-xs text-slate-500">Courses: {path.courses.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  </div>
);


