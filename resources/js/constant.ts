export enum Status_Enum {
  Completed = "completed",
  InProgress = "in_progress",
  Pending = "pending",
  Cancelled = "cancelled",
  Unknown = "unknown_status",
}

export const STATUS = {
  completed: "Completed",
  in_progress: "In Progress",
  pending: "Pending",
  cancelled: "Cancelled",
  unknown_status: "Unknown Status",
} as const;
