"use client";

import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { IUserSummary } from "@/types/lead";

/**
 * Assumes the existing User module route `GET /users?fields=firstName,lastName,email,designation&limit=100`
 * (built earlier) is available. This hook does not add or change any backend
 * route — it only consumes the already-existing `getAllUsers` endpoint.
 */
export const useAssignableUsers = () => {
  return useQuery({
    queryKey: ["users", "assignable"],
    queryFn: () =>
      apiClient.get<ApiResponse<IUserSummary[]>>(
        "/user?fields=firstName,lastName,email,designation&limit=100&sort=firstName",
      ),
    staleTime: 1000 * 60 * 10,
  });
};
