"use client";

import { useMemo } from "react";

import { ClientStatus } from "@/types/clients";
import { useClients } from "./useClients";

export function useClientStats() {
  const { data, ...rest } = useClients();

  const stats = useMemo(() => {
    const clients = data ?? [];

    return {
      total: clients.length,
      active: clients.filter((c) => c.status === ClientStatus.ACTIVE)
        .length,
      inactive: clients.filter((c) => c.status === ClientStatus.INACTIVE)
        .length,
      revenue: clients.reduce(
        (sum, c) => sum + (c.totalRevenue ?? 0),
        0
      ),
      projects: clients.reduce(
        (sum, c) => sum + (c.totalProjects ?? 0),
        0
      ),
      growth: clients.filter(
        (c) =>
          c.joinedAt &&
          new Date(c.joinedAt).getTime() >
            Date.now() - 30 * 24 * 60 * 60 * 1000
      ).length,
    };
  }, [data]);

  return {
    ...rest,
    data,
    stats,
  };
}
