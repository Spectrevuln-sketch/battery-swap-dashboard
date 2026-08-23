type Status = "ONLINE" | "OFFLINE" | "MAINTENANCE";

const statusClasses: Record<Status, string> = {
  ONLINE: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20 border-emerald-500/20",
  OFFLINE: "bg-red-500/10 text-red-400 ring-red-500/20 border-red-500/20",
  MAINTENANCE: "bg-amber-500/10 text-amber-400 ring-amber-500/20 border-amber-500/20",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset border ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
}