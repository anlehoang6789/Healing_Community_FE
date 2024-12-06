"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteGroup from "@/app/moderator/manage-groups/delete-group";
import EditGroup from "@/app/moderator/manage-groups/edit-group";

import AutoPagination from "@/components/auto-pagination";
import { useSearchParams } from "next/navigation";
import { useGetAllGroupsQuery } from "@/queries/useGroup";

export default function ListOfGroupsForModerator() {
  const { theme } = useTheme();

  const groupsPerPage = 9;

  const searchParams = useSearchParams();
  const pageFromParams = searchParams.get("page");
  const currentPage = pageFromParams ? parseInt(pageFromParams) : 1;

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;

  const { data: response, isLoading, error } = useGetAllGroupsQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
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
  if (error) {
    return <div>Đã xảy ra lỗi khi tải dữ liệu nhóm.</div>;
  }

  const groups = response?.payload?.data || [];
  const totalPages = Math.ceil(groups.length / groupsPerPage);

  const getCurrentPageGroups = () => {
    const startIndex = (currentPage - 1) * groupsPerPage;
    const endIndex = startIndex + groupsPerPage;
    return groups.slice(startIndex, endIndex);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {getCurrentPageGroups().map((group) => (
          <Card key={group.groupId} className="transition-shadow relative">
            <CardContent className="p-4 flex items-center space-x-4 relative">
              <Link href="#">
                <Image
                  src={
                    group.avatarGroup ||
                    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                  }
                  alt={group.groupName}
                  width={90}
                  height={90}
                  className="cursor-pointer h-[90px] w-[90px] rounded-lg object-cover"
                />
              </Link>

              <div className="flex-1">
                <Link href="#">
                  <h2 className="font-semibold hover:underline">
                    {group.groupName}
                  </h2>
                </Link>
                <p className="text-sm text-gray-500">
                  Thành viên: {group.currentMemberCount}/{group.memberLimit}
                </p>
                <p className="text-sm text-gray-500">
                  Duyệt:{" "}
                  {group.isAutoApprove ? "Tự động duyệt" : "Duyệt thủ công"}
                </p>
                <p className="text-sm text-gray-500">
                  Trạng thái: {group.groupVisibility ? "Riêng tư" : "Công khai"}
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
                  className={`${
                    theme === "dark"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {/* Chỉnh sửa nhóm */}
                  <EditGroup group={group} />

                  {/* Xóa nhóm */}
                  <DeleteGroup
                    groupId={group.groupId}
                    groupName={group.groupName}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-xs text-muted-foreground py-4 flex-1 ">
          Hiển thị{" "}
          <strong>
            {indexOfFirstGroup + 1}-{Math.min(indexOfLastGroup, groups.length)}
          </strong>{" "}
          trong <strong>{groups.length}</strong> kết quả
        </div>
        <div>
          <AutoPagination
            page={currentPage}
            pageSize={totalPages}
            pathname="/moderator/manage-groups"
          />
        </div>
      </div>
    </div>
  );
}
