"use client";
import ChangePassword from "@/app/user/profile/change-password";
import ExpertInfor from "@/app/user/profile/expert-info";
import PersonalInformation from "@/app/user/profile/personal-information";
import PersonalWall from "@/app/user/profile/personal-wall";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <PersonalWall />;
      case "expertInfor":
        return <ExpertInfor />;
      case "info":
        return <PersonalInformation />;
      case "password":
        return <ChangePassword />;
      default:
        return null;
    }
  };
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center py-4 border-b">
        <Button
          className="w-full sm:w-auto rounded-[20px] bg-[#707B7C] hover:bg-[#A0A6A8] flex items-center justify-center sm:order-2"
          asChild
        >
          <Link href="/new-post">
            <Pencil className="mr-2 w-4 h-4" />
            <span>Đăng bài viết mới</span>
          </Link>
        </Button>

        <nav className="flex justify-between sm:justify-start items-center space-x-2 sm:space-x-4 w-full sm:w-auto sm:order-1">
          <Button
            variant={
              activeTab === "home"
                ? "gradientUnderline"
                : "gradientHoverUnderline"
            }
            onClick={() => setActiveTab("home")}
            className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
          >
            Tường nhà
          </Button>
          <Button
            variant={
              activeTab === "expertInfor"
                ? "gradientUnderline"
                : "gradientHoverUnderline"
            }
            onClick={() => setActiveTab("expertInfor")}
            className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
          >
            Thông tin chuyên gia
          </Button>
          <Button
            variant={
              activeTab === "info"
                ? "gradientUnderline"
                : "gradientHoverUnderline"
            }
            onClick={() => setActiveTab("info")}
            className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
          >
            Thông tin cá nhân
          </Button>
          <Button
            variant={
              activeTab === "password"
                ? "gradientUnderline"
                : "gradientHoverUnderline"
            }
            onClick={() => setActiveTab("password")}
            className="text-xs sm:text-sm flex-1 sm:flex-none text-muted-foreground"
          >
            Đổi mật khẩu
          </Button>
        </nav>
      </div>

      <main className="my-4">{renderContent()}</main>
    </div>
  );
}
