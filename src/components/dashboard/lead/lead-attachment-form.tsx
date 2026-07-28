/* eslint-disable react-hooks/incompatible-library */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Paperclip } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ATTACHMENT_TYPE_OPTIONS } from "@/features/leads/constants/lead.constant";
import { useLeadMutations } from "@/features/leads/hooks";
import {
  addAttachmentSchema,
  type AddAttachmentValues,
} from "@/features/leads/schemas/lead.schema";

interface LeadAttachmentFormProps {
  leadId: string;
}

export function LeadAttachmentForm({ leadId }: LeadAttachmentFormProps) {
  const { addAttachment } = useLeadMutations();

  const form = useForm<AddAttachmentValues>({
    resolver: zodResolver(addAttachmentSchema),
    defaultValues: { title: "", url: "", type: undefined },
  });

  const onSubmit = form.handleSubmit((values) => {
    addAttachment.mutate(
      { id: leadId, payload: values },
      {
        onSuccess: () => {
          form.reset();
          toast.success("Attachment added.");
        },
        onError: () => toast.error("Failed to add attachment."),
      },
    );
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 rounded-lg border p-3">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Input placeholder="Title (e.g. requirements.pdf)" {...form.register("title")} />
        <Select
          value={form.watch("type")}
          onValueChange={(value) =>
            form.setValue("type", value as AddAttachmentValues["type"])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {ATTACHMENT_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Input placeholder="File URL" {...form.register("url")} />
      {(form.formState.errors.title || form.formState.errors.url) && (
        <span className="text-xs text-destructive">
          {form.formState.errors.title?.message ?? form.formState.errors.url?.message}
        </span>
      )}
      <Button
        type="submit"
        size="sm"
        className="self-end"
        disabled={addAttachment.isPending}
      >
        {addAttachment.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Paperclip className="h-4 w-4" />
        )}
        Add Attachment
      </Button>
    </form>
  );
}
