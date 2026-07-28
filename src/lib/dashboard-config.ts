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
          href: "/dashboard",
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
          href: "/dashboard/user-management",
          description: "Manage team members",
        },
        {
          id: "customer-management",
          label: "Customers",
          href: "/dashboard/customer-management",
        },
        {
          id: "product-management",
          label: "Products",
          href: "/dashboard/product-management",
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
          href: "/dashboard/orders-management",
        },
        {
          id: "leads",
          label: "Leads",
          href: "/dashboard/leads",
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
          href: "/dashboard/settings",
        },
        {
          id: "security",
          label: "Security",
          href: "/dashboard/security",
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
          href: "/dashboard",
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
          href: "/dashboard/product-management",
        },
        {
          id: "customer-management",
          label: "Customers",
          href: "/dashboard/customer-management",
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
          href: "/dashboard",
        },
      ],
    },
    {
      label: "Operations",
      items: [
        {
          id: "orders-management",
          label: "Orders",
          href: "/dashboard/orders-management",
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
          href: "/dashboard",
        },
        {
          id: "api-keys",
          label: "API Keys",
          href: "/dashboard/api-keys",
        },
        {
          id: "documentation",
          label: "Documentation",
          href: "/dashboard/documentation",
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
          href: "/dashboard",
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
          href: "/dashboard",
        },
        {
          id: "blogs",
          label: "Content",
          href: "/dashboard/blog",
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
          href: "/dashboard",
        },
        {
          id: "my-orders",
          label: "My Orders",
          href: "/dashboard/my-orders",
        },
      ],
    },
  ],
};
