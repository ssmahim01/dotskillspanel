"use client";

import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNavItems } from "./SidebarNavItems";
import { navigationConfig } from "@/lib/dashboard-config";
import { UserRole } from "@/lib/permissions";
import { cn } from "@/lib/utils";
import { LogOut, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface PremiumSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function PremiumSidebar(props: PremiumSidebarProps) {
  const { data: user, isLoading } = useCurrentUser();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  if (isLoading) {
    return (
      <Sidebar {...props}>
        <SidebarHeader>
          <div className="flex items-center justify-center h-12 bg-muted rounded-lg animate-pulse" />
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  if (!user?.role) {
    return (
      <Sidebar {...props}>
        <SidebarHeader>
          <div className="flex items-center justify-center text-sm text-destructive">
            Error loading sidebar
          </div>
        </SidebarHeader>
      </Sidebar>
    );
  }

  const userRole = (user.role as UserRole) || "STAFF";
  const navGroups = navigationConfig[userRole] || navigationConfig.STAFF;

  return (
    <Sidebar
      {...props}
      className={cn(
        "border-r border-border/40 bg-background",
        props.className,
      )}
    >
      {/* Header - Logo/Brand */}
      <SidebarHeader className="border-b border-border/40 px-4 py-4">
        <Link
          href="/staff/dashboard"
          onClick={handleLinkClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="relative h-10 w-10 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-sm leading-tight">
              DotSkills
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              Panel
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Content - Navigation */}
      <SidebarContent className="flex flex-col">
        <ScrollArea className="flex-1 px-3 py-2">
          <SidebarNavItems groups={navGroups} />
        </ScrollArea>
      </SidebarContent>

      {/* Footer - User info + Actions */}
      <SidebarFooter className="border-t border-border/40 px-3 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
