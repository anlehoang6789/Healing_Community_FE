import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function TransactionTabs() {
  return (
    <Tabs defaultValue="transactionUser" className="space-y-4">
      <TabsList>
        <TabsTrigger value="transactionUser">Người dùng</TabsTrigger>
        <TabsTrigger value="transactionExpert">Chuyên gia</TabsTrigger>
      </TabsList>

      <TabsContent value="transactionUser" className="space-y-4">
        <div>Người dùng</div>
      </TabsContent>
      <TabsContent value="transactionExpert" className="space-y-4">
        <div>Chuyên gia</div>
      </TabsContent>
    </Tabs>
  );
}
