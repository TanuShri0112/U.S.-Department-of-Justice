import React from 'react';
import { Shield, BookOpen, Users, FileCheck } from 'lucide-react';

const quickStats = [
  {
    id: 'security',
    icon: Shield,
    iconColor: 'bg-emerald-50 text-emerald-700',
    barColor: 'bg-emerald-500',
    progress: 72,
    title: 'Phase 1: Tenant + Security',
    detail: 'Cloud tenant, RBAC roles, MFA, SIEM feed, SA region hosting, SSO handshake',
    eta: 'Weeks 1–3',
    status: 'In progress'
  },
  {
    id: 'lms',
    icon: BookOpen,
    iconColor: 'bg-blue-50 text-blue-700',
    barColor: 'bg-blue-500',
    progress: 48,
    title: 'LMS (F1–F6)',
    detail: 'SCORM/xAPI, learning paths, certificate templates, WCAG, mobile readiness',
    eta: 'Weeks 3–9',
    status: 'Configuring'
  },
  {
    id: 'ats',
    icon: Users,
    iconColor: 'bg-indigo-50 text-indigo-700',
    barColor: 'bg-indigo-500',
    progress: 42,
    title: 'Recruitment + Mobility (F7–F11)',
    detail: 'Job workflows, public portal, talent pool, internal mobility and succession mapping',
    eta: 'Weeks 6–12',
    status: 'Design + build'
  },
  {
    id: 'compliance',
    icon: FileCheck,
    iconColor: 'bg-amber-50 text-amber-700',
    barColor: 'bg-amber-500',
    progress: 35,
    title: 'Compliance, Analytics & POPIA',
    detail: 'Consent + retention rules, audit exports, POPIA/GDPR alignment, reporting packs',
    eta: 'Weeks 10–14',
    status: 'Baseline'
  }
];

export default function QuickStatsSection() {
  return (
    <section className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {quickStats.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${stat.iconColor}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-gray-600">{stat.status}</span>
                    <span className="text-[11px] px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                      {stat.eta}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-900 text-sm mt-1 leading-snug">{stat.title}</div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {stat.detail}
                  </p>
                  
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                      <span>Readiness</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`${stat.barColor} h-1.5 rounded-full`} 
                        style={{ width: `${stat.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}