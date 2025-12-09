import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  helper?: string;
  trend?: number;
  icon?: ReactNode;
}

export const StatCard = ({ title, value, helper, trend, icon }: StatCardProps) => {
  const positive = trend !== undefined && trend >= 0;
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {helper && <p className="text-xs text-slate-500 mt-1">{helper}</p>}
        </div>
        <div className="flex items-center gap-2">
          {trend !== undefined && (
            <span
              className={`flex items-center gap-1 text-xs font-semibold ${
                positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trend}%
            </span>
          )}
          <div className="rounded-lg bg-blue-50 p-2 text-[#0033A1]">{icon}</div>
        </div>
      </div>
    </div>
  );
};

