"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Check,
  Flag,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useGetAllGroupsQuery,
  useGetGroupsByUserIdQuery,
  useJoinGroupMutation,
  useLeaveGroupByGroupIdMutation,
} from "@/queries/useGroup";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import CrequestGroupDialog from "@/app/user/list-of-groups/request-group";

export default function ListOfGroups() {
  const { theme } = useTheme();

  const { data: response, isLoading, isError } = useGetAllGroupsQuery();

  const groups = response?.payload?.data || [];
  const [userId, setUserId] = useState<string | null>(null);

  const joinGroupMutation = useJoinGroupMutation();

  const leaveGroupMutation = useLeaveGroupByGroupIdMutation();

  useEffect(() => {
    const storedUserId = getUserIdFromLocalStorage();
    setUserId(storedUserId);
  }, []);

  const { data: joinedGroupsResponse } = useGetGroupsByUserIdQuery(
    userId as string
  );

  // Thêm kiểm tra và type assertion
  const joinedGroupIds = joinedGroupsResponse
    ? (joinedGroupsResponse as any).payload.data.map(
        (group: any) => group.groupId
      )
    : [];

  // Kiểm tra xem một nhóm có được tham gia không
  const isGroupJoined = (groupId: string) => {
    return joinedGroupIds.includes(groupId);
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      const result = await joinGroupMutation.mutateAsync({ groupId });

      toast({
        description: result.payload.message || "Tham gia nhóm thành công!",
        variant: "success",
      });
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    try {
      const result = await leaveGroupMutation.mutateAsync({ groupId });

      toast({
        description: result.payload.message || "Rời nhóm thành công!",
        variant: "success",
      });
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-muted-foreground">
            Các nhóm gợi ý
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="animate-pulse xl:w-[349px]">
              <CardContent className="p-4 flex items-start space-x-4">
                <div className="bg-gray-200 rounded-lg w-24 h-24"></div>
                <div className="flex-1">
                  <div className="bg-gray-200 h-6 w-3/4 mb-2"></div>
                  <div className="bg-gray-200 h-4 w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !groups.length) {
    return <div>Không thể tải danh sách nhóm. Vui lòng thử lại sau.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Các nhóm gợi ý
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <HoverCard key={group.groupId} openDelay={100} closeDelay={200}>
            <Card
              className={`transition-shadow relative ${
                isGroupJoined(group.groupId)
                  ? "border-2 border-rose-300 shadow-lg"
                  : "border border-gray-300"
              }`}
            >
              {isGroupJoined(group.groupId) && (
                <Badge
                  className="absolute bottom-2 right-2 bg-rose-300 text-black"
                  variant="outline"
                >
                  <Check className="mr-1 h-3 w-3" /> Đã tham gia
                </Badge>
              )}
              <CardContent className="p-4 flex items-start space-x-4 relative">
                <Link href={`/user/group/${group.groupId}`}>
                  <Image
                    src={
                      group.avatarGroup ||
                      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                    }
                    alt={group.groupName}
                    width={90}
                    height={90}
                    className="cursor-pointer h-[90px] ww-[90px] rounded-lg object-cover"
                  />
                </Link>

                <div className="flex-1">
                  <HoverCardTrigger asChild>
                    <Link href={`/user/group/${group.groupId}`}>
                      <h2 className="font-semibold hover:underline">
                        {group.groupName}
                      </h2>
                    </Link>
                  </HoverCardTrigger>
                  <p className="text-sm text-gray-500">
                    Thành viên: {group.currentMemberCount.toLocaleString()}/
                    {group.memberLimit.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Phê duyệt:{" "}
                    {group.isAutoApprove ? "Tự động duyệt" : "Duyệt thủ công"}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className={`${
                      theme === "dark"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {isGroupJoined(group.groupId) && (
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Nội dung của bạn</span>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem>
                      <Flag className="mr-2 h-4 w-4" />
                      <span>Báo cáo nhóm</span>
                    </DropdownMenuItem>
                    {isGroupJoined(group.groupId) && (
                      <DropdownMenuItem className="border-t-2 group">
                        <LogOut className="mr-2 h-4 w-4 group-hover:text-red-500 " />
                        <Button
                          className={`group-hover:text-red-500 m-[-6px] ml-[-15px] border-none bg-transparent shadow-none hover:bg-transparent font-normal ${
                            theme === "dark" ? " text-white" : " text-black"
                          } `}
                          onClick={() => handleLeaveGroup(group.groupId)}
                        >
                          Rời nhóm
                        </Button>
                        {/* <span className="group-hover:text-red-500 ">
                          Rời nhóm
                        </span> */}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>

              {!isGroupJoined(group.groupId) && (
                <div className="flex justify-center mb-4 px-20">
                  <Button
                    onClick={() => handleJoinGroup(group.groupId)}
                    className="w-full"
                    variant={"headerIcon"}
                  >
                    Tham gia nhóm
                  </Button>
                </div>
              )}
            </Card>

            <HoverCardContent
              className={`w-80 mt-4 ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <div className="flex items-start gap-4">
                <Link href={`/user/group/${group.groupId}`}>
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={
                        group.avatarGroup ||
                        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                      }
                      alt={group.groupName}
                    />
                    <AvatarFallback>{group.groupName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-col">
                  <Link href={`/user/group/${group.groupId}`}>
                    <h3 className="font-semibold hover:underline">
                      {group.groupName}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {group.description}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Users className="h-4 w-4 mr-1" />
                  {group.groupVisibility
                    ? "Nhóm Riêng tư"
                    : " Nhóm Công khai"}{" "}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {/* {group.friendsInGroup} người bạn ·{" "} */}
                  {group.currentMemberCount?.toLocaleString()} thành viên
                </p>
              </div>
              <div className="flex gap-4">
                <Link href={`/user/group/${group.groupId}`} className="w-full">
                  <Button className="w-full mt-4">Truy cập vào nhóm</Button>
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}
