"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function ReportTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: "user", label: "Người dùng", path: "/moderator/manage-reports/user" },
    {
      id: "expert",
      label: "Chuyên gia",
      path: "/moderator/manage-reports/expert",
    },
    {
      id: "comment",
      label: "Bình luận",
      path: "/moderator/manage-reports/comment",
    },
    {
      id: "story",
      label: "Câu chuyện",
      path: "/moderator/manage-reports/story",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center rounded-lg bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => router.push(tab.path)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              pathname === tab.path
                ? "bg-backgroundChat text-muted-foreground shadow-sm"
                : "text-muted-foreground hover:bg-backgroundChat hover:text-primary"
            )}
          >
            <span className="text-muted-foreground">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
