"use client";

import { useState } from "react";

type CabinetStatus = "ONLINE" | "OFFLINE" | "MAINTENANCE";

interface StatusActionState {
  status: CabinetStatus;
  isPending: boolean;
  error: string | null;
}

export function useCabinetStatus(initialStatus: CabinetStatus) {
  const [state, setState] = useState<StatusActionState>({
    status: initialStatus,
    isPending: false,
    error: null,
  });

  const toggleStatus = async (cabinetId: string) => {
    const currentStatus = state.status;
    const targetStatus = currentStatus === "ONLINE" ? "MAINTENANCE" : "ONLINE";

    setState((prev) => ({ ...prev, isPending: true, error: null }));

    try {
      const response = await fetch(`/api/cabinets/${cabinetId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to update status");
      }

      setState((prev) => ({
        ...prev,
        status: data.data.status,
        isPending: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: currentStatus,
        isPending: false,
        error: error instanceof Error ? error.message : "Failed to update status",
      }));
    }
  };

  const targetStatus = state.status === "ONLINE" ? "MAINTENANCE" : "ONLINE";
  const canToggle = state.status === "ONLINE" || state.status === "MAINTENANCE";

  return {
    status: state.status,
    targetStatus,
    isPending: state.isPending,
    error: state.error,
    toggleStatus,
    canToggle,
  };
}