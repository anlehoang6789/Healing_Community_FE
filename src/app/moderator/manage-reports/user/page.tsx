import ManageReportUser from "@/app/moderator/manage-reports/user/manage-report-user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Suspense } from "react";

export default function ManageReportUserPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="space-y-2">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Báo cáo</CardTitle>
            <CardDescription>Quản lý báo cáo người dùng</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <ManageReportUser />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
