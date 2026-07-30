"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Globe, Linkedin, Mail, Megaphone, Phone, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  LEAD_PRIORITY_CONFIG,
  LEAD_SOURCE_CONFIG,
  LEAD_STATUS_CONFIG,
} from "@/features/leads/constants/lead.constant";
import { formatDate, getInitials, getLeadFullName } from "@/features/leads/utils/lead.utils";
import { LeadRowActions } from "./lead-row-actions";
import { ILead, LeadSource } from "@/types/lead";

const SOURCE_ICONS: Record<LeadSource, React.ReactNode> = {
  [LeadSource.WEBSITE]: <Globe className="h-3.5 w-3.5" />,
  [LeadSource.FACEBOOK]: <Users className="h-3.5 w-3.5" />,
  [LeadSource.GOOGLE]: <Globe className="h-3.5 w-3.5" />,
  [LeadSource.LINKEDIN]: <Linkedin className="h-3.5 w-3.5" />,
  [LeadSource.WHATSAPP]: <Phone className="h-3.5 w-3.5" />,
  [LeadSource.EMAIL]: <Mail className="h-3.5 w-3.5" />,
  [LeadSource.PHONE_CALL]: <Phone className="h-3.5 w-3.5" />,
  [LeadSource.REFERRAL]: <Megaphone className="h-3.5 w-3.5" />,
  [LeadSource.MANUAL]: <Users className="h-3.5 w-3.5" />,
  [LeadSource.OTHER]: <Users className="h-3.5 w-3.5" />,
};

interface LeadsTableColumnsOptions {
  onOpenDetails: (lead: ILead) => void;
  onEdit: (lead: ILead) => void;
   onUpdateStatus: (lead: ILead) => void;
  onAssign: (lead: ILead) => void;
  onConvert: (lead: ILead) => void;
  onDelete: (lead: ILead) => void;
}

export function getLeadsTableColumns({
  onOpenDetails,
  onEdit,
  onUpdateStatus,
  onAssign,
  onConvert,
  onDelete,
}: LeadsTableColumnsOptions): ColumnDef<ILead>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(Boolean(value))
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
          onClick={(event) => event.stopPropagation()}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      accessorKey: "lead",
      id: "lead",
      header: "Lead",
      cell: ({ row }) => {
        const lead = row.original;
        return (
          <button
            type="button"
            onClick={() => onOpenDetails(lead)}
            className="flex items-center gap-3 text-left"
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {getInitials(lead.firstName, lead.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{getLeadFullName(lead)}</span>
              <span className="text-xs text-muted-foreground">
                {lead.email || lead.phone}
              </span>
              <span className="text-xs text-muted-foreground">
                {lead.phone}
              </span>
            </div>
          </button>
        );
      },
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const config = LEAD_STATUS_CONFIG[row.original.status];
        return (
          <Badge variant="outline" className={config.className}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const config = LEAD_PRIORITY_CONFIG[row.original.priority];
        return (
          <Badge variant="outline" className={config.className}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => {
        const config = LEAD_SOURCE_CONFIG[row.original.source];
        return (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {SOURCE_ICONS[row.original.source]}
            {config.label}
          </div>
        );
      },
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
      cell: ({ row }) => {
        const assignee = row.original.assignedTo;
        if (!assignee) {
          return <span className="text-sm text-muted-foreground">Unassigned</span>;
        }
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[10px]">
                {getInitials(assignee.firstName, assignee.lastName)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{getLeadFullName(assignee)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => (
        <LeadRowActions
          lead={row.original}
          onOpenDetails={onOpenDetails}
          onEdit={onEdit}
          onAssign={onAssign}
           onUpdateStatus={onUpdateStatus}
          onConvert={onConvert}
          onDelete={onDelete}
        />
      ),
    },
  ];
}
