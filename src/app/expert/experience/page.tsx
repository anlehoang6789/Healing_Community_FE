import ExperienceTable from "@/app/expert/experience/experience-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { Suspense } from "react";

export default function ExpertExperience() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full overflow-x-auto">
      <div className="space-y-2">
        <Card x-chunk="dashboard-06-chunk-0 w-full">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Kinh nghiệm làm việc
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Quản lý kinh nghiệm làm việc của chuyên gia
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-full">
            <Suspense>
              <ExperienceTable />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
