import ManaReportExpert from "@/app/moderator/manage-reports/manage-report-expert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function ReportTabs() {
  return (
    <Tabs defaultValue="reportUser" className="space-y-4">
      <TabsList>
        <TabsTrigger value="reportUser">Người dùng</TabsTrigger>
        <TabsTrigger value="reportExpert">Chuyên gia</TabsTrigger>
        <TabsTrigger value="reportComment">Bình luận</TabsTrigger>
        <TabsTrigger value="reportStories">Câu chuyện</TabsTrigger>
      </TabsList>

      <TabsContent value="reportUser" className="space-y-4">
        <div>Người dùng</div>
      </TabsContent>
      <TabsContent value="reportExpert" className="space-y-4">
        <div>
          <ManaReportExpert />
        </div>
      </TabsContent>
      <TabsContent value="reportComment" className="space-y-4">
        <div>Bình luận</div>
      </TabsContent>
      <TabsContent value="reportStories" className="space-y-4">
        <div>Câu chuyện</div>
      </TabsContent>
    </Tabs>
  );
}
