"use-client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CategoryValues } from "@/constants/category.type";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";

interface CategoryComboboxProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryCombobox({
  id,
  value,
  onChange,
}: CategoryComboboxProps) {
  const [open, setOpen] = React.useState(false);
  //   const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[180px] justify-between bg-gray-100 text-black hover:bg-[#F7F7F7]"
        >
          {value
            ? CategoryValues.find((career) => career === value)
            : "Chọn thể loại..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Chọn thể loại..." />
          <CommandList>
            <CommandEmpty>Không tìm thấy thể lọai bạn nhập.</CommandEmpty>
            <CommandGroup>
              {CategoryValues.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
