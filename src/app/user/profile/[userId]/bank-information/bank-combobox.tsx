"use-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { GetBankNameListResType } from "@/schemaValidations/account.schema";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface BankComboboxProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export default function BankCombobox({
  id,
  value,
  onChange,
}: BankComboboxProps) {
  const [open, setOpen] = useState(false);
  const [banks, setBanks] = useState<GetBankNameListResType>();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("https://api.viqr.net/list-banks/");
        if (!response.ok) {
          throw new Error("Failed to fetch banks");
        }
        const data = await response.json();
        setBanks(data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  const bankList = banks?.data || [];

  return (
    <Popover open={open} onOpenChange={setOpen} aria-hidden={false}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          id={id}
          role="combobox"
          aria-expanded={open}
          variant={"outline"}
          className="w-full justify-between"
        >
          {value
            ? bankList.find((bank) => bank.shortName === value)?.shortName ||
              "Chọn ngân hàng..."
            : "Chọn ngân hàng..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{
          width: triggerRef.current?.offsetWidth || "auto",
        }}
      >
        <Command className="w-full">
          <CommandList>
            <CommandGroup>
              {bankList.map((bankItem) => (
                <CommandItem
                  key={bankItem.id}
                  value={bankItem.shortName}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="flex items-center space-x-4"
                >
                  <Avatar className="h-10 w-10 border-2 border-rose-300 mr-4">
                    <AvatarImage
                      src={bankItem.logo}
                      alt={bankItem.shortName || bankItem.name}
                    />
                    <AvatarFallback>
                      {bankItem.shortName || bankItem.name}
                    </AvatarFallback>
                  </Avatar>
                  <span>{bankItem.shortName || bankItem.name}</span>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === bankItem.shortName ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
