import ListOfGroupsForModerator from "@/components/listOfGroups/listOfGroupsForModerator";
import React, { Suspense } from "react";

export default function ListOfGroups() {
  return (
    <div>
      <Suspense>
        <ListOfGroupsForModerator />
      </Suspense>
    </div>
  );
}
