import { database } from "@/config/database";

import type { CabinetDetailResult, CabinetDetail, CabinetSlot, HourlySwap, SwapTransaction } from "../types/cabinet-detail";

export async function getCabinetDetail(
  cabinetId: string,
): Promise<CabinetDetailResult | null> {
  const [cabinetResult, slotsResult, hourlyResult, transactionsResult] =
    await Promise.all([
      database.query<CabinetDetail>(
        `
          SELECT
            c.id,
            c.code,
            c.status,
            c.last_heartbeat,
            b.name AS branch_name
          FROM cabinets c
          INNER JOIN branches b ON b.id = c.branch_id
          WHERE c.id = $1
        `,
        [cabinetId],
      ),
      database.query<CabinetSlot>(
        `
          SELECT slot_no, state, soc
          FROM cabinet_slots
          WHERE cabinet_id = $1
          ORDER BY slot_no
        `,
        [cabinetId],
      ),
      database.query<HourlySwap>(
        `
          SELECT
            date_trunc('hour', series.hour) AS hour,
            COUNT(st.id)::int AS swaps
          FROM generate_series(
            date_trunc('hour', NOW() - INTERVAL '23 hours'),
            date_trunc('hour', NOW()),
            INTERVAL '1 hour'
          ) AS series(hour)
          LEFT JOIN swap_transactions st
            ON st.cabinet_id = $1
            AND st.swapped_at >= series.hour
            AND st.swapped_at < series.hour + INTERVAL '1 hour'
          GROUP BY series.hour
          ORDER BY series.hour
        `,
        [cabinetId],
      ),
      database.query<SwapTransaction>(
        `
          SELECT id, slot_no, swapped_at, battery_serial
          FROM swap_transactions
          WHERE cabinet_id = $1
          ORDER BY swapped_at DESC, id DESC
          LIMIT 20
        `,
        [cabinetId],
      ),
    ]);

  const cabinet = cabinetResult.rows[0];

  if (!cabinet) {
    return null;
  }

  return {
    cabinet,
    slots: slotsResult.rows,
    hourly: hourlyResult.rows,
    transactions: transactionsResult.rows,
  };
}
