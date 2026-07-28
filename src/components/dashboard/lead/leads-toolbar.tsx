"use client";

import { useState } from "react";
import { Download, Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  LEAD_PRIORITY_OPTIONS,
  LEAD_SOURCE_OPTIONS,
  LEAD_STATUS_OPTIONS,
} from "@/features/leads/constants/lead.constant";
import type { LeadFilters } from "@/types/lead";
import { LeadsMoreFiltersSheet } from "./leads-more-filters-sheet";

interface LeadsToolbarProps {
  filters: LeadFilters;
  activeFilterCount: number;
  onSearchChange: (value: string) => void;
  onUpdateFilters: (patch: Partial<LeadFilters>) => void;
  onExport: () => void;
  onAddLead: () => void;
}

const ALL = "__all__";

export function LeadsToolbar({
  filters,
  activeFilterCount,
  onSearchChange,
  onUpdateFilters,
  onExport,
  onAddLead,
}: LeadsToolbarProps) {
  const [search, setSearch] = useState(filters.searchTerm ?? "");
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            placeholder="Search leads by name, email or phone..."
            className="pl-9"
            onChange={(event) => {
              setSearch(event.target.value);
              onSearchChange(event.target.value);
            }}
          />
        </div>

        <Select
          value={filters.status ?? ALL}
          onValueChange={(value) =>
            onUpdateFilters({
              status: value === ALL ? undefined : (value as LeadFilters["status"]),
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Statuses</SelectItem>
            {LEAD_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.source ?? ALL}
          onValueChange={(value) =>
            onUpdateFilters({
              source: value === ALL ? undefined : (value as LeadFilters["source"]),
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Sources</SelectItem>
            {LEAD_SOURCE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.priority ?? ALL}
          onValueChange={(value) =>
            onUpdateFilters({
              priority:
                value === ALL ? undefined : (value as LeadFilters["priority"]),
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Priorities</SelectItem>
            {LEAD_PRIORITY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => setMoreFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          More Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onExport}>
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button onClick={onAddLead}>
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <LeadsMoreFiltersSheet
        open={moreFiltersOpen}
        onOpenChange={setMoreFiltersOpen}
        filters={filters}
        onApply={onUpdateFilters}
      />
    </div>
  );
}
