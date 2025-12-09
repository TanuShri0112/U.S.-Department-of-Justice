interface StatusPillProps {
  label: string;
  tone?: "success" | "warning" | "danger" | "info";
}

const toneStyles: Record<NonNullable<StatusPillProps["tone"]>, string> = {
  success: "bg-green-50 text-green-700 border-green-100",
  warning: "bg-amber-50 text-amber-700 border-amber-100",
  danger: "bg-red-50 text-red-700 border-red-100",
  info: "bg-blue-50 text-blue-700 border-blue-100",
};

export const StatusPill = ({ label, tone = "info" }: StatusPillProps) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneStyles[tone]}`}>
    {label}
  </span>
);

