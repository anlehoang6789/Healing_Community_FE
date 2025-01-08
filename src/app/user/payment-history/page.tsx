import PaymentHistoryForExpertAndUser from "@/app/user/payment-history/payment-history-expert-and-user";
import React, { Suspense } from "react";

export default function PaymentHistoryExpertPage() {
  return (
    <div className="w-full bg-background h-auto md:p-4 lg:p-4 sm:p-0 max-w-7xl overflow-hidden mx-auto">
      <Suspense>
        <PaymentHistoryForExpertAndUser />
      </Suspense>
    </div>
  );
}
