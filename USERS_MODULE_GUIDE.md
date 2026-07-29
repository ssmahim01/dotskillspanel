# Users Management Module - Complete Implementation Guide

## Overview

A production-ready Users Management module built following the DotSkills Panel enterprise architecture. Features include comprehensive user management, role-based access control, advanced filtering, dual view modes (table and grid), and full CRUD operations.

## Architecture

### Feature-First Structure

```
src/features/users/
├── api/
│   ├── user.api.ts          # API endpoints and HTTP calls
│   └── user.keys.ts         # TanStack Query key factory
├── hooks/
│   ├── useUsers.ts          # Data fetching hooks
│   ├── useUserMutations.ts  # Create/update/delete operations
│   ├── use-user-filters.ts  # Filter state management
│   ├── useUserStats.ts      # Statistics calculations
│   └── index.ts             # Barrel export
├── components/
│   ├── table/
│   │   ├── user-table-columns.tsx
│   │   └── users-table.tsx
│   ├── grid/
│   │   └── user-grid-view.tsx
│   ├── filters/
│   │   └── user-filters.tsx
│   ├── cards/
│   │   └── user-stats-cards.tsx
│   ├── forms/
│   │   └── user-form.tsx
│   └── dialogs/
│       └── user-dialogs.tsx
├── schemas/
│   └── user.schema.ts       # Zod validation schemas
├── constants/
│   └── user.constant.ts     # Roles, statuses, departments
├── utils/
│   └── user.utils.ts        # Helper functions
├── UsersPageClient.tsx      # Main page component
└── index.ts                 # Feature exports
```

## Core Features

### 1. User Management Operations

#### Fetch Users
```typescript
import { useUsers } from "@/features/users";

const { data, isLoading, error } = useUsers({
  page: 1,
  limit: 10,
  search: "john",
  role: "ADMIN",
  status: "ACTIVE"
});
```

#### Create User
```typescript
import { useCreateUser } from "@/features/users";

const createMutation = useCreateUser();
await createMutation.mutateAsync({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "secure123",
  role: "MANAGER",
  department: "Engineering"
});
```

#### Update User
```typescript
import { useUpdateUser } from "@/features/users";

const updateMutation = useUpdateUser(userId);
await updateMutation.mutateAsync({
  firstName: "Jane",
  role: "ADMIN"
});
```

### 2. Filtering & Search

Advanced filtering with 7 searchable fields:
- firstName, lastName, email, phone, designation, department, address

Filterable by 5 dimensions:
- role, status, department, designation, isVerified

```typescript
import { useUserFilters } from "@/features/users";

const {
  filters,
  setSearch,
  setRole,
  setStatus,
  setDepartment,
  clearFilters,
  getQueryParams
} = useUserFilters();

// Get params for API call
const params = getQueryParams();
```

### 3. View Modes

#### Table View
- Column visibility toggle
- Sorting (ascending/descending/clear)
- Row selection with checkbox
- Action menu per row
- Server-side pagination
- Loading skeletons

#### Grid View
- Card-based layout
- Responsive design (1, 2, 3 columns)
- Quick info cards
- Hover animations with Tailwind
- Same filtering and pagination

### 4. User Form (Reusable)

Single component for both create and edit operations:

```typescript
import { UserForm } from "@/features/users/components/forms/user-form";

<UserForm
  user={editingUser}  // undefined = create mode
  onSubmit={handleSubmit}
  isLoading={isLoading}
/>
```

Features:
- Dynamic validation based on mode (create vs edit)
- Password field only in create mode
- Email field only in create mode
- Role, department, and designation dropdowns
- Address and avatar URL inputs

### 5. Dialogs & Actions

#### Create User Dialog
```typescript
<CreateUserDialog
  open={open}
  onOpenChange={setOpen}
  onSubmit={handleCreate}
  isLoading={isLoading}
/>
```

#### Update User Dialog
```typescript
<UpdateUserDialog
  open={open}
  onOpenChange={setOpen}
  user={selectedUser}
  onSubmit={handleUpdate}
  isLoading={isLoading}
/>
```

#### Delete Confirmation
```typescript
<DeleteUserDialog
  open={open}
  onOpenChange={setOpen}
  user={selectedUser}
  onConfirm={handleDelete}
  isLoading={isLoading}
/>
```

#### Status Change
```typescript
<StatusChangeDialog
  open={open}
  onOpenChange={setOpen}
  user={selectedUser}
  currentStatus={selectedUser?.status}
  onStatusChange={handleStatusChange}
  isLoading={isLoading}
/>
```

### 6. Statistics

Calculate and display user statistics:

```typescript
import { useUserStats } from "@/features/users";

const stats = useUserStats(users);
// Returns: {
//   total: 50,
//   active: 45,
//   inactive: 3,
//   suspended: 2,
//   verified: 48,
//   unverified: 2,
//   roleDistribution: { ADMIN: 5, ... },
//   departmentDistribution: { Engineering: 15, ... }
// }
```

## Data Types

### User
```typescript
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: Role;  // SUPER_ADMIN | ADMIN | MANAGER | DEVELOPER | DESIGNER | MARKETER | STAFF
  status: UserStatus;  // ACTIVE | INACTIVE | SUSPENDED
  department?: string;
  designation?: string;
  isVerified: boolean;
  permissions: string[];
  lastLogin?: string;
  passwordChangedAt?: string;
  createdAt: string;
  updatedAt: string;
}
```

## Styling & Design

### Color System

**Roles:**
- SUPER_ADMIN: Red
- ADMIN: Purple
- MANAGER: Blue
- DEVELOPER: Green
- DESIGNER: Pink
- MARKETER: Yellow
- STAFF: Gray

**Statuses:**
- ACTIVE: Green
- INACTIVE: Yellow
- SUSPENDED: Red

### Animations

Pure Tailwind CSS transitions:
- Hover: `transition-all duration-200 hover:scale-[1.02]`
- Active: `active:scale-[0.98]`
- Smooth shadows on card hover
- Loading skeletons with pulse animation

## Integration Points

### Connect to Sidebar Navigation
```typescript
// Add to navigation config in src/lib/dashboard-config.ts
{
  id: "users",
  label: "Users",
  icon: Users,
  href: "/dashboard/admin/users",
  roles: ["SUPER_ADMIN", "ADMIN"]
}
```

### Route Protection
```typescript
// src/app/dashboard/admin/users/page.tsx
// Wrap with auth guard or role check middleware
```

## API Contract

### Get Users
```
GET /users?page=1&limit=10&search=term&role=ADMIN&status=ACTIVE
Response: { success: true, data: User[], meta: { page, limit, total, totalPage } }
```

### Create User
```
POST /users/create
Payload: { firstName, lastName, email, password, role, ... }
Response: { success: true, data: User }
```

### Update User
```
PATCH /users/{id}
Payload: { firstName?, role?, ... }
Response: { success: true, data: User }
```

### Delete User
```
DELETE /users/{id}
Response: { success: true, data: { _id } }
```

### Update Status
```
PATCH /users/{id}/status
Payload: { status: "ACTIVE" | "INACTIVE" | "SUSPENDED" }
Response: { success: true, data: User }
```

### Bulk Operations
```
PATCH /users/bulk/status
PATCH /users/bulk/delete
```

## Performance Optimizations

1. **Memoization**: useMemo for table columns and statistics
2. **Pagination**: Server-side pagination (limit 10 per page default)
3. **Caching**: TanStack Query with 5-minute stale time
4. **Lazy Loading**: Skeleton states during data fetch
5. **Optimistic Updates**: Immediate UI updates before server response
6. **Debouncing**: Search input with debounce
7. **Code Splitting**: Feature bundled separately

## Accessibility Features

- ARIA labels on all interactive elements
- Keyboard navigation for tables and dialogs
- Focus management in modals
- Semantic HTML structure
- Color contrast compliance (WCAG AA)
- Screen reader friendly
- Form validation messages

## Error Handling

```typescript
try {
  await createUserMutation.mutateAsync(data);
  toast.success("User created successfully");
} catch (error) {
  toast.error(error.response?.data?.message || "Failed to create user");
}
```

## Customization

### Add New Filter
1. Add to `USER_FILTERABLE_FIELDS` in `constants/user.constant.ts`
2. Update `UserFiltersState` in `use-user-filters.ts`
3. Add filter UI component in `UserFilters`

### Add New User Field
1. Update `User` interface in `types/user.types.ts`
2. Add to validation schema in `schemas/user.schema.ts`
3. Add form field in `UserForm`
4. Add table column in `user-table-columns.tsx`

### Change Role Colors
Edit the `getRoleColor()` function in `constants/user.constant.ts`

## Testing

Key areas to test:
- User creation with validation
- Edit user and verify updates
- Delete confirmation and removal
- Filter combinations (search + role + status)
- Pagination and page navigation
- Table/grid view switching
- Column visibility toggle
- Status change dialog
- Bulk actions
- Error states and retry

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 5+

## Security Considerations

1. **Authentication**: Verify user is logged in
2. **Authorization**: Check user role before operations
3. **CSRF Protection**: Handled by API client
4. **Input Validation**: Zod schemas on client and server
5. **XSS Prevention**: React/shadcn/ui escaping
6. **SQL Injection**: Parameterized queries on backend

## Related Files

- Dashboard Layout: `/src/components/dashboard/layout/DashboardLayout.tsx`
- Header: `/src/components/dashboard/header/DashboardHeader.tsx`
- Sidebar: `/src/components/dashboard/sidebar/PremiumSidebar.tsx`
- UI Components: `/src/components/ui/`

## Support & Issues

For issues or questions:
1. Check console for error messages
2. Verify API endpoint connectivity
3. Check user permissions for operation
4. Review browser console for client errors
5. Inspect network tab for API responses
