import { z } from "zod";

export const cabinetListSchema = z.object({
  q: z.string().trim().max(100).default(""),
  status: z.enum(["ALL", "ONLINE", "OFFLINE", "MAINTENANCE"]).default("ALL"),
  sort: z.enum(["swaps_desc", "swaps_asc"]).default("swaps_desc"),
  page: z.coerce.number().int().min(1).max(10_000).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
});

export const cabinetIdSchema = z.string().uuid();
