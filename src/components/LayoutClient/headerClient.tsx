"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Search,
  Home,
  Users,
  Bookmark,
  Bell,
  Settings,
  Music,
  UserRoundPen,
  FlaskConical,
  LogOut,
  MessageCircle,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import DarkModeToggle from "@/components/dark-mode-toogle";

const navItems = [
  { icon: Home, label: "Trang chủ", href: "/" },
  { icon: Users, label: "Nhóm", href: "/groups" },
  { icon: Music, label: "Nhạc", href: "/musics" },
];

export default function Header() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-14 items-center justify-between top-0 z-50 w-full border-b px-4 py-10">
      {/* Logo and Search */}
      <div className="flex items-center space-x-4 overflow-hidden">
        <Link
          href="/"
          className=" items-center space-x-2 relative hidden md:block"
        >
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
            alt="Logo"
            width={50}
            height={50}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <div className="relative hidden md:block">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#919BA4]" />
          <Input
            placeholder="Tìm kiếm..."
            className="pl-8 w-[300px] md:w-[120px] lg:w-[300px] xl:w-[400px]"
            variant="headerInput"
            id="search-input"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="hidden md:flex items-center space-x-10">
        {navItems.map((item, index) => (
          <AnimatedTooltip key={index} content={item.label}>
            <Link href={item.href}>
              <Button variant="headerIconNoBorder">
                <item.icon className="h-6 w-6" />
              </Button>
            </Link>
          </AnimatedTooltip>
        ))}
      </nav>

      {/* User Actions and Dropdown */}
      <div className="flex items-center space-x-5 justify-end overflow-hidden ">
        <Button className="hidden sm:inline-flex bg-gradient-custom text-black flex-shrink-0">
          Viết bài chia sẻ
        </Button>
        <Button
          variant="headerIcon"
          size="icon"
          className="rounded-full flex-shrink-0 border-gray-500"
        >
          <MessageCircle className="h-5 w-5 " strokeWidth="1.5px" />
        </Button>
        <Button
          variant="headerIcon"
          size="icon"
          className="rounded-full flex-shrink-0 border-gray-500"
        >
          <Bell className="h-5 w-5" strokeWidth="1.5px" />
        </Button>
        {/* chuyển đổi giao diện */}
        <DarkModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0"
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                alt="Avatar"
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                priority
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`w-56 mt-4 ${
              theme === "dark" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <DropdownMenuItem>
              <UserRoundPen className="mr-2 h-4 w-4" />
              <span>Trang cá nhân</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bookmark className="mr-2 h-4 w-4" />
              <span>Bookmark</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FlaskConical className="mr-2 h-4 w-4" />
              <span>Bài test tâm lý</span>
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
            variant="headerIcon"
            className="absolute left-0 ml-4 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden rounded-l-md border-l border-t border-b border-r border-gray-400"
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
        <SheetContent
          side="left"
          className={`pr-0 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          } `}
        >
          <SheetTitle className="sr-only">Are you absolutely sure?</SheetTitle>
          <SheetDescription className="sr-only">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
          <div className="flex flex-col mb-4 mt-4">
            <Link href="/" className="mb-6">
              <span className="font-bold text-4xl">Logo</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Search
                className={`h-5 w-5 ${
                  theme === "dark" ? "text-white" : "text-muted-foreground"
                }`}
              />
              <Input
                placeholder="Tìm kiếm..."
                className={`w-[200px] ${
                  theme === "dark" ? "bg-gray-700 text-white" : ""
                }`}
              />
            </div>
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
