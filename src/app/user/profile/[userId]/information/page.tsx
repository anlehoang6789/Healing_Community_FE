import PersonalInformationForm from "@/app/user/profile/[userId]/information/personal-information-form";
import React from "react";

export default function PersonalInformation() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Thông tin cá nhân
        </h1>
      </div>
      <PersonalInformationForm />
    </div>
  );
}
