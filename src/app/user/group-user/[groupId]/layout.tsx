"use client";

import GroupPersonalTabs from "@/app/user/group-user/[groupId]/group-personal-tabs";
import { Button } from "@/components/ui/button";
import { Role } from "@/constants/type";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import { MessageCircle, User, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { createContext } from "react";
import Link from "next/link";

const GroupUserContext = createContext<{
  groupId: string | null;
  setGroupId: (value: string | null) => void;
  userId: string | undefined;
  setUserId: (value: string | undefined) => void;
}>({
  groupId: null,
  setGroupId: () => {},
  userId: undefined,
  setUserId: () => {},
});

export default function GroupUserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const params = useParams();
  const groupIdFromPath = params.groupId as string;
  const userIdFromPath = params.userId as string;
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userIdFromPath);
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const {
    data: userProfile,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserProfileQuery(userIdFromPath, !isExpert && !!userIdFromPath);
  const {
    data: expertProfile,
    isLoading: expertLoading,
    isError: expertError,
  } = useGetExpertProfileQuery(userIdFromPath, isExpert && !!userIdFromPath);

  if (userLoading || expertLoading)
    return (
      <div className="w-full max-w-7xl mx-auto bg-background animate-pulse">
        <div className="relative h-48 md:h-64 w-full bg-gray-300 rounded-b-lg"></div>

        <div className="px-4 pb-4 relative">
          <div className="absolute -top-16 left-4 md:left-8">
            <div className="relative w-36 h-36 rounded-full border-4 border-background overflow-hidden">
              <div className="w-36 h-36 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          <div className="pt-20 md:pt-5 md:ml-44">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-0.5">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (userError || expertError)
    return (
      <div className="text-textChat font-semibold">
        Chức năng đang bảo trì, bạn đợi chút nhé
      </div>
    );

  return (
    <GroupUserContext.Provider
      value={{
        groupId: groupIdFromPath,
        setGroupId: () => {},
        userId: userIdFromPath,
        setUserId: () => {},
      }}
    >
      <div className="w-full max-w-7xl mx-auto bg-background">
        {/* Cover Photo */}
        <div className="relative h-48 md:h-64 w-full bg-gradient-custom-left-to-right rounded-b-lg"></div>

        {/* Profile Section */}
        <div className="px-4 pb-4 relative">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-4 md:left-8">
            <div className="relative w-36 h-36 rounded-full border-4 border-background overflow-hidden">
              <Avatar className="w-36 h-36 border-2 border-rose-300 mb-2">
                <AvatarImage
                  src={
                    isExpert
                      ? expertProfile?.payload.data.profileImageUrl
                      : userProfile?.payload.data.profilePicture ||
                        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                  }
                  alt={
                    isExpert
                      ? expertProfile?.payload.data.fullname ||
                        expertProfile?.payload.data.email
                      : userProfile?.payload.data.fullName ||
                        userProfile?.payload.data.userName ||
                        "Anonymous"
                  }
                />
                <AvatarFallback>
                  {isExpert
                    ? expertProfile?.payload.data.fullname ||
                      expertProfile?.payload.data.email
                    : userProfile?.payload.data.fullName ||
                      userProfile?.payload.data.userName ||
                      "Anonymous"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 md:pt-5 md:ml-44">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-0.5">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                  {isExpert
                    ? expertProfile?.payload.data.fullname ||
                      expertProfile?.payload.data.email
                    : userProfile?.payload.data.fullName ||
                      userProfile?.payload.data.userName ||
                      "Anonymous"}
                </h1>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button className="flex-1 md:flex-none">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Nhắn tin
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 md:flex-none text-textChat"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Theo dõi
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 md:flex-none text-textChat"
                  asChild
                >
                  <Link href={`/user/profile/${userIdFromPath}`}>
                    <User className="w-4 h-4 mr-2" />
                    Xem trang cá nhân
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-background h-auto p-2 max-w-7xl mx-auto">
        <GroupPersonalTabs groupId={groupIdFromPath} userId={userIdFromPath} />
        {children}
      </div>
    </GroupUserContext.Provider>
  );
}
