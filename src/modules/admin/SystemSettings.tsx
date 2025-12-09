import { Section } from "@/components/common/Section";
import { StatusPill } from "@/components/common/StatusPill";

export const SystemSettings = () => (
  <div className="space-y-4">
    <Section title="System settings" description="SSO config mock (SAML/OAuth), security, data retention, branding">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border bg-white p-4 space-y-3">
          <p className="text-sm font-semibold text-slate-900">SSO configuration</p>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>SAML metadata URL</span>
              <StatusPill label="Configured" tone="success" />
            </div>
            <div className="flex items-center justify-between">
              <span>OAuth client ID</span>
              <StatusPill label="Placeholder" tone="info" />
            </div>
            <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">
              Edit SSO (mock)
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <p className="text-sm font-semibold text-slate-900">Security settings</p>
          <div className="flex items-center justify-between text-sm text-slate-700">
            <span>Enforce MFA</span>
            <StatusPill label="Enabled" tone="success" />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-700">
            <span>Session timeout</span>
            <span>30 minutes</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-700">
            <span>Audit logging</span>
            <StatusPill label="On" tone="info" />
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <p className="text-sm font-semibold text-slate-900">Data retention (POPIA)</p>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Learning data retention</span>
              <span>24 months</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Recruitment data retention</span>
              <span>18 months</span>
            </div>
            <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">
              Update policy (mock)
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 space-y-3">
          <p className="text-sm font-semibold text-slate-900">Branding</p>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="h-16 rounded-lg border border-dashed bg-slate-50 flex items-center justify-center text-slate-500">
              Logo upload placeholder
            </div>
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-[#0033A1]" />
              <span className="text-sm text-slate-700">Primary: #0033A1</span>
            </div>
            <button className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring">
              Save branding (mock)
            </button>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

