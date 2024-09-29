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
import { ArrowUpDown } from "lucide-react";

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
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
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
  },
  {
    accessorKey: "image_path",
    header: "Image",
    cell: ({ row }) => {
      const image_path = String(row.getValue("image_path"));

      return <img src={image_path} className="w-60" loading="lazy" />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const task = row.original;
      return (
        <div className="flex items-center justify-center">
          <Button variant={"link"} asChild>
            <Link href={route("task.show", task.id)}>{task.name}</Link>
          </Button>
        </div>
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
        <div className="text-center">
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
