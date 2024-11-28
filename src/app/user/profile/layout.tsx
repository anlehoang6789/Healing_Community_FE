"use client";
import ProfileTabs from "@/app/user/profile/profile-tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useParams } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

const ProfileContext = createContext<{
  userId: string | null;
  setUserId: (value: string | null) => void;
  isOwner: boolean;
}>({
  userId: null,
  setUserId: () => {},
  isOwner: false,
});

export default function ProfileUserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const params = useParams();
  const userIdFromPath = params.userId as string;
  const currentUserId = getUserIdFromLocalStorage();
  const [userId, setUserId] = useState<string | null>(null);

  const isOwner = currentUserId === userId;
  useEffect(() => {
    if (!userId) {
      const idToSet = userIdFromPath || currentUserId;
      if (idToSet) setUserId(idToSet);
    }
  }, [userIdFromPath, currentUserId, userId]);

  // Fetch user profile data
  const { data: userProfile } = useGetUserProfileQuery(userId as string);

  if (!userId) {
    return <div>Loading...</div>;
  }
  return (
    <ProfileContext.Provider
      value={{
        userId,
        setUserId,
        isOwner,
      }}
    >
      {/* Profile Section */}
      <div className="flex justify-center w-full h-auto sm:h-80 bg-gradient-custom-left-to-right overflow-hidden">
        <div className="flex flex-col items-center justify-center pb-4">
          {/* Avatar */}
          <Avatar className="w-20 h-20 sm:w-28 sm:h-28 border-2 border-rose-300 mb-2">
            <AvatarImage
              src={userProfile?.payload.data.profilePicture}
              alt="Hoàng An"
            />
            <AvatarFallback>
              {userProfile?.payload.data.fullName ||
                userProfile?.payload.data.userName}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500 mb-2">
            {userProfile?.payload.data.fullName ||
              userProfile?.payload.data.userName}
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
        <ProfileTabs userId={userId} isOwner={isOwner} />
        {children}
      </div>
    </ProfileContext.Provider>
  );
}
