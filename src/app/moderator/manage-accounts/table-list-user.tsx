"use client";
import DeleteAccountUser from "@/app/moderator/manage-accounts/delete-account-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

type FilterListUser = {
  filters: { role: string; status: string };
};

type UserList = {
  id: string;
  date: Date;
  username: string;
  email: string;
  avatar: string;
  role: "user" | "expert";
  status: "active" | "inactive" | "banned";
};

const userList: UserList[] = [
  {
    id: "1",
    date: new Date("2023-09-01"),
    username: "johnDoe",
    email: "john.doe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "user",
    status: "active",
  },
  {
    id: "2",
    date: new Date("2023-08-15"),
    username: "janeSmith",
    email: "jane.smith@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "expert",
    status: "banned",
  },
  {
    id: "3",
    date: new Date("2023-10-05"),
    username: "mikeBrown",
    email: "mike.brown@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    role: "user",
    status: "inactive",
  },
  {
    id: "4",
    date: new Date("2023-07-20"),
    username: "lindaWhite",
    email: "linda.white@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    role: "expert",
    status: "active",
  },
  {
    id: "5",
    date: new Date("2023-06-10"),
    username: "alexTaylor",
    email: "alex.taylor@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    role: "user",
    status: "active",
  },
  {
    id: "6",
    date: new Date("2023-09-12"),
    username: "sophiaGreen",
    email: "sophia.green@example.com",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    role: "expert",
    status: "banned",
  },
  {
    id: "7",
    date: new Date("2023-05-18"),
    username: "chrisJohnson",
    email: "chris.johnson@example.com",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    role: "user",
    status: "inactive",
  },
  {
    id: "8",
    date: new Date("2023-04-25"),
    username: "emmaBrown",
    email: "emma.brown@example.com",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    role: "expert",
    status: "active",
  },
  {
    id: "9",
    date: new Date("2023-11-02"),
    username: "liamDavis",
    email: "liam.davis@example.com",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    role: "user",
    status: "banned",
  },
  {
    id: "10",
    date: new Date("2023-03-30"),
    username: "oliviaMiller",
    email: "olivia.miller@example.com",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    role: "expert",
    status: "inactive",
  },
];

export default function TableListUser({ filters }: FilterListUser) {
  // Đổi màu tự động cho badge "Người dùng"
  const [hue, setHue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const gradientColorBadgeUser = (h: number) => {
    const hueShift = Math.sin((h * Math.PI) / 180) * 20;
    return `hsl(${84 + hueShift}, 90%, 70%)`;
  };

  //   Đổi màu tự động cho badge "Chuyên gia"
  const gradientColorBadgeExpert = (h: number) => {
    const hueShift = Math.sin((h * Math.PI) / 180) * 20; // Điều chỉnh độ chuyển
    return `hsl(${217 + hueShift}, 100%, 60%)`; // Hue 217 cho màu #3a86ff
  };

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 8;

  //   filter
  const filteredUsers = userList.filter((user) => {
    const matchesRole =
      filters.role && filters.role !== "all"
        ? user.role === filters.role
        : true;
    const matchesStatus =
      filters.status && filters.status !== "all"
        ? user.status === filters.status
        : true;
    return matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / transactionsPerPage);

  const getCurrentPageTransactions = () => {
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  const getStatusBadge = (status: UserList["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant={"outline"}
            className="bg-green-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-1 md:py-0.5"
          >
            Đã kích hoạt
          </Badge>
        );
      case "inactive":
        return (
          <Badge
            variant={"outline"}
            className="bg-yellow-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-1 md:py-0.5"
          >
            Chưa kích hoạt
          </Badge>
        );
      case "banned":
        return (
          <Badge
            variant={"outline"}
            className="bg-red-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-1 md:py-0.5"
          >
            Bị vô hiệu hóa
          </Badge>
        );
    }
  };

  const getRoleBadge = (role: UserList["role"]) => {
    switch (role) {
      case "user":
        return (
          <div className="relative group">
            <Badge
              className="
            relative text-gray-600 dark:text-black text-[10px] md:text-xs px-1.5 md:px-2  md:py-0.5 py-1 rounded-full transition-all duration-300 ease-in-out
            hover:scale-105 hover:shadow-lg
          "
              style={{
                background: `linear-gradient(45deg, 
              ${gradientColorBadgeUser(hue)}, 
              ${gradientColorBadgeUser((hue + 60) % 360)}
            )`,
              }}
            >
              Người dùng
            </Badge>
          </div>
        );
      case "expert":
        return (
          <div className="relative group">
            <Badge
              className="
            relative text-white dark:text-[#fbfcfc] text-[10px] md:text-xs px-1.5 md:px-2  md:py-0.5 py-1 rounded-full transition-all duration-300 ease-in-out
            hover:scale-105 hover:shadow-lg
          "
              style={{
                background: `linear-gradient(45deg, 
              ${gradientColorBadgeExpert(hue)}, 
              ${gradientColorBadgeExpert((hue + 60) % 360)}
            )`,
              }}
            >
              Chuyên gia
            </Badge>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="max-w-6xl mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="lg:text-sm md:tex-sm text-[10px]">
                  Ảnh đại diện
                </TableHead>
                <TableHead className="lg:text-sm md:tex-sm text-[10px]">
                  Tên tài khoản
                </TableHead>
                <TableHead className="lg:text-sm md:tex-sm text-[10px]">
                  Email
                </TableHead>
                <TableHead className="lg:text-sm md:tex-sm text-[10px]">
                  Ngày tạo
                </TableHead>
                <TableHead className="lg:text-sm md:tex-sm text-[10px]">
                  Vai trò
                </TableHead>
                <TableHead className="lg:text-sm md:tex-sm text-[10px]">
                  Trạng thái
                </TableHead>
                <TableHead className="lg:text-sm md:tex-sm text-[10px]">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCurrentPageTransactions().map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-[10px]">
                    <Avatar>
                      <AvatarImage
                        src={user.avatar ?? undefined}
                        alt={user.username}
                      />
                      <AvatarFallback>
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-[10px]">
                    {user.username}
                  </TableCell>
                  <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-[10px]">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-[10px]">
                    {user.date.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    {/* delete account */}
                    <DeleteAccountUser />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="text-muted-foreground"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className="text-muted-foreground"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(index + 1);
                  }}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className="text-muted-foreground"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
