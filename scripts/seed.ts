import "dotenv/config";
import { Client } from "pg";

async function main() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is required");
  }

  const client = new Client({
    connectionString: url,
  });

  await client.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      "TRUNCATE swap_transactions, cabinet_slots, cabinets, branches RESTART IDENTITY CASCADE",
    );

    const branchIds: string[] = [];

    for (let i = 1; i <= 10; i++) {
      const result = await client.query(
        `INSERT INTO branches (name)
         VALUES ($1)
         RETURNING id`,
        [`Branch ${String(i).padStart(2, "0")}`],
      );

      branchIds.push(result.rows[0].id);
    }

    const cabinetIds: string[] = [];

    const slotStates = [
      "EMPTY",
      "CHARGING",
      "FULL",
      "LOCKED",
      "FAULT",
    ] as const;

    const cabinetStates = [
      "ONLINE",
      "OFFLINE",
      "MAINTENANCE",
    ] as const;

    for (let i = 1; i <= 50; i++) {
      const heartbeat = new Date(
        Date.now() -
          Math.floor(Math.random() * 6 * 60 * 60 * 1000),
      );

      const status = cabinetStates[i % cabinetStates.length];

      const result = await client.query(
        `INSERT INTO cabinets (
           code,
           branch_id,
           status,
           last_heartbeat
         )
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [
          `CAB-${String(i).padStart(3, "0")}`,
          branchIds[i % branchIds.length],
          status,
          heartbeat,
        ],
      );

      const cabinetId = result.rows[0].id as string;

      cabinetIds.push(cabinetId);

      for (let slot = 1; slot <= 12; slot++) {
        const state =
          status === "OFFLINE"
            ? "EMPTY"
            : slotStates[(i + slot) % slotStates.length];

        const soc =
          state === "EMPTY"
            ? null
            : 20 + ((i * slot * 7) % 81);

        await client.query(
          `INSERT INTO cabinet_slots (
             cabinet_id,
             slot_no,
             state,
             soc
           )
           VALUES ($1, $2, $3, $4)`,
          [
            cabinetId,
            slot,
            state,
            soc,
          ],
        );
      }
    }

    for (let i = 0; i < 20_000; i++) {
      const daysAgo = Math.random() * 30;

      const swappedAt = new Date(
        Date.now() -
          daysAgo * 24 * 60 * 60 * 1000,
      );

      await client.query(
        `INSERT INTO swap_transactions (
           cabinet_id,
           slot_no,
           swapped_at,
           battery_serial
         )
         VALUES ($1, $2, $3, $4)`,
        [
          cabinetIds[i % cabinetIds.length],
          1 + (i % 12),
          swappedAt,
          `BAT-${String((i % 5000) + 1).padStart(5, "0")}`,
        ],
      );
    }

    await client.query("COMMIT");

    console.log(
      "Seed complete: 10 branches, 50 cabinets, 600 slots, 20,000 swaps.",
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Seed failed:", error);

    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Unexpected seed error:", error);

  process.exitCode = 1;
});