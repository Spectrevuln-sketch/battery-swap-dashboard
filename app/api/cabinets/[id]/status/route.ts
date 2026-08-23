import { database } from "@/config/database";
import { cabinetIdSchema } from "@/helpers/validation";

type CabinetStatus = "ONLINE" | "OFFLINE" | "MAINTENANCE";

const validTransitions: Record<CabinetStatus, CabinetStatus[]> = {
  ONLINE: ["MAINTENANCE"],
  MAINTENANCE: ["ONLINE"],
  OFFLINE: [],
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!cabinetIdSchema.safeParse(id).success) {
      return Response.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid cabinet ID",
          },
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { targetStatus } = body as { targetStatus?: CabinetStatus };

    if (!targetStatus || !["ONLINE", "MAINTENANCE"].includes(targetStatus)) {
      return Response.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid target status. Must be ONLINE or MAINTENANCE",
          },
        },
        { status: 400 }
      );
    }

    const currentResult = await database.query<{ status: CabinetStatus }>(
      `SELECT status FROM cabinets WHERE id = $1`,
      [id]
    );

    const currentCabinet = currentResult.rows[0];

    if (!currentCabinet) {
      return Response.json(
        {
          error: {
            code: "NOT_FOUND",
            message: "Cabinet not found",
          },
        },
        { status: 404 }
      );
    }

    const currentStatus = currentCabinet.status;

    if (currentStatus === targetStatus) {
      return Response.json(
        {
          error: {
            code: "CONFLICT",
            message: `Cabinet is already ${targetStatus}`,
          },
        },
        { status: 409 }
      );
    }

    const allowedTargets = validTransitions[currentStatus] || [];
    if (!allowedTargets.includes(targetStatus)) {
      return Response.json(
        {
          error: {
            code: "FORBIDDEN",
            message: `Cannot transition from ${currentStatus} to ${targetStatus}`,
          },
        },
        { status: 403 }
      );
    }

    await database.query(
      `UPDATE cabinets SET status = $1, updated_at = NOW() WHERE id = $2`,
      [targetStatus, id]
    );

    return Response.json({
      data: {
        id,
        status: targetStatus,
        previousStatus: currentStatus,
      },
    });
  } catch (error) {
    console.error("PATCH /api/cabinets/[id]/status failed", error);

    return Response.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "Internal server error",
        },
      },
      { status: 500 }
    );
  }
}