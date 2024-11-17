import PersonalInformationForm from "@/app/user/profile/personal-information-form";
import { Button } from "@/components/ui/button";
import React from "react";

export default function PersonalInformation() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Thông tin cá nhân
        </h1>
        {/* <div className="space-x-2 hidden md:flex">
          <Button variant="outline" className="text-muted-foreground">
            Hủy
          </Button>
          <Button>Lưu thay đổi</Button>
        </div> */}
      </div>
      <PersonalInformationForm />
      {/* <div className="flex flex-col md:hidden justify-end space-y-2 md:space-y-0 md:space-x-2 mt-6">
        <Button variant="outline" className="text-muted-foreground">
          Hủy
        </Button>
        <Button>Lưu thay đổi</Button>
      </div> */}
    </div>
  );
}
