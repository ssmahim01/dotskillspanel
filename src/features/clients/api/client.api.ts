import { apiClient } from "@/lib/axios";
import type { ApiResponse } from "@/types";

import type {
  AddClientDocumentPayload,
  AddClientNotePayload,
  AssignClientManagerPayload,
  ClientFilters,
  CreateClientPayload,
  DeleteClientResponse,
  GetClientResponse,
  IClient,
  UpdateClientPayload,
  UpdateClientStatusPayload,
} from "@/types/clients";

export const clientApi = {
  getClients: async (filters?: ClientFilters) => {
    const response = await apiClient.get<ApiResponse<IClient[]>>(
      "/clients",
      {
        params: filters,
      }
    );
    return response.data;
  },

  getDeletedClients: async (filters?: ClientFilters) => {
    const response = await apiClient.get<ApiResponse<IClient[]>>(
      "/clients/deleted",
      {
        params: filters,
      }
    );
    return response.data;
  },

  getClient: async (id: string) => {
    const response = await apiClient.get<GetClientResponse>(
      `/clients/${id}`
    );
    return response.data;
  },

  createClient: async (payload: CreateClientPayload) => {
    const response = await apiClient.post<ApiResponse<IClient>>(
      "/clients",
      payload
    );
    return response.data;
  },

  updateClient: async (
    id: string,
    payload: UpdateClientPayload
  ) => {
    const response = await apiClient.patch<ApiResponse<IClient>>(
      `/clients/${id}`,
      payload
    );
    return response.data;
  },

  trashClient: async (id: string) => {
    const response = await apiClient.delete<DeleteClientResponse>(
      `/clients/${id}`
    );
    return response.data;
  },

  restoreClient: async (id: string) => {
    const response = await apiClient.post<ApiResponse<IClient>>(
      `/clients/${id}/restore`
    );
    return response.data;
  },

  permanentlyDeleteClient: async (id: string) => {
    const response = await apiClient.delete<DeleteClientResponse>(
      `/clients/${id}/permanent`
    );
    return response.data;
  },

  updateStatus: async (
    id: string,
    payload: UpdateClientStatusPayload
  ) => {
    const response = await apiClient.patch<ApiResponse<IClient>>(
      `/clients/${id}/status`,
      payload
    );
    return response.data;
  },

  assignManager: async (
    id: string,
    payload: AssignClientManagerPayload
  ) => {
    const response = await apiClient.patch<ApiResponse<IClient>>(
      `/clients/${id}/assign-manager`,
      payload
    );
    return response.data;
  },

  addNote: async (
    id: string,
    payload: AddClientNotePayload
  ) => {
    const response = await apiClient.post<ApiResponse<IClient>>(
      `/clients/${id}/notes`,
      payload
    );
    return response.data;
  },

  addDocument: async (
    id: string,
    payload: AddClientDocumentPayload
  ) => {
    const response = await apiClient.post<ApiResponse<IClient>>(
      `/clients/${id}/documents`,
      payload
    );
    return response.data;
  },
};
