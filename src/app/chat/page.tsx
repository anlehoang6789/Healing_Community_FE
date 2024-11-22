import ClientPageChat from "@/app/chat/client-page-chat";
import React, { Suspense } from "react";

export default function ChatPage() {
  return (
    <div className="p-3 bg-muted">
      <Suspense>
        <ClientPageChat />
      </Suspense>
    </div>
  );
}
