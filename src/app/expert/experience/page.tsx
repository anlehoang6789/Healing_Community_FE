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
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="space-y-2">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Kinh nghiệm làm việc</CardTitle>
            <CardDescription>
              Quản lý kinh nghiệm làm việc của chuyên gia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <ExperienceTable />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
