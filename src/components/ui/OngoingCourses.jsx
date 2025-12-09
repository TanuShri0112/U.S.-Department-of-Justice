import React from 'react';
import { Button } from './button';

const OngoingCourses = () => {
  const workstreams = [
    {
      title: 'Security + Hosting',
      readiness: 72,
      summary: 'Parliament tenant, SA region hosting, RBAC, MFA, SIEM feed, SSO metadata ready.',
      next: 'Finalize SSO cert + MFA enforcement checklist',
      eta: 'Week 3',
      owner: 'Security',
      badge: 'Priority 1',
      theme: 'emerald'
    },
    {
      title: 'LMS (F1–F6)',
      readiness: 48,
      summary: 'SCORM/xAPI upload, learning paths, expiry alerts, certificates, responsive/mobile.',
      next: 'Upload compliance modules + certificate templates',
      eta: 'Week 9',
      owner: 'LMS',
      badge: 'Priority 2',
      theme: 'blue'
    },
    {
      title: 'Recruitment & Talent (F7–F11)',
      readiness: 42,
      summary: 'Job posting → screening → interview, talent pool, internal mobility, branded vacancy portal.',
      next: 'Publish hiring workflow + job board skin',
      eta: 'Week 12',
      owner: 'Recruitment',
      badge: 'Priority 2',
      theme: 'indigo'
    },
    {
      title: 'Analytics, Compliance & POPIA',
      readiness: 35,
      summary: 'Consent logs, retention rules, SIEM, equity metrics, PDF/Excel reports for committees.',
      next: 'Validate audit export + uptime/alerting runbook',
      eta: 'Week 14',
      owner: 'Compliance',
      badge: 'Priority 3',
      theme: 'amber'
    }
  ];

  const themeStyles = {
    emerald: { chip: 'bg-emerald-50 text-emerald-700 border-emerald-200', bar: 'bg-emerald-500' },
    blue: { chip: 'bg-blue-50 text-blue-700 border-blue-200', bar: 'bg-blue-500' },
    indigo: { chip: 'bg-indigo-50 text-indigo-700 border-indigo-200', bar: 'bg-indigo-500' },
    amber: { chip: 'bg-amber-50 text-amber-700 border-amber-200', bar: 'bg-amber-500' }
  };

  return (
    <div className="p-6 border-2 border-green-600 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="text-2xl font-bold">
          Workstreams & RFQ feature pack
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workstreams.map((stream) => {
          const styles = themeStyles[stream.theme] ?? themeStyles.blue;
          return (
            <div key={stream.title} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${styles.chip}`}>
                  {stream.badge}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                  Readiness {stream.readiness}%
                </span>
              </div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-snug">{stream.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{stream.summary}</p>

              <div className="mt-3 mb-2">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`${styles.bar} h-2 rounded-full`} 
                    style={{ width: `${stream.readiness}%` }} 
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-3">
                <span className="px-2 py-1 rounded-full bg-slate-50 border border-slate-200">
                  Next: {stream.next}
                </span>
                <span className="px-2 py-1 rounded-full bg-slate-50 border border-slate-200">
                  Owner: {stream.owner}
                </span>
                <span className="px-2 py-1 rounded-full bg-slate-50 border border-slate-200">
                  ETA: {stream.eta}
                </span>
              </div>

              <Button variant="outline" className="w-full">
                View delivery notes
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OngoingCourses;