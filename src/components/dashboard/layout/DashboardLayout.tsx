"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { PremiumSidebar } from "../sidebar/PremiumSidebar";
import { DashboardHeader } from "../header/DashboardHeader";
import DashboardSkeleton from "../DashboardSkeleton";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Premium Dashboard Layout Component
 * Provides a modern, responsive dashboard shell with sidebar, header, and content area
 * Features:
 * - Dynamic role-based sidebar navigation
 * - Sticky header with search, notifications, theme toggle, user menu
 * - Responsive design (desktop sidebar, mobile drawer)
 * - Dark/light mode support
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isLoading } = useUserInfoQuery(undefined);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <SidebarProvider>
      <PremiumSidebar />
      <SidebarInset>
        {/* Sticky Header */}
        <DashboardHeader />

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-auto">
            <div className="min-h-full">
              <div className="flex flex-col gap-4 p-4">
                {children}
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
