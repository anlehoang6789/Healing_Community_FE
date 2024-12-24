"use client";

import { EllipsisVertical, LogOut, Search, UserPlus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function GroupMembersClient() {
  const { theme } = useTheme();

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Thành viên · 1.438.020
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Người và Trang mới tham gia nhóm này sẽ hiển thị tại đây.
        </p>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-textChat" />
          <Input placeholder="Tìm thành viên" className="pl-8 " />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* nick chính mình */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-6 h-6 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
                <AvatarImage
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                  }
                  alt={"avatar"}
                />
                <AvatarFallback>{"Anonymous"}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-textChat text-sm sm:text-base">
                  Hoàng An
                </h3>
                <p className="text-sm text-muted-foreground">
                  FPT University HCM
                </p>
              </div>
            </div>
            <DropdownMenu modal={false} aria-hidden={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="iconSend">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={`w-56 mt-4 ${
                  theme === "dark"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Rời nhóm</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator className="bg-zinc-800" />
        {/* quản trị viên */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">
            Quản trị viên & người kiểm duyệt · 9
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "Maybe Booking",
                role: "Quản trị viên",
                image: "/placeholder.svg",
              },
              {
                name: "Lạc Phim",
                role: "Quản trị viên",
                image: "/placeholder.svg",
              },
              {
                name: "Maybe Collection",
                role: "Quản trị viên",
                image: "/placeholder.svg",
              },
            ].map((admin) => (
              <div
                key={admin.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-6 h-6 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
                    <AvatarImage
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                      }
                      alt={"avatar"}
                    />
                    <AvatarFallback>{"Anonymous"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-textChat text-sm sm:text-base">
                      {admin.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-400">
                        {admin.role}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <div className="flex items-center space-x-2 hover:cursor-pointer">
                    <UserPlus className="h-3 w-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-base hidden sm:block">
                      Theo dõi người dùng
                    </span>
                  </div>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-zinc-800" />
        {/* thành viên */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Thành viên trong nhóm · 20</h3>
          <div className="space-y-4">
            {[
              {
                name: "Maybe Booking",
                role: "Thành viên",
                image: "/placeholder.svg",
              },
              {
                name: "Lạc Phim",
                role: "Thành viên",
                image: "/placeholder.svg",
              },
              {
                name: "Maybe Collection",
                role: "Thành viên",
                image: "/placeholder.svg",
              },
            ].map((admin) => (
              <div
                key={admin.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-6 h-6 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
                    <AvatarImage
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                      }
                      alt={"avatar"}
                    />
                    <AvatarFallback>{"Anonymous"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-textChat text-sm sm:text-base">
                      {admin.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-400">
                        {admin.role}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <div className="flex items-center space-x-2 hover:cursor-pointer">
                    <UserPlus className="h-3 w-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-base hidden sm:block">
                      Theo dõi người dùng
                    </span>
                  </div>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
