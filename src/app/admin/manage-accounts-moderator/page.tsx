import CreateAccountModerator from "@/app/admin/manage-accounts-moderator/create-account-moderator";
import TableListModreator from "@/app/admin/manage-accounts-moderator/table-list-modreator";
import React, { Suspense } from "react";

export default function AdminManageAccountModeratorPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Quản lý kiểm duyệt viên
        </h1>
        {/* Add new account */}
        <CreateAccountModerator />
      </div>
      {/* Table data with pagination */}
      <Suspense>
        <TableListModreator />
      </Suspense>
    </div>
  );
}
