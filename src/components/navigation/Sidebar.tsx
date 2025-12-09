import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Role } from "@/types/platform";

export interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
  roles?: Role[];
}

interface SidebarProps {
  items: { section: string; items: NavItem[] }[];
  role: Role;
}

export const Sidebar = ({ items, role }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside className="w-72 shrink-0 border-r border-border bg-card text-foreground custom-scrollbar">
      <div className="px-6 py-5 border-b border-border">
        <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">SA Parliament</div>
        <div className="text-xl font-semibold text-[#0033A1]">Cloud LMS + ATS</div>
        <p className="text-xs text-muted-foreground mt-1">Secure | Accessible | POPIA-ready</p>
      </div>
      <nav className="px-4 py-4 space-y-4">
        {items.map(({ section, items: sectionItems }) => (
          <div key={section}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-2 mb-2">{section}</p>
            <div className="space-y-1">
              {sectionItems
                .filter((item) => !item.roles || item.roles.includes(role))
                .map((item) => {
                  const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={clsx(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition focus-ring",
                        active
                          ? "bg-blue-50 text-[#0033A1] border border-blue-100"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <span className="text-muted-foreground">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

