import GroupTabsForUser from "@/app/user/list-of-groups/group-tabs-for-user";

import GroupSidebar from "@/components/listOfGroups/sidebarListOfGroups";
import React from "react";

export default function ListOfGroup() {
  return (
    <div className=" flex  ">
      <div className="hidden xl:block">
        <GroupSidebar />
      </div>
      <div className="w-full">
        <GroupTabsForUser />
      </div>
    </div>
  );
}
