import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { FormControl } from "./ui/form";

interface Option {
  label: string;
  value: string;
}

interface ComboBoxProps {
  value: string | null;
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
  withFormControl?: boolean;
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  value,
  options,
  onSelect,
  placeholder = "Select an option",
  withFormControl = false,
}) => {
  const buttonContent = (
    <Button
      variant="outline"
      role="combobox"
      className={cn(
        "w-[200px] justify-between",
        !value && "text-muted-foreground"
      )}
    >
      {value
        ? options.find((option) => option.value === value)?.label
        : placeholder}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        {withFormControl ? (
          <FormControl>{buttonContent}</FormControl>
        ) : (
          buttonContent
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => onSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
