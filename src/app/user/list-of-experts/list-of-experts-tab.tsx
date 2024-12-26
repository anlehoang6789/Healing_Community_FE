import ExpertsPage from "@/components/listOfExperts/listOfExperts";
import RecommendExperts from "@/components/listOfExperts/recommendExperts";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

export default function ListOfExpertsTab() {
  return (
    <Tabs defaultValue="listGroup" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="listExpert">Tất cả chuyên gia</TabsTrigger>
          <TabsTrigger value="recommendExpert">Chuyên gia đề xuất</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="listExpert" className="space-y-4">
        <div>
          <ExpertsPage />
        </div>
      </TabsContent>
      <TabsContent value="recommendExpert" className="space-y-4">
        <div>
          <RecommendExperts />
        </div>
      </TabsContent>
    </Tabs>
  );
}
