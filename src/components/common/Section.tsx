import { ReactNode } from "react";

interface SectionProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const Section = ({ title, description, actions, children }: SectionProps) => (
  <section className="rounded-xl border border-border bg-card p-5 shadow-sm text-foreground">
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
    {children}
  </section>
);

