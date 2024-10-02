import ProfileTabs from "@/app/user/profile/profile-tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function ProfileUserPage() {
  return (
    <div>
      {/* Profile Section */}
      <div className="flex justify-center w-full h-auto sm:h-80 bg-gradient-custom-left-to-right overflow-hidden">
        <div className="flex flex-col items-center justify-center pb-4">
          {/* Avatar */}
          <Avatar className="w-20 h-20 sm:w-28 sm:h-28 border-2 border-rose-300 mb-2">
            <AvatarImage
              src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-register.jpg?alt=media&token=0bead35e-556e-4935-945e-909d9cee4483"
              alt="Hoàng An"
            />
            <AvatarFallback>HA</AvatarFallback>
          </Avatar>
          {/* Username */}
          <h1 className="text-xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500 mb-2">
            Hoàng An
          </h1>
          <div className="flex flex-col items-center justify-center">
            {/* First information */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 mt-1 text-xs sm:text-base">
              <div className="flex space-x-2 sm:space-x-4 items-center">
                <div className="flex items-center">
                  <span className="mr-1 sm:mr-2 text-[#707B7C]">
                    Lượt thích:
                  </span>
                  <span className="text-[#2E4053]">100</span>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden sm:block bg-[#A0A6A8] h-4"
                />
              </div>
              <div className="flex space-x-2 sm:space-x-4">
                <div className="flex items-center">
                  <span className="mr-1 sm:mr-2 text-[#707B7C]">
                    Số người theo dõi:
                  </span>
                  <span className="text-[#2E4053]">100</span>
                </div>
              </div>
            </div>
            {/* Second information */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 mt-4 text-xs sm:text-base">
              <div className="flex space-x-2 sm:space-x-4 items-center">
                <div className="flex items-center">
                  <span className="mr-1 sm:mr-2 text-[#707B7C]">
                    Bài viết đã đăng:
                  </span>
                  <span className="text-[#2E4053]">100</span>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden sm:block bg-[#A0A6A8] h-4"
                />
              </div>
              <div className="flex space-x-2 sm:space-x-4 items-center">
                <div className="flex items-center">
                  <span className="mr-1 sm:mr-2 text-[#707B7C]">
                    Tuổi của bạn:
                  </span>
                  <span className="text-[#2E4053]">100</span>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden sm:block bg-[#A0A6A8] h-4"
                />
              </div>
              <div className="flex space-x-2 sm:space-x-4">
                <div className="flex items-center">
                  <span className="mr-1 sm:mr-2 text-[#707B7C]">
                    Lượt theo dõi:
                  </span>
                  <span className="text-[#2E4053]">100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-background h-auto p-2 max-w-7xl overflow-hidden mx-auto">
        <ProfileTabs />
      </div>
    </div>
  );
}
