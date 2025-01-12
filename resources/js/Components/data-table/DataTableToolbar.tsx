import { priorities, roles, statuses } from "@/constant";
import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DataTableFacetedFilter from "./DataTableFacetedFilter";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between pt-4">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-full"
            aria-label="Filter name"
          />
          {table.getAllColumns().find((x) => x.id === "name") && (
            <Button
              variant="ghost"
              onClick={() => table.getColumn("name")?.setFilterValue(null)}
              className="absolute right-0 top-0 h-8 px-2"
              aria-label="Clear filter"
            >
              <XIcon className="size-4" />
            </Button>
          )}
        </div>
        {/* {table.getColumn("status") && ( */}
        {table.getAllColumns().find((x) => x.id === "status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {/* {table.getColumn("priority") && ( */}
        {table.getAllColumns().find((x) => x.id === "priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {table.getAllColumns().find((x) => x.id === "roles") && (
          <DataTableFacetedFilter
            column={table.getColumn("roles")}
            title="Roles"
            options={roles}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 size-4" />
          </Button>
        )}
        {/* <Select
          onValueChange={(value) =>
            table.getColumn("status")?.setFilterValue(value)
          }
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {Array.from(
                table
                  .getColumn("status")
                  ?.getFacetedUniqueValues()
                  ?.entries() || []
              ).map(([key, _]) => (
                <SelectItem key={key} value={key}>
                  {getStatusLabel(key)}
                </SelectItem>
              ))}
              <SelectSeparator />
              <Button
                className="w-full px-2 gap-x-2 flex items-center justify-center"
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  table.getColumn("status")?.setFilterValue(undefined);
                }}
              >
                <Trash className="size-4" />
                Clear Selection
              </Button>
            </SelectGroup>
          </SelectContent>
        </Select> */}
      </div>
      <div className="text-sm text-muted-foreground">
        <DataTableViewOptions table={table} />
        {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected. */}
      </div>
    </div>
  );
}

export default DataTableToolbar;
