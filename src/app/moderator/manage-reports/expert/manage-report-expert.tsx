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
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";
import { GetReportExpertSchemaType } from "@/schemaValidations/report.schema";
import { formatDate, formatDateTime, handleErrorApi } from "@/lib/utils";
import {
  useApproveOrRejectReportExpertMutation,
  useGetReportExpertQuery,
} from "@/queries/useReport";
import { toast } from "@/hooks/use-toast";

const columns: ColumnDef<GetReportExpertSchemaType>[] = [
  {
    id: "id",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    id: "annunciator",
    header: "Thông tin người báo cáo",
    cell: ({ row }) => {
      const userName = row.original.userName;
      const userEmail = row.original.userEmail;

      return (
        <div>
          <div className="font-semibold">{userName}</div>
          <div className="text-xs text-muted-foreground">{userEmail}</div>
        </div>
      );
    },
  },
  {
    id: "nameReport",
    header: "Thông tin người bị báo cáo",
    cell: ({ row }) => {
      const reportedUserName = row.original.expertName;
      const reportedUserEmail = row.original.expertEmail;

      return (
        <div>
          <div className="font-semibold">{reportedUserName}</div>
          <div className="text-xs text-muted-foreground">
            {reportedUserEmail}
          </div>
        </div>
      );
    },
  },
  {
    id: "reportDescription",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nội dung báo cáo
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const reportExpertDescription = row.original.reportDescription;
      return (
        <>
          <div className="font-medium">{reportExpertDescription}</div>
        </>
      );
    },
  },
  {
    id: `consultation-info`,
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
      const appointmentDate = row.original.appoinmtentDate;
      const startTime = row.original.startTime;
      const endTime = row.original.endTime;
      return (
        <div className="text-textChat flex flex-col">
          <div className="flex">
            <span className="font-semibold pr-1">Ngày tư vấn: </span>
            <span>{formatDate(appointmentDate)}</span>
          </div>
          <div className="flex">
            <span className="font-semibold pr-1">Thời gian: </span>
            <span>
              {startTime} - {endTime}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Thời gian
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">
        {formatDateTime(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    id: "isApprove",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trạng thái
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const isApprove = row.original.isApprove;
      switch (isApprove) {
        case true:
          return (
            <div className="bg-green-100 text-green-800 px-1 py-1 rounded-lg text-sm text-center">
              Đã duyệt
            </div>
          );
        case false:
          return (
            <div className="bg-red-100 text-red-800 px-1 py-1 rounded-lg text-sm text-center">
              Từ chối
            </div>
          );
        default:
          return (
            <div className="bg-gray-100 text-gray-800 px-1 py-1 rounded-lg text-sm text-center">
              Chưa duyệt
            </div>
          );
      }
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: function Actions({ row }) {
      const approveOrRejectReportExpertMutation =
        useApproveOrRejectReportExpertMutation();
      if (row.original.isApprove !== null) return null;

      const handleApproveReportPost = async () => {
        if (approveOrRejectReportExpertMutation.isPending) return;
        try {
          const res = await approveOrRejectReportExpertMutation.mutateAsync({
            appointmentId: row.original.appointmentId,
            isApprove: true,
          });
          toast({
            description: res.payload.message,
            variant: "success",
          });
        } catch (error: any) {
          handleErrorApi(error);
        }
      };

      const handleRejectReportPost = async () => {
        if (approveOrRejectReportExpertMutation.isPending) return;
        try {
          const res = await approveOrRejectReportExpertMutation.mutateAsync({
            appointmentId: row.original.appointmentId,
            isApprove: false,
          });
          toast({
            description: res.payload.message,
            variant: "success",
          });
        } catch (error: any) {
          handleErrorApi(error);
        }
      };
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleApproveReportPost}>
              Duyệt
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRejectReportPost}>
              Từ chối
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const PAGE_SIZE = 10;

export default function ManageReportExpert() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;

  const listReportExpert = useGetReportExpertQuery();
  const data = listReportExpert.data?.payload.data ?? [];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize: PAGE_SIZE,
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm theo nội dung bị báo cáo ..."
          value={
            (table
              .getColumn("reportDescription")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("reportDescription")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-xs text-muted-foreground py-4 flex-1 ">
          Hiển thị <strong>{table.getPaginationRowModel().rows.length}</strong>{" "}
          trong <strong>{data.length}</strong> kết quả
        </div>
        <div>
          <AutoPagination
            page={table.getState().pagination.pageIndex + 1}
            pageSize={table.getPageCount()}
            pathname="/moderator/manage-reports/expert"
          />
        </div>
      </div>
    </div>
  );
}
