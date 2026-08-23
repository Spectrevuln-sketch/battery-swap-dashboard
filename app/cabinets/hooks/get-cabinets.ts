import { database } from "@/config/database";

import type {
  CabinetListParams,
  CabinetListResult,
  CabinetListRow,
} from "../types/cabinet";

export async function getCabinets(
  params: CabinetListParams,
): Promise<CabinetListResult> {
  const offset = (params.page - 1) * params.pageSize;
  const sortDirection = params.sort === "swaps_asc" ? "ASC" : "DESC";

  const filters = [params.q, params.status];

  const countResult = await database.query<{ count: number }>(
    `
      SELECT COUNT(*)::int AS count
      FROM cabinets c
      INNER JOIN branches b ON b.id = c.branch_id
      WHERE (
        $1 = ''
        OR c.code ILIKE '%' || $1 || '%'
        OR b.name ILIKE '%' || $1 || '%'
      )
      AND ($2 = 'ALL' OR c.status = $2)
    `,
    filters,
  );

  const result = await database.query<CabinetListRow>(
    `
      WITH swap_counts AS (
        SELECT
          cabinet_id,
          COUNT(*)::int AS swaps_24h
        FROM swap_transactions
        WHERE swapped_at >= NOW() - INTERVAL '24 hours'
        GROUP BY cabinet_id
      )
      SELECT
        c.id,
        c.code,
        b.name AS branch_name,
        c.status,
        c.last_heartbeat,
        COUNT(s.id) FILTER (WHERE s.state <> 'EMPTY')::int AS filled_slots,
        12 AS total_slots,
        COALESCE(sc.swaps_24h, 0)::int AS swaps_24h
      FROM cabinets c
      INNER JOIN branches b ON b.id = c.branch_id
      LEFT JOIN cabinet_slots s ON s.cabinet_id = c.id
      LEFT JOIN swap_counts sc ON sc.cabinet_id = c.id
      WHERE (
        $1 = ''
        OR c.code ILIKE '%' || $1 || '%'
        OR b.name ILIKE '%' || $1 || '%'
      )
      AND ($2 = 'ALL' OR c.status = $2)
      GROUP BY c.id, b.name, sc.swaps_24h
      ORDER BY swaps_24h ${sortDirection}, c.code ASC
      LIMIT $3 OFFSET $4
    `,
    [params.q, params.status, params.pageSize, offset],
  );

  const total = countResult.rows[0]?.count ?? 0;

  return {
    rows: result.rows,
    total,
    totalPages: Math.max(1, Math.ceil(total / params.pageSize)),
    page: params.page,
    pageSize: params.pageSize,
  };
}
