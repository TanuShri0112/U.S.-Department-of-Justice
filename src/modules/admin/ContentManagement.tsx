import { useState } from "react";
import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";

export const ContentManagement = () => {
  const [uploads, setUploads] = useState<{ name: string; type: string }[]>([]);

  const handleUpload = (type: string) => setUploads((prev) => [...prev, { name: `${type} package`, type }]);

  return (
    <div className="space-y-4">
      <Section title="Content management" description="Upload SCORM/xAPI, video, PDFs and tag with skills">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {["SCORM/xAPI package", "Video", "PDF/Docs"].map((type) => (
            <button
              key={type}
              onClick={() => handleUpload(type)}
              className="rounded-lg border bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:shadow focus-ring"
            >
              Upload {type}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Skill tagging</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Security", "Compliance", "Equity", "Cloud"].map((skill) => (
                <span key={skill} className="rounded-full bg-blue-50 px-2 py-1 text-xs text-[#0033A1]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">Recent uploads</p>
            <div className="mt-2 space-y-2">
              {uploads.length === 0 && <p className="text-sm text-slate-500">No uploads yet (mock).</p>}
              {uploads.map((file, idx) => (
                <div key={`${file.name}-${idx}`} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                  <span className="text-sm text-slate-700">{file.name}</span>
                  <StatusPill label={file.type} tone="info" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

