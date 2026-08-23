import { Pool } from "pg";


const globalForDatabase = globalThis as unknown as {
  pool?: Pool;
};

export const database =
  globalForDatabase.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.pool = database;
}
