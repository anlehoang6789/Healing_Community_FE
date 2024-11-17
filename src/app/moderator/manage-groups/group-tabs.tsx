import ListOfGroups from "@/app/moderator/manage-groups/list-of-groups";
import RequestGroup from "@/app/moderator/manage-groups/request-group";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import React from "react";

export default function GroupTabs() {
  return (
    <Tabs defaultValue="listGroup" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="listGroup">Danh sách nhóm</TabsTrigger>
          <TabsTrigger value="requestGroup">Yêu cầu</TabsTrigger>
        </TabsList>
        <Button variant={"outline"}>
          <Plus className="mr-2 h-4 w-4" />
          <span>Tạo nhóm</span>
        </Button>
      </div>
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
