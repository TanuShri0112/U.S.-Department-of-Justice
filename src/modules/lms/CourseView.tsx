import { useParams } from "react-router-dom";
import { Download, Play } from "lucide-react";
import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";
import { useMockRequest } from "@/hooks/useMockRequest";
import { mockApi } from "@/utils/mockApi";

export const CourseView = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course, loading, error, retry } = useMockRequest(() => mockApi.getCourse(courseId ?? "c-1"));

  if (loading) return <p className="text-sm text-slate-500">Loading course...</p>;
  if (error || !course) return <p className="text-sm text-red-600">Unable to load course. <button onClick={retry} className="underline">Retry</button></p>;

  return (
    <div className="space-y-4">
      <Section
        title={course.title}
        description="SCORM/xAPI launch placeholder with objectives and modules"
        actions={
          <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">
            Mark complete (mock)
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border bg-slate-900 text-white p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm">
                <StatusPill label={course.mode.toUpperCase()} />
                <span className="text-blue-100">SCORM/xAPI launch placeholder</span>
              </div>
              <p className="text-lg font-semibold">{course.title}</p>
              <p className="text-sm text-slate-200">{course.description}</p>
              <button className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2 text-slate-900 text-sm font-semibold shadow focus-ring">
                <Play size={16} /> Launch package
              </button>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <p className="text-sm font-semibold text-slate-900 mb-2">Learning objectives</p>
              <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
                <li>Understand departmental policy alignment</li>
                <li>Complete SCORM/xAPI checkpoints with 80%+ score</li>
                <li>Download certificate once progress reaches 100%</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Modules</p>
              <div className="mt-2 space-y-2">
                {["Overview", "Assessment", "Resources"].map((mod, idx) => (
                  <div key={mod} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                    <span className="text-sm text-slate-700">{idx + 1}. {mod}</span>
                    <StatusPill label={idx === 0 ? "Complete" : "Pending"} tone={idx === 0 ? "success" : "info"} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">Progress</p>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#0033A1]" style={{ width: `${course.progress}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-1">{course.progress}% complete</p>
              <button className="mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">
                <Download size={16} /> Download certificate (mock)
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};


