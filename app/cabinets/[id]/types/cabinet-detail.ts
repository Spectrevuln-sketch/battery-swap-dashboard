import type { CabinetStatus } from "../../types/cabinet";

export type CabinetDetail = {
  id: string;
  code: string;
  status: CabinetStatus;
  last_heartbeat: Date | null;
  branch_name: string;
};

export type CabinetSlot = {
  slot_no: number;
  state: "EMPTY" | "CHARGING" | "FULL" | "LOCKED" | "FAULT";
  soc: number | null;
};

export type HourlySwap = {
  hour: Date;
  swaps: number;
};

export type SwapTransaction = {
  id: string;
  slot_no: number;
  swapped_at: Date;
  battery_serial: string;
};

export type CabinetDetailResult = {
  cabinet: CabinetDetail;
  slots: CabinetSlot[];
  hourly: HourlySwap[];
  transactions: SwapTransaction[];
};
