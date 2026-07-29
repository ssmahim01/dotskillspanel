import { DashboardOverviewClient } from "@/features/dashboard";

export const metadata = {
  title: "Dashboard Overview | DotSkills Panel",
  description: "View your platform's key metrics and activities",
};

export default function DashboardOverviewPage() {
  return <DashboardOverviewClient />;
}
