import GroupTabs from "@/app/moderator/manage-groups/group-tabs";
import React from "react";

export default function ManageGroups() {
  return (
    <div className="text-muted-foreground p-4 min-h-screen">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Quản lý nhóm</h1>
      </div>
      <GroupTabs />
    </div>
  );
}
