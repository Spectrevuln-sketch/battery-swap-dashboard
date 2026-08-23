import Link from "next/link";

import type { CabinetListParams, CabinetListResult } from "../types/cabinet";

function buildPageUrl(params: CabinetListParams, page: number) {
  const searchParams = new URLSearchParams();

  if (params.q) searchParams.set("q", params.q);
  if (params.status !== "ALL") searchParams.set("status", params.status);
  if (params.sort !== "swaps_desc") searchParams.set("sort", params.sort);
  if (page > 1) searchParams.set("page", String(page));

  const query = searchParams.toString();
  return query ? `/cabinets?${query}` : "/cabinets";
}

export function CabinetPagination({
  params,
  result,
}: {
  params: CabinetListParams;
  result: CabinetListResult;
}) {
  return (
    <div className="flex items-center justify-between text-sm text-slate-600">
      <span>
        Page {result.page} of {result.totalPages}
      </span>

      <div className="flex gap-2">
        {result.page > 1 ? (
          <Link
            href={buildPageUrl(params, result.page - 1)}
            className="rounded-lg border bg-white px-3 py-2 hover:bg-slate-50"
          >
            Previous
          </Link>
        ) : null}

        {result.page < result.totalPages ? (
          <Link
            href={buildPageUrl(params, result.page + 1)}
            className="rounded-lg border bg-white px-3 py-2 hover:bg-slate-50"
          >
            Next
          </Link>
        ) : null}
      </div>
    </div>
  );
}
