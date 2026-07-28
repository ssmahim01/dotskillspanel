# Dashboard Quick Start Guide

## Overview

The new enterprise dashboard is automatically integrated into your DotSkills Panel. It provides a modern, professional interface with role-based navigation, responsive design, and a polished user experience.

## 🚀 What You Get Out of the Box

### Sidebar Features
- ✅ Dynamic role-based navigation (7 different roles)
- ✅ Collapsible sections with icons
- ✅ Active route highlighting
- ✅ Mobile-responsive drawer
- ✅ Logo/brand header
- ✅ Quick logout button
- ✅ Smooth animations and transitions

### Header Features
- ✅ Sticky positioning with backdrop blur
- ✅ Breadcrumb navigation (auto-generated from URL)
- ✅ Global search input
- ✅ Notification center with badge
- ✅ Dark/light/system theme toggle
- ✅ User profile menu
- ✅ Responsive layout

### Layout Features
- ✅ Professional grid layout
- ✅ Full dark mode support
- ✅ Loading states and skeletons
- ✅ Error boundaries
- ✅ Smooth transitions
- ✅ Responsive breakpoints
- ✅ localStorage persistence

## 📖 How It Works

### Your Existing Code Works As-Is

No changes needed to your page files! The dashboard automatically:

1. Detects your user role from Redux
2. Loads the appropriate navigation
3. Renders the header and sidebar
4. Manages responsive behavior

### Example Page

Here's a typical page - it just works:

```tsx
// app/staff/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your content here</p>
    </div>
  );
}
```

The dashboard layout wraps this automatically, providing:
- Sidebar navigation on the left
- Sticky header on top
- Full responsive behavior
- Theme support
- Breadcrumbs

## 🎨 Customization Examples

### Example 1: Change Colors

Edit `src/lib/dashboard-config.ts`:

```typescript
export const dashboardConfig: DashboardConfig = {
  // ... other config
  colors: {
    primary: "hsl(210 100% 50%)",   // Blue instead of amber
    accent: "hsl(210 100% 50%)",
    muted: "hsl(0 0% 64%)",
  },
};
```

### Example 2: Add a New Navigation Item

1. Add to `PageAccess` type in `src/lib/permissions.ts`:

```typescript
export type PageAccess = 
  | "dashboard"
  | "my-new-page"  // Add this
```

2. Add to `availablePages`:

```typescript
export const availablePages: Page[] = [
  // ... existing pages
  {
    id: "my-new-page",
    label: "My New Page",
    icon: <FileText className="h-4 w-4" />,
    description: "My custom page",
  },
];
```

3. Add to role config in `src/lib/dashboard-config.ts`:

```typescript
MANAGER: [
  {
    label: "Operations",
    items: [
      {
        id: "my-new-page",
        label: "My New Page",
        href: "/staff/dashboard/my-new-page",
      },
    ],
  },
],
```

### Example 3: Change Sidebar Width

Edit `src/lib/dashboard-config.ts`:

```typescript
sidebar: {
  width: 320,          // Make it wider (was 280)
  collapsedWidth: 100, // Wider when collapsed
  theme: "auto",
},
```

### Example 4: Change Brand Logo

Edit `src/components/dashboard/sidebar/PremiumSidebar.tsx`:

```tsx
<div className="relative h-10 w-10 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
  <YourCustomIcon className="h-6 w-6 text-primary" />
</div>
<div className="flex flex-col gap-0.5">
  <span className="font-bold text-sm">Your</span>
  <span className="text-xs text-muted-foreground">Brand</span>
</div>
```

## 🎯 Role-Based Navigation

### Current Roles

The system supports these roles (easily extensible):

```
SUPER_ADMIN  → Full access to everything
ADMIN        → Administrative features
MANAGER      → Team and operations management
DEVELOPER    → API and development tools
DESIGNER     → Design and product management
MARKETER     → Marketing and content
STAFF        → Limited user access
```

### How Roles Work

When a user logs in:

1. Their role is fetched from the database
2. The appropriate navigation is loaded from `navigationConfig`
3. The sidebar displays only their allowed pages
4. Breadcrumbs update dynamically

### Example: Custom Role Navigation

Edit `navigationConfig` in `dashboard-config.ts`:

```typescript
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
    ],
  },
]
```

## 🔌 Connecting Real Data

### Real Search

Edit `src/components/dashboard/header/HeaderSearch.tsx`:

```tsx
const handleSearch = async (query: string) => {
  const results = await fetch(`/api/search?q=${query}`);
  // Show results
};
```

### Real Notifications

Edit `src/components/dashboard/header/HeaderNotifications.tsx`:

```tsx
// Replace mock notifications
const { data: notifications } = useNotificationsQuery();
```

### Real Settings Link

Edit `src/components/dashboard/header/UserMenu.tsx`:

```tsx
<DropdownMenuItem 
  asChild
  className="gap-2 cursor-pointer"
>
  <Link href="/staff/dashboard/settings">
    <Settings className="h-4 w-4" />
    <span>Settings</span>
  </Link>
</DropdownMenuItem>
```

## 🎮 Interactive Features

### Sidebar Toggle
- Click the menu icon to toggle sidebar
- Auto-closes on mobile when clicking a link
- State persists in localStorage

### Search
- Click the search icon or Ctrl+K
- Type to search
- Press Escape to close

### Notifications
- Click the bell icon to view notifications
- Shows unread badge
- Click "View all" to see full notification center

### Theme Toggle
- Click the sun/moon icon
- Choose Light, Dark, or System
- Preference persists

### User Menu
- Click your avatar
- View your profile
- Access settings
- Logout

## 📱 Responsive Behavior

### Desktop (> 768px)
- Sidebar always visible
- Full-width content
- All features available

### Tablet (640px - 768px)
- Sidebar toggles via button
- Collapsible sidebar available
- Touch-friendly buttons

### Mobile (< 640px)
- Sidebar as slide-out drawer
- Auto-closes after navigation
- Optimized touch interactions
- Full-screen content area

## 🔧 Advanced Customization

### Custom Sidebar Sections

Create a new section in `navigationConfig`:

```typescript
MANAGER: [
  {
    label: "Quick Actions",
    collapsible: false,
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/staff/dashboard",
        badge: "NEW",
      },
    ],
  },
  {
    label: "Management",
    collapsible: true,
    items: [
      // ... more items
    ],
  },
]
```

### Custom Header Components

Add additional header items in `DashboardHeader.tsx`:

```tsx
<header className="sticky top-0 z-50 w-full bg-background/95">
  <div className="flex h-16 items-center justify-between gap-4 px-4">
    {/* Left side */}
    <div className="flex items-center gap-2">
      {/* ... existing */}
    </div>
    
    {/* Right side */}
    <div className="flex items-center gap-2">
      {/* Add custom components here */}
      <YourCustomButton />
      {/* ... existing */}
    </div>
  </div>
</header>
```

### Using Dashboard Utilities

```tsx
import { 
  generateBreadcrumbs,
  getPageTitle,
  formatRole,
  isRouteActive,
  getCurrentSection,
} from '@/lib/dashboard-utils';

// In a component
const breadcrumbs = generateBreadcrumbs('/staff/dashboard/users/123');
const title = getPageTitle(pathname);
const role = formatRole(userRole);
```

## 🐛 Debugging

### Check Sidebar Items
Open browser DevTools and run:
```javascript
console.log(localStorage.getItem('dashboard-sidebar-state'));
```

### Check User Role
```javascript
// In Redux DevTools, look at auth.data.role
```

### Check Breadcrumbs
Navigate to a page and check:
```javascript
console.log(window.location.pathname);
```

## 📚 Files to Know

- `src/lib/dashboard-config.ts` - Customize navigation, colors, sidebar width
- `src/lib/permissions.ts` - Define roles, pages, and permissions
- `src/lib/dashboard-utils.ts` - Utility functions (read-only, use as-is)
- `src/components/dashboard/sidebar/PremiumSidebar.tsx` - Sidebar component
- `src/components/dashboard/header/DashboardHeader.tsx` - Header component
- `src/hooks/use-sidebar-state.ts` - Sidebar state management

## ✅ Checklist

Getting the dashboard working:

- [x] Dashboard is already integrated
- [ ] Test different user roles
- [ ] Customize colors if needed
- [ ] Add custom navigation items
- [ ] Connect real notification API
- [ ] Implement global search
- [ ] Add custom pages
- [ ] Test on mobile devices
- [ ] Customize brand/logo

## 🎉 You're Ready!

The dashboard is fully functional and ready to use. Navigate through your app to see:

1. **Sidebar** - Left navigation that changes based on role
2. **Header** - Top bar with search, notifications, theme, user menu
3. **Breadcrumbs** - Auto-generated based on current URL
4. **Responsive** - Try resizing to see mobile drawer
5. **Theme** - Click theme toggle to switch modes

## 📖 Learn More

- `DASHBOARD_GUIDE.md` - Comprehensive documentation
- `DASHBOARD_IMPLEMENTATION.md` - Technical details
- Component files have inline JSDoc comments

## 🆘 Need Help?

Check the documentation files or look at component source code - everything is well-commented and organized.

---

**Ready to explore your new dashboard?** Navigate to `/staff/dashboard` and start using it!
