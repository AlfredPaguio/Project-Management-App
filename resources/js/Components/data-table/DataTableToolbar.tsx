import { priorities, statuses } from "@/constant";
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
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center justify-center w-fit">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[384px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
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
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}

export default DataTableToolbar;
