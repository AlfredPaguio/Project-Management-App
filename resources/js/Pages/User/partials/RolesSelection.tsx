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
import { Role } from "@/types/user";
import { replaceQuotesAndDots } from "@/utils/replaceQuotesAndDots";
import { Search } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormDataType } from "../schema/formSchema";

interface RolesSelectionProps {
  form: UseFormReturn<FormDataType>;
  roles: Role[];
}

function RolesSelection({ form, roles }: RolesSelectionProps) {
  const [searchRoles, setSearchRoles] = useState("");

  // Filter roles based on search input
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchRoles.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <FormLabel className="text-base">Roles</FormLabel>
        <FormDescription>Select the roles for this user.</FormDescription>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <Search className="w-4 h-4 text-gray-500" />
        <Input
          placeholder="Search roles..."
          value={searchRoles}
          onChange={(e) => setSearchRoles(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredRoles.map((role) => (
            <FormField
              key={role.id}
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value?.includes(role.id)}
                      onCheckedChange={(checked) => {
                        field.onChange(
                          checked
                            ? [...(field.value || []), role.id]
                            : field.value?.filter((value) => value !== role.id)
                        );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal capitalize hover:cursor-pointer w-full h-full items-center flex">
                    {replaceQuotesAndDots(role.name)}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
      </ScrollArea>
      <FormMessage />
    </div>
  );
}

export default RolesSelection;
