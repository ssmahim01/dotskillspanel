import type {
  CancelTeamSalaryInput,
  CreateSalaryPaymentInput,
  CreateTeamSalaryInput,
  GenerateMonthlySalaryInput,
  TeamSalaryQueryInput,
} from "../schemas/team-salary.schema";

import type {
  ITeamSalary,
  TeamSalarySummary,
} from "@/types/team-salary.types";

interface TeamSalaryListResponse {
  success?: boolean;
  message?: string;
  data: ITeamSalary[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

interface TeamSalaryResponse {
  success?: boolean;
  message?: string;
  data: ITeamSalary;
}

interface TeamSalarySummaryResponse {
  success?: boolean;
  message?: string;
  data: TeamSalarySummary;
}

interface GenerateSalaryResponse {
  success?: boolean;
  message?: string;
  data: ITeamSalary[];
}

const BASE_URL = "/team-salaries";

function buildQueryString(
  query: TeamSalaryQueryInput = {},
) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      params.set(key, String(value));
    }
  });

  const queryString = params.toString();

  return queryString
    ? `?${queryString}`
    : "";
}

async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message ||
        "Something went wrong. Please try again.",
    );
  }

  return result;
}

export async function getTeamSalaries(
  query: TeamSalaryQueryInput = {},
): Promise<TeamSalaryListResponse> {
  return request<TeamSalaryListResponse>(
    `${BASE_URL}${buildQueryString(query)}`,
  );
}

export async function getSalarySummary(
  query: Pick<
    TeamSalaryQueryInput,
    "month" | "year" | "status"
  > = {},
): Promise<TeamSalarySummaryResponse> {
  return request<TeamSalarySummaryResponse>(
    `${BASE_URL}/summary${buildQueryString(query)}`,
  );
}

export async function getTeamSalaryById(
  id: string,
): Promise<TeamSalaryResponse> {
  return request<TeamSalaryResponse>(
    `${BASE_URL}/${id}`,
  );
}

export async function getUserSalaryHistory(
  userId: string,
  query: Pick<
    TeamSalaryQueryInput,
    "page" | "limit" | "year" | "status" | "sort"
  > = {},
): Promise<TeamSalaryListResponse> {
  return request<TeamSalaryListResponse>(
    `${BASE_URL}/user/${userId}${buildQueryString(query)}`,
  );
}

export async function createTeamSalary(
  payload: CreateTeamSalaryInput,
): Promise<TeamSalaryResponse> {
  return request<TeamSalaryResponse>(
    BASE_URL,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function generateMonthlySalary(
  payload: GenerateMonthlySalaryInput,
): Promise<GenerateSalaryResponse> {
  return request<GenerateSalaryResponse>(
    `${BASE_URL}/generate`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function createSalaryPayment(
  id: string,
  payload: CreateSalaryPaymentInput,
): Promise<TeamSalaryResponse> {
  return request<TeamSalaryResponse>(
    `${BASE_URL}/${id}/payment`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function cancelTeamSalary(
  id: string,
  payload: CancelTeamSalaryInput,
): Promise<TeamSalaryResponse> {
  return request<TeamSalaryResponse>(
    `${BASE_URL}/${id}/cancel`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}