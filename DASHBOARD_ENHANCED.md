# Enhanced Dashboard System - Complete Guide

## Overview

The DotSkills Panel now features a **premium, enterprise-grade dashboard system** with:
- Dynamic role-based navigation
- Modern, responsive UI components
- Zustand + TanStack Query state management
- Real-time activity feeds
- Key metrics display
- Quick action shortcuts
- Full dark mode support

## Architecture

### State Management
- **Zustand Store** (`src/stores/auth.store.ts`): User authentication state
- **TanStack Query** (`useCurrentUser` hook): Data fetching and caching
- **localStorage**: Sidebar state persistence

### Components Hierarchy

```
DashboardLayout (root)
├── PremiumSidebar (role-based navigation)
├── DashboardHeader (sticky header)
│   ├── HeaderBreadcrumbs
│   ├── HeaderSearch
│   ├── HeaderNotifications
│   ├── ThemeToggle
│   └── UserMenu
└── Main Content (children)
    └── DashboardOverview (example page)
        ├── WelcomeBanner
        ├── StatsCard[] (metrics)
        ├── QuickActions[] (shortcuts)
        └── ActivityFeed[] (activities)
```

## New Components

### 1. StatsCard
Displays key metrics with optional trend indicators.

```tsx
import { StatsCard } from "@/components/dashboard/content";
import { TrendingUp } from "lucide-react";

export function MyStats() {
  return (
    <StatsCard
      title="Total Revenue"
      value="$12,543"
      icon={<TrendingUp className="h-6 w-6" />}
      trend={{ value: 12.5, direction: "up" }}
      description="This month"
      variant="success"
    />
  );
}
```

**Props:**
- `title` (string): Metric title
- `value` (string | number): Display value
- `description` (string, optional): Additional text
- `icon` (ReactNode, optional): Display icon
- `trend` (object, optional): `{ value: number, direction: "up" | "down" }`
- `variant` ("default" | "success" | "warning" | "destructive" | "info"): Color variant
- `className` (string, optional): Additional CSS classes

**Variants:**
- `default`: Blue gradient
- `success`: Green gradient
- `warning`: Amber gradient
- `destructive`: Red gradient
- `info`: Purple gradient

### 2. QuickActions
Provides shortcut buttons for common tasks.

```tsx
import { QuickActions } from "@/components/dashboard/content";
import { Plus, Eye, Download } from "lucide-react";

export function MyQuickActions() {
  const actions = [
    {
      id: "create",
      label: "Create Project",
      description: "Start new project",
      icon: <Plus className="h-5 w-5" />,
      onClick: () => console.log("create"),
    },
    {
      id: "view",
      label: "View Reports",
      description: "Check analytics",
      icon: <Eye className="h-5 w-5" />,
      onClick: () => console.log("view"),
    },
    {
      id: "export",
      label: "Export Data",
      description: "Download files",
      icon: <Download className="h-5 w-5" />,
      onClick: () => console.log("export"),
    },
  ];

  return (
    <QuickActions
      title="Quick Actions"
      actions={actions}
      columns={3}
    />
  );
}
```

**Props:**
- `title` (string, optional): Section title
- `description` (string, optional): Section description
- `actions` (QuickAction[]): Array of action items
  - `id` (string): Unique identifier
  - `label` (string): Button label
  - `description` (string, optional): Subtitle
  - `icon` (ReactNode): Icon component
  - `href` (string, optional): Link destination
  - `onClick` (function, optional): Click handler
  - `disabled` (boolean, optional): Disable button
- `columns` (2 | 3 | 4): Grid columns (default: 3)
- `className` (string, optional): Additional CSS

### 3. WelcomeBanner
Display a greeting banner with optional call-to-action.

```tsx
import { WelcomeBanner } from "@/components/dashboard/content";
import { Zap } from "lucide-react";

export function MyWelcomeBanner() {
  return (
    <WelcomeBanner
      title="Welcome back!"
      subtitle="Here's what's new"
      description="You have 3 pending notifications"
      icon={<Zap className="h-6 w-6" />}
      actionLabel="View Details"
      onAction={() => console.log("action")}
      onDismiss={() => console.log("dismissed")}
      variant="info"
      dismissible={true}
    />
  );
}
```

**Props:**
- `title` (string): Banner title
- `subtitle` (string, optional): Subtitle
- `description` (string, optional): Description text
- `icon` (ReactNode, optional): Icon component
- `actionLabel` (string, optional): Button label
- `onAction` (function, optional): Button click handler
- `onDismiss` (function, optional): Dismiss handler
- `variant` ("default" | "success" | "info" | "warning"): Color variant
- `dismissible` (boolean, optional): Show close button (default: true)
- `className` (string, optional): Additional CSS

### 4. ActivityFeed
Display recent user activities with timestamps.

```tsx
import { ActivityFeed } from "@/components/dashboard/content";
import { Zap, Users } from "lucide-react";

export function MyActivityFeed() {
  const activities = [
    {
      id: "1",
      icon: <Zap className="h-4 w-4" />,
      title: "System upgraded",
      description: "All services operational",
      timestamp: new Date(Date.now() - 15 * 60000),
      type: "success",
    },
    {
      id: "2",
      icon: <Users className="h-4 w-4" />,
      title: "Team member joined",
      description: "Sarah Johnson added",
      timestamp: new Date(Date.now() - 45 * 60000),
      type: "info",
    },
  ];

  return (
    <ActivityFeed
      title="Recent Activity"
      items={activities}
      maxItems={6}
      emptyState={{
        icon: <Users className="h-12 w-12" />,
        title: "No activity",
        description: "Activities will appear here",
      }}
    />
  );
}
```

**Props:**
- `title` (string, optional): Feed title (default: "Recent Activity")
- `items` (ActivityItem[]): Array of activities
  - `id` (string): Unique identifier
  - `icon` (ReactNode): Icon component
  - `title` (string): Activity title
  - `description` (string, optional): Details
  - `timestamp` (Date): When it happened
  - `type` ("success" | "warning" | "info" | "default"): Color variant
  - `actionLabel` (string, optional): Button text
  - `onAction` (function, optional): Click handler
- `maxItems` (number, optional): Display limit (default: 6)
- `isLoading` (boolean, optional): Show skeleton (default: false)
- `emptyState` (object, optional): Empty state display
- `className` (string, optional): Additional CSS

### 5. DashboardOverview
Complete dashboard example combining all components.

```tsx
import { DashboardOverview } from "@/components/dashboard/content";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardOverview />
    </div>
  );
}
```

## Integration Examples

### Example 1: Basic Stats Display
```tsx
"use client";

import { StatsCard } from "@/components/dashboard/content";
import { BarChart3, Users, TrendingUp, Zap } from "lucide-react";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Users"
        value="2,847"
        icon={<Users className="h-6 w-6" />}
        trend={{ value: 12.5, direction: "up" }}
        variant="info"
      />
      <StatsCard
        title="Revenue"
        value="$45,231"
        icon={<TrendingUp className="h-6 w-6" />}
        trend={{ value: 8.2, direction: "up" }}
        variant="success"
      />
      <StatsCard
        title="Conversion"
        value="3.2%"
        icon={<BarChart3 className="h-6 w-6" />}
        trend={{ value: 2.1, direction: "down" }}
        variant="warning"
      />
      <StatsCard
        title="Performance"
        value="98.5%"
        icon={<Zap className="h-6 w-6" />}
        trend={{ value: 5.3, direction: "up" }}
        variant="default"
      />
    </div>
  );
}
```

### Example 2: Custom Dashboard Page
```tsx
"use client";

import { DashboardLayout } from "@/components/dashboard/layout";
import { WelcomeBanner, QuickActions, ActivityFeed, StatsCard } from "@/components/dashboard/content";
import { Plus, BarChart3, Download } from "lucide-react";

export default function CustomDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeBanner
          title="Sales Dashboard"
          subtitle="Track your sales metrics"
          actionLabel="Generate Report"
          variant="success"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title="Sales" value="$24,500" variant="success" />
          <StatsCard title="Orders" value="184" variant="info" />
          <StatsCard title="Growth" value="12.5%" variant="default" />
        </div>

        <QuickActions
          actions={[
            {
              id: "new-order",
              label: "New Order",
              icon: <Plus className="h-5 w-5" />,
              onClick: () => {},
            },
            {
              id: "report",
              label: "View Report",
              icon: <BarChart3 className="h-5 w-5" />,
              onClick: () => {},
            },
            {
              id: "export",
              label: "Export",
              icon: <Download className="h-5 w-5" />,
              onClick: () => {},
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
```

## Styling & Customization

### Using Variants
Each component supports variants for consistent theming:

```tsx
// Available variants
<StatsCard variant="default" />   // Blue
<StatsCard variant="success" />   // Green
<StatsCard variant="warning" />   // Amber
<StatsCard variant="destructive" /> // Red
<StatsCard variant="info" />      // Purple

<WelcomeBanner variant="default" />
<WelcomeBanner variant="success" />
<WelcomeBanner variant="info" />
<WelcomeBanner variant="warning" />
```

### Custom Styling
All components accept `className` prop for additional styling:

```tsx
<StatsCard
  title="Revenue"
  value="$12,543"
  className="ring-2 ring-primary"
/>
```

### Dark Mode
All components fully support dark mode through:
- `next-themes` theme provider
- Tailwind CSS dark mode classes
- Automatic color inversions

## Data Integration

### Fetching Real Data
Replace mock data with API calls using TanStack Query:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/dashboard/content";

export function RealStatsCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      return res.json();
    },
  });

  if (isLoading) {
    return <div className="h-32 bg-muted rounded animate-pulse" />;
  }

  return (
    <StatsCard
      title={data.title}
      value={data.value}
      trend={data.trend}
    />
  );
}
```

### User-Specific Data
Components automatically adapt to user data:

```tsx
import { DashboardOverview } from "@/components/dashboard/content";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

export function UserDashboard() {
  const { data: user } = useCurrentUser();
  
  // DashboardOverview automatically:
  // - Gets user name for greeting
  // - Shows user-specific content
  // - Applies role-based permissions
  return <DashboardOverview />;
}
```

## Performance Optimizations

1. **Memoization**: All components use React.memo where appropriate
2. **Lazy Loading**: Components support loading states with skeletons
3. **Query Caching**: TanStack Query caches API responses
4. **Sidebar State**: localStorage persists sidebar state without re-renders

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML structure
- Proper contrast ratios
- Focus management

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome for Android

## File Structure

```
src/components/dashboard/
├── layout/
│   └── DashboardLayout.tsx
├── header/
│   ├── DashboardHeader.tsx
│   ├── HeaderBreadcrumbs.tsx
│   ├── HeaderSearch.tsx
│   ├── HeaderNotifications.tsx
│   ├── ThemeToggle.tsx
│   └── UserMenu.tsx
├── sidebar/
│   ├── PremiumSidebar.tsx
│   └── SidebarNavItems.tsx
├── content/
│   ├── StatsCard.tsx
│   ├── QuickActions.tsx
│   ├── WelcomeBanner.tsx
│   ├── ActivityFeed.tsx
│   ├── DashboardOverview.tsx
│   └── index.ts
└── index.ts

src/lib/
├── permissions.ts (Role definitions)
├── dashboard-config.ts (Navigation structure)
├── dashboard-utils.ts (Helper functions)
└── dashboard-keys.ts (Query keys)

src/hooks/
└── use-sidebar-state.ts (Sidebar state hook)
```

## Common Tasks

### Add Custom Stat
```tsx
import { StatsCard } from "@/components/dashboard/content";

<StatsCard
  title="Custom Metric"
  value="123"
  icon={<CustomIcon />}
  description="Optional description"
  variant="success"
/>
```

### Add Navigation Item
1. Edit `src/lib/permissions.ts`: Add page to `PageAccess` type
2. Edit `src/lib/dashboard-config.ts`: Add to appropriate role navigation

### Change Colors
Edit `src/lib/dashboard-config.ts`:
```ts
export const dashboardConfig = {
  colors: {
    primary: "hsl(220 90% 56%)", // Change to your brand color
    // ... other colors
  },
};
```

### Add Real Data
Replace mock data in components with TanStack Query hooks:
```tsx
const { data } = useQuery({ queryKey: ["data"], queryFn: () => fetch("/api/data") });
```

## Troubleshooting

**Issue**: Components not showing
- Check if DashboardLayout wraps content
- Verify Zustand store is initialized
- Check browser console for errors

**Issue**: Dark mode not working
- Ensure ThemeProvider is in root layout
- Check `next-themes` is configured
- Verify dark class on html element

**Issue**: Sidebar not collapsing
- Check localStorage is enabled
- Verify use-sidebar-state hook is working
- Check for CSS conflicts

## Performance Tips

1. Use `keepPreviousData` in TanStack Query for smooth transitions
2. Implement virtual scrolling for large activity feeds
3. Cache frequently accessed data
4. Use React.lazy for code splitting

## Support

For issues or questions:
1. Check the documentation files
2. Review example implementations
3. Check browser console for errors
4. Review git commit history for changes

---

**Last Updated**: 2024
**Version**: 1.0.0
