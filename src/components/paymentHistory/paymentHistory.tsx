"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";
import { GetManagerPaymentForUserAndExpertType } from "@/schemaValidations/payment.schema";
import { usePaymentHistoryForUserQuery } from "@/queries/usePayment";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export const columns: ColumnDef<GetManagerPaymentForUserAndExpertType>[] = [
  {
    id: "paymentId",
    header: "STT",
    cell: ({ row }) => <div className="text-textChat">{row.index + 1}</div>,
  },
  {
    id: "userInfo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thông tin khách hàng
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const userName = row.original.userName;
      const userEmail = row.original.userEmail;
      return (
        <div className="text-textChat flex flex-col">
          <span className="font-semibold">{userName}</span>
          <span>{userEmail}</span>
        </div>
      );
    },
  },
  {
    id: "expertInfo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thông tin chuyên gia
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const expertName = row.original.expertName;
      const expertEmail = row.original.expertEmail;
      return (
        <div className="text-textChat flex flex-col">
          <span className="font-semibold">{expertName}</span>
          <span>{expertEmail}</span>
        </div>
      );
    },
  },
  {
    id: `appointmentDate-startTime-endTime`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lịch tư vấn
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const appointmentDate = row.original.appointmentDate;
      const startTime = row.original.startTime;
      const endTime = row.original.endTime;
      const amount = row.original.amount;
      return (
        <div className="text-textChat flex flex-col">
          <div className="flex">
            <span className="font-semibold pr-1">Ngày tư vấn: </span>
            <span>{appointmentDate}</span>
          </div>
          <div className="flex">
            <span className="font-semibold pr-1">Thời gian: </span>
            <span>
              {startTime} - {endTime}
            </span>
          </div>
          <div className="flex">
            <span className="font-semibold pr-1">Giá tiền: </span>
            <span>{formatCurrency(amount)}</span>{" "}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày thanh toán
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-textChat text-sm">
        {formatDateTime(row.getValue("paymentDate"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái giao dịch
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: number = row.original.status;
      const statusMapping: Record<number, string> = {
        0: "Chờ thanh toán",
        1: "Người dùng đã thanh toán",
        2: "Chuyên gia đã nhận tiền",
        3: "Người dùng hủy thanh toán",
        4: "Người dùng được hoàn tiền",
      };
      const statusLabel = statusMapping[status] || "Không xác định";

      const statusColor: Record<number, string> = {
        0: "bg-gray-100 text-gray-800 text-xs",
        1: "bg-blue-100 text-blue-800 text-xs",
        2: "bg-green-100 text-green-800 text-xs",
        3: "bg-red-100 text-red-800 text-xs",
        4: "bg-yellow-100 text-yellow-800 text-xs",
      };

      return (
        <span
          className={`px-2 py-1 rounded-md text-sm font-medium ${
            statusColor[status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {statusLabel}
        </span>
      );
    },
  },
];

// Số lượng item trên 1 trang
const PAGE_SIZE = 10;
export default function ViewPaymentHistoryForUser() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  // const params = Object.fromEntries(searchParam.entries())
  //tao bien lay data tu api
  // const listToPaymentHistoryForUser = usePaymentHistoryForUserQuery();
  // const data = listToPaymentHistoryForUser.data?.payload.data ?? [];
  const data: any = [];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
    pageSize: PAGE_SIZE, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE,
    });
  }, [table, pageIndex]);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-4 sm:gap-2">
        <Input
          placeholder="Tìm kiếm ngày thanh toán ..."
          value={
            (table.getColumn("paymentDate")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("paymentDate")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border overflow-x-auto max-w-full">
        <Table className="max-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-textChat"
                >
                  Bạn chưa có giao dịch nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 py-4">
        <div className="text-xs text-muted-foreground text-center flex-1 sm:text-left">
          Hiển thị <strong>{table.getPaginationRowModel().rows.length}</strong>{" "}
          trong <strong>{data.length}</strong> kết quả
        </div>
        <div>
          <AutoPagination
            page={table.getState().pagination.pageIndex + 1}
            pageSize={table.getPageCount()}
            pathname="/payment-history"
          />
        </div>
      </div>
    </div>
  );
}
