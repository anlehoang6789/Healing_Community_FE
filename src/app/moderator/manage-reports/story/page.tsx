import ManageReportStory from "@/app/moderator/manage-reports/story/manage-report-story";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Suspense } from "react";

export default function ManageReportStoryPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="space-y-2">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Báo cáo</CardTitle>
            <CardDescription>Quản lý báo cáo câu chuyện</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <ManageReportStory />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
