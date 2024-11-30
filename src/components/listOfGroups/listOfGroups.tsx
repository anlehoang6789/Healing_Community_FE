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
} from "@/queries/useGroup";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { GroupJoinedByUserIdType } from "@/schemaValidations/group.schema";

export default function ListOfGroups() {
  const { theme } = useTheme();

  const { data: response, isLoading, isError } = useGetAllGroupsQuery();

  const groups = response?.payload?.data || [];
  const [userId, setUserId] = useState<string | null>(null);

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
            <Card key={item} className="animate-pulse">
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
                <Link href="#">
                  <Image
                    src={
                      group.avatarGroup ||
                      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                    }
                    alt={group.groupName}
                    width={90}
                    height={90}
                    className="cursor-pointer rounded-lg object-cover"
                  />
                </Link>

                <div className="flex-1">
                  <HoverCardTrigger asChild>
                    <Link href="#">
                      <h2 className="font-semibold hover:underline">
                        {group.groupName}
                      </h2>
                    </Link>
                  </HoverCardTrigger>
                  <p className="text-sm text-gray-500">
                    Thành viên:{" "}
                    {group.currentMemberCount
                      ? group.currentMemberCount.toLocaleString()
                      : "Chưa xác định"}
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
                        <span className="group-hover:text-red-500 ">
                          Rời nhóm
                        </span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            <HoverCardContent
              className={`w-80 mt-4 ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <div className="flex items-start gap-4">
                <Link href="#">
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
                <Link href="#">
                  <h3 className="font-semibold hover:underline">
                    {group.groupName}
                  </h3>
                </Link>
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
                <Button className="w-full mt-4">Truy cập vào nhóm</Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}
