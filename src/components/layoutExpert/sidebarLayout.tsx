"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import sidebarItems from "@/components/layoutExpert/sidebarItems";
import { cn } from "@/lib/utils";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

export default function SidebarLayout() {
  const pathname = usePathname();

  return (
    <div>
      <aside className="w-14 flex-col justify-center h-full border-r text-muted-foreground sm:flex hidden">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          {sidebarItems.map((Item, index) => {
            const isActive = pathname === Item.href;
            return (
              <AnimatedTooltip
                key={index}
                content={Item.title}
                position="right"
              >
                <Link
                  href={Item.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                    {
                      "bg-accent text-accent-foreground": isActive,
                      "text-muted-foreground": !isActive,
                    }
                  )}
                >
                  <Item.Icon className="h-5 w-5" />
                  <span className="sr-only">{Item.title}</span>
                </Link>
              </AnimatedTooltip>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
