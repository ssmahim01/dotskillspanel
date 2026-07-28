"use client";

import {
  ArrowRightLeft,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { canConvertLead } from "@/features/leads/utils/lead.utils";
import type { ILead } from "@/types/lead";

interface LeadRowActionsProps {
  lead: ILead;
  onOpenDetails: (lead: ILead) => void;
  onEdit: (lead: ILead) => void;
  onAssign: (lead: ILead) => void;
  onConvert: (lead: ILead) => void;
  onDelete: (lead: ILead) => void;
}

export function LeadRowActions({
  lead,
  onOpenDetails,
  onEdit,
  onAssign,
  onConvert,
  onDelete,
}: LeadRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={(event) => event.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(event) => event.stopPropagation()}>
        <DropdownMenuItem onClick={() => onOpenDetails(lead)}>
          <Eye className="h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(lead)}>
          <Pencil className="h-4 w-4" />
          Edit Lead
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAssign(lead)}>
          <UserPlus className="h-4 w-4" />
          Assign
        </DropdownMenuItem>
        {canConvertLead(lead) && (
          <DropdownMenuItem onClick={() => onConvert(lead)}>
            <ArrowRightLeft className="h-4 w-4" />
            Convert to Client
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => onDelete(lead)}>
          <Trash2 className="h-4 w-4" />
          Move to Trash
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
