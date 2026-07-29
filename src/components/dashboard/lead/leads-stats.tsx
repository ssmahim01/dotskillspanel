"use client";

import { CheckCircle2, TrendingUp, UserPlus, UserX, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useLeadStats } from "@/features/leads/hooks/use-lead-stats";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconClassName: string;
  isLoading: boolean;
}

function StatCard({ label, value, icon, iconClassName, isLoading }: StatCardProps) {
  return (
    <Card className="bg-gray-100 dark:bg-slate-950 flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            iconClassName,
          )}
        >
          {icon}
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-8 w-20" />
      ) : (
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
      )}
    </Card>
  );
}

export function LeadsStats() {
  const { isLoading, totalCount, newCount, convertedCount, lostCount, conversionRate } =
    useLeadStats();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <StatCard
        label="Total Leads"
        value={totalCount.toLocaleString()}
        icon={<Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
        iconClassName="bg-blue-100 dark:bg-blue-900/30"
        isLoading={isLoading}
      />
      <StatCard
        label="New Leads"
        value={newCount.toLocaleString()}
        icon={<UserPlus className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
        iconClassName="bg-emerald-100 dark:bg-emerald-900/30"
        isLoading={isLoading}
      />
      <StatCard
        label="Converted"
        value={convertedCount.toLocaleString()}
        icon={<CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
        iconClassName="bg-indigo-100 dark:bg-indigo-900/30"
        isLoading={isLoading}
      />
      <StatCard
        label="Conversion Rate"
        value={`${conversionRate.toFixed(1)}%`}
        icon={<TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
        iconClassName="bg-amber-100 dark:bg-amber-900/30"
        isLoading={isLoading}
      />
      <StatCard
        label="Lost Leads"
        value={lostCount.toLocaleString()}
        icon={<UserX className="h-4 w-4 text-red-600 dark:text-red-400" />}
        iconClassName="bg-red-100 dark:bg-red-900/30"
        isLoading={isLoading}
      />
    </div>
  );
}
