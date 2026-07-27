"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";

import { useAuthStore } from "@/stores";

import { queryKeys } from "@/lib/query-keys";

import type { LoginPayload } from "@/types";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const initialize = useAuthStore((state) => state.initialize);

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      authService.login(payload),

    onSuccess: async () => {
      const user = await userService.me();

      initialize(user);

      await queryClient.invalidateQueries({
        queryKey: queryKeys.auth.me,
      });
    },
  });
};