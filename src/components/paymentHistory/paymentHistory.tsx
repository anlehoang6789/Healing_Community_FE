"use client";

import React from "react";
import { format } from "date-fns";
import { Plus, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Transaction = {
  id: string;
  date: Date;
  customerName: string;
  orderId: string;
  amount: number;
  status: "completed" | "pending" | "failed";
};

const transactions: Transaction[] = [
  {
    id: "1",
    date: new Date("2023-05-01T10:00:00"),
    customerName: "Nguyễn Văn A",
    orderId: "ORD001",
    amount: 500000,
    status: "completed",
  },
  {
    id: "2",
    date: new Date("2023-05-02T11:30:00"),
    customerName: "Trần Thị B",
    orderId: "ORD002",
    amount: -200000,
    status: "completed",
  },
  {
    id: "3",
    date: new Date("2023-05-03T09:15:00"),
    customerName: "Lê Văn C",
    orderId: "ORD003",
    amount: 1000000,
    status: "pending",
  },
  {
    id: "4",
    date: new Date("2023-05-04T14:45:00"),
    customerName: "Phạm Thị D",
    orderId: "ORD004",
    amount: -50000,
    status: "failed",
  },
  {
    id: "5",
    date: new Date("2023-05-05T16:20:00"),
    customerName: "Hoàng Văn E",
    orderId: "ORD005",
    amount: 750000,
    status: "completed",
  },
  {
    id: "6",
    date: new Date("2023-05-06T08:30:00"),
    customerName: "Trương Thị F",
    orderId: "ORD006",
    amount: 300000,
    status: "completed",
  },
  {
    id: "7",
    date: new Date("2023-05-07T13:45:00"),
    customerName: "Đặng Văn G",
    orderId: "ORD007",
    amount: -150000,
    status: "pending",
  },
  {
    id: "8",
    date: new Date("2023-05-08T10:00:00"),
    customerName: "Bùi Thị H",
    orderId: "ORD008",
    amount: 600000,
    status: "completed",
  },
  {
    id: "9",
    date: new Date("2023-05-09T15:30:00"),
    customerName: "Lý Văn I",
    orderId: "ORD009",
    amount: -80000,
    status: "failed",
  },
  {
    id: "10",
    date: new Date("2023-05-10T11:20:00"),
    customerName: "Ngô Thị K",
    orderId: "ORD010",
    amount: 450000,
    status: "completed",
  },
  {
    id: "11",
    date: new Date("2023-05-11T09:10:00"),
    customerName: "Vũ Văn L",
    orderId: "ORD011",
    amount: 850000,
    status: "pending",
  },
  {
    id: "12",
    date: new Date("2023-05-12T14:00:00"),
    customerName: "Đỗ Thị M",
    orderId: "ORD012",
    amount: -250000,
    status: "completed",
  },
];

export default function ViewPaymentHistory() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const transactionsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  // Sort transactions by date (most recent first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const getCurrentPageTransactions = () => {
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    return sortedTransactions.slice(startIndex, endIndex);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant={"outline"} className="bg-green-500 text-white">
            Hoàn thành
          </Badge>
        );
      case "pending":
        return (
          <Badge variant={"outline"} className="bg-yellow-500 text-white">
            Đang xử lý
          </Badge>
        );
      case "failed":
        return (
          <Badge variant={"outline"} className="bg-red-500 text-white">
            Thất bại
          </Badge>
        );
    }
  };

  return (
    <div className="w-full bg-background h-auto md:p-4 lg:p-4 sm:p-0 pb-4 pt-4 max-w-7xl overflow-hidden mx-auto md:rounded-lg lg:rounded-lg sm:rounded-none md:shadow-lg lg:shadow-lg sm:shadow-none  md:border lg:border sm:border-none">
      <h1 className="text-2xl font-bold mb-4 text-muted-foreground">
        Lịch sử giao dịch
      </h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="lg:text-sm md:tex-sm text-xs">
                Ngày giờ
              </TableHead>
              <TableHead className="lg:text-sm md:tex-sm text-xs">
                Tên khách hàng
              </TableHead>
              <TableHead className="lg:text-sm md:tex-sm text-xs">
                Mã đơn hàng
              </TableHead>
              <TableHead className="lg:text-sm md:tex-sm text-xs">
                Số tiền
              </TableHead>
              <TableHead className="lg:text-sm md:tex-sm text-xs">
                Trạng thái
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getCurrentPageTransactions().map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-xs">
                  {format(transaction.date, "dd/MM/yyyy HH:mm")}
                </TableCell>
                <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-xs">
                  {transaction.customerName}
                </TableCell>
                <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-xs">
                  {transaction.orderId}
                </TableCell>
                <TableCell className="text-muted-foreground lg:text-sm md:tex-sm text-xs">
                  <span
                    className={`flex items-center ${
                      transaction.amount >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.amount >= 0 ? (
                      <Plus size={16} />
                    ) : (
                      <Minus size={16} />
                    )}
                    {formatAmount(Math.abs(transaction.amount))}
                  </span>
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <div className="mt-4">
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
      </div> */}
    </div>
  );
}
