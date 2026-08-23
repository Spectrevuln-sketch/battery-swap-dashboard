CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS cabinets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  branch_id UUID NOT NULL REFERENCES branches(id),
  status TEXT NOT NULL CHECK (status IN ('ONLINE', 'OFFLINE', 'MAINTENANCE')),
  last_heartbeat TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS cabinet_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cabinet_id UUID NOT NULL REFERENCES cabinets(id) ON DELETE CASCADE,
  slot_no INTEGER NOT NULL CHECK (slot_no BETWEEN 1 AND 12),
  state TEXT NOT NULL CHECK (state IN ('EMPTY', 'CHARGING', 'FULL', 'LOCKED', 'FAULT')),
  soc INTEGER CHECK (soc BETWEEN 0 AND 100),
  UNIQUE (cabinet_id, slot_no)
);

CREATE TABLE IF NOT EXISTS swap_transactions (
  id BIGSERIAL PRIMARY KEY,
  cabinet_id UUID NOT NULL REFERENCES cabinets(id),
  slot_no INTEGER NOT NULL,
  swapped_at TIMESTAMPTZ NOT NULL,
  battery_serial TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cabinets_branch_status ON cabinets(branch_id, status);
CREATE INDEX IF NOT EXISTS idx_swap_transactions_cabinet_time ON swap_transactions(cabinet_id, swapped_at DESC);
CREATE INDEX IF NOT EXISTS idx_swap_transactions_time ON swap_transactions(swapped_at DESC);

