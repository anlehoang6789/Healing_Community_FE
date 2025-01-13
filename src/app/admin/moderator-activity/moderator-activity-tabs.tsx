"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function AdminModeratorActivityTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      id: "expert",
      label: "Chuyên gia",
      path: "/admin/moderator-activity/moderator-report-expert-activity",
    },
    {
      id: "comment",
      label: "Bình luận",
      path: "/admin/moderator-activity/moderator-report-comment-activity",
    },
    {
      id: "story",
      label: "Câu chuyện",
      path: "/admin/moderator-activity/moderator-report-post-activity",
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
