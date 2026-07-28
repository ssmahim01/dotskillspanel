"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { DashboardLayout } from "./layout/DashboardLayout";
import { useSidebar } from "@/components/ui/sidebar";

export const DashboardContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { setOpen } = useSidebar();
  const autoClosedRef = useRef(false);

  // Auto-close sidebar on POS page
  useEffect(() => {
    if (pathname === "/staff/dashboard/pos") {
      if (!autoClosedRef.current) {
        setOpen(false);
        autoClosedRef.current = true;
      }
    } else {
      autoClosedRef.current = false;
    }
  }, [pathname, setOpen]);

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};
