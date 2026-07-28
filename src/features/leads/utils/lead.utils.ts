import { LeadPriority, LeadSource, LeadStatus } from "@/types/lead";

export const getLeadStatusColor = (status: LeadStatus) => {
  switch (status) {
    case LeadStatus.NEW:
      return "secondary";
    case LeadStatus.CONTACTED:
      return "default";
    case LeadStatus.QUALIFIED:
      return "info";
    case LeadStatus.PROPOSAL_SENT:
      return "warning";
    case LeadStatus.NEGOTIATION:
      return "warning";
    case LeadStatus.ON_HOLD:
      return "secondary";
    case LeadStatus.WON:
      return "success";
    case LeadStatus.LOST:
      return "destructive";
    default:
      return "secondary";
  }
};

export const getPriorityColor = (priority: LeadPriority) => {
  switch (priority) {
    case LeadPriority.LOW:
      return "secondary";
    case LeadPriority.MEDIUM:
      return "default";
    case LeadPriority.HIGH:
      return "warning";
    case LeadPriority.URGENT:
      return "destructive";
    default:
      return "secondary";
  }
};

export const formatLeadSource = (source: LeadSource) => {
  return source.replaceAll("_", " ");
};

export const getLeadFullName = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => `${firstName} ${lastName}`;

export const formatCurrency = (value?: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value ?? 0);
};

export const buildLeadQuery = (filters: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
};

export const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();

export const formatDate = (date?: string | Date | null, locale = "en-US") => {
  if (!date) return "-";

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  }).format(new Date(date));
};

export const formatDateTime = (
  date?: string | Date | null,
  locale = "en-US",
) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

export const canConvertLead = (lead: {
  isConverted: boolean;
  status: LeadStatus;
}) =>
  !lead.isConverted &&
  lead.status !== LeadStatus.LOST &&
  lead.status !== LeadStatus.ON_HOLD;

export const getAttachmentExtension = (url: string) =>
  url.split(".").pop()?.toLowerCase() ?? "";

export const isImageUrl = (url: string) =>
  ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(
    getAttachmentExtension(url),
  );
