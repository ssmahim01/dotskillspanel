"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useClients, useClientMutations } from "@/features/clients/hooks";
import type { IClient } from "@/types/clients";
import type { CreateClientValues } from "@/features/clients/schemas/client.schema";
import type { AssignClientManagerValues } from "@/features/clients/schemas/client.schema";
import type { AddClientNoteValues } from "@/features/clients/schemas/client.schema";
import type { AddClientDocumentValues } from "@/features/clients/schemas/client.schema";

import { ClientsStats } from "./clients-stats";
import { ClientsTable } from "./clients-table";
import { ClientFormDialog } from "./client-form-dialog";
import { ClientAssignDialog } from "./client-assign-dialog";
import { ClientNoteDialog } from "./client-note-dialog";
import { ClientDocumentDialog } from "./client-document-dialog";
import { ClientDetailsSheet } from "./client-details-sheet";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Download } from "lucide-react";
import { CLIENT_STATUS_OPTIONS } from "@/features/clients/constants/client.constant";
import { exportClients } from "@/features/clients/utils/export-clients";

// Mock managers - replace with actual data from API
const mockManagers = [
  { _id: "1", firstName: "John", lastName: "Doe" },
  { _id: "2", firstName: "Jane", lastName: "Smith" },
  { _id: "3", firstName: "Bob", lastName: "Johnson" },
];

export function ClientsPageClient() {
  const { data: clients = [], isLoading } = useClients();
  const mutations = useClientMutations();

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [detailsSheetOpen, setDetailsSheetOpen] = useState(false);

  // Selected client
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter clients
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      !searchTerm ||
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      !filterStatus || client.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handlers
  const handleCreateClient = async (data: CreateClientValues) => {
    try {
      await mutations.createClient.mutateAsync(data);
      toast.success("Client created successfully");
      setFormDialogOpen(false);
    } catch (error) {
      toast.error("Failed to create client");
      console.error(error);
    }
  };

  const handleEditClient = async (data: CreateClientValues) => {
    if (!selectedClient) return;
    try {
      await mutations.updateClient.mutateAsync({
        id: selectedClient._id,
        payload: data,
      });
      toast.success("Client updated successfully");
      setFormDialogOpen(false);
      setSelectedClient(null);
    } catch (error) {
      toast.error("Failed to update client");
      console.error(error);
    }
  };

  const handleAssignManager = async (
    data: AssignClientManagerValues
  ) => {
    if (!selectedClient) return;
    try {
      await mutations.assignManager.mutateAsync({
        id: selectedClient._id,
        payload: data,
      });
      toast.success("Manager assigned successfully");
      setAssignDialogOpen(false);
      setSelectedClient(null);
    } catch (error) {
      toast.error("Failed to assign manager");
      console.error(error);
    }
  };

  const handleAddNote = async (data: AddClientNoteValues) => {
    if (!selectedClient) return;
    try {
      await mutations.addNote.mutateAsync({
        id: selectedClient._id,
        payload: data,
      });
      toast.success("Note added successfully");
      setNoteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to add note");
      console.error(error);
    }
  };

  const handleUploadDocument = async (
    data: AddClientDocumentValues
  ) => {
    if (!selectedClient) return;
    try {
      await mutations.addDocument.mutateAsync({
        id: selectedClient._id,
        payload: data,
      });
      toast.success("Document uploaded successfully");
      setDocumentDialogOpen(false);
    } catch (error) {
      toast.error("Failed to upload document");
      console.error(error);
    }
  };

  const handleDeleteClient = async (client: IClient) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    try {
      await mutations.trashClient.mutateAsync(client._id);
      toast.success("Client deleted successfully");
    } catch (error) {
      toast.error("Failed to delete client");
      console.error(error);
    }
  };

  const handleExport = () => {
    try {
      exportClients(filteredClients);
      toast.success("Clients exported successfully");
    } catch (error) {
      toast.error("Failed to export clients");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-muted-foreground">
            Manage all your clients in one place
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setSelectedClient(null);
              setFormDialogOpen(true);
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <ClientsStats />

      {/* Filters & Search */}
      <Card className="rounded-lg border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Search by name, email, phone, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                {CLIENT_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <ClientsTable
        clients={filteredClients}
        isLoading={isLoading}
        onView={(client) => {
          setSelectedClient(client);
          setDetailsSheetOpen(true);
        }}
        onEdit={(client) => {
          setSelectedClient(client);
          setFormDialogOpen(true);
        }}
        onAssignManager={(client) => {
          setSelectedClient(client);
          setAssignDialogOpen(true);
        }}
        onAddNote={(client) => {
          setSelectedClient(client);
          setNoteDialogOpen(true);
        }}
        onUploadDocument={(client) => {
          setSelectedClient(client);
          setDocumentDialogOpen(true);
        }}
        onDelete={handleDeleteClient}
      />

      {/* Dialogs */}
      <ClientFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        client={selectedClient ?? undefined}
        onSubmit={
          selectedClient ? handleEditClient : handleCreateClient
        }
        isSubmitting={
          mutations.createClient.isPending ||
          mutations.updateClient.isPending
        }
      />

      <ClientAssignDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        managers={mockManagers}
        onSubmit={handleAssignManager}
        isSubmitting={mutations.assignManager.isPending}
        currentManager={selectedClient?.accountManager?._id}
      />

      <ClientNoteDialog
        open={noteDialogOpen}
        onOpenChange={setNoteDialogOpen}
        onSubmit={handleAddNote}
        isSubmitting={mutations.addNote.isPending}
      />

      <ClientDocumentDialog
        open={documentDialogOpen}
        onOpenChange={setDocumentDialogOpen}
        onSubmit={handleUploadDocument}
        isSubmitting={mutations.addDocument.isPending}
      />

      {/* Details Sheet */}
      {selectedClient && (
        <ClientDetailsSheet
          client={selectedClient}
          open={detailsSheetOpen}
          onOpenChange={setDetailsSheetOpen}
        />
      )}
    </div>
  );
}
