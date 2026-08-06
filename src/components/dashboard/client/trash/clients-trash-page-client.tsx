"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useDeletedClients, useClientMutations } from "@/features/clients/hooks";
import { getClientFullName } from "@/features/clients/utils/client.utils";
import { exportClients } from "@/features/clients/utils/export.utils";
import { useAuthStore } from "@/stores";
import { Role } from "@/types";
import type { IClient } from "@/types/clients";

import { ClientsTrashEmptyState } from "./clients-trash-empty-state";
import { ClientsTrashTable } from "./clients-trash-table";
import { ClientsTrashToolbar } from "./clients-trash-toolbar";

export function ClientsTrashPageClient() {
  const { data: clients = [], isLoading, isFetching, refetch } = useDeletedClients();
  const { restoreClient, permanentlyDeleteClient } = useClientMutations();

  const currentRole = useAuthStore((state) => state.user?.role);
  const canPermanentlyDelete = currentRole === Role.SUPER_ADMIN;

  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  const [restoreTarget, setRestoreTarget] = useState<IClient | null>(null);
  const [restoreOpen, setRestoreOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<IClient | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const term = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !term ||
        getClientFullName(client).toLowerCase().includes(term) ||
        client.leadId?.email?.toLowerCase().includes(term) ||
        client.leadId?.phone?.includes(term) ||
        client.companyName?.toLowerCase().includes(term) ||
        client.clientCode?.toLowerCase().includes(term);

      const matchesStatus = !status || client.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [clients, searchTerm, status]);

  const hasActiveFilters = Boolean(searchTerm) || Boolean(status);

  function handleClearFilters() {
    setSearchTerm("");
    setStatus("");
  }

  function handleRestoreRequest(client: IClient) {
    setRestoreTarget(client);
    setRestoreOpen(true);
  }

  function handleConfirmRestore() {
    if (!restoreTarget) return;

    restoreClient.mutate(restoreTarget._id, {
      onSuccess: () => {
        toast.success(`${getClientFullName(restoreTarget)} restored successfully.`);
        setRestoreOpen(false);
        setRestoreTarget(null);
      },
      onError: () => toast.error("Failed to restore client."),
    });
  }

  function handleDeleteRequest(client: IClient) {
    setDeleteTarget(client);
    setDeleteOpen(true);
  }

  function handleConfirmPermanentDelete() {
    if (!deleteTarget) return;

    permanentlyDeleteClient.mutate(deleteTarget._id, {
      onSuccess: () => {
        toast.success(`${getClientFullName(deleteTarget)} permanently deleted.`);
        setDeleteOpen(false);
        setDeleteTarget(null);
      },
      onError: () => toast.error("Failed to permanently delete client."),
    });
  }

  function handleExport() {
    if (filteredClients.length === 0) {
      toast.error("There are no deleted clients to export.");
      return;
    }

    exportClients(filteredClients, {
      filename: `clients-trash-${new Date().toISOString().slice(0, 10)}.csv`,
    });
    toast.success("Trash exported successfully.");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Clients Trash</h1>
        <p className="text-sm text-muted-foreground">
          Deleted clients are kept here until restored or permanently removed.
        </p>
      </div>

      <ClientsTrashToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        status={status}
        onStatusChange={setStatus}
        onRefresh={() => refetch()}
        isRefreshing={isFetching}
        onExport={handleExport}
        exportDisabled={filteredClients.length === 0}
      />

      <ClientsTrashTable
        clients={filteredClients}
        isLoading={isLoading}
        canPermanentlyDelete={canPermanentlyDelete}
        onRestore={handleRestoreRequest}
        onPermanentlyDelete={handleDeleteRequest}
        emptyState={
          <ClientsTrashEmptyState
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
          />
        }
      />

      <ConfirmDialog
        open={restoreOpen}
        onOpenChange={setRestoreOpen}
        title="Restore this client?"
        description={`${
          restoreTarget ? getClientFullName(restoreTarget) : "This client"
        } will move back to your active client list.`}
        confirmText="Restore Client"
        isLoading={restoreClient.isPending}
        onConfirm={handleConfirmRestore}
      />

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Permanently delete this client?"
        description={`This will permanently remove ${
          deleteTarget ? getClientFullName(deleteTarget) : "this client"
        } along with all of their notes and documents. This action cannot be undone.`}
        confirmText="Delete Permanently"
        variant="destructive"
        isLoading={permanentlyDeleteClient.isPending}
        onConfirm={handleConfirmPermanentDelete}
      />
    </div>
  );
}
