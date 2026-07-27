export type Permission = string;

export function hasPermission(
  permissions: Permission[] | undefined,
  permission: Permission,
): boolean {
  if (!permissions?.length) return false;

  return permissions.includes(permission);
}

export function hasAnyPermission(
  permissions: Permission[] | undefined,
  requiredPermissions: Permission[],
): boolean {
  if (!permissions?.length) return false;

  return requiredPermissions.some((permission) =>
    permissions.includes(permission),
  );
}

export function hasAllPermissions(
  permissions: Permission[] | undefined,
  requiredPermissions: Permission[],
): boolean {
  if (!permissions?.length) return false;

  return requiredPermissions.every((permission) =>
    permissions.includes(permission),
  );
}

export function isSuperAdmin(role?: string): boolean {
  return role === "SUPER_ADMIN";
}

export function isAdmin(role?: string): boolean {
  return role === "ADMIN";
}

export function isManager(role?: string): boolean {
  return role === "MANAGER";
}

export function canAccess({
  role,
  permissions,
  allowedRoles,
  requiredPermissions,
}: {
  role?: string;
  permissions?: Permission[];
  allowedRoles?: string[];
  requiredPermissions?: Permission[];
}): boolean {
  if (role === "SUPER_ADMIN") {
    return true;
  }

  if (
    allowedRoles?.length &&
    role &&
    allowedRoles.includes(role)
  ) {
    return true;
  }

  if (
    requiredPermissions?.length &&
    permissions?.length
  ) {
    return hasAllPermissions(
      permissions,
      requiredPermissions,
    );
  }

  return false;
}

export function isOwner(
  ownerId?: string,
  currentUserId?: string,
): boolean {
  return (
    !!ownerId &&
    !!currentUserId &&
    ownerId === currentUserId
  );
}