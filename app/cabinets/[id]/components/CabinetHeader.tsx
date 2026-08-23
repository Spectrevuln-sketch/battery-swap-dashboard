import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/helpers/format";

import type { CabinetDetail } from "../types/cabinet-detail";

export function CabinetHeader({ cabinet }: { cabinet: CabinetDetail }) {
  return (
    <>
      <Link
        href="/cabinets"
        className="inline-flex text-sm text-slate-500 hover:text-slate-900"
      >
        ← Back to cabinets
      </Link>

      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Cabinet detail</p>
          <h1 className="text-2xl font-semibold tracking-tight">{cabinet.code}</h1>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-sm text-slate-600">{cabinet.branch_name}</p>
            <StatusBadge status={cabinet.status} />
          </div>
        </div>

        <div className="text-sm text-slate-500">
          Heartbeat: {formatDateTime(cabinet.last_heartbeat)}
        </div>
      </header>
    </>
  );
}
