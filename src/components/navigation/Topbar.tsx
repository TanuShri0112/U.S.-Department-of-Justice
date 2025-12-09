import { Search, Sun, MoonStar, Bell, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/platform";

interface TopbarProps {
  onRoleChange: (role: Role) => void;
}

export const Topbar = ({ onRoleChange }: TopbarProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-white/90 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-2 rounded-full border px-3 py-2 bg-slate-50 text-slate-600 flex-1 max-w-xl">
        <Search size={18} />
        <input
          placeholder="Search courses, candidates, reports..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#0033A1] flex items-center gap-2">
          <ShieldCheck size={16} /> POPIA Safe
        </div>
        <button className="rounded-full p-2 hover:bg-slate-100 text-slate-700 focus-ring" aria-label="Toggle light mode">
          <Sun size={18} />
        </button>
        <button className="rounded-full p-2 hover:bg-slate-100 text-slate-700 focus-ring" aria-label="Toggle dark mode">
          <MoonStar size={18} />
        </button>
        <button className="relative rounded-full p-2 hover:bg-slate-100 text-slate-700 focus-ring" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <select
          className="rounded-lg border px-3 py-2 text-sm focus-ring"
          value={user?.role}
          onChange={(e) => onRoleChange(e.target.value as Role)}
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="learner">Learner</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <div className="flex items-center gap-2 rounded-lg border px-3 py-2 bg-slate-50">
          <div className="h-8 w-8 rounded-full bg-[#0033A1] text-white flex items-center justify-center text-sm font-bold">
            {user?.name?.[0] ?? "U"}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{user?.name ?? "Guest"}</p>
            <p className="text-xs text-slate-500">{user?.email ?? "guest@gov.za"}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0033A1] hover:bg-blue-50 focus-ring"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

