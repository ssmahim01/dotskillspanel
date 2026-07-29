"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, LayoutGrid, Table } from "lucide-react";
import type { User } from "@/types/user.types";
import {
  useUsers,
  useUserFilters,
  useUserStats,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useUpdateUserStatus,
} from "./hooks";
import { UserFilters } from "./components/filters/user-filters";
import { UsersTable } from "./components/table/users-table";
import { UserStatsCards } from "./components/cards/user-stats-cards";
import { getUserTableColumns } from "./components/table/user-table-columns";
import {
  CreateUserDialog,
  UpdateUserDialog,
  DeleteUserDialog,
  StatusChangeDialog,
} from "./components/dialogs/user-dialogs";
import type { CreateUserInput, UpdateUserInput } from "./schemas/user.schema";
import { UserGridView } from "./components/grid/user-grid-view";

export function UsersPageClient() {
  const [view, setView] = useState<"table" | "grid">("table");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [dialogState, setDialogState] = useState<{
    createOpen: boolean;
    updateOpen: boolean;
    deleteOpen: boolean;
    statusOpen: boolean;
  }>({
    createOpen: false,
    updateOpen: false,
    deleteOpen: false,
    statusOpen: false,
  });

  const { filters, getQueryParams, ...filterMethods } = useUserFilters();
  const queryParams = getQueryParams();

  const { data: response, isLoading, error } = useUsers(queryParams);
  const users = response?.data || [];
  const stats = useUserStats(users);

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser(selectedUser?._id || "");
  const deleteUserMutation = useDeleteUser();
  const updateStatusMutation = useUpdateUserStatus();

  const pageCount = response?.meta?.totalPage || 1;

  const columns = useMemo(
    () =>
      getUserTableColumns({
        onEdit: (user) => {
          setSelectedUser(user);
          setDialogState((p) => ({ ...p, updateOpen: true }));
        },
        onDelete: (user) => {
          setSelectedUser(user);
          setDialogState((p) => ({ ...p, deleteOpen: true }));
        },
        onViewDetails: (user) => {
          setSelectedUser(user);
        },
        onStatusChange: (user) => {
          setSelectedUser(user);
          setDialogState((p) => ({ ...p, statusOpen: true }));
        },
      }),
    [],
  );

  const handleCreateUser = useCallback(
    async (data: CreateUserInput) => {
      await createUserMutation.mutateAsync(data);
    },
    [createUserMutation],
  );

  const handleUpdateUser = useCallback(
    async (data: UpdateUserInput) => {
      if (selectedUser) {
        await updateUserMutation.mutateAsync(data);
      }
    },
    [selectedUser, updateUserMutation],
  );

  const handleDeleteUser = useCallback(async () => {
    if (selectedUser) {
      await deleteUserMutation.mutateAsync(selectedUser._id);
    }
  }, [selectedUser, deleteUserMutation]);

  const handleStatusChange = useCallback(
    async (status: "ACTIVE" | "INACTIVE" | "SUSPENDED") => {
      if (selectedUser) {
        await updateStatusMutation.mutateAsync({
          userId: selectedUser._id,
          payload: { status },
        });
      }
    },
    [selectedUser, updateStatusMutation],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members and their permissions
          </p>
        </div>
        <Button
          onClick={() => setDialogState((p) => ({ ...p, createOpen: true }))}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <UserStatsCards stats={stats} isLoading={isLoading} />

      {/* Filters */}
      <UserFilters
        filters={filters}
        onSearch={filterMethods.setSearch}
        onRoleChange={filterMethods.setRole}
        onStatusChange={filterMethods.setStatus}
        onDepartmentChange={filterMethods.setDepartment}
        onDesignationChange={filterMethods.setDesignation}
        onClear={filterMethods.clearFilters}
      />

      {/* View Tabs */}
      <Tabs value={view} onValueChange={(value) => setView(value as "table" | "grid")}>
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="table" className="gap-2">
            <Table className="h-4 w-4" />
            Table
          </TabsTrigger>
          <TabsTrigger value="grid" className="gap-2">
            <LayoutGrid className="h-4 w-4" />
            Grid
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <UsersTable
            data={users}
            columns={columns}
            isLoading={isLoading}
            pageCount={pageCount}
            currentPage={filters.page}
            onPageChange={filterMethods.setPage}
            pageSize={filters.limit}
            onSelectionChange={setSelectedUsers}
          />
        </TabsContent>

        <TabsContent value="grid" className="space-y-4">
          <UserGridView
            users={users}
            isLoading={isLoading}
            onEdit={(user) => {
              setSelectedUser(user);
              setDialogState((p) => ({ ...p, updateOpen: true }));
            }}
            onDelete={(user) => {
              setSelectedUser(user);
              setDialogState((p) => ({ ...p, deleteOpen: true }));
            }}
            onStatusChange={(user) => {
              setSelectedUser(user);
              setDialogState((p) => ({ ...p, statusOpen: true }));
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <CreateUserDialog
        open={dialogState.createOpen}
        onOpenChange={(open) =>
          setDialogState((p) => ({ ...p, createOpen: open }))
        }
        onSubmit={handleCreateUser}
        isLoading={createUserMutation.isPending}
      />

      <UpdateUserDialog
        open={dialogState.updateOpen}
        onOpenChange={(open) =>
          setDialogState((p) => ({ ...p, updateOpen: open }))
        }
        user={selectedUser}
        onSubmit={handleUpdateUser}
        isLoading={updateUserMutation.isPending}
      />

      <DeleteUserDialog
        open={dialogState.deleteOpen}
        onOpenChange={(open) =>
          setDialogState((p) => ({ ...p, deleteOpen: open }))
        }
        user={selectedUser}
        onConfirm={handleDeleteUser}
        isLoading={deleteUserMutation.isPending}
      />

      <StatusChangeDialog
        open={dialogState.statusOpen}
        onOpenChange={(open) =>
          setDialogState((p) => ({ ...p, statusOpen: open }))
        }
        user={selectedUser}
        currentStatus={selectedUser?.status}
        onStatusChange={handleStatusChange}
        isLoading={updateStatusMutation.isPending}
      />
    </div>
  );
}
