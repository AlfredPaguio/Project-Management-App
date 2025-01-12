import { Badge } from "@/Components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Switch } from "@/Components/ui/switch";
import { Permission } from "@/types/user";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormDataType } from "../schema/formSchema";
import { Button } from "@/Components/ui/button";

type PermissionsSelectionProps = {
  permissions: Permission[];
  form: UseFormReturn<FormDataType>;
};

function PermissionsSelection({
  permissions,
  form,
}: PermissionsSelectionProps) {
  const [searchPermissions, setSearchPermissions] = useState("");

  const groupedPermissions = permissions.reduce((acc, permission) => {
    const group = permission.name.split(".")[0];
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const handleCheckAll = () => {
    const allPermissionIds = permissions.map((permission) => permission.id);
    form.setValue('permissions', allPermissionIds);
  };

  const handleUncheckAll = () => {
    // form.setValue("permissions", []);
    form.reset({ permissions: [] });
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <FormLabel className="text-base">Permissions</FormLabel>
        <FormDescription>
          Select the specific permissions for this user.
        </FormDescription>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <Search className="w-4 h-4 text-gray-500" />
        <Input
          placeholder="Search permissions..."
          value={searchPermissions}
          onChange={(e) => setSearchPermissions(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleCheckAll} type="button" variant="outline" size="sm">
          Check All
        </Button>
        <Button onClick={handleUncheckAll} type="button" variant="outline" size="sm">
          Uncheck All
        </Button>
      </div>
      <ScrollArea className="h-[400px] rounded-md border p-4">
        {Object.entries(groupedPermissions)
          .filter(([, groupPermissions]) => {
            return groupPermissions.some((permission) =>
              permission.name
                .toLowerCase()
                .includes(searchPermissions.toLowerCase())
            );
          })
          .map(([group, groupPermissions]) => (
            <Collapsible key={group} className="mb-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold capitalize">{group}</h3>
                <div aria-hidden="true" className="flex items-center space-x-2">
                  <Badge variant="secondary">{groupPermissions.length}</Badge>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="grid grid-cols-2 gap-4">
                  {groupPermissions
                    .filter((permission) =>
                      permission.name
                        .toLowerCase()
                        .includes(searchPermissions.toLowerCase())
                    )
                    .map((permission) => (
                      <FormField
                        key={permission.id}
                        control={form.control}
                        name="permissions"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={permission.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Switch
                                  checked={field.value?.includes(permission.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          permission.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== permission.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal capitalize hover:cursor-pointer w-full h-full items-center flex">
                                {permission.name
                                  .split(".")
                                  .slice(1)
                                  .join(" ")
                                  .replace(/-/g, " ")}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
      </ScrollArea>
      <FormMessage />
    </div>
  );
}

export default PermissionsSelection;
