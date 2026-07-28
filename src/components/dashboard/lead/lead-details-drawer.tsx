"use client";

import { useState } from "react";
import {
  ArrowRightLeft,
  Clock,
  History,
  MessageSquare,
  Paperclip,
  Pencil,
  User,
  UserPlus,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LEAD_PRIORITY_CONFIG,
  LEAD_SOURCE_CONFIG,
  LEAD_STATUS_CONFIG,
} from "@/features/leads/constants/lead.constant";
import { useLead } from "@/features/leads/hooks";
import {
  canConvertLead,
  formatCurrency,
  formatDateTime,
  getInitials,
  getLeadFullName,
} from "@/features/leads/utils/lead.utils";
import { LeadAttachmentForm } from "./lead-attachment-form";
import { LeadNoteForm } from "./lead-note-form";
import { LeadTimeline } from "./lead-timeline";
import { isImageUrl } from "@/features/leads/utils/lead.utils";
import type { ILead } from "@/types/lead";

interface LeadDetailsDrawerProps {
  leadId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (lead: ILead) => void;
  onAssign: (lead: ILead) => void;
  onConvert: (lead: ILead) => void;
}

export function LeadDetailsDrawer({
  leadId,
  open,
  onOpenChange,
  onEdit,
  onAssign,
  onConvert,
}: LeadDetailsDrawerProps) {
  const [tab, setTab] = useState("info");
  const { data, isLoading } = useLead(leadId ?? undefined, {
    enabled: open && Boolean(leadId),
  });

  const lead = data?.data;
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
        {isLoading || !lead ? (
          <div className="flex flex-col gap-4 p-6">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : (
          <>
            <SheetHeader className="flex-row items-start justify-between gap-2 space-y-0 border-b pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarFallback>
                    {getInitials(lead.firstName, lead.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <SheetTitle className="flex items-center gap-2">
                    {getLeadFullName(lead)}
                    <Badge variant="secondary" className="text-[10px]">
                      {LEAD_STATUS_CONFIG[lead.status].label}
                    </Badge>
                  </SheetTitle>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onEdit(lead)}>
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </SheetHeader>

            <Tabs value={tab} onValueChange={setTab} className="flex-1">
              <TabsList className="w-full justify-start gap-1 rounded-none border-b bg-transparent px-4">
                <TabsTrigger value="info">
                  <User className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="notes">
                  <MessageSquare className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="attachments">
                  <Paperclip className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="timeline">
                  <History className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => onAssign(lead)}>
                    <UserPlus className="h-4 w-4" />
                    {lead.assignedTo ? "Reassign" : "Assign"}
                  </Button>
                  {canConvertLead(lead) && (
                    <Button size="sm" onClick={() => onConvert(lead)}>
                      <ArrowRightLeft className="h-4 w-4" />
                      Convert to Client
                    </Button>
                  )}
                </div>

                <section className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold">Lead Information</h3>
                  <InfoRow label="Full Name" value={getLeadFullName(lead)} />
                  <InfoRow label="Email" value={lead.email || "-"} />
                  <InfoRow label="Phone" value={lead.phone} />
                  <InfoRow label="Company" value={lead.company || "-"} />
                  <InfoRow
                    label="Source"
                    value={LEAD_SOURCE_CONFIG[lead.source].label}
                  />
                  <InfoRow
                    label="Status"
                    value={
                      <Badge className={LEAD_STATUS_CONFIG[lead.status].className}>
                        {LEAD_STATUS_CONFIG[lead.status].label}
                      </Badge>
                    }
                  />
                  <InfoRow
                    label="Priority"
                    value={
                      <Badge className={LEAD_PRIORITY_CONFIG[lead.priority].className}>
                        {LEAD_PRIORITY_CONFIG[lead.priority].label}
                      </Badge>
                    }
                  />
                  <InfoRow
                    label="Assigned To"
                    value={
                      lead.assignedTo ? getLeadFullName(lead.assignedTo) : "Unassigned"
                    }
                  />
                  <InfoRow label="Created At" value={formatDateTime(lead.createdAt)} />
                  <InfoRow label="Last Updated" value={formatDateTime(lead.updatedAt)} />
                  {lead.estimatedValue ? (
                    <InfoRow
                      label="Estimated Value"
                      value={formatCurrency(lead.estimatedValue)}
                    />
                  ) : null}
                </section>

                {lead.requirementDescription && (
                  <section className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold">Requirement</h3>
                    <p className="text-sm text-muted-foreground">
                      {lead.requirementDescription}
                    </p>
                  </section>
                )}

                {lead.tags.length > 0 && (
                  <section className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {lead.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </section>
                )}
              </TabsContent>

              <TabsContent value="notes" className="flex flex-col gap-4 p-4">
                <LeadNoteForm leadId={lead._id} />
                <div className="flex flex-col gap-3">
                  {lead.notes.length === 0 ? (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      No notes yet.
                    </p>
                  ) : (
                    [...lead.notes]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt ?? 0).getTime() -
                          new Date(a.createdAt ?? 0).getTime(),
                      )
                      .map((note) => (
                        <div key={note._id} className="rounded-lg border p-3">
                          <p className="text-sm">{note.message}</p>
                          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {formatDateTime(note.createdAt)}
                            {note.createdBy && (
                              <span>&middot; {getLeadFullName(note.createdBy)}</span>
                            )}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="flex flex-col gap-4 p-4">
                <LeadAttachmentForm leadId={lead._id} />
                <div className="flex flex-col gap-2">
                  {lead.attachments.length === 0 ? (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      No attachments yet.
                    </p>
                  ) : (
                    lead.attachments.map((attachment) => (
                      <a
                        key={attachment._id}
                        href={attachment.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-100 text-red-600 dark:bg-red-900/30">
                          {isImageUrl(attachment.url) ? (
                            <Paperclip className="h-4 w-4" />
                          ) : (
                            <Paperclip className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {attachment.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(attachment.uploadedAt)}
                          </span>
                        </div>
                      </a>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="p-4">
                <LeadTimeline lead={lead} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
