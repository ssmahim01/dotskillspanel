export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },

  dashboard: {
    overview: ["dashboard", "overview"] as const,
  },

  users: {
    all: ["users"] as const,

    list: (params?: unknown) =>
      ["users", "list", params] as const,

    details: (id: string) =>
      ["users", id] as const,

    deleted: ["users", "deleted"] as const,
  },

  leads: {
    all: ["leads"] as const,

    list: (params?: unknown) =>
      ["leads", "list", params] as const,

    details: (id: string) =>
      ["leads", id] as const,

    deleted: ["leads", "deleted"] as const,
  },

  clients: {
    all: ["clients"] as const,

    list: (params?: unknown) =>
      ["clients", "list", params] as const,

    details: (id: string) =>
      ["clients", id] as const,
  },

  projects: {
    all: ["projects"] as const,

    list: (params?: unknown) =>
      ["projects", "list", params] as const,

    details: (id: string) =>
      ["projects", id] as const,
  },
};