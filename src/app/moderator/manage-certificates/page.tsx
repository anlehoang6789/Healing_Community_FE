import TableListCertificate from "@/components/uploadFileForExpert/table-list-certificates";
import React, { Suspense } from "react";

export default function ManageStories() {
  return (
    <div className="px-6">
      <Suspense>
        <TableListCertificate />
      </Suspense>
    </div>
  );
}
