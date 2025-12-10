import { Link } from "react-router-dom";
import { mockAnnouncements, mockCourses, mockDeadlines, mockLearningPaths, mockRecruitmentFunnel } from "@/mock/data";
import { StatusPill } from "@/components/common/StatusPill";

export const AnnouncementsPanel = () => (
  <div className="space-y-3">
    {mockAnnouncements.map((ann) => (
      <div key={ann.id} className="rounded-lg border bg-slate-50 px-3 py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">{ann.title}</p>
          <span className="text-xs text-slate-500">{ann.date}</span>
        </div>
        <p className="text-sm text-slate-600">{ann.content}</p>
      </div>
    ))}
  </div>
);

export const ProgressList = () => (
  <div className="space-y-3">
    {mockCourses.map((course) => (
      <div key={course.id} className="flex items-center justify-between rounded-lg border px-3 py-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">{course.title}</p>
          <p className="text-xs text-slate-500">{course.department}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#0033A1]" style={{ width: `${course.progress}%` }} />
          </div>
          <span className="text-sm font-semibold text-slate-900">{course.progress}%</span>
        </div>
      </div>
    ))}
  </div>
);

export const LearningPathList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {mockLearningPaths.map((path) => (
      <div key={path.id} className="rounded-lg border px-3 py-3 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">{path.title}</p>
            <p className="text-xs text-slate-500 capitalize">{path.role}</p>
          </div>
          <StatusPill label={path.mandatory ? "Mandatory" : "Optional"} tone={path.mandatory ? "warning" : "info"} />
        </div>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          {path.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-blue-50 px-2 py-1 text-xs text-[#0033A1]">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-3">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#0033A1]" style={{ width: `${path.progress}%` }} />
          </div>
          <p className="text-xs text-slate-500 mt-1">{path.progress}% complete</p>
        </div>
      </div>
    ))}
  </div>
);

export const DeadlineList = () => (
  <div className="space-y-2">
    {mockDeadlines.map((d) => (
      <div key={d.id} className="flex items-center justify-between rounded-lg border px-3 py-2 bg-white">
        <div>
          <p className="text-sm font-semibold text-slate-900">{d.title}</p>
          <p className="text-xs text-slate-500">Due {d.due}</p>
        </div>
        <Link to="/lms/compliance" className="text-xs font-semibold text-[#0033A1] hover:underline">
          View
        </Link>
      </div>
    ))}
  </div>
);

export const RecruitmentFunnel = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {mockRecruitmentFunnel.map((stage) => (
      <div key={stage.stage} className="rounded-lg border bg-white px-3 py-3 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-slate-500">{stage.stage}</p>
        <p className="text-2xl font-bold text-slate-900">{stage.count}</p>
      </div>
    ))}
  </div>
);


