"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/lib/dashboard-config";

interface SidebarNavItemsProps {
  groups: NavGroup[];
}

export function SidebarNavItems({ groups }: SidebarNavItemsProps) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  const isItemActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="space-y-5">
      {groups.map((group, groupIdx) => (
        <div key={`group-${groupIdx}`}>
          {group.label && !isCollapsed && (
            <p className="px-3 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </p>
          )}

          <SidebarMenu>
            {group.items.map((item, itemIdx) => {
              const isActive = isItemActive(item.href);

              if (!group.collapsible) {
                return (
                  <SidebarMenuItem key={`${groupIdx}-${itemIdx}`}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={cn(
                        "gap-2.5 rounded-lg font-normal text-sidebar-foreground/80 transition-colors",
                        "hover:bg-primary/8 hover:text-sidebar-foreground",
                        isActive &&
                          "bg-primary font-medium text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground",
                      )}
                    >
                      <Link href={item.href} onClick={handleNavClick} title={item.description}>
                        {item.icon && (
                          <span
                            className={cn(
                              "shrink-0",
                              isActive ? "text-primary-foreground" : "text-muted-foreground",
                            )}
                          >
                            {item.icon}
                          </span>
                        )}
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={cn(
                              "ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold",
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return (
                <Collapsible
                  key={`${groupIdx}-${itemIdx}`}
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.label}
                        className={cn(
                          "gap-2.5 rounded-lg font-normal text-sidebar-foreground/80 transition-colors",
                          "hover:bg-primary/8 hover:text-sidebar-foreground",
                          isActive && "bg-primary/10 text-sidebar-foreground",
                        )}
                      >
                        {item.icon && (
                          <span className="shrink-0 text-muted-foreground">{item.icon}</span>
                        )}
                        <span className="flex-1 truncate">{item.label}</span>
                        <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub className="border-sidebar-border/60">
                        {/* TODO: map item.children once NavItem gains a children field —
                            kept as a single link for now to match the current type. */}
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={isActive}>
                            <Link href={item.href} onClick={handleNavClick}>
                              {item.label}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </div>
      ))}
    </div>
  );
}
