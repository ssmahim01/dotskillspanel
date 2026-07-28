/**
 * Dashboard configuration - defines navigation structure, colors, and layout
 */

import { UserRole, PageAccess } from "./permissions";

export interface NavGroup {
  label: string;
  items: NavItem[];
  collapsible?: boolean;
}

export interface NavItem {
  id: PageAccess;
  label: string;
  href: string;
  icon?: string; // Icon name from lucide-react
  badge?: string;
  description?: string;
}

export interface DashboardConfig {
  brand: {
    name: string;
    logo?: string;
  };
  sidebar: {
    width: number;
    collapsedWidth: number;
    theme: "light" | "dark" | "auto";
  };
  header: {
    height: number;
    sticky: boolean;
  };
  colors: {
    primary: string;
    accent: string;
    muted: string;
  };
}

export const dashboardConfig: DashboardConfig = {
  brand: {
    name: "DotSkills Panel",
  },
  sidebar: {
    width: 280,
    collapsedWidth: 80,
    theme: "auto",
  },
  header: {
    height: 64,
    sticky: true,
  },
  colors: {
    primary: "hsl(41 100% 50%)",
    accent: "hsl(41 100% 50%)",
    muted: "hsl(0 0% 64%)",
  },
};

export const navigationConfig: Record<UserRole, NavGroup[]> = {
  SUPER_ADMIN: [
    {
      label: "Overview",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/staff/dashboard",
          description: "Main dashboard",
        },
      ],
    },
    {
      label: "Management",
      collapsible: true,
      items: [
        {
          id: "team-management",
          label: "Team",
          href: "/staff/dashboard/admin/user-management",
          description: "Manage team members",
        },
        {
          id: "customer-management",
          label: "Customers",
          href: "/staff/dashboard/admin/customer-management",
        },
        {
          id: "product-management",
          label: "Products",
          href: "/staff/dashboard/admin/product-management",
        },
      ],
    },
    {
      label: "Operations",
      collapsible: true,
      items: [
        {
          id: "orders-management",
          label: "Orders",
          href: "/staff/dashboard/orders-management",
        },
        {
          id: "leads",
          label: "Leads",
          href: "/staff/dashboard/leads",
        },
      ],
    },
    {
      label: "System",
      collapsible: true,
      items: [
        {
          id: "settings",
          label: "Settings",
          href: "/staff/dashboard/admin/settings",
        },
        {
          id: "security",
          label: "Security",
          href: "/staff/dashboard/admin/security",
        },
      ],
    },
  ],
  ADMIN: [
    {
      label: "Overview",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/staff/dashboard",
        },
      ],
    },
    {
      label: "Management",
      collapsible: true,
      items: [
        {
          id: "product-management",
          label: "Products",
          href: "/staff/dashboard/admin/product-management",
        },
        {
          id: "customer-management",
          label: "Customers",
          href: "/staff/dashboard/admin/customer-management",
        },
      ],
    },
  ],
  MANAGER: [
    {
      label: "Overview",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/staff/dashboard",
        },
      ],
    },
    {
      label: "Operations",
      items: [
        {
          id: "orders-management",
          label: "Orders",
          href: "/staff/dashboard/orders-management",
        },
      ],
    },
  ],
  DEVELOPER: [
    {
      label: "Development",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/staff/dashboard",
        },
        {
          id: "api-keys",
          label: "API Keys",
          href: "/staff/dashboard/admin/api-keys",
        },
        {
          id: "documentation",
          label: "Documentation",
          href: "/staff/dashboard/admin/documentation",
        },
      ],
    },
  ],
  DESIGNER: [
    {
      label: "Design",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/staff/dashboard",
        },
      ],
    },
  ],
  MARKETER: [
    {
      label: "Marketing",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/staff/dashboard",
        },
        {
          id: "blogs",
          label: "Content",
          href: "/staff/dashboard/blog",
        },
      ],
    },
  ],
  STAFF: [
    {
      label: "Quick Links",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/staff/dashboard",
        },
        {
          id: "my-orders",
          label: "My Orders",
          href: "/staff/dashboard/my-orders",
        },
      ],
    },
  ],
};
