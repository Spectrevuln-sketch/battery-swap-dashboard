import type { CabinetSlot } from "../types/cabinet-detail";

const slotStateClass = {
  EMPTY: "border-slate-200 bg-slate-50 text-slate-700",
  CHARGING: "border-amber-200 bg-amber-50 text-amber-800",
  FULL: "border-emerald-200 bg-emerald-50 text-emerald-800",
  LOCKED: "border-blue-200 bg-blue-50 text-blue-800",
  FAULT: "border-red-200 bg-red-50 text-red-800",
};

export function SlotGrid({ slots }: { slots: CabinetSlot[] }) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <div>
        <h2 className="font-semibold">Slots</h2>
        <p className="mt-1 text-sm text-slate-500">
          Current persisted state of all 12 slots.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {slots.map((slot) => (
          <div
            key={slot.slot_no}
            className={`rounded-xl border p-4 ${slotStateClass[slot.state]}`}
          >
            <div className="flex items-center justify-between gap-2 text-sm">
              <span>Slot {slot.slot_no}</span>
              <span className="font-medium">{slot.state}</span>
            </div>

            <div className="mt-4 text-2xl font-semibold">
              {slot.soc == null ? "-" : `${slot.soc}%`}
            </div>
            <p className="mt-1 text-xs opacity-70">Battery SOC</p>
          </div>
        ))}
      </div>
    </section>
  );
}
