"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { TaskDataType } from "@/types/task";
import { getStatusLabel } from "@/utils/getStatusLabel";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";

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
    header: "ID",
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
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusLabel = String(row.getValue("status"));
      const formatted = getStatusLabel(statusLabel);

      return <Badge className="text-nowrap">{formatted}</Badge>;
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
        <div className="flex items-center justify-center">
          <Button asChild>
            <Link href={route("task.edit", task.id)}>
              Edit
              <Pencil className="ml-2 size-4" />
            </Link>
          </Button>
          <AlertDialog>
            <Button variant="destructive" asChild>
              <AlertDialogTrigger>
                Delete <Trash2 className="ml-2 size-4" />
              </AlertDialogTrigger>
            </Button>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="whitespace-pre-line">
                  {`Are you sure you want to delete "${task.name}?"
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Link
                    href={route("task.destroy", task.id)}
                    method="delete"
                    as="button"
                    type="button"
                  >
                    Continue
                  </Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
