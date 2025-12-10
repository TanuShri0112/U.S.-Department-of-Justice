import { useState } from "react";
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";

export const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border bg-white shadow p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-50 p-3 text-[#0033A1]">
            <MailCheck size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Password recovery</h1>
            <p className="text-sm text-slate-500">Secure reset flow for government users</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus-ring"
              placeholder="you@gov.za"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#0033A1] px-4 py-2 text-white font-semibold shadow focus-ring"
          >
            Send secure reset link
          </button>
        </form>
        {sent && <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">Reset email dispatched (mock)</p>}
        <Link to="/login" className="text-sm text-[#0033A1] hover:underline block">
          Back to login
        </Link>
      </div>
    </div>
  );
};


