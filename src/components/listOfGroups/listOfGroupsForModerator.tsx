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
  Pencil,
  Pin,
  Trash2,
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
import DeleteGroup from "@/app/moderator/manage-groups/delete-group";
import EditGroup from "@/app/moderator/manage-groups/edit-group";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Group = {
  id: string;
  name: string;
  imageUrl: string;
  memberCount: number;
  isPublic: boolean;
  createdDate: string;
  leader?: string;
};

const groups: Group[] = [
  {
    id: "1",
    name: "PHỐT MÁI ẤM HOA HỒNG QUẬN 12",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 5000,
    createdDate: "2023-01-01",
    isPublic: true,
  },
  {
    id: "2",
    name: "Capital3group USA | EB3 Unskilled Green Card",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 10000,
    createdDate: "2023-01-01",
    isPublic: true,
  },
  {
    id: "3",
    name: "Thanh lý khu vui chơi",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 15000,
    createdDate: "2023-01-01",
    isPublic: false,
    leader: "Gia Minh",
  },
  {
    id: "4",
    name: "PHỐT MÁI ẤM HOA HỒNG QUẬN 12",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 5000,
    createdDate: "2023-01-01",
    isPublic: true,
  },
  {
    id: "5",
    name: "Capital3group USA | EB3 Unskilled Green Card",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 10000,
    createdDate: "2023-01-01",
    isPublic: true,
  },
  {
    id: "6",
    name: "Thanh lý khu vui chơi",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 15000,
    createdDate: "2023-01-01",
    isPublic: false,
    leader: "Gia Minh",
  },
  {
    id: "7",
    name: "PHỐT MÁI ẤM HOA HỒNG QUẬN 12",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 5000,
    createdDate: "2023-01-01",
    isPublic: true,
  },
  {
    id: "8",
    name: "Capital3group USA | EB3 Unskilled Green Card",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 10000,
    createdDate: "2023-01-01",
    isPublic: true,
  },
  {
    id: "9",
    name: "Thanh lý khu vui chơi",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 15000,
    createdDate: "2023-01-01",
    isPublic: false,
    leader: "Gia Minh",
  },
  {
    id: "10",
    name: "PHỐT MÁI ẤM HOA HỒNG QUẬN 12",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 5000,
    createdDate: "2023-01-01",
    isPublic: true,
  },
  {
    id: "11",
    name: "Capital3group USA | EB3 Unskilled Green Card",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 10000,
    createdDate: "2023-01-01",
    isPublic: true,
  },
  {
    id: "12",
    name: "Thanh lý khu vui chơi",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    memberCount: 15000,
    createdDate: "2023-01-01",
    isPublic: false,
    leader: "Gia Minh",
  },
];

export default function ListOfGroupsForModerator() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = React.useState(1);
  const groupsPerPage = 9; // Số nhóm hiển thị trên mỗi trang
  const totalPages = Math.ceil(groups.length / groupsPerPage);

  const getCurrentPageGroups = () => {
    const startIndex = (currentPage - 1) * groupsPerPage;
    const endIndex = startIndex + groupsPerPage;
    return groups.slice(startIndex, endIndex);
  };

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {getCurrentPageGroups().map((group) => (
          <Card key={group.id} className="transition-shadow relative">
            <CardContent className="p-4 flex items-center space-x-4 relative">
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
                {/* <HoverCardTrigger asChild> */}
                <Link href="#">
                  <h2 className="font-semibold hover:underline">
                    {group.name}
                  </h2>
                </Link>
                {/* </HoverCardTrigger> */}
                <p className="text-sm text-gray-500">
                  Thành viên: {group.memberCount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Trạng thái: {group.isPublic ? "Công khai" : "Riêng tư"}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="mb-auto">
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
                  {/* Chỉnh sửa nhóm */}
                  <EditGroup group={group} />

                  {/* xóa nhóm */}
                  <DeleteGroup />
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          //     <HoverCardContent
          //       className={`w-80 mt-4 ${
          //         theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          //       }`}
          //     >
          //       <div className="flex items-start gap-4">
          //         <Link href="#">
          //           <Avatar className="h-16 w-16">
          //             <AvatarImage src={group.imageUrl} alt={group.name} />
          //             <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
          //           </Avatar>
          //         </Link>
          //         <Link href="#">
          //           <h3 className="font-semibold hover:underline">
          //             {group.name}
          //           </h3>
          //         </Link>
          //       </div>
          //       <div className="mt-4">
          //         <p className="text-sm text-gray-500 flex items-center mt-1">
          //           <Users className="h-4 w-4 mr-1" />
          //           {group.isPublic ? "Nhóm Công khai" : "Nhóm Riêng tư"}{" "}
          //         </p>
          //         <p className="text-sm text-gray-500 mt-1">
          //           {group.memberCount.toLocaleString()} thành viên
          //         </p>
          //       </div>
          //       <div className="flex gap-4">
          //         <Button className="w-full mt-4">Truy cập vào nhóm</Button>
          //       </div>
          //     </HoverCardContent>
          //   </HoverCard>
        ))}
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
