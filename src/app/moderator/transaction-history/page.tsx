import TransactionHistoryTable from "@/app/moderator/transaction-history/transaction-history-table";
import React, { Suspense } from "react";

export default function ManageTransactionHistory() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center mb-4">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Quản lý lịch sử giao dịch
        </h1>
      </div>
      <Suspense>
        <TransactionHistoryTable />
      </Suspense>
    </div>
  );
}
