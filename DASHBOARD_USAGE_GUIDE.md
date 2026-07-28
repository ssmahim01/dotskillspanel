# Dashboard Usage Guide

## Overview

The enhanced DotSkills Panel dashboard provides a modern, role-based enterprise interface with comprehensive components for displaying data, statistics, and user interactions. This guide covers how to use all dashboard components with Zustand and TanStack Query.

## Table of Contents

1. [Core Architecture](#core-architecture)
2. [Dashboard Components](#dashboard-components)
3. [Using Dashboard Content Components](#using-dashboard-content-components)
4. [Zustand + TanStack Query Integration](#zustand--tanstack-query-integration)
5. [Code Examples](#code-examples)
6. [Best Practices](#best-practices)

---

## Core Architecture

### Technology Stack

- **State Management**: Zustand for global state
- **Data Fetching**: TanStack Query (React Query) for server state
- **UI Framework**: Next.js 16 App Router with React 19
- **Component Library**: shadcn/ui
- **Styling**: Tailwind CSS

### File Structure

```
src/
├── lib/
│   ├── permissions.ts          # User roles and page definitions
│   ├── dashboard-config.ts     # Navigation configuration by role
│   ├── dashboard-utils.ts      # Helper functions
│   └── types.ts                # Type definitions
├── hooks/
│   ├── auth/
│   │   └── useCurrentUser.ts   # User data hook (TanStack Query)
│   └── use-sidebar-state.ts    # Sidebar state management
├── stores/
│   └── auth.store.ts           # Zustand auth store
└── components/
    └── dashboard/
        ├── layout/             # Layout components
        ├── header/             # Header components
        ├── sidebar/            # Sidebar components
        └── content/            # Content display components
```

---

## Dashboard Components

### Layout Components

#### DashboardLayout
Main wrapper that provides the dashboard structure with sidebar, header, and content area.

```tsx
import { DashboardLayout } from '@/components/dashboard';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div>Your page content here</div>
    </DashboardLayout>
  );
}
```

**Features:**
- Responsive sidebar that collapses on mobile
- Sticky header with utilities
- Loading skeleton support
- Uses `useCurrentUser()` for auth data

### Header Components

#### DashboardHeader
Sticky header with all utilities including search, notifications, theme toggle, and user menu.

```tsx
import { DashboardHeader } from '@/components/dashboard';
```

**Sub-components:**
- **HeaderBreadcrumbs**: Auto-generated breadcrumbs from URL path
- **HeaderSearch**: Global search input with CMD+K support
- **HeaderNotifications**: Notification center with badge count
- **ThemeToggle**: Dark/light/system theme switcher
- **UserMenu**: User profile dropdown with logout

### Sidebar Components

#### PremiumSidebar
Dynamic, role-based sidebar navigation with collapsible sections.

**Features:**
- Role-based navigation configuration
- Icons and active indicators
- Mobile drawer support
- Brand header
- Logout button

#### SidebarNavItems
Renders navigation groups and individual items with proper styling.

---

## Using Dashboard Content Components

### StatsCard

Display key metrics with trend indicators.

```tsx
import { StatsCard } from '@/components/dashboard/content';

export function MyDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Revenue"
        value="$45,231.89"
        description="+20.1% from last month"
        trend="up"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <StatsCard
        title="Users"
        value="2,543"
        description="+12% from last month"
        trend="up"
        icon={<Users className="h-4 w-4" />}
      />
      <StatsCard
        title="Conversion"
        value="3.24%"
        description="-2.1% from last month"
        trend="down"
        icon={<TrendingDown className="h-4 w-4" />}
      />
    </div>
  );
}
```

**Props:**
- `title`: Card title
- `value`: Main metric value
- `description`: Subtext/description
- `trend`: "up" | "down" (optional)
- `icon`: React node (optional)
- `className`: Additional CSS classes (optional)

### QuickActions

Provide shortcuts to common tasks.

```tsx
import { QuickActions } from '@/components/dashboard/content';

export function MyDashboard() {
  const actions = [
    {
      icon: <Plus className="h-4 w-4" />,
      label: 'New Project',
      href: '/dashboard/projects/new'
    },
    {
      icon: <Upload className="h-4 w-4" />,
      label: 'Import Data',
      href: '/dashboard/import'
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: 'Settings',
      href: '/dashboard/settings'
    }
  ];

  return <QuickActions actions={actions} />;
}
```

**Features:**
- Grid layout that adapts to screen size
- Icon-based actions
- Navigation support
- Hover effects and transitions

### WelcomeBanner

Customizable welcome message for users.

```tsx
import { WelcomeBanner } from '@/components/dashboard/content';

export function MyDashboard() {
  return (
    <WelcomeBanner
      title="Welcome back!"
      description="Get started with your dashboard by completing these steps."
      actionLabel="View Getting Started"
      actionHref="/dashboard/getting-started"
      onDismiss={() => console.log('Dismissed')}
    />
  );
}
```

**Props:**
- `title`: Main title
- `description`: Subtitle/description
- `actionLabel`: Button text
- `actionHref`: Link destination
- `onDismiss`: Dismiss callback
- `variant`: "info" | "success" | "warning" (optional)

### ActivityFeed

Display recent user activities with timestamps.

```tsx
import { ActivityFeed } from '@/components/dashboard/content';

export function MyDashboard() {
  const activities = [
    {
      id: '1',
      user: 'John Doe',
      action: 'Created new project',
      target: 'Project Dashboard',
      timestamp: new Date(Date.now() - 5 * 60000),
      icon: <Plus className="h-4 w-4" />
    },
    {
      id: '2',
      user: 'Jane Smith',
      action: 'Updated settings',
      target: 'Profile Settings',
      timestamp: new Date(Date.now() - 30 * 60000),
      icon: <Settings className="h-4 w-4" />
    }
  ];

  return (
    <ActivityFeed
      title="Recent Activity"
      activities={activities}
      viewAllHref="/dashboard/activity"
    />
  );
}
```

**Features:**
- Relative timestamps (e.g., "5 minutes ago")
- Icon support
- View all link
- Responsive layout

### DashboardOverview

Complete dashboard page combining all components.

```tsx
import { DashboardOverview } from '@/components/dashboard/content';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}
```

**Includes:**
- Welcome banner
- Stats cards
- Quick actions
- Activity feed
- All fully responsive and role-aware

---

## Zustand + TanStack Query Integration

### Using useCurrentUser Hook

This hook combines Zustand store + TanStack Query for user data.

```tsx
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';

export function UserProfile() {
  const { data: user, isLoading, error } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user?.fullName}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
```

**Returns:**
- `data`: User object (or undefined if not loaded)
- `isLoading`: Loading state
- `error`: Error object
- All standard TanStack Query properties

### Zustand Store Pattern

Access global auth state directly:

```tsx
import { useAuthStore } from '@/stores/auth.store';

export function AuthStatus() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  
  return isAuthenticated ? <p>Logged in as {user?.email}</p> : <p>Not authenticated</p>;
}
```

### TanStack Query Mutations

For mutations, use TanStack Query's mutation hooks:

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function UpdateProfile() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newData) => api.updateUser(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'New Name' })}>
      {mutation.isPending ? 'Saving...' : 'Save'}
    </button>
  );
}
```

---

## Code Examples

### Example 1: Complete Dashboard Page

```tsx
'use client';

import { DashboardLayout } from '@/components/dashboard';
import { StatsCard, QuickActions, ActivityFeed } from '@/components/dashboard/content';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { DollarSign, Users, TrendingUp, Plus, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { data: user } = useCurrentUser();

  const actions = [
    { icon: <Plus className="h-4 w-4" />, label: 'New Lead', href: '/dashboard/leads/new' },
    { icon: <Settings className="h-4 w-4" />, label: 'Settings', href: '/dashboard/settings' }
  ];

  const activities = [
    {
      id: '1',
      user: 'System',
      action: 'Welcome',
      target: user?.fullName,
      timestamp: new Date(),
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Revenue"
            value="$125,000"
            description="+15% from last month"
            trend="up"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <StatsCard
            title="Active Users"
            value="1,234"
            description="+8% from last month"
            trend="up"
            icon={<Users className="h-4 w-4" />}
          />
        </div>

        <QuickActions actions={actions} />
        
        <ActivityFeed
          title="Recent Activity"
          activities={activities}
          viewAllHref="/dashboard/activity"
        />
      </div>
    </DashboardLayout>
  );
}
```

### Example 2: Using Sidebar Navigation in Content

```tsx
'use client';

import { DashboardLayout } from '@/components/dashboard';
import { usePathname } from 'next/navigation';

export default function AnalyticsPage() {
  const pathname = usePathname();
  
  // Page is automatically included in breadcrumbs via HeaderBreadcrumbs
  // which uses pathname

  return (
    <DashboardLayout>
      <div>
        <h1>Analytics</h1>
        <p>Current path: {pathname}</p>
      </div>
    </DashboardLayout>
  );
}
```

### Example 3: Custom Content with User Data

```tsx
'use client';

import { DashboardLayout } from '@/components/dashboard';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CustomPage() {
  const { data: user, isLoading, error } = useCurrentUser();

  if (error) {
    return (
      <DashboardLayout>
        <Alert variant="destructive">
          <AlertDescription>
            Error loading user data: {error.message}
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1>Welcome, {user?.fullName || 'User'}</h1>
        <p>Your role: {user?.role}</p>
        <p>Email: {user?.email}</p>
      </div>
    </DashboardLayout>
  );
}
```

---

## Best Practices

### 1. Always Use useCurrentUser for Auth Data

```tsx
// Good
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
const { data: user } = useCurrentUser();

// Avoid
// Don't manually call auth API - use the hook
```

### 2. Handle Loading and Error States

```tsx
// Good
const { data, isLoading, error } = useCurrentUser();

if (isLoading) return <Skeleton />;
if (error) return <ErrorAlert />;

return <YourComponent data={data} />;

// Avoid
return <YourComponent data={data} />; // Might render undefined data
```

### 3. Use TanStack Query for Data Fetching

```tsx
// Good
const { data } = useQuery({
  queryKey: ['leads', leadId],
  queryFn: () => api.getLead(leadId)
});

// Avoid - Don't use useState + useEffect for API calls
const [data, setData] = useState(null);
useEffect(() => {
  fetch('/api/leads/1').then(r => setData(r));
}, []);
```

### 4. Leverage Zustand for Global State

```tsx
// Good - Use store for singleton state
const { theme } = useThemeStore();

// Avoid - Don't prop drill for global state
<Parent theme={theme}>
  <Child theme={theme}>
    <GrandChild theme={theme} />
  </GrandChild>
</Parent>
```

### 5. Optimize Re-renders

```tsx
// Good - Selector to prevent unnecessary re-renders
const userName = useAuthStore((state) => state.user?.name);

// Avoid - Full store subscription
const store = useAuthStore(); // Re-renders when ANY store state changes
```

### 6. Use Role-Based Rendering

```tsx
// Good
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';

export function AdminOnly() {
  const { data: user } = useCurrentUser();
  
  if (user?.role !== 'ADMIN') return null;
  
  return <AdminPanel />;
}

// The sidebar already handles this via navigationConfig
```

### 7. Invalidate Queries After Mutations

```tsx
// Good
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (data) => api.updateUser(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  }
});
```

---

## Troubleshooting

### Issue: User data not loading

**Solution:** Check that `useCurrentUser` is being called in a client component (`'use client'`).

### Issue: Sidebar not showing correct nav items

**Solution:** Verify user role is correct in `navigationConfig` in `src/lib/dashboard-config.ts`.

### Issue: Theme not persisting

**Solution:** Make sure `next-themes` is properly wrapped in layout, check `ThemeProvider` in app layout.

### Issue: Breadcrumbs not updating

**Solution:** `usePathname()` is called in client component, verify route naming matches breadcrumb config.

---

## File Reference

| File | Purpose |
|------|---------|
| `src/lib/permissions.ts` | User roles, pages, permissions |
| `src/lib/dashboard-config.ts` | Navigation by role |
| `src/hooks/auth/useCurrentUser.ts` | Get current user data |
| `src/stores/auth.store.ts` | Zustand auth store |
| `src/components/dashboard/layout/DashboardLayout.tsx` | Main layout |
| `src/components/dashboard/header/DashboardHeader.tsx` | Header with utilities |
| `src/components/dashboard/sidebar/PremiumSidebar.tsx` | Navigation sidebar |
| `src/components/dashboard/content/*` | Content components |

---

## Next Steps

1. **Create pages**: Use `DashboardLayout` wrapper for all dashboard pages
2. **Add content**: Use `DashboardOverview` or custom content components
3. **Integrate APIs**: Use TanStack Query hooks for data fetching
4. **Customize**: Modify `dashboard-config.ts` for navigation
5. **Deploy**: Everything is production-ready

---

For more information, see:
- [DASHBOARD_README.md](./DASHBOARD_README.md)
- [DASHBOARD_ENHANCED.md](./DASHBOARD_ENHANCED.md)
- [DASHBOARD_GUIDE.md](./DASHBOARD_GUIDE.md)
