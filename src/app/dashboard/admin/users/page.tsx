import { UsersPageClient } from "@/features/users";
import { DashboardLayout } from "@/components/dashboard";

export const metadata = {
  title: "Users Management | DotSkills Panel",
  description: "Manage team members and their permissions",
};

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UsersPageClient />
    </DashboardLayout>
  );
}
