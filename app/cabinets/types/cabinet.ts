export type CabinetStatus = "ONLINE" | "OFFLINE" | "MAINTENANCE";
export type CabinetSort = "swaps_desc" | "swaps_asc";

export type CabinetListParams = {
  q: string;
  status: "ALL" | CabinetStatus;
  sort: CabinetSort;
  page: number;
  pageSize: number;
};

export type CabinetListRow = {
  id: string;
  code: string;
  branch_name: string;
  status: CabinetStatus;
  last_heartbeat: Date | null;
  filled_slots: number;
  total_slots: number;
  swaps_24h: number;
};

export type CabinetListResult = {
  rows: CabinetListRow[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
};
