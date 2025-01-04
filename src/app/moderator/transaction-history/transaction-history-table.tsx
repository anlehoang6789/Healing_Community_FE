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
import { GetManagerPaymentForModeratorType } from "@/schemaValidations/payment.schema";
import { usePaymentHistoryForModeratorQuery } from "@/queries/usePayment";

export const columns: ColumnDef<GetManagerPaymentForModeratorType>[] = [
  {
    id: "paymentId",
    header: "STT",
    cell: ({ row }) => <div className="text-textChat">{row.index + 1}</div>,
  },
  {
    accessorKey: "orderCode",
    header: "Mã đơn hàng",
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("orderCode")}</div>
    ),
  },
  {
    accessorKey: "userName",
    header: "Tên khách hàng đăng ký",
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("userName")}</div>
    ),
  },
  {
    accessorKey: "userEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email khách hàng
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-textChat font-semibold">
        {row.getValue("userEmail")}
      </div>
    ),
  },
  {
    accessorKey: "expertName",
    header: "Tên chuyên gia",
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("expertName")}</div>
    ),
  },
  {
    accessorKey: "expertEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email chuyên gia
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-textChat font-semibold">
        {row.getValue("expertEmail")}
      </div>
    ),
  },
  {
    accessorKey: "appointmentDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tư vấn
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("appointmentDate")}</div>
    ),
  },
  {
    id: "startTime - endTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giờ bắt đầu - kết thúc
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-textChat font-semibold">
        {row.getValue("startTime")} - {row.getValue("endTime")}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gía tiền
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("amount")}</div>
    ),
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
      <div className="text-textChat">{row.getValue("paymentDate")}</div>
    ),
  },
  {
    accessorKey: "userPaymentQrCodeLink",
    header: "Hoàn tiền khách hàng",
    cell: ({ row }) => {
      const userPaymentQrCodeLink: URL | undefined | string = row.getValue(
        "userPaymentQrCodeLink"
      );
      return (
        <button
          onClick={() => {
            if (userPaymentQrCodeLink) {
              window.open(
                userPaymentQrCodeLink,
                "_blank",
                "noopener,noreferrer"
              );
            } else {
              alert("Đường dẫn không hợp lệ!");
            }
          }}
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium"
        >
          Hoàn tiền người dùng
        </button>
      );
    },
  },
  {
    accessorKey: "expertPaymentQrCodeLink",
    header: "Chuyển tiền chuyên gia",
    cell: ({ row }) => {
      const expertPaymentQrCodeLink: URL | undefined | string = row.getValue(
        "expertPaymentQrCodeLink"
      );
      return (
        <button
          onClick={() => {
            if (expertPaymentQrCodeLink) {
              window.open(
                expertPaymentQrCodeLink,
                "_blank",
                "noopener,noreferrer"
              );
            } else {
              alert("Đường dẫn không hợp lệ!");
            }
          }}
          className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm font-medium"
        >
          Chuyển tiền chuyên gia
        </button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
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
        0: "bg-gray-100 text-gray-800",
        1: "bg-blue-100 text-blue-800",
        2: "bg-green-100 text-green-800",
        3: "bg-red-100 text-red-800",
        4: "bg-yellow-100 text-yellow-800",
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
export default function TransactionHistoryTable() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  // const params = Object.fromEntries(searchParam.entries())
  //tao bien lay data tu api
  const listToPaymentHistoryForModerator = usePaymentHistoryForModeratorQuery();
  const data = listToPaymentHistoryForModerator.data?.payload.data ?? [];

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
          placeholder="Tìm kiếm mã đơn hàng ..."
          value={
            (table.getColumn("orderCode")?.getFilterValue() as number) ?? ""
          }
          onChange={(event) =>
            table.getColumn("orderCode")?.setFilterValue(event.target.value)
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
                  No results.
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
            pathname="/moderator/transaction-history"
          />
        </div>
      </div>
    </div>
  );
}
