import { cabinetIdSchema } from "@/helpers/validation";

import { getCabinetDetail } from "@/app/cabinets/[id]/hooks/get-cabinet-detail";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!cabinetIdSchema.safeParse(id).success) {
      return Response.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid cabinet id",
          },
        },
        { status: 400 },
      );
    }

    const data = await getCabinetDetail(id);

    if (!data) {
      return Response.json(
        {
          error: {
            code: "NOT_FOUND",
            message: "Cabinet not found",
          },
        },
        { status: 404 },
      );
    }

    return Response.json({ data: data.transactions });
  } catch (error) {
    console.error("GET /api/cabinets/[id]/transactions failed", error);

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
