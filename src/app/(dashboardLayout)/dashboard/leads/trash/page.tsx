import type { Metadata } from "next";

import { LeadsTrashPageClient } from "@/components/dashboard/lead/leads-trash-page-client";

export const metadata: Metadata = {
  title: "Leads Trash | DotSkills Panel",
  description: "Restore or permanently delete soft-deleted leads.",
};

export default function LeadsTrashPage() {
  return (
    <div className="p-4 sm:p-6">
      <LeadsTrashPageClient />
    </div>
  );
}
