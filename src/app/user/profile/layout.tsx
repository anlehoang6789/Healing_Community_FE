"use client";
import ProfileTabs from "@/app/user/profile/profile-tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Role } from "@/constants/type";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import {
  useGetFollowerCountQuery,
  useGetFollowingCountQuery,
  useGetRegistrationQuery,
  useGetUserProfileQuery,
} from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import {
  useGetPostCountQuery,
  useGetReactionCountByUserIdQuery,
} from "@/queries/usePost";
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
  const userIdFromPath = params.userId as string | undefined;
  const expertIdFromPath = params.expertId as string | undefined;
  const currentUserId = getUserIdFromLocalStorage();
  const [userId, setUserId] = useState<string | null>(null);
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId as string);

  const { data: followerCountData } = useGetFollowerCountQuery(
    (userIdFromPath as string) || (expertIdFromPath as string)
  );

  const { data: followingCountData } = useGetFollowingCountQuery(
    (userIdFromPath as string) || (expertIdFromPath as string)
  );

  const { data: postCountData } = useGetPostCountQuery(
    (userIdFromPath as string) || (expertIdFromPath as string)
  );

  const { data: reactionCountData } = useGetReactionCountByUserIdQuery(
    (userIdFromPath as string) || (expertIdFromPath as string)
  );

  const { data: registrationCountData } = useGetRegistrationQuery(
    (userIdFromPath as string) || (expertIdFromPath as string)
  );

  const isOwner = userIdFromPath === currentUserId;
  useEffect(() => {
    if (userIdFromPath) {
      setUserId(userIdFromPath);
    } else if (expertIdFromPath) {
      setUserId(expertIdFromPath);
    }
  }, [userIdFromPath, expertIdFromPath]);

  // Fetch user profile data
  const { data: userProfile } = useGetUserProfileQuery(
    userId as string,
    roleByUserId?.payload.data.roleName === Role.User && !!userId
  );

  const { data: expertProfile } = useGetExpertProfileQuery(
    userId as string,
    roleByUserId?.payload.data.roleName === Role.Expert && !!userId
  );
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;

  if (
    !userId ||
    !followerCountData ||
    !followingCountData ||
    !postCountData ||
    !reactionCountData ||
    !registrationCountData
  ) {
    return (
      <div className="animate-pulse">
        <div className="flex justify-center w-full h-auto sm:h-80 bg-gray-200 overflow-hidden">
          <div className="flex flex-col items-center justify-center pb-4">
            <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gray-300 rounded-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 mt-1 text-xs sm:text-base">
                <div className="flex space-x-2 sm:space-x-4 items-center">
                  <div className="flex items-center">
                    <span className="h-4 bg-gray-300 rounded w-1/4 mr-1 sm:mr-2"></span>
                    <span className="h-4 bg-gray-300 rounded w-1/4"></span>
                  </div>
                </div>
                <div className="flex space-x-2 sm:space-x-4">
                  <div className="flex items-center">
                    <span className="h-4 bg-gray-300 rounded w-1/4 mr-1 sm:mr-2"></span>
                    <span className="h-4 bg-gray-300 rounded w-1/4"></span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 mt-1 text-xs sm:text-base">
                <div className="flex space-x-2 sm:space-x-4 items-center">
                  <div className="flex items-center">
                    <span className="h-4 bg-gray-300 rounded w-1/4 mr-1 sm:mr-2"></span>
                    <span className="h-4 bg-gray-300 rounded w-1/4"></span>
                  </div>
                </div>
                <div className="flex space-x-2 sm:space-x-4 items-center">
                  <div className="flex items-center">
                    <span className="h-4 bg-gray-300 rounded w-1/4 mr-1 sm:mr-2"></span>
                    <span className="h-4 bg-gray-300 rounded w-1/4"></span>
                  </div>
                </div>
                <div className="flex space-x-2 sm:space-x-4">
                  <div className="flex items-center">
                    <span className="h-4 bg-gray-300 rounded w-1/4 mr-1 sm:mr-2"></span>
                    <span className="h-4 bg-gray-300 rounded w-1/4"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-4 bg-gray-200 h-auto p-2 max-w-7xl overflow-hidden mx-auto">
          <div className="h-12 bg-gray-300 rounded mb-2"></div>
          <div className="h-96 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
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
      <div className="flex justify-center w-full h-auto sm:h-80 bg-gradient-custom-left-to-right">
        <div className="flex flex-col items-center justify-center pb-4">
          {/* Avatar */}
          <Avatar className="w-20 h-20 sm:w-28 sm:h-28 border-2 border-rose-300 mb-2">
            <AvatarImage
              src={
                userProfile?.payload.data.profilePicture ||
                expertProfile?.payload.data.profileImageUrl ||
                "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
              }
              alt="Hoàng An"
            />
            <AvatarFallback>
              {userProfile?.payload.data.fullName ||
                userProfile?.payload.data.userName ||
                expertProfile?.payload.data.fullname ||
                expertProfile?.payload.data.email}
            </AvatarFallback>
          </Avatar>
          {isExpert && (
            <div className="text-sm text-gray-100 font-semibold px-2 py-1 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-full shadow-md">
              Chuyên gia
            </div>
          )}
          <h1 className="text-xl sm:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500 mb-2">
            {isExpert
              ? expertProfile?.payload.data.fullname ||
                expertProfile?.payload.data.email
              : userProfile?.payload.data.fullName ||
                userProfile?.payload.data.userName ||
                "Anonymous"}
          </h1>
          <div className="flex flex-col items-center justify-center">
            {/* First information */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 mt-1 text-xs sm:text-base">
              <div className="flex space-x-2 sm:space-x-4 items-center">
                <div className="flex space-x-2 sm:space-x-4">
                  <div className="flex items-center">
                    <span className="mr-1 sm:mr-2 text-[#707B7C]">
                      Đang theo dõi:
                    </span>
                    <span className="text-[#2E4053]">
                      {followerCountData.payload.data.followerCount}
                    </span>
                  </div>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden sm:block bg-[#A0A6A8] h-4"
                />
              </div>
              <div className="flex space-x-2 sm:space-x-4">
                <div className="flex items-center">
                  <span className="mr-1 sm:mr-2 text-[#707B7C]">
                    Người theo dõi:
                  </span>
                  <span className="text-[#2E4053]">
                    {followingCountData.payload.data.followingCount}
                  </span>
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
                  <span className="text-[#2E4053]">
                    {postCountData.payload.data.postCount}
                  </span>
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
                  <span className="text-[#2E4053]">
                    {registrationCountData.payload.data.totalDays} ngày
                  </span>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden sm:block bg-[#A0A6A8] h-4"
                />
              </div>
              <div className="flex space-x-2 sm:space-x-4">
                <div className="flex items-center">
                  <span className="mr-1 sm:mr-2 text-[#707B7C]">
                    Lượt thích:
                  </span>
                  <span className="text-[#2E4053]">
                    {reactionCountData.payload.data.reactionCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-background h-auto p-2 max-w-7xl mx-auto">
        <ProfileTabs userId={userId} isOwner={isOwner} />
        {children}
      </div>
    </ProfileContext.Provider>
  );
}
