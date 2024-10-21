import TransactionTabs from "@/app/moderator/transaction-history/transaction-tabs";
import React from "react";

export default function ManageTransactionHistory() {
  return (
    <div className="text-muted-foreground p-4 min-h-screen">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Quản lý giao dịch</h1>
        {/* filter calendar */}
      </div>
      <TransactionTabs />
    </div>
  );
}
