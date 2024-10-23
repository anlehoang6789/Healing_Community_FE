"use client";

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
  CircleUserRound,
  Menu,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
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
import { useEffect, useState } from "react";
import {
  cn,
  getAccessTokenFromLocalStorage,
  handleErrorApi,
} from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { usePathname, useRouter } from "next/navigation";
import sidebarItems from "@/components/layoutExpert/sidebarItems";
import NotificationPopover from "@/components/notification/notificationPopover";

const navItems = [
  { icon: Home, label: "Trang chủ", href: "/" },
  {
    icon: Users,
    label: "Nhóm",
    href: "/user/list-of-groups",
    authRequired: true,
  },
  { icon: Music, label: "Nhạc", href: "/music", authRequired: true },
];

export default function Header() {
  const pathname = usePathname();
  const [isExpertMenuOpen, setExpertMenuOpen] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(Boolean(getAccessTokenFromLocalStorage()));
  }, []);

  const logoutMutation = useLogoutMutation();
  const handleLogout = async () => {
    if (logoutMutation.isPending) return;
    try {
      await logoutMutation.mutateAsync();
      router.push("/");
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <div className="flex h-10 items-center justify-between top-0 z-50 w-full border-b px-4 py-8">
      {/* Logo and Search */}
      <div className="flex items-center space-x-4 overflow-hidden">
        <Link
          href="/"
          className=" items-center space-x-2 relative hidden md:block"
        >
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/logo%2Flogo.png?alt=media&token=4e7cda70-2c98-4185-a693-b03564f68a4c"
            alt="Logo"
            width={40}
            height={40}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        {/* Search Input - Điều chỉnh theo trạng thái đăng nhập */}
        <div
          className={`relative hidden md:block ${
            isAuth
              ? "w-[200px] md:w-[120px] lg:w-[300px] xl:w-[300px]"
              : "w-[120px]"
          }`}
        >
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#919BA4]" />
          <Input
            placeholder="Tìm kiếm..."
            className="pl-8 w-full rounded-[20px]"
            variant="headerInput"
            id="search-input"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="hidden md:flex items-center space-x-8">
        {navItems
          .filter((item) => {
            // Hiển thị nếu không yêu cầu đăng nhập hoặc nếu đã đăng nhập và mục yêu cầu đăng nhập
            return !item.authRequired || (item.authRequired && isAuth);
          })
          .map((item, index) => (
            <AnimatedTooltip key={index} content={item.label} position="bottom">
              <Link href={item.href}>
                <Button variant="headerIconNoBorder">
                  <item.icon className="h-6 w-6" />
                </Button>
              </Link>
            </AnimatedTooltip>
          ))}
      </nav>

      {/* User Actions and Dropdown */}
      {/* Chưa đăng nhập */}
      {!isAuth && (
        <div className="flex items-center justify-end overflow-hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center justify-between rounded-[20px] bg-gray-200 text-gray-500 hover:bg-gray-200">
                <div className="flex items-center justify-between">
                  <CircleUserRound className="h-8 w-8 mr-2" />
                  <Menu className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={`w-52 mt-4 ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <DropdownMenuItem>
                <Link href={"/login"}>Đăng nhập tài khoản</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/register"}>Đăng ký tài khoản mới</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {isAuth && (
        <>
          {/* Đã đăng nhập */}
          <div className="flex items-center 2xl:space-x-5 xl:space-x-5 lg:space-x-5 md:space-x-1 space-x-5 justify-end overflow-hidden ">
            <Button
              className="hidden sm:inline-flex bg-gradient-to-r from-[#d4fc79] to-[#96e6a1] text-black flex-shrink-0 font-normal rounded-[20px]"
              asChild
            >
              <Link href={"/user/create-post"}>Viết bài chia sẻ</Link>
            </Button>
            <Button
              variant="headerIcon"
              size="icon"
              className="rounded-full flex-shrink-0 border-gray-500"
            >
              <Link href={"/chat"}>
                <MessageCircle className="h-5 w-5 " strokeWidth="1.5px" />
              </Link>
            </Button>
            {/* Notification */}
            <NotificationPopover />
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
                  theme === "dark"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <DropdownMenuItem>
                  <UserRoundPen className="mr-2 h-4 w-4" />
                  <span>
                    <Link href={"/user/profile"}>Trang cá nhân</Link>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>
                    <Link href={"/user/bookmark"}>Bookmark</Link>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FlaskConical className="mr-2 h-4 w-4" />
                  <span>
                    <Link href={"/psychological-test"}>Bài test tâm lý</Link>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  <span>
                    <Link href={"/user/payment-history"}>
                      Lịch sử giao dịch
                    </Link>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hidden lg:flex">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>
                    <Link href={"/expert/dashboard-expert"}>
                      Quản lí của chuyên gia
                    </Link>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between lg:hidden">
                  <span
                    className="flex items-center"
                    onClick={() => setExpertMenuOpen(!isExpertMenuOpen)} // Toggle expert menu
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Quản lí của chuyên gia</span>
                  </span>
                  {isExpertMenuOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </DropdownMenuItem>
                {/* Conditional rendering for sidebar items */}
                {isExpertMenuOpen && (
                  <div className="flex flex-col ml-4">
                    {sidebarItems.map((Item, index) => {
                      const isActive = pathname === Item.href;
                      return (
                        <Link
                          key={index}
                          href={Item.href}
                          className={cn(
                            "flex items-center gap-4 px-2.5  hover:text-foreground",
                            {
                              "text-foreground": isActive,
                              "text-muted-foreground": !isActive,
                            }
                          )}
                        >
                          <Item.Icon className="h-3 w-3" />
                          {Item.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span onClick={handleLogout}>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
      {/* Mobile Navigation */}
      <Sheet>
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
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/logo%2Flogo.png?alt=media&token=4e7cda70-2c98-4185-a693-b03564f68a4c"
                alt="Logo"
                width={40}
                height={40}
                style={{ width: "auto", height: "auto" }}
              />
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
                } rounded-[20px]`}
                id="search-input-mobile"
                variant="headerInput"
              />
            </div>
          </div>
          {/* <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav> */}
          <nav className="flex flex-col gap-4">
            {navItems
              .filter((item) => {
                // Display if not auth-required or user is authenticated
                return !item.authRequired || (item.authRequired && isAuth);
              })
              .map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
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
