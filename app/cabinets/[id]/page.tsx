import { notFound } from "next/navigation";

import { cabinetIdSchema } from "@/helpers/validation";

import { CabinetHeader } from "./components/CabinetHeader";
import { CabinetStatusAction } from "./components/CabinetStatusAction";
import { SlotGrid } from "./components/SlotGrid";
import { SwapChart } from "./components/SwapChart";
import { TransactionList } from "./components/TransactionList";
import { getCabinetDetail } from "./hooks/get-cabinet-detail";

export const dynamic = "force-dynamic";

export default async function CabinetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!cabinetIdSchema.safeParse(id).success) {
    notFound();
  }

  const data = await getCabinetDetail(id);

  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <CabinetHeader cabinet={data.cabinet} />
      <CabinetStatusAction cabinet={data.cabinet} cabinetId={id} />
      <SlotGrid slots={data.slots} />
      <SwapChart hourly={data.hourly} />
      <TransactionList transactions={data.transactions} />
    </div>
  );
}
