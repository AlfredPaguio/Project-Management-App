"use client";

import { DataTableRowActions } from "@/Components/data-table/DataTableRowActions";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { priorities, statuses } from "@/constant";
import { TaskDataType } from "@/types/task";
import { cn } from "@/utils/cn";
import { getLabel } from "@/utils/getLabel";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CalendarIcon } from "lucide-react";

export const columns: ColumnDef<TaskDataType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center flex-col">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-[40px] text-center">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "image_path",
    header: "Image",
    cell: ({ row }) => {
      //similar to what I did to Project's column
      const imagePaths = row.getValue("image_path") as string[];
      const firstImage = imagePaths?.[0];

      return firstImage ? (
        <img
          src={firstImage}
          className="w-16 h-16 object-cover rounded-md"
          loading="lazy"
          alt="Project Image"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
          No image
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const task = row.original;
      return (
        <Button variant="link" asChild className="text-left font-medium">
          <Link href={route("task.show", task.id)}>{task.name}</Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusLabel = String(row.getValue("status"));
      const { label, className } = getLabel({
        value: statusLabel,
        options: statuses,
      });

      return <Badge className={cn("text-nowrap", className)}>{label}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priorityLabel = String(row.getValue("priority"));
      const { label, className } = getLabel({
        value: priorityLabel,
        options: priorities,
      });

      return <Badge className={cn("text-nowrap", className)}>{label}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creation Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formattedDate = new Intl.DateTimeFormat(undefined).format(date);

      return (
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <time dateTime={formattedDate}>{formattedDate}</time>
        </div>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("due_date"));
      const formattedDate = new Intl.DateTimeFormat(undefined).format(date);

      return (
        <div className="text-center">
          <time dateTime={formattedDate}>{formattedDate}</time>
        </div>
      );
    },
  },
  {
    accessorKey: "createdBy.name",
    header: "Created By",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DataTableRowActions
          name={task.name}
          editRoute={route("task.edit", task.id)}
          deleteRoute={route("task.destroy", task.id)}
        />
      );
    },
  },
];
