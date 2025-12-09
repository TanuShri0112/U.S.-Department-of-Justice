import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/platform";

const roles: Role[] = ["admin", "manager", "learner", "recruiter"];

export const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("naledi@gov.za");
  const [role, setRole] = useState<Role>("admin");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border bg-white shadow-lg p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-50 p-3 text-[#0033A1]">
            <ShieldCheck size={28} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">South African Parliament</p>
            <h1 className="text-2xl font-bold text-slate-900">Enterprise Cloud LMS + ATS</h1>
            <p className="text-sm text-slate-500">Secure SSO-ready authentication placeholder</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Government Email</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus-ring"
              placeholder="you@gov.za"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-lg border px-3 py-2 text-sm capitalize focus-ring ${
                  role === r ? "border-[#0033A1] bg-blue-50 text-[#0033A1]" : "bg-slate-50 text-slate-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0033A1] px-4 py-2 text-white font-semibold shadow focus-ring"
          >
            <LogIn size={18} />
            {loading ? "Signing in..." : "Login / SSO Placeholder"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex items-center justify-between text-sm text-[#0033A1]">
            <Link to="/forgot-password" className="hover:underline">Forgot password?</Link>
            <Link to="/mfa" className="hover:underline">Multi-factor authentication</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

