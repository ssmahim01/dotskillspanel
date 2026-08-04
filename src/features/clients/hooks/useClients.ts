"use client";

import { useQuery } from "@tanstack/react-query";

import { clientApi } from "../api/client.api";
import { clientKeys } from "../api/client.keys";

import type { ClientFilters } from "@/types/clients";

export function useClients(filters?: ClientFilters) {
  return useQuery({
    queryKey: clientKeys.list(filters as Record<string, unknown>),
    queryFn: async () => {
      const { data } = await clientApi.getClients(filters);
      return data;
    },
  });
}

export function useDeletedClients(filters?: ClientFilters) {
  return useQuery({
    queryKey: clientKeys.deletedList(
      filters as Record<string, unknown>
    ),
    queryFn: async () => {
      const { data } = await clientApi.getDeletedClients(filters);
      return data;
    },
  });
}
