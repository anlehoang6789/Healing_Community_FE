import ManageReportComment from "@/app/moderator/manage-reports/comment/manage-report-comment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Suspense } from "react";

export default function ManageReportCommentPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="space-y-2">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Báo cáo</CardTitle>
            <CardDescription>Quản lý báo cáo bình luận</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <ManageReportComment />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
