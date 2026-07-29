import { z } from "zod";
import { Role, UserStatus } from "@/types/user.types";

export const createUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum([
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.MANAGER,
    Role.DEVELOPER,
    Role.DESIGNER,
    Role.MARKETER,
    Role.STAFF,
  ]),
  designation: z.string().optional(),
  department: z.string().optional(),
  address: z.string().optional(),
  avatar: z.string().optional(),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").optional(),
  phone: z.string().optional(),
  role: z
    .enum([
      Role.SUPER_ADMIN,
      Role.ADMIN,
      Role.MANAGER,
      Role.DEVELOPER,
      Role.DESIGNER,
      Role.MARKETER,
      Role.STAFF,
    ])
    .optional(),
  designation: z.string().optional(),
  department: z.string().optional(),
  address: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
});

export const updateUserStatusSchema = z.object({
  status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.SUSPENDED]),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;
