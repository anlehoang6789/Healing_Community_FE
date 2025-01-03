import CreateGroupDialog from "@/app/moderator/manage-groups/create-group";

import RequestGroup from "@/app/moderator/manage-groups/request-group";
import CrequestGroupDialog from "@/app/user/list-of-groups/request-group";
import ListOfGroups from "@/components/listOfGroups/listOfGroups";
import TableRequestedGroups from "@/components/listOfGroups/table-requested-group";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

export default function GroupTabsForUser() {
  return (
    <Tabs defaultValue="listGroup" className="space-y-4 mx-10 mt-4">
      <div className="flex items-center justify-between flex-wrap">
        <TabsList>
          <TabsTrigger value="listGroup">Danh sách nhóm</TabsTrigger>
          <TabsTrigger value="requestGroup">Yêu cầu</TabsTrigger>
        </TabsList>
        <div className="mt-4 min-[461px]:mt-0">
          <CrequestGroupDialog />
        </div>
      </div>
      <TabsContent value="listGroup">
        <ListOfGroups />
      </TabsContent>
      <TabsContent value="requestGroup" className="space-y-4">
        <TableRequestedGroups />
      </TabsContent>
    </Tabs>
  );
}
