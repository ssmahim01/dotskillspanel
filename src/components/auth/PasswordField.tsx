"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PasswordFieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
  error?: string;
  labelSlot?: React.ReactNode;
}

export function PasswordField({
  id,
  label = "Password",
  placeholder = "Enter your password",
  autoComplete = "current-password",
  disabled = false,
  registration,
  error,
  labelSlot,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </Label>

        {labelSlot}
      </div>

      <div className="relative">
        <Lock
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />

        <Input
          id={id}
          {...registration}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={cn(
            "h-11 rounded-xl pl-10 pr-10",
            error && "border-destructive focus-visible:ring-destructive",
          )}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
