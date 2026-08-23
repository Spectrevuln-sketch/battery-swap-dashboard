import { EmptyState } from "@/components/ui/EmptyState";
import { formatDateTime } from "@/helpers/format";

import type { SwapTransaction } from "../types/cabinet-detail";

export function TransactionList({
  transactions,
}: {
  transactions: SwapTransaction[];
}) {
  return (
    <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="p-5">
        <h2 className="font-semibold">Latest 20 swaps</h2>
        <p className="mt-1 text-sm text-slate-500">
          Most recent swap transactions for this cabinet.
        </p>
      </div>

      {transactions.length === 0 ? (
        <div className="border-t">
          <EmptyState title="Belum ada transaksi swap." />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Slot</th>
                <th className="px-4 py-3">Battery</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600">
                    {formatDateTime(transaction.swapped_at)}
                  </td>
                  <td className="px-4 py-3">{transaction.slot_no}</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {transaction.battery_serial}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
