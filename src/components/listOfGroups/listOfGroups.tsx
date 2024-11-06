"use client";
import React from "react";
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
  Pin,
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
import { Badge } from "@/components/ui/badge";

type Group = {
  id: string;
  name: string;
  imageUrl: string;
  memberCount: number;
  lastActive: string;
  isPublic: boolean;
  friendsInGroup: number;
  isJoined: boolean;
};

const groups: Group[] = [
  {
    id: "1",
    name: "PHỐT MÁI ẤM HOA HỒNG QUẬN 12",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 5000,
    lastActive: "6 tuần trước",
    isPublic: true,
    friendsInGroup: 2,
    isJoined: true,
  },
  {
    id: "2",
    name: "Capital3group USA | EB3 Unskilled Green Card",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 10000,
    lastActive: "7 tuần trước",
    isPublic: true,
    friendsInGroup: 5,
    isJoined: false,
  },
  {
    id: "3",
    name: "Thanh lý khu vui chơi",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 15000,
    lastActive: "12 tuần trước",
    isPublic: false,
    friendsInGroup: 3,
    isJoined: false,
  },
  {
    id: "4",
    name: "PHỐT MÁI ẤM HOA HỒNG QUẬN 12",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 5000,
    lastActive: "6 tuần trước",
    isPublic: true,
    friendsInGroup: 2,
    isJoined: false,
  },
  {
    id: "5",
    name: "Capital3group USA | EB3 Unskilled Green Card",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 10000,
    lastActive: "7 tuần trước",
    isPublic: true,
    friendsInGroup: 5,
    isJoined: false,
  },
  {
    id: "6",
    name: "Thanh lý khu vui chơi",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 15000,
    lastActive: "12 tuần trước",
    isPublic: false,
    friendsInGroup: 3,
    isJoined: true,
  },
  {
    id: "7",
    name: "PHỐT MÁI ẤM HOA HỒNG QUẬN 12",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 5000,
    lastActive: "6 tuần trước",
    isPublic: true,
    friendsInGroup: 2,
    isJoined: false,
  },
  {
    id: "8",
    name: "Capital3group USA | EB3 Unskilled Green Card",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 10000,
    lastActive: "7 tuần trước",
    isPublic: true,
    friendsInGroup: 5,
    isJoined: true,
  },
  {
    id: "9",
    name: "Thanh lý khu vui chơi",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 15000,
    lastActive: "12 tuần trước",
    isPublic: false,
    friendsInGroup: 3,
    isJoined: true,
  },
  {
    id: "10",
    name: "PHỐT MÁI ẤM HOA HỒNG QUẬN 12",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 5000,
    lastActive: "6 tuần trước",
    isPublic: true,
    friendsInGroup: 2,
    isJoined: true,
  },
  {
    id: "11",
    name: "Capital3group USA | EB3 Unskilled Green Card",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 10000,
    lastActive: "7 tuần trước",
    isPublic: true,
    friendsInGroup: 5,
    isJoined: true,
  },
  {
    id: "12",
    name: "Thanh lý khu vui chơi",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 15000,
    lastActive: "12 tuần trước",
    isPublic: false,
    friendsInGroup: 3,
    isJoined: true,
  },
];

export default function ListOfGroups() {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Các nhóm gợi ý
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <HoverCard key={group.id} openDelay={100} closeDelay={200}>
            {/* Thêm hiệu ứng nổi bật nếu nhóm đã tham gia */}
            <Card
              className={`transition-shadow relative ${
                group.isJoined
                  ? "border-2 border-rose-300 shadow-lg"
                  : "border border-gray-300"
              }`}
            >
              {group.isJoined && (
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
                    src={group.imageUrl}
                    alt={group.name}
                    width={90}
                    height={90}
                    className="cursor-pointer rounded-lg object-cover"
                  />
                </Link>

                <div className="flex-1">
                  <HoverCardTrigger asChild>
                    <Link href="#">
                      <h2 className="font-semibold hover:underline">
                        {group.name}
                      </h2>
                    </Link>
                  </HoverCardTrigger>
                  <p className="text-sm text-gray-500">
                    Lần truy cập gần đây nhất: {group.lastActive}
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
                    className={` ${
                      theme === "dark"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {group.isJoined && (
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Nội dung của bạn</span>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem>
                      <Flag className="mr-2 h-4 w-4" />
                      <span>Báo cáo nhóm</span>
                    </DropdownMenuItem>
                    {group.isJoined && (
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
                    <AvatarImage src={group.imageUrl} alt={group.name} />
                    <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <Link href="#">
                  <h3 className="font-semibold hover:underline">
                    {group.name}
                  </h3>
                </Link>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Users className="h-4 w-4 mr-1" />
                  {group.isPublic ? "Nhóm Công khai" : "Nhóm Riêng tư"}{" "}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {group.friendsInGroup} người bạn ·{" "}
                  {group.memberCount.toLocaleString()} thành viên
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
