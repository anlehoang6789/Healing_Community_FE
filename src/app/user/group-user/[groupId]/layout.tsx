"use client";

import GroupPersonalTabs from "@/app/user/group-user/[groupId]/group-personal-tabs";
import { Button } from "@/components/ui/button";
import { MessageCircle, User, UserPlus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { createContext } from "react";

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
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                alt="Profile picture"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 md:pt-5 md:ml-44">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-0.5">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                  AnHoang
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
                >
                  <User className="w-4 h-4 mr-2" />
                  Xem trang cá nhân
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
