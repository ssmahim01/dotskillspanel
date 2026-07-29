"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Calendar,
  KeyRound,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Trash2,
  UserCog,
  UserRound,
} from "lucide-react";
import type { User } from "@/types/user.types";
import { UserAvatar } from "./user-avatar";
import { RoleBadge } from "./role-badge";
import { StatusBadge } from "./status-badge";
import { getRoleStyle } from "@/features/users/utils/user-badges";

interface UserDetailsSheetProps {
  user?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onStatusChange: (user: User) => void;
}

function formatDate(value?: string | Date) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(value?: string | Date) {
  if (!value) return "Never";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function reportingManagerName(
  manager: User["reportingManager"],
): string | null {
  if (!manager) return null;
  if (typeof manager === "string") return manager;
  if (typeof manager === "object" && "fullName" in manager) {
    return (manager as { fullName?: string }).fullName ?? null;
  }
  return null;
}

export function UserDetailsSheet({
  user,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  onStatusChange,
}: UserDetailsSheetProps) {
  if (!user) return null;

  const style = getRoleStyle(user.role);
  const manager = reportingManagerName(user.reportingManager);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-md">
        {/* Header */}
        <SheetHeader className="space-y-0 p-0">
          <div
            className="relative px-6 pb-16 pt-8"
            style={{
              background: `linear-gradient(160deg, ${style.hex}33, ${style.hex}0A 70%)`,
            }}
          >
            <SheetTitle className="sr-only">
              {user.fullName ?? `${user.firstName ?? ""} ${user.lastName ?? ""}`} — user details
            </SheetTitle>
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                style={{
                  color: style.hex,
                  borderColor: `${style.hex}33`,
                  backgroundColor: "var(--card)",
                }}
              >
                <style.icon className="h-3 w-3" />
                {style.label}
              </span>
              <StatusBadge status={user.status} />
            </div>
          </div>

          <div className="-mt-12 flex items-end gap-4 px-6">
            <UserAvatar
              firstName={user.firstName}
              lastName={user.lastName}
              fullName={user.fullName}
              avatar={user.avatar}
              role={user.role}
              size="xl"
              className="ring-4 ring-[var(--card)]"
            />
          </div>
        </SheetHeader>

        <div className="space-y-6 px-6 pb-8 pt-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                {user.fullName ?? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()}
              </h2>
              {user.isVerified && (
                <ShieldCheck className="h-4 w-4 text-[#17C787]" aria-label="Verified" />
              )}
            </div>
            <p className="text-sm text-[var(--muted-fg)]">
              {user.designation || "No designation set"}
              {user.department ? ` · ${user.department}` : ""}
            </p>
          </div>

          {user.bio && (
            <p className="rounded-lg bg-[var(--muted)] p-3 text-sm leading-relaxed text-[var(--foreground)]">
              {user.bio}
            </p>
          )}

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="gap-1.5" onClick={() => onEdit(user)}>
              <Pencil className="h-3.5 w-3.5" />
              Edit user
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={() => onStatusChange(user)}
            >
              <UserCog className="h-3.5 w-3.5" />
              Change status
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-[var(--signal-rose)] hover:text-[var(--signal-rose)]"
              onClick={() => onDelete(user)}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>

          <Separator />

          {/* Contact */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-fg)]">
              Contact
            </h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[var(--muted-fg)]" />
                <dd className="truncate text-[var(--foreground)]">{user.email}</dd>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[var(--muted-fg)]" />
                <dd className="text-[var(--foreground)]">{user.phone || "—"}</dd>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--muted-fg)]" />
                <dd className="text-[var(--foreground)]">{user.address || "—"}</dd>
              </div>
            </dl>
          </section>

          <Separator />

          {/* Work details */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-fg)]">
              Work details
            </h3>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-0.5">
                <dt className="flex items-center gap-1.5 text-xs text-[var(--muted-fg)]">
                  <Building2 className="h-3.5 w-3.5" /> Department
                </dt>
                <dd className="text-[var(--foreground)]">{user.department || "—"}</dd>
              </div>
              <div className="space-y-0.5">
                <dt className="flex items-center gap-1.5 text-xs text-[var(--muted-fg)]">
                  <UserRound className="h-3.5 w-3.5" /> Designation
                </dt>
                <dd className="text-[var(--foreground)]">{user.designation || "—"}</dd>
              </div>
              <div className="space-y-0.5">
                <dt className="flex items-center gap-1.5 text-xs text-[var(--muted-fg)]">
                  <Calendar className="h-3.5 w-3.5" /> Joined
                </dt>
                <dd className="text-[var(--foreground)]">{formatDate(user.joiningDate)}</dd>
              </div>
              <div className="space-y-0.5">
                <dt className="flex items-center gap-1.5 text-xs text-[var(--muted-fg)]">
                  <UserCog className="h-3.5 w-3.5" /> Reports to
                </dt>
                <dd className="text-[var(--foreground)]">{manager ?? "—"}</dd>
              </div>
            </dl>
          </section>

          <Separator />

          {/* Access */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-fg)]">
              Access
            </h3>
            <div className="flex items-center gap-2">
              <RoleBadge role={user.role} />
              <StatusBadge status={user.status} />
            </div>
            {user.permissions?.length ? (
              <div className="flex flex-wrap gap-1.5">
                {user.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--muted)] px-2 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted-fg)]"
                  >
                    <KeyRound className="h-3 w-3" />
                    {permission}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--muted-fg)]">
                Using default permissions for {getRoleStyle(user.role).label}.
              </p>
            )}
          </section>

          <Separator />

          {/* Activity */}
          <section className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-fg)]">
              Activity
            </h3>
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-[var(--muted-fg)]">Last login</dt>
                <dd className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground)]">
                  {formatDateTime(user.lastLogin)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[var(--muted-fg)]">Account created</dt>
                <dd className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground)]">
                  {formatDateTime(user.createdAt)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[var(--muted-fg)]">Last updated</dt>
                <dd className="font-[family-name:var(--font-mono)] text-xs text-[var(--foreground)]">
                  {formatDateTime(user.updatedAt)}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
