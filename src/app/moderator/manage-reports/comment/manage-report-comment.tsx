"use client";

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
import { createContext, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";

import { formatDateTime, handleErrorApi } from "@/lib/utils";

import {
  GetReportCommentResponseType,
  ReportCommentDataType,
} from "@/schemaValidations/post.schema";
import {
  useApproveOrRejectReportCommentMutation,
  useGetReportCommentQuery,
} from "@/queries/usePost";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { toast } from "@/hooks/use-toast";

type ReportCommentItem = GetReportCommentResponseType["data"][0];

const ReportCommentTableContext = createContext<{
  experienceDelete: ReportCommentItem | null;
  setExperienceDelete: (value: ReportCommentItem | null) => void;
}>({
  experienceDelete: null,
  setExperienceDelete: (value: ReportCommentItem | null) => {},
});

export const columns: ColumnDef<ReportCommentDataType>[] = [
  {
    id: "index",
    header: "STT",
    cell: ({ row }) => row.index + 1,
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
    accessorKey: "nameReport",
    header: "Thông tin người bị báo cáo",
    cell: ({ row }) => {
      const reportedUserName = row.original.reportedUserName;
      const reportedUserEmail = row.original.reportedUserEmail;

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
    accessorKey: "content",
    header: () => "Nội dung bình luận",
    cell: ({ row }) => (
      <TableCell style={{ width: "250px" }}>
        <div className="text-textChat">{row.getValue("content")}</div>
      </TableCell>
    ),
  },

  {
    accessorKey: "reportTypeEnum",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Lý do
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const reportTypeEnum = row.original.reportTypeEnum;
      const reportTypeMapping: Record<number, string> = {
        1: "Ngôn từ không phù hợp",
        2: "Chỉ là tôi không thích nội dung này",
        3: "Thông tin sai lệch",
        4: "Vi phạm quy tắc cộng đồng",
      };
      const reportTypeLabel =
        reportTypeMapping[reportTypeEnum] || "Không xác định";

      const reportTypeColor: Record<number, string> = {
        1: "bg-gray-100 text-gray-800 text-xs",
        2: "bg-pink-100 text-pink-800 text-xs",
        3: "bg-red-100 text-red-800 text-xs",
        4: "bg-rose-100 text-rose-800 text-xs",
      };
      return (
        <span
          className={`px-2 py-1 rounded-md text-sm font-medium ${
            reportTypeColor[reportTypeEnum] || "bg-gray-100 text-gray-800"
          }`}
        >
          {reportTypeLabel}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Thời gian",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const formattedDateTime = formatDateTime(createdAt);
      return <div className="text-textChat">{formattedDateTime}</div>;
    },
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
      if (row.original.isApprove !== null) return null;
      const approveOrRejectReportCommentMutation =
        useApproveOrRejectReportCommentMutation();

      const handleApproveReportPost = async () => {
        if (approveOrRejectReportCommentMutation.isPending) return;
        try {
          const res = await approveOrRejectReportCommentMutation.mutateAsync({
            commentId: row.original.commentId,
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
        if (approveOrRejectReportCommentMutation.isPending) return;
        try {
          const res = await approveOrRejectReportCommentMutation.mutateAsync({
            commentId: row.original.commentId,
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

// Số lượng item trên 1 trang
const PAGE_SIZE = 10;
export default function TableReportComment() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  // const params = Object.fromEntries(searchParam.entries())
  const [experienceDelete, setExperienceDelete] =
    useState<ReportCommentItem | null>(null);
  //tao bien lay data tu api
  const listReportComment = useGetReportCommentQuery();
  const data = listReportComment.data?.payload.data ?? [];

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
    <ReportCommentTableContext.Provider
      value={{
        experienceDelete,
        setExperienceDelete,
      }}
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-4 sm:gap-2">
          <Input
            placeholder="Tìm kiếm bình luận ..."
            value={
              (table.getColumn("content")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("content")?.setFilterValue(event.target.value)
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
                    Chưa có báo cáo bình luận nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 py-4">
          <div className="text-xs text-muted-foreground text-center flex-1 sm:text-left">
            Hiển thị{" "}
            <strong>{table.getPaginationRowModel().rows.length}</strong> trong{" "}
            <strong>{data.length}</strong> kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname="/moderator/manage-reports/comment"
            />
          </div>
        </div>
      </div>
    </ReportCommentTableContext.Provider>
  );
}
