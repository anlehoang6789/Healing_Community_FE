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
import { CareerValues } from "@/constants/career.type";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";

interface CareerComboboxProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export default function CareerCombobox({
  id,
  value,
  onChange,
}: CareerComboboxProps) {
  const [open, setOpen] = React.useState(false);
  //   const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[180px] justify-between bg-white text-black hover:bg-[#F7F7F7]"
        >
          {value
            ? CareerValues.find((career) => career === value)
            : "Chọn nghề nghiệp..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Chọn nghề nghiệp..." />
          <CommandList>
            <CommandEmpty>Không tìm thấy nghề nghiệp.</CommandEmpty>
            <CommandGroup>
              {CareerValues.map((career) => (
                <CommandItem
                  key={career}
                  value={career}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === career ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {career}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
