import ExpertUpdateInformationForm from "@/app/expert/update-information/expert-update-information-form";
import DialogExpertInfo from "@/components/expertInfo/dialog-expert-info";
import React from "react";

export default function ExpertUpdateInformationPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Thông tin cá nhân của chuyên gia
        </h1>
        <DialogExpertInfo />
      </div>
      <ExpertUpdateInformationForm />
    </div>
  );
}
