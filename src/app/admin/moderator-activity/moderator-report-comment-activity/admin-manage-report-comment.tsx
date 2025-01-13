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
import { GetModeratorActivityReportCommentSchemaType } from "@/schemaValidations/report.schema";
import { formatDate, formatDateTime } from "@/lib/utils";
import { useGetModeratorActivityReportCommentQuery } from "@/queries/useReport";

const columns: ColumnDef<GetModeratorActivityReportCommentSchemaType>[] = [
  {
    id: "id",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "userEmail",
    header: "Email người kiểm duyệt",
    cell: ({ row }) => {
      return <div className="font-bold">{row.getValue("userEmail")}</div>;
    },
  },
  {
    accessorKey: "userName",
    header: "Tên người kiểm duyệt",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("userName")}</div>;
    },
  },
  {
    accessorKey: "content",
    header: "Nội dung bình luận bị báo cáo",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("content")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Thời gian phản hồi
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
];

const PAGE_SIZE = 10;

export default function AdminManageReportComment() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;

  const adminManageReportCommentList =
    useGetModeratorActivityReportCommentQuery();
  const data = adminManageReportCommentList.data?.payload.data ?? [];

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
          placeholder="Tìm kiếm theo email nguời kiểm duyệt ..."
          value={
            (table.getColumn("userEmail")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("userEmail")?.setFilterValue(event.target.value)
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
            pathname="/admin/moderator-activity/moderator-report-comment-activity"
          />
        </div>
      </div>
    </div>
  );
}
