# Premium Enterprise Dashboard System

A modern, production-ready dashboard framework for the DotSkills Panel, featuring dynamic role-based navigation, responsive design, and a polished user experience inspired by Linear, Stripe, and Vercel.

## 🎯 Architecture Overview

### Core Components

```
Dashboard Layout
├── PremiumSidebar (Dynamic role-based navigation)
├── DashboardHeader (Sticky header with utilities)
│   ├── HeaderBreadcrumbs (Contextual breadcrumbs)
│   ├── HeaderSearch (Global search)
│   ├── HeaderNotifications (Notification center)
│   ├── ThemeToggle (Dark/light mode)
│   └── UserMenu (User profile & logout)
└── Main Content Area
    └── Page Content
```

### File Structure

```
src/
├── lib/
│   ├── permissions.ts           # User roles, page access, permissions
│   ├── dashboard-config.ts      # Navigation structure by role
│   ├── dashboard-utils.ts       # Utility functions (breadcrumbs, etc)
│   └── query-client.ts          # (existing)
├── hooks/
│   ├── use-sidebar-state.ts     # Sidebar open/closed state
│   └── index.ts
├── components/dashboard/
│   ├── index.ts                 # Component exports
│   ├── layout/
│   │   └── DashboardLayout.tsx  # Main layout wrapper
│   ├── sidebar/
│   │   ├── PremiumSidebar.tsx   # Premium sidebar
│   │   └── SidebarNavItems.tsx  # Nav item renderer
│   ├── header/
│   │   ├── DashboardHeader.tsx  # Main header
│   │   ├── HeaderBreadcrumbs.tsx
│   │   ├── HeaderSearch.tsx
│   │   ├── HeaderNotifications.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── UserMenu.tsx
│   ├── DashboardContent.tsx     # (updated)
│   └── (existing components)
```

## 🚀 Quick Start

### Basic Usage

The dashboard is automatically used when you wrap your app with `DashboardContent`:

```tsx
import { DashboardContent } from '@/components/dashboard';

export default function StaffLayout({ children }) {
  return (
    <DashboardContent>
      {children}
    </DashboardContent>
  );
}
```

### With Custom Configuration

Customize navigation by editing `src/lib/dashboard-config.ts`:

```typescript
export const navigationConfig: Record<UserRole, NavGroup[]> = {
  MANAGER: [
    {
      label: "Dashboard",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          href: "/staff/dashboard",
        },
      ],
    },
    // Add more groups as needed
  ],
};
```

## 🔐 Role-Based Access Control

User roles automatically determine sidebar navigation:

- **SUPER_ADMIN**: Full access to all features
- **ADMIN**: Administration features
- **MANAGER**: Operations and team management
- **DEVELOPER**: API and development tools
- **DESIGNER**: Design and product management
- **MARKETER**: Marketing and content
- **STAFF**: Limited user access

Edit role permissions in `src/lib/permissions.ts`:

```typescript
export const defaultRolePermissions: Record<UserRole, PageAccess[]> = {
  MANAGER: [
    "dashboard",
    "team-management",
    "analytics",
    "settings",
    "orders-management",
  ],
  // Add more roles...
};
```

## 🎨 Customization

### Theme Colors

Modify colors in `src/lib/dashboard-config.ts`:

```typescript
export const dashboardConfig: DashboardConfig = {
  colors: {
    primary: "hsl(41 100% 50%)",  // Amber
    accent: "hsl(41 100% 50%)",
    muted: "hsl(0 0% 64%)",
  },
};
```

### Sidebar Width

Configure sidebar dimensions:

```typescript
sidebar: {
  width: 280,          // Expanded width (px)
  collapsedWidth: 80,  // Collapsed width (px)
  theme: "auto",       // "light" | "dark" | "auto"
},
```

### Add New Navigation Items

1. Add page ID to `PageAccess` type in `permissions.ts`
2. Add to `availablePages` array
3. Add to role configurations in `dashboard-config.ts`
4. Add route mapping

```typescript
// src/lib/permissions.ts
export type PageAccess = 
  | "dashboard"
  | "my-new-page"  // Add here
  
export const availablePages: Page[] = [
  {
    id: "my-new-page",
    label: "My New Page",
    icon: <MyIcon className="h-4 w-4" />,
    description: "My new page",
  },
  // ...
];
```

## 📊 Header Components

### Breadcrumbs

Automatically generated from pathname:

```
Dashboard > Staff > User Management > Edit User
```

### Search

Global search placeholder (ready for implementation):

```tsx
<HeaderSearch />
```

### Notifications

Mock notification center with badge:

```tsx
<HeaderNotifications />
```

### Theme Toggle

Dark/light mode switcher:

```tsx
<ThemeToggle />
```

### User Menu

User profile and logout:

```tsx
<UserMenu />
```

## 🪝 Custom Hooks

### useSidebarState

Manage sidebar open/closed state with localStorage:

```tsx
import { useSidebarState } from '@/hooks';

export function MyComponent() {
  const { isOpen, toggle, open, close } = useSidebarState();
  
  return (
    <button onClick={toggle}>
      {isOpen ? 'Close' : 'Open'} Sidebar
    </button>
  );
}
```

## 🛠️ Utility Functions

### generateBreadcrumbs()

Generate breadcrumb navigation from pathname:

```typescript
import { generateBreadcrumbs } from '@/lib/dashboard-utils';

const crumbs = generateBreadcrumbs('/staff/dashboard/users/123');
// [
//   { label: "Dashboard", href: "/dashboard" },
//   { label: "Staff", href: "/staff" },
//   { label: "Dashboard", href: "/staff/dashboard" },
//   { label: "Users", href: "/staff/dashboard/users" },
//   { label: "123" }
// ]
```

### getPageTitle()

Get page title from pathname:

```typescript
import { getPageTitle } from '@/lib/dashboard-utils';

const title = getPageTitle('/staff/dashboard/users');
// "Staff Management"
```

### formatRole()

Format user role for display:

```typescript
import { formatRole } from '@/lib/dashboard-utils';

const display = formatRole('SUPER_ADMIN');
// "Super Admin"
```

### isRouteActive()

Check if a route prefix is active:

```typescript
import { isRouteActive } from '@/lib/dashboard-utils';

const isActive = isRouteActive('/staff/dashboard/users/123', '/staff/dashboard/users');
// true
```

## 📱 Responsive Design

The dashboard is fully responsive:

- **Desktop**: Full sidebar visible
- **Tablet**: Collapsible sidebar
- **Mobile**: Drawer sidebar with overlay

The `useSidebar()` hook from shadcn/ui handles responsive behavior automatically.

## 🔄 State Management

Sidebar state is persisted to localStorage:

```typescript
// Key: "dashboard-sidebar-state"
// Values: "open" | "closed"
```

## 🎯 Integration Points

### User Data

User info is fetched via Redux RTK Query:

```typescript
const { data, isLoading, isError } = useUserInfoQuery(undefined);
const user = data?.data;
```

Update user type in your Redux slice to include required fields:

```typescript
interface User {
  id: string;
  email: string;
  username?: string;
  role: UserRole;
  permissions?: PageAccess[];
}
```

### API Routes

Integrate real data sources:

- Breadcrumbs: Current pathname (automatic)
- Notifications: Connect to notification API
- User Menu: Connect to user profile API
- Search: Implement global search functionality

## 🚨 Troubleshooting

### Sidebar doesn't appear

- Check user role in database matches `UserRole` type
- Verify `useUserInfoQuery` is returning data
- Check browser console for errors

### Navigation not showing

- Verify role exists in `navigationConfig`
- Check page IDs exist in `availablePages`
- Ensure routes are correct in `dashboard-config.ts`

### Styling issues

- Check Tailwind CSS is configured correctly
- Verify `globals.css` includes Tailwind directives
- Check theme colors in `dashboard-config.ts`

## 📝 Notes

- All times are automatically formatted (e.g., "5m ago", "2h ago")
- Icons use `lucide-react`
- Styling uses Tailwind CSS + shadcn/ui
- Dark mode uses next-themes
- Responsive breakpoints follow Tailwind defaults (md: 768px)

## 🔮 Future Enhancements

- Implement real notification system
- Add global search functionality
- Create breadcrumb analytics
- Add sidebar collapse animation
- Implement keyboard shortcuts (Cmd+K)
- Add user activity indicators
- Create notification toast system
