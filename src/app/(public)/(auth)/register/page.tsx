import RegisterTabs from "@/app/(public)/(auth)/register/register-tab";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 ">
      <div className="w-full max-w-4xl overflow-hidden">
        <RegisterTabs />
      </div>
    </div>
  );
}
