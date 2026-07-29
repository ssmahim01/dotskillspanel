/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Briefcase,
  Eye,
  EyeOff,
  ImageIcon,
  Loader2,
  Shield,
  User as UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApiError } from "@/lib/axios";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user.types";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserInput,
  type UpdateUserInput,
} from "@/features/users/schemas/user.schema";
import {
  USER_DEPARTMENTS,
  USER_DESIGNATIONS,
  USER_ROLES,
} from "@/features/users/constants/user.constant";

interface UserFormProps {
  user?: User;
  isLoading?: boolean;
  onSubmit: (data: CreateUserInput | UpdateUserInput) => Promise<void>;
}

type FormValues = CreateUserInput | UpdateUserInput;

function getInitials(firstName?: string, lastName?: string) {
  return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-medium text-destructive">{message}</p>;
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof UserIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

const inputClassName =
  "h-11 rounded-xl border-border/80 bg-background/60 transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40";

export function UserForm({ user, isLoading, onSubmit }: UserFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const isEditMode = Boolean(user);

  const schema = isEditMode ? updateUserSchema : createUserSchema;

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isEditMode
      ? {
          firstName: user!.firstName,
          lastName: user!.lastName,
          phone: user!.phone,
          role: user!.role,
          designation: user!.designation,
          department: user!.department,
          address: user!.address,
          avatar: user!.avatar,
          bio: user!.bio,
        }
      : ({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          role: "STAFF",
          designation: "",
          department: "",
          address: "",
        } as CreateUserInput),
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const avatarUrl = watch("avatar" as never) as unknown as string | undefined;

  const initials = useMemo(
    () => getInitials(firstName, lastName) || "?",
    [firstName, lastName],
  );

  async function handleFormSubmit(data: FormValues) {
    setSubmitError(null);
    try {
      await onSubmit(data);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-8">
      {submitError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 p-3.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-sm text-destructive">{submitError}</p>
        </div>
      )}

      {/* Identity */}
      <section className="space-y-4">
        <SectionHeading
          icon={UserIcon}
          title="Identity"
          description="Basic information used across the panel."
        />

        <div className="flex items-center gap-4 rounded-xl border border-border/70 bg-muted/30 p-4">
          <Avatar className="h-14 w-14 ring-2 ring-primary/15">
            <AvatarImage src={avatarUrl || undefined} alt={`${firstName ?? ""} ${lastName ?? ""}`} />
            <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-1.5">
            <Label htmlFor="avatar" className="text-xs font-medium text-foreground">
              Avatar URL
            </Label>
            <div className="relative">
              <ImageIcon
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="avatar"
                placeholder="https://example.com/avatar.jpg"
                className={cn(inputClassName, "pl-9")}
                {...register("avatar" as never)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="John"
              className={inputClassName}
              aria-invalid={Boolean(errors.firstName)}
              {...register("firstName")}
            />
            <FieldError message={errors.firstName?.message as string | undefined} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              className={inputClassName}
              aria-invalid={Boolean(errors.lastName)}
              {...register("lastName")}
            />
            <FieldError message={errors.lastName?.message as string | undefined} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            className={inputClassName}
            aria-invalid={Boolean(errors.phone)}
            {...register("phone" as never)}
          />
          <FieldError message={errors.phone?.message as string | undefined} />
        </div>
      </section>

      {/* Account & access — create mode only */}
      {!isEditMode && (
        <section className="space-y-4">
          <SectionHeading
            icon={Shield}
            title="Account & access"
            description="Login credentials for the new user."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={inputClassName}
                aria-invalid={Boolean((errors as Record<string, { message?: string }>).email)}
                {...register("email" as never)}
              />
              <FieldError
                message={(errors as Record<string, { message?: string }>).email?.message}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={cn(inputClassName, "pr-10")}
                  aria-invalid={Boolean((errors as Record<string, { message?: string }>).password)}
                  {...register("password" as never)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              <FieldError
                message={(errors as Record<string, { message?: string }>).password?.message}
              />
            </div>
          </div>
        </section>
      )}

      {/* Role & work details */}
      <section className="space-y-4">
        <SectionHeading
          icon={Briefcase}
          title="Role & work details"
          description="Controls permissions and where this user shows up in the org."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={cn(inputClassName, "w-full")}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {USER_ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.role?.message as string | undefined} />
          </div>

          <div className="space-y-1.5">
            <Label>Department</Label>
            <Controller
              control={control}
              name={"department" as never}
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger className={cn(inputClassName, "w-full")}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {USER_DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Designation</Label>
            <Controller
              control={control}
              name={"designation" as never}
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger className={cn(inputClassName, "w-full")}>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {USER_DESIGNATIONS.map((designation) => (
                      <SelectItem key={designation} value={designation}>
                        {designation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Main St, City, State"
              className={inputClassName}
              {...register("address" as never)}
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3 border-t border-border/60 pt-6">
        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 gap-2 rounded-xl px-6 font-medium shadow-[0_1px_2px_rgba(79,70,229,0.1),0_8px_20px_-8px_rgba(79,70,229,0.5)] disabled:pointer-events-none disabled:opacity-70"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {isEditMode ? "Update user" : "Create user"}
        </Button>
      </div>
    </form>
  );
}