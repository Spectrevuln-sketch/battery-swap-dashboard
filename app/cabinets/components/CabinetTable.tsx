import Link from "next/link";

import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/helpers/format";

import type { CabinetListRow } from "../types/cabinet";

export function CabinetTable({ rows }: { rows: CabinetListRow[] }) {
  if (rows.length === 0) {
    return (
      <EmptyState
        title="Tidak ada cabinet yang cocok."
        description="Coba ubah pencarian atau filter yang dipilih."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Cabinet</th>
            <th className="px-4 py-3">Branch</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Slots</th>
            <th className="px-4 py-3">Swaps 24h</th>
            <th className="px-4 py-3">Heartbeat</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((cabinet) => (
            <tr key={cabinet.id} className="hover:bg-slate-50">
              <td className="px-4 py-4">
                <Link
                  href={`/cabinets/${cabinet.id}`}
                  className="font-medium text-slate-900 hover:underline"
                >
                  {cabinet.code}
                </Link>
              </td>
              <td className="px-4 py-4 text-slate-600">{cabinet.branch_name}</td>
              <td className="px-4 py-4">
                <StatusBadge status={cabinet.status} />
              </td>
              <td className="dark:text-slate-500 px-4 py-4">
                {cabinet.filled_slots}/{cabinet.total_slots}
              </td>
              <td className="dark:text-slate-500 px-4 py-4 font-medium">
                {cabinet.swaps_24h}
              </td>
              <td className="px-4 py-4 text-slate-600">
                {formatDateTime(cabinet.last_heartbeat)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
