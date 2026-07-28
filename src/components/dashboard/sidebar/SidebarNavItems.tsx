"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { NavGroup, NavItem } from "@/lib/dashboard-config";

interface SidebarNavItemsProps {
  groups: NavGroup[];
}

export function SidebarNavItems({ groups }: SidebarNavItemsProps) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const isItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="space-y-4">
      {groups.map((group, groupIdx) => (
        <div key={`group-${groupIdx}`}>
          {group.label && (
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                      className="hover:bg-accent/50 transition-colors"
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        title={item.description}
                        className={`${
                          isActive
                            ? "bg-accent text-accent-foreground font-medium"
                            : ""
                        }`}
                      >
                        {item.icon && (
                          <span className="flex-shrink-0">{item.icon}</span>
                        )}
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
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
                        className={`hover:bg-accent/50 transition-colors ${
                          isActive ? "bg-accent/50" : ""
                        }`}
                      >
                        {item.icon && (
                          <span className="flex-shrink-0">{item.icon}</span>
                        )}
                        <span className="flex-1">{item.label}</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {/* Placeholder for sub-items */}
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={item.href}
                              onClick={handleNavClick}
                            >
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
