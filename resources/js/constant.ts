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
    className: "bg-gray-300 text-gray-800",
  },
  {
    value: "pending",
    label: "Pending",
    icon: Circle,
    className: "bg-yellow-300 text-yellow-800",
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: CircleDashed,
    className: "bg-blue-300 text-blue-800",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CircleCheck,
    className: "bg-green-300 text-green-800",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: Ban,
    className: "bg-red-300 text-red-800",
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
    className: "bg-green-500 text-white",
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
    className: "bg-yellow-500 text-black",
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
    className: "bg-orange-500 text-white",
  },
  {
    label: "Highest",
    value: "highest",
    icon: ArrowUpToLine,
    className: "bg-red-500 text-white",
  },
];

export const MAX_IMAGE_SIZE = 4; //In MegaBytes
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
