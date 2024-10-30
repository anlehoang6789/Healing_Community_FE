"use client";
import DeleteAccountModerator from "@/app/admin/manage-accounts-moderator/delete-account-moderator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import React from "react";

type ModeratorList = {
  id: string;
  date: Date;
  moderatorName: string;
  email: string;
  avatar: string;
  status: "active" | "inactive";
};

const data: ModeratorList[] = [
  {
    id: "1",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "active",
  },
  {
    id: "2",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    status: "active",
  },
  {
    id: "3",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "active",
  },
  {
    id: "4",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    status: "active",
  },
  {
    id: "5",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "active",
  },
  {
    id: "6",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=6",
    status: "active",
  },
  {
    id: "7",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=7",
    status: "active",
  },
  {
    id: "8",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=8",
    status: "inactive",
  },
  {
    id: "9",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=9",
    status: "inactive",
  },
  {
    id: "10",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=10",
    status: "inactive",
  },
  {
    id: "11",
    date: new Date("2023-05-01T10:00:00"),
    moderatorName: "Nguyễn Văn A",
    email: "abc@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "active",
  },
];

export default function TableListModreator() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const transactionsPerPage = 8;
  const totalPages = Math.ceil(data.length / transactionsPerPage);

  // Sort transactions by date (most recent first)
  const sortedTransactions = [...data].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const getCurrentPageTransactions = () => {
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    return sortedTransactions.slice(startIndex, endIndex);
  };

  const getStatusBadge = (status: ModeratorList["status"]) => {
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
                  Trạng thái
                </TableHead>
                <TableHead className="lg:text-sm md:tex-sm text-[10px]">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCurrentPageTransactions().map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-[10px]">
                    <img
                      src={transaction.avatar}
                      alt="avatar"
                      className="h-5 w-5 md:h-10 md:w-10 rounded-full"
                    />
                  </TableCell>
                  <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-[10px]">
                    {transaction.moderatorName}
                  </TableCell>
                  <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-[10px]">
                    {transaction.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-[10px]">
                    {format(transaction.date, "dd/MM/yyyy HH:mm")}
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <DeleteAccountModerator />
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
