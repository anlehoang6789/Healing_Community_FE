"use client";
import ProfileTabs from "@/app/user/profile/profile-tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useUserStore } from "@/store/userStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function ProfileUserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const params = useParams();
  const userIdFromPath = params.userId as string;
  const currentUserId = getUserIdFromLocalStorage();
  const { userId, setUserId } = useUserStore();

  const isOwner = currentUserId === userId;
  useEffect(() => {
    if (!userIdFromPath && currentUserId) {
      // Nếu không có userId trong URL, sử dụng userId từ localStorage
      setUserId(currentUserId);
    } else if (userIdFromPath) {
      // Nếu có userId trong URL, ưu tiên userId đó
      setUserId(userIdFromPath);
    }
  }, [userIdFromPath, currentUserId, setUserId]);

  // Fetch user profile data
  const { data: userProfile, isLoading } =
    useGetUserProfileQuery(userIdFromPath);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* Profile Section */}
      <div className="flex justify-center w-full h-auto sm:h-80 bg-gradient-custom-left-to-right overflow-hidden">
        <div className="flex flex-col items-center justify-center pb-4">
          {/* Avatar */}
          <Avatar className="w-20 h-20 sm:w-28 sm:h-28 border-2 border-rose-300 mb-2">
            <AvatarImage
              // src={
              //   "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
              // }
              src={userProfile?.payload.data.profilePicture}
              alt="Hoàng An"
            />
            <AvatarFallback>
              {userProfile?.payload.data.fullName ||
                userProfile?.payload.data.userName}
              {/* Hoàng An */}
            </AvatarFallback>
          </Avatar>
          {/* Username */}
          <h1 className="text-xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500 mb-2">
            {userProfile?.payload.data.fullName ||
              userProfile?.payload.data.userName}
            {/* Hoàng An */}
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
        <ProfileTabs isOwner={isOwner} userId={userIdFromPath as string} />
        {children}
      </div>
    </div>
  );
}
