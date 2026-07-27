export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  DEVELOPER = "DEVELOPER",
  DESIGNER = "DESIGNER",
  MARKETER = "MARKETER",
  STAFF = "STAFF",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export interface User {
  _id: string;

  firstName: string;
  lastName: string;
  fullName: string;

  email: string;

  phone?: string;

  avatar?: string;

  address?: string;

  bio?: string;

  role: Role;

  designation?: string;

  department?: string;

  joiningDate?: string;

  reportingManager?: string;

  isVerified: boolean;

  status: UserStatus;

  permissions: string[];

  createdBy?: string;

  updatedBy?: string;

  deletedBy?: string;

  deletedAt?: string;

  isDeleted: boolean;

  lastLogin?: string;

  passwordChangedAt?: string;

  createdAt: string;

  updatedAt: string;
}