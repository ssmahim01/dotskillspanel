import type { ClientFilters } from "@/types/clients";

export const clientKeys = {
  all: ["clients"] as const,
  lists: () => [...clientKeys.all, "list"] as const,
  list: (filters: Record<string, unknown> = {}) => [
    ...clientKeys.lists(),
    filters,
  ] as const,
  deletedLists: () => [...clientKeys.all, "deleted-list"] as const,
  deletedList: (filters: Record<string, unknown> = {}) => [
    ...clientKeys.deletedLists(),
    filters,
  ] as const,
  details: () => [...clientKeys.all, "detail"] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,
};
