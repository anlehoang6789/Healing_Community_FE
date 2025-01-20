"use client";

import GroupTabsUser from "@/app/user/group/group-tabs-user";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import {
  useGetGroupDetailsByGroupIdQuery,
  useGetGroupInfoQuery,
  useJoinGroupMutation,
  useLeaveGroupByGroupIdMutation,
} from "@/queries/useGroup";
import { Globe, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";

const GroupContext = createContext<{
  groupId: string | null;
  setGroupId: (value: string | null) => void;
  isMember: boolean | null;
}>({
  groupId: null,
  setGroupId: () => {},
  isMember: null,
});

export default function GroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const params = useParams();
  const userIdFromLocalStorage = getUserIdFromLocalStorage();
  const groupIdFromPath = params.groupId as string;
  const [isLoading, setIsLoading] = useState(false);
  //data group detail
  const { data: groupDetails } = useGetGroupDetailsByGroupIdQuery({
    groupId: groupIdFromPath,
    enabled: !!groupIdFromPath,
  });

  const isPrivateGroup = groupDetails?.payload.data.groupVisibility === 1;

  const { data: groupJoin } = useGetGroupInfoQuery({
    userId: userIdFromLocalStorage as string,
    enabled: !!userIdFromLocalStorage,
  });

  const groupJoinList = useMemo(
    () => groupJoin?.payload.data || [],
    [groupJoin]
  );

  const [isMemberState, setIsMemberState] = useState<boolean | null>(null);

  //check xem co phai thanh vien cua nhom khong
  useEffect(() => {
    if (groupJoinList.length > 0) {
      const isMember = groupJoinList.some(
        (group) => group.groupId === groupIdFromPath
      );
      setIsMemberState(isMember);
    } else {
      setIsMemberState(null); // Reset trạng thái nếu chưa có dữ liệu
    }
  }, [groupJoinList, groupIdFromPath]);

  const joinGroupMutation = useJoinGroupMutation({
    userId: userIdFromLocalStorage as string,
    groupId: groupIdFromPath,
  });
  const handleJoinGroup = async (groupId: string) => {
    try {
      const result = await joinGroupMutation.mutateAsync({ groupId });
      toast({
        description: result.payload.message || "Tham gia nhóm thành công!",
        variant: "success",
      });
      // setIsMemberState(true);
      if (
        result.payload.message !==
        "Yêu cầu gia nhập đã được gửi. Chờ phê duyệt từ quản trị viên."
      ) {
        setIsMemberState(true);
      }
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const leaveGroupMutation = useLeaveGroupByGroupIdMutation({
    userId: userIdFromLocalStorage as string,
    groupId: groupIdFromPath,
  });
  const handleLeaveGroup = async (groupId: string) => {
    try {
      setIsLoading(true);
      const result = await leaveGroupMutation.mutateAsync({ groupId });
      toast({
        description: result.payload.message || "Rời nhóm thành công!",
        variant: "success",
      });
      setIsMemberState(false);
      router.push(`/user/group/${groupId}`);
    } catch (error) {
      handleErrorApi({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GroupContext.Provider
      value={{
        groupId: groupIdFromPath,
        setGroupId: () => {},
        isMember: isMemberState,
      }}
    >
      <div className="w-full max-w-7xl mx-auto bg-background">
        <div className="relative h-[200px] sm:h-[400px] w-full rounded-b-lg overflow-hidden">
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
                <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 sm:mt-0">
                  {/* <Button className="w-full sm:w-auto">+ Mời</Button> */}
                  {isLoading ? (
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto text-textChat"
                      disabled
                    >
                      Đang tải...
                    </Button>
                  ) : isMemberState ? (
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto text-textChat hover:text-red-500 hover:bg-red-100"
                      onClick={() => handleLeaveGroup(groupIdFromPath)}
                    >
                      Rời nhóm
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      className="w-full sm:w-auto"
                      onClick={() => handleJoinGroup(groupIdFromPath)}
                    >
                      Tham gia ngay
                    </Button>
                  )}
                </div>
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
        <GroupTabsUser
          groupId={groupIdFromPath}
          userId={userIdFromLocalStorage as string}
          isMember={isMemberState}
          isPrivateGroup={isPrivateGroup}
        />
        {children}
      </div>
    </GroupContext.Provider>
  );
}
