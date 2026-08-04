"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { assignClientManagerSchema } from "@/features/clients/schemas/client.schema";
import type { AssignClientManagerValues } from "@/features/clients/schemas/client.schema";
import { Loader } from "lucide-react";

interface ClientAssignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  managers: Array<{ _id: string; firstName: string; lastName: string }>;
  onSubmit: (data: AssignClientManagerValues) => Promise<void>;
  isSubmitting?: boolean;
  currentManager?: string;
}

export function ClientAssignDialog({
  open,
  onOpenChange,
  managers,
  onSubmit,
  isSubmitting,
  currentManager,
}: ClientAssignDialogProps) {
  const form = useForm<AssignClientManagerValues>({
    resolver: zodResolver(assignClientManagerSchema),
    defaultValues: {
      accountManager: currentManager || "",
    },
  });

  const handleSubmit = async (data: AssignClientManagerValues) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Manager</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="accountManager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Manager</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a manager" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {managers.map((manager) => (
                        <SelectItem key={manager._id} value={manager._id}>
                          {manager.firstName} {manager.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                Assign Manager
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
