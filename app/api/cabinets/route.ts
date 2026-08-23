import { cabinetListSchema } from "@/helpers/validation";

import { getCabinets } from "@/app/cabinets/hooks/get-cabinets";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = cabinetListSchema.safeParse(
      Object.fromEntries(searchParams.entries()),
    );

    if (!parsed.success) {
      return Response.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid parameters",
          },
        },
        { status: 400 },
      );
    }

    const data = await getCabinets(parsed.data);
    return Response.json({ data });
  } catch (error) {
    console.error("GET /api/cabinets failed", error);

    return Response.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error",
        },
      },
      { status: 500 },
    );
  }
}
