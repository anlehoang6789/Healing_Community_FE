import ListOfGroups from "@/app/moderator/manage-groups/list-of-groups";
import RequestGroup from "@/app/moderator/manage-groups/request-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function GroupTabs() {
  return (
    <Tabs defaultValue="listGroup" className="space-y-4">
      <TabsList>
        <TabsTrigger value="listGroup">Danh sách nhóm</TabsTrigger>
        <TabsTrigger value="requestGroup">Yêu cầu</TabsTrigger>
      </TabsList>

      <TabsContent value="listGroup" className="space-y-4">
        <div>
          <ListOfGroups />
        </div>
      </TabsContent>
      <TabsContent value="requestGroup" className="space-y-4">
        <div>
          <RequestGroup />
        </div>
      </TabsContent>
    </Tabs>
  );
}
