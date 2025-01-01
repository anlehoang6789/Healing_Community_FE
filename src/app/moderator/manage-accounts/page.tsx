import TableListUser from "@/app/moderator/manage-accounts/table-list-user";
import { Suspense } from "react";

export default function ManageAccounts() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center mb-4">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Quản lý tài khoản người dùng
        </h1>
      </div>
      <Suspense>
        <TableListUser />
      </Suspense>
    </div>
  );
}
