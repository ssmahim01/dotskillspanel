"use client";

import { useState, useEffect, useCallback } from "react";

type SidebarState = "open" | "closed";

/**
 * Hook to manage sidebar open/closed state with localStorage persistence
 */
export function useSidebarState(
  defaultState: SidebarState = "open",
) {
  const [state, setState] = useState<SidebarState>(defaultState);
  const [isMounted, setIsMounted] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem(
      "dashboard-sidebar-state",
    ) as SidebarState | null;
    if (savedState) {
      setState(savedState);
    }
  }, []);

  // Save state to localStorage when it changes
  const setState_ = useCallback((newState: SidebarState) => {
    setState(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboard-sidebar-state", newState);
    }
  }, []);

  const toggle = useCallback(() => {
    setState_((prev) => (prev === "open" ? "closed" : "open"));
  }, [setState_]);

  const open = useCallback(() => {
    setState_("open");
  }, [setState_]);

  const close = useCallback(() => {
    setState_("closed");
  }, [setState_]);

  return {
    state,
    setState: setState_,
    toggle,
    open,
    close,
    isOpen: state === "open",
    isMounted,
  };
}
