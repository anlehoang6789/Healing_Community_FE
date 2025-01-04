"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetGroupsByUserIdQuery } from "@/queries/useGroup";
import { GroupJoinedByUserIdType } from "@/schemaValidations/group.schema";

const getRoleLabel = (role: string) => {
  switch (role) {
    case "Moderator":
      return "Quản trị nhóm";
    case "Owner":
      return "Chủ nhóm";
    case "User ":
      return "Thành viên";
    default:
      return role;
  }
};

export default function GroupSidebar() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = getUserIdFromLocalStorage();
    setUserId(storedUserId);
  }, []);

  const {
    data: response,
    isLoading,
    isError,
  } = useGetGroupsByUserIdQuery(userId as string);

  const groups = (response?.payload as any)?.data || [];

  if (!userId || isLoading) {
    return (
      <div className="w-80 h-screen bg-background border-r flex flex-col">
        <div className="p-4 border-b flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        </div>

        <div className="p-4 border-b">
          <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t mt-auto">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-12 bg-gray-300 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-80 h-screen bg-background border-r flex items-center justify-center">
        Lỗi tải danh sách nhóm
      </div>
    );
  }

  return (
    <div className="w-80 h-screen bg-background border-r">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-muted-foreground">Nhóm</h2>
      </div>
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm nhóm"
            className="pl-8 rounded-full"
            variant="headerInput"
          />
        </div>
      </div>
      <div className="px-4 flex justify-between items-center">
        <h3 className="font-semibold text-muted-foreground">
          Nhóm bạn đã tham gia ({groups?.length || 0})
        </h3>
      </div>
      <ScrollArea className="h-[calc(100vh-150px)] px-4">
        {isError ? (
          <div className="text-center text-red-500 mt-10">
            Lỗi tải danh sách nhóm. Vui lòng thử lại sau.
          </div>
        ) : groups?.length > 0 ? (
          groups.map((group: GroupJoinedByUserIdType) => (
            <Link
              href={`/user/group/${group.groupId}`}
              key={group.groupId}
              className="flex items-center space-x-4 p-2 rounded-lg hover:bg-hoverCard"
            >
              <Image
                src={
                  group.groupAvatar ||
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
                alt={`Ảnh nhóm ${group.groupName}`}
                width={50}
                height={50}
                className="rounded-lg h-[50px] w-[50px]"
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-muted-foreground truncate">
                  {group.groupName}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  Vai trò: {getRoleLabel(group.roleInGroup)}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  Ngày tham gia:{" "}
                  {new Date(group.joinedAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-muted-foreground mt-10">
            Bạn chưa tham gia nhóm nào
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
