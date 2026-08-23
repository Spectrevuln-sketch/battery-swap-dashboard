import { PageHeader } from "@/components/layout/PageHeader";
import { AutoRefresh } from "@/components/AutoRefresh";
import { cabinetListSchema } from "@/helpers/validation";

import { CabinetFilters } from "./components/CabinetFilters";
import { CabinetPagination } from "./components/CabinetPagination";
import { CabinetTable } from "./components/CabinetTable";
import { getCabinets } from "./hooks/get-cabinets";

export const dynamic = "force-dynamic";

export default async function CabinetsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rawParams = await searchParams;

  const parsedParams = cabinetListSchema.safeParse({
    q: typeof rawParams.q === "string" ? rawParams.q : "",
    status: typeof rawParams.status === "string" ? rawParams.status : "ALL",
    sort: typeof rawParams.sort === "string" ? rawParams.sort : "swaps_desc",
    page: typeof rawParams.page === "string" ? rawParams.page : "1",
    pageSize: "10",
  });

  if (!parsedParams.success) {
    throw new Error("Invalid search parameters");
  }

  const params = parsedParams.data;
  const result = await getCabinets(params);

  return (
    <>
      <AutoRefresh />
      <div className="space-y-6">
      <PageHeader
        title="Cabinets"
        description="Server-rendered operational monitoring."
        trailing={`${result.total} cabinet${result.total === 1 ? "" : "s"}`}
      />

      <CabinetFilters params={params} />

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <CabinetTable rows={result.rows} />
      </div>

      <CabinetPagination params={params} result={result} />
      </div>
    </>
  );
}
