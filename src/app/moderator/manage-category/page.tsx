import ModeratorCategoryTable from "@/app/moderator/manage-category/moderator-category-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Suspense } from "react";

export default function ManageCategory() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full overflow-x-auto">
      <div className="space-y-2">
        <Card x-chunk="dashboard-06-chunk-0 w-full">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Danh mục cho bài viết
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Quản lý các thể loại, danh mục cho các bài viết
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-full">
            <Suspense>
              <ModeratorCategoryTable />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
