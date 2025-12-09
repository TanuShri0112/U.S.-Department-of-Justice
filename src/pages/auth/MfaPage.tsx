import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound, Shield } from "lucide-react";

export const MfaPage = () => {
  const [code, setCode] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border bg-white shadow p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-50 p-3 text-[#0033A1]">
            <KeyRound size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Multi-factor authentication</h1>
            <p className="text-sm text-slate-500">Placeholder for OTP / hardware key</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">One-time code</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus-ring"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#0033A1] px-4 py-2 text-white font-semibold shadow focus-ring"
          >
            Verify placeholder
          </button>
        </form>
        {confirmed && (
          <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-sm text-green-700">
            <Shield size={16} /> MFA mock verified
          </div>
        )}
        <Link to="/login" className="text-sm text-[#0033A1] hover:underline block">
          Back to login
        </Link>
      </div>
    </div>
  );
};

