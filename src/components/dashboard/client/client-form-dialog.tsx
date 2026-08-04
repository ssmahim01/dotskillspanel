/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientSchema } from "@/features/clients/schemas/client.schema";
import { CLIENT_TYPE_OPTIONS } from "@/features/clients/constants/client.constant";
import type { IClient } from "@/types/clients";
import type { CreateClientValues } from "@/features/clients/schemas/client.schema";
import { Loader } from "lucide-react";

interface ClientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client?: IClient;
  onSubmit: (data: CreateClientValues) => Promise<void>;
  isSubmitting?: boolean;
}

export function ClientFormDialog({
  open,
  onOpenChange,
  client,
  onSubmit,
  isSubmitting,
}: ClientFormDialogProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateClientValues>({
    resolver: zodResolver(createClientSchema as any),
    defaultValues: client
      ? {
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.leadId?.email || "",
          phone: client.leadId?.phone || "",
          companyName: client.companyName,
          clientType: client.clientType,
          industry: client.industry,
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          companyName: "",
          industry: "",
        },
  });

  const watchedClientType = watch("clientType");

  const handleFormSubmit = async (data: CreateClientValues) => {
    await onSubmit(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) reset();
        onOpenChange(v);
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {client ? "Edit Client" : "Create New Client"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="client-firstName">First Name</Label>
              <Input
                id="client-firstName"
                placeholder="John"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="client-lastName">Last Name</Label>
              <Input
                id="client-lastName"
                placeholder="Doe"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="client-email">Email</Label>
              <Input
                id="client-email"
                placeholder="john@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="client-phone">Phone</Label>
              <Input
                id="client-phone"
                placeholder="+1 (555) 000-0000"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="client-companyName">Company Name</Label>
              <Input
                id="client-companyName"
                placeholder="Your Company"
                {...register("companyName")}
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Client Type</Label>
              <Select
                value={watchedClientType}
                onValueChange={(v) =>
                  setValue("clientType", v as CreateClientValues["clientType"], {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {CLIENT_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.clientType && (
                <p className="text-sm text-destructive">
                  {errors.clientType.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="client-industry">Industry</Label>
              <Input
                id="client-industry"
                placeholder="Technology"
                {...register("industry")}
              />
              {errors.industry && (
                <p className="text-sm text-destructive">
                  {errors.industry.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              {client ? "Update Client" : "Create Client"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}