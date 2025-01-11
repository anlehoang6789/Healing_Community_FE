"use client";

import GroupTabsModerator from "@/app/moderator/group/group-tabs-moderator";

import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetGroupDetailsByGroupIdQuery } from "@/queries/useGroup";
import { Globe, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { createContext } from "react";

const GroupContext = createContext<{
  groupId: string | null;
  setGroupId: (value: string | null) => void;
}>({
  groupId: null,
  setGroupId: () => {},
});

export default function GroupLayoutModerator({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const params = useParams();
  const userIdFromLocalStorage = getUserIdFromLocalStorage();
  const groupIdFromPath = params.groupId as string;
  //data group detail
  const { data: groupDetails } = useGetGroupDetailsByGroupIdQuery({
    groupId: groupIdFromPath,
  });

  const isPrivateGroup = groupDetails?.payload.data.groupVisibility === 1;

  return (
    <GroupContext.Provider
      value={{ groupId: groupIdFromPath, setGroupId: () => {} }}
    >
      <div className="w-full max-w-7xl mx-auto bg-background">
        <div className="relative h-[200px] sm:h-[400px] w-full rounded-lg overflow-hidden">
          <Image
            src={
              groupDetails?.payload.data.avatarGroup ||
              "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
            }
            alt="Group detail banner"
            className="absolute inset-0 w-full h-full object-cover"
            fill
          />
        </div>

        {/* Group Info */}
        <div className="rounded-none shadow-none border-b-2">
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-none justify-between sm:justify-between items-center sm:items-stretch space-y-2 sm:space-x-6">
              {/* phần tên nhóm */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-textChat text-xl sm:text-2xl font-bold text-center sm:text-left">
                  {groupDetails?.payload.data.groupName}
                </h1>
              </div>
              {/* phần số lượng thành viên nhóm */}
              <div className="flex items-center text-muted-foreground text-sm text-center">
                {groupDetails?.payload.data.groupVisibility === 0 ? (
                  <Globe className="w-4 h-4 mr-2 sm:mr-2 mx-auto sm:mx-0" />
                ) : (
                  <LockKeyhole className="w-4 h-4 mr-2 sm:mr-2 mx-auto sm:mx-0" />
                )}
                <span>
                  {groupDetails?.payload.data.groupVisibility === 0
                    ? "Nhóm Công khai"
                    : "Nhóm Riêng tư"}{" "}
                  • {groupDetails?.payload.data.currentMemberCount} thành viên
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-background h-auto p-2 max-w-7xl mx-auto">
        <GroupTabsModerator
          groupId={groupIdFromPath}
          userId={userIdFromLocalStorage as string}
          isPrivateGroup={isPrivateGroup}
        />
        {children}
      </div>
    </GroupContext.Provider>
  );
}
