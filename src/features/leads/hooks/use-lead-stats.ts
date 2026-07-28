"use client";

import { LeadStatus } from "@/types/lead";
import { useLeads } from "./useLeads";

/**
 * Derives dashboard statistics purely from the existing `getLeads` endpoint's
 * pagination metadata (`meta.total`). No backend changes required: each
 * query just asks for `limit=1` so the network payload stays tiny while
 * `meta.total` gives us the accurate count for that filter.
 */
export const useLeadStats = () => {
  const total = useLeads({ limit: 1, page: 1 });
  const newLeads = useLeads({ limit: 1, page: 1, status: LeadStatus.NEW });
  const converted = useLeads({ limit: 1, page: 1, isConverted: true });
  const lost = useLeads({ limit: 1, page: 1, status: LeadStatus.LOST });

  const isLoading =
    total.isLoading ||
    newLeads.isLoading ||
    converted.isLoading ||
    lost.isLoading;

  const totalCount = total.data?.meta?.total ?? 0;
  const newCount = newLeads.data?.meta?.total ?? 0;
  const convertedCount = converted?.data?.meta?.total ?? 0;
  const lostCount = lost.data?.meta?.total ?? 0;

  const conversionRate =
    totalCount > 0 ? (convertedCount / totalCount) * 100 : 0;

  return {
    isLoading,
    totalCount,
    newCount,
    convertedCount,
    lostCount,
    conversionRate,
  };
};
