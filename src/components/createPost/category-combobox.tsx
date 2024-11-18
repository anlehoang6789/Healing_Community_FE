"use-client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetAllCategoryQuery } from "@/queries/usePost";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";

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
  const [open, setOpen] = useState(false);
  const { data } = useGetAllCategoryQuery();
  const categoryList = data?.payload.data || [];

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
            ? categoryList.find((category) => category.categoryId === value)
                ?.name || "Chọn thể loại..."
            : "Chọn thể loại..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {categoryList.map((category) => (
                <CommandItem
                  key={category.categoryId}
                  value={category.categoryId}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.categoryId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
