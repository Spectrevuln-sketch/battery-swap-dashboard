import { formatHour } from "@/helpers/format";

import type { HourlySwap } from "../types/cabinet-detail";

export function SwapChart({ hourly }: { hourly: HourlySwap[] }) {
  const maxSwaps = Math.max(1, ...hourly.map((item) => item.swaps));

  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <div>
        <h2 className="font-semibold">Swaps per hour</h2>
        <p className="mt-1 text-sm text-slate-500">
          Rolling 24-hour window, aggregated in PostgreSQL.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-2">
        {hourly.map((item) => {
          const height = Math.max(4, (item.swaps / maxSwaps) * 100);

          return (
            <div
              key={item.hour.toISOString()}
              className="flex min-w-0 flex-col items-center gap-2"
            >
              <div className="flex h-44 w-full items-end">
                <div
                  title={`${item.swaps} swaps`}
                  className="w-full rounded-t bg-slate-900"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="truncate text-[10px] text-slate-500">
                {formatHour(item.hour)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
