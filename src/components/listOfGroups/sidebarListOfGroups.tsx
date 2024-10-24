"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Search } from "lucide-react";
import Link from "next/link";

import Image from "next/image";

type Group = {
  id: string;
  name: string;
  imageUrl: string;
  lastActive: string;
};

const groups: Group[] = [
  {
    id: "1",
    name: "Thánh Riviu",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "11 giờ trước",
  },
  {
    id: "2",
    name: "Maybe You Never Watched This Movie",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "12 giờ trước",
  },
  {
    id: "3",
    name: "Bộ tộc MixiGaming",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "2 ngày trước",
  },
  {
    id: "4",
    name: "Đam Mê Độ Xe SH",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "11 giờ trước",
  },
  {
    id: "5",
    name: "BẤT ĐỘNG SẢN BÌNH DƯƠNG",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "11 giờ trước",
  },
  {
    id: "6",
    name: "Hội Tai Nghe AirPods Việt Nam",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "13 giờ trước",
  },
  {
    id: "7",
    name: "Nhà Đất Tân Phú - Bình Tân - Tân Bình",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "11 giờ trước",
  },
  {
    id: "8",
    name: "Hôm nay tui ăn gì?",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "12 giờ trước",
  },
  {
    id: "9",
    name: "Hôm nay tui ăn gì?",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "12 giờ trước",
  },
  {
    id: "10",
    name: "Hôm nay tui ăn gì?",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "12 giờ trước",
  },
  {
    id: "11",
    name: "Hôm nay tui ăn gì?",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "12 giờ trước",
  },
  {
    id: "12",
    name: "Hôm nay tui ăn gì?",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    lastActive: "12 giờ trước",
  },
];

export default function GroupSidebar() {
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
          Nhóm bạn đã tham gia ({groups.length})
        </h3>
      </div>
      <ScrollArea className="h-[calc(100vh-150px)] px-4">
        {groups.map((group) => (
          <Link
            href={`/groups/${group.id}`}
            key={group.id}
            className="flex items-center space-x-4  p-2 rounded-lg hover:bg-hoverCard"
          >
            <Image
              src={group.imageUrl}
              alt={group.name}
              width={50}
              height={50}
              className="rounded-lg"
            />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-muted-foreground truncate">
                {group.name}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                Lần hoạt động gần nhất: {group.lastActive}
              </p>
            </div>
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
}
