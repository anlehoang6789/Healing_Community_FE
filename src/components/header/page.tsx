"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Home,
  Users,
  Bookmark,
  Bell,
  Settings,
  Sun,
  LogOut,
  Music,
  UserRoundPen,
  FilePenLine,
  LockKeyhole,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Image from "next/image";

const navItems = [
  { icon: Home, label: "Trang chủ", href: "/" },
  { icon: Users, label: "Nhóm", href: "/groups" },
  { icon: Music, label: "Nhạc", href: "/musics" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  console.log("Header rendered");

  return (
    <div className="flex h-14 items-center justify-between top-0 z-50 w-full border-b bg-custom-gray">
      {/* Logo and Search */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-4xl">Logo</span>
        </Link>
        <div className="relative hidden md:block">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm kiếm..." className="pl-8 w-[300px]" />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((item, index) => (
          <AnimatedTooltip key={index} content={item.label}>
            <Link
              href={item.href}
              className="text-foreground/60 hover:text-foreground/80 transition-colors"
            >
              <item.icon className="h-5 w-5" />
            </Link>
          </AnimatedTooltip>
        ))}
      </nav>

      {/* User Actions and Dropdown */}
      <div className="flex items-center space-x-5 mr-10">
        <Button className="hidden sm:inline-flex bg-gradient-to-r from-custom-green to-custom-blue text-black ">
          Viết bài chia sẻ
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full overflow-hidden"
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                alt="Avatar"
                fill
                style={{ objectFit: "cover" }}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white mt-4">
            <DropdownMenuItem>
              <UserRoundPen className="mr-2 h-4 w-4" />
              <span>Trang cá nhân</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bookmark className="mr-2 h-4 w-4" />
              <span>Bookmark</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FilePenLine className="mr-2 h-4 w-4" />
              <span>Bài viết nháp</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LockKeyhole className="mr-2 h-4 w-4" />
              <span>Thay đổi mật khẩu</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Cài đặt khác</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-white focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <svg
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 19H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0 bg-white">
          <div className="flex items-center space-x-2 mb-4 mt-4 ">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input placeholder="Tìm kiếm..." className="w-[200px]" />
          </div>
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
