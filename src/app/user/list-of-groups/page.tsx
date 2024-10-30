import ListOfGroups from "@/components/listOfGroups/listOfGroups";
import GroupSidebar from "@/components/listOfGroups/sidebarListOfGroups";
import React from "react";

export default function ListOfGroup() {
  return (
    <div className="flex">
      <div className="hidden  xl:block">
        <GroupSidebar />
      </div>
      <ListOfGroups />
    </div>
  );
}
