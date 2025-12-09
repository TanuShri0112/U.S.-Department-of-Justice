import React, { useState } from 'react';
import { Button } from './button';

const TrainingSessions = () => {
  const [activeTab, setActiveTab] = useState('inflight');

  const inflightItems = [
    {
      title: 'Phase 1 — Security + Hosting',
      tag: 'Weeks 1–3',
      description: 'Parliament-dedicated tenant, SA region hosting, RBAC, MFA, SIEM feed, SSO metadata handshake.',
      window: 'Week 1–3',
      owner: 'Security / Infra',
      status: 'On track',
      eta: '31 Jan'
    },
    {
      title: 'LMS (F1–F6) Enablement',
      tag: 'Learning paths + SCORM/xAPI',
      description: 'Role-based learning paths, SCORM/xAPI upload, expiry alerts, certificate templates, mobile WCAG validation.',
      window: 'Week 3–9',
      owner: 'LMS',
      status: 'Configuring',
      eta: '28 Feb'
    },
    {
      title: 'Recruitment & Talent (F7–F11)',
      tag: 'ATS + Internal Mobility',
      description: 'Job posting, screening, interview scheduling, talent pool, internal mobility, Parliament-branded portal.',
      window: 'Week 6–12',
      owner: 'Recruitment',
      status: 'Design + build',
      eta: '21 Mar'
    },
    {
      title: 'Analytics, Compliance & Reporting',
      tag: 'Audit + Governance',
      description: 'POPIA/GDPR consent logs, retention, PDF/Excel exports, equity metrics, SIEM + audit console.',
      window: 'Week 10–14',
      owner: 'Compliance / Analytics',
      status: 'Baseline',
      eta: '04 Apr'
    }
  ];

  const completedItems = [
    {
      title: 'Technical workflow approved for RFQ 1553/2025',
      tag: 'Bid readiness',
      description: 'Combined LMS + Recruitment scope, priorities, and SLA alignment validated with PMO.',
      window: 'Completed',
      owner: 'PMO',
      status: 'Done',
      eta: 'Ready for submission'
    }
  ];

  const renderSession = (item) => (
    <div key={item.title} className="bg-white rounded-lg p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
          <span className="inline-block bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
            {item.tag}
          </span>
          <p className="text-gray-600 mt-3 mb-4 text-sm leading-relaxed">{item.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Window</p>
              <p className="font-medium text-gray-900">{item.window}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Owner</p>
              <p className="font-medium text-gray-900">{item.owner}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Status</p>
              <p className="font-medium text-gray-900">{item.status}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">ETA</p>
              <p className="font-medium text-gray-900">{item.eta}</p>
            </div>
          </div>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow transition-all ml-6"
        >
          View checklist
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 border-2 border-green-600 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 10L20 15L15 20M4 4V20M4 12H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="text-2xl font-bold text-gray-900">
          Implementation timeline
        </h2>
      </div>

      <div className="flex space-x-2 mb-8">
        <button
          onClick={() => setActiveTab('inflight')}
          className={`px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
            activeTab === 'inflight'
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          In-flight items
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
            activeTab === 'completed'
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Completed
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'inflight' ? (
          inflightItems.length > 0 ? (
            inflightItems.map(renderSession)
          ) : (
            <p className="text-gray-500 text-center py-8">
              No in-flight items
            </p>
          )
        ) : (
          completedItems.length > 0 ? (
            completedItems.map(renderSession)
          ) : (
            <p className="text-gray-500 text-center py-8">
              No completed items
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default TrainingSessions;