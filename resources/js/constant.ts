import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  Ban,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleHelp,
  ArrowUpToLine,
} from "lucide-react";

export const statuses = [
  {
    value: "unknown_status",
    label: "Unknown Status",
    icon: CircleHelp,
  },
  {
    value: "pending",
    label: "Pending",
    icon: Circle,
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: CircleDashed,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CircleCheck,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: Ban,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
  {
    label: "Highest",
    value: "highest",
    icon: ArrowUpToLine,
  },
];
