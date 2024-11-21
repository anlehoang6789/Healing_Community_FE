"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";
import { PaymentHistoryType } from "@/schemaValidations/payment.schema";
import { Badge } from "@/components/ui/badge";
import PaymentHistoryDetails from "@/app/user/payment-history/payment-history-details";
import { usePaymentHistoryQuery } from "@/queries/usePayment";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { PaymentHistoryStatus } from "@/constants/type";

type PaymentStatusBadgeVariant =
  | "success"
  | "destructive"
  | "cancel"
  | "upcoming";

const PaymentHistoryTableContext = createContext<{
  setPaymentIdDetails: (value: string) => void;
  paymentIdDetails: string | undefined;
}>({
  setPaymentIdDetails: (value: string | undefined) => {},
  paymentIdDetails: undefined,
});

//format lại status
const formatPaymentStatus = (
  status: keyof typeof PaymentHistoryStatus
): {
  text: string;
  variant: PaymentStatusBadgeVariant;
} => {
  const statusMap: Record<
    keyof typeof PaymentHistoryStatus,
    { text: string; variant: PaymentStatusBadgeVariant }
  > = {
    0: { text: "Chờ thanh toán", variant: "upcoming" },
    1: { text: "Đã thanh toán", variant: "success" },
    2: { text: "Lỗi thanh toán", variant: "destructive" },
    3: { text: "Đã hủy", variant: "cancel" },
    4: { text: "Không xác định", variant: "destructive" },
  };

  return statusMap[status] ?? statusMap[4];
};

export const columns: ColumnDef<PaymentHistoryType>[] = [
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
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá tiền
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-textChat">
        {formatCurrency(row.getValue("amount"))}
      </div>
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
      <div className="text-textChat">
        {formatDateTime(row.getValue("paymentDate"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue(
        "status"
      ) as keyof typeof PaymentHistoryStatus;
      const { text, variant } = formatPaymentStatus(status);
      return (
        <div className="flex items-center">
          <Badge variant={variant}>{text}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setPaymentIdDetails } = useContext(PaymentHistoryTableContext);
      const openDeatailsPayment = () => {
        setPaymentIdDetails(row.original.paymentId);
      };

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4 text-textChat" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openDeatailsPayment}>
              Xem chi tiết
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Số lượng item trên 1 trang
const PAGE_SIZE = 10;
export default function ViewPaymentHistory() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  // const params = Object.fromEntries(searchParam.entries())
  const [paymentIdDetails, setPaymentIdDetails] = useState<
    string | undefined
  >();
  //tao bien lay data tu api
  const paymentHistoryListQuery = usePaymentHistoryQuery();
  const data = paymentHistoryListQuery.data?.payload.data ?? [];

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
    <PaymentHistoryTableContext.Provider
      value={{
        paymentIdDetails,
        setPaymentIdDetails,
      }}
    >
      <div className="w-full">
        <PaymentHistoryDetails
          id={paymentIdDetails}
          setId={setPaymentIdDetails}
          onSubmitSuccess={() => {}}
        />
        <div className="flex items-center py-4">
          <Input
            placeholder="Tìm theo đơn hàng"
            value={
              (table.getColumn("orderCode")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("orderCode")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
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
                    Không có giao dịch nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-xs text-muted-foreground py-4 flex-1 ">
            Hiển thị{" "}
            <strong>{table.getPaginationRowModel().rows.length}</strong> trong{" "}
            <strong>{data.length}</strong> kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname="/user/payment-history"
            />
          </div>
        </div>
      </div>
    </PaymentHistoryTableContext.Provider>
  );
}
