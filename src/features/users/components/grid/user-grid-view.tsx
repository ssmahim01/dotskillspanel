"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Mail, Phone, Building2 } from "lucide-react";
import type { User } from "@/types/user.types";

interface UserGridViewProps {
  users: User[];
  isLoading?: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onStatusChange: (user: User) => void;
}

export function UserGridView({
  users,
  isLoading,
  onEdit,
  onDelete,
  onStatusChange,
}: UserGridViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={`skeleton-${idx}`} className="animate-pulse">
            <CardHeader className="h-20 bg-muted rounded" />
            <CardContent className="h-32 bg-muted rounded mt-2" />
          </Card>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-2">No users found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or create a new user
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <Card
          key={user._id}
          className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer overflow-hidden"
        >
          <CardHeader className="pb-3 bg-gradient-to-br from-muted/50 to-muted/30">
            <div className="flex items-start justify-between">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar} alt={user.fullName} />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEdit(user)}>
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onStatusChange(user)}>
                    Change Status
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete(user)}
                    className="text-destructive"
                  >
                    Delete User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* User Info */}
            <div>
              <h3 className="font-semibold text-base">{user.fullName}</h3>
              <p className="text-xs text-muted-foreground">{user.designation || "—"}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
              {user.isVerified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              {user.email && (
                <div className="flex items-center gap-2 text-muted-foreground truncate">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.department && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                  <span>{user.department}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function getRoleColor(role: string): string {
  const colors: Record<string, string> = {
    SUPER_ADMIN: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    ADMIN: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    MANAGER: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    DEVELOPER: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    DESIGNER: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    MARKETER: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    STAFF: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    INACTIVE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    SUSPENDED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}
