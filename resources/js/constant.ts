export enum Status_Enum {
  Completed = "completed",
  InProgress = "in_progress",
  Pending = "pending",
  Unknown = "unknown_status"
}

export const STATUS = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  unknown_status: "Unknown Status"
} as const;
