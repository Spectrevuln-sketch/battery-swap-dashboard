import type { CabinetListParams } from "../types/cabinet";

export function CabinetFilters({ params }: { params: CabinetListParams }) {
  return (
    <form
      method="GET"
      className="grid gap-3 rounded-xl border bg-white p-4 shadow-sm md:grid-cols-4"
    >
      <label className="space-y-1.5">
        <span className="text-xs font-medium text-slate-600">Search</span>
        <input
          name="q"
          defaultValue={params.q}
          placeholder="Code or branch"
          className="dark:text-slate-500 w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-slate-500"
        />
      </label>

      <label className="space-y-1.5">
        <span className="text-xs font-medium text-slate-600">Status</span>
        <select
          name="status"
          defaultValue={params.status}
          className="dark:text-slate-500 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-500"
        >
          <option value="ALL">All status</option>
          <option value="ONLINE">ONLINE</option>
          <option value="OFFLINE">OFFLINE</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
        </select>
      </label>

      <label className="space-y-1.5">
        <span className="text-xs font-medium text-slate-600">Sort</span>
        <select
          name="sort"
          defaultValue={params.sort}
          className="dark:text-slate-500 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-slate-500"
        >
          <option value="swaps_desc">Swaps: high to low</option>
          <option value="swaps_asc">Swaps: low to high</option>
        </select>
      </label>

      <div className="flex items-end">
        <button className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
          Apply filters
        </button>
      </div>
    </form>
  );
}
