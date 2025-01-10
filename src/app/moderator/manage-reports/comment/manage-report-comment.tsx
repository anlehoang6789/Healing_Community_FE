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

import { formatDateTime } from "@/lib/utils";

import {
  GetReportCommentResponseType,
  ReportCommentDataType,
} from "@/schemaValidations/post.schema";
import { useGetReportCommentQuery } from "@/queries/usePost";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

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
    accessorKey: "userName",
    header: "Người báo cáo",
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("userName")}</div>
    ),
  },
  {
    accessorKey: "reportedUserName",
    header: "Người bị báo cáo",
    cell: ({ row }) => (
      <TableCell style={{ width: "100px" }}>
        <div className="text-textChat ">{row.getValue("reportedUserName")}</div>
      </TableCell>
    ),
  },
  {
    accessorKey: "reportedUserEmail",
    header: "Email người bị báo cáo",
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("reportedUserEmail")}</div>
    ),
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
    header: "Nội dung báo cáo",
    cell: ({ row }) => {
      const reportTypeEnum = row.getValue("reportTypeEnum");
      let reportTypeText = "";

      switch (reportTypeEnum) {
        case 0:
          reportTypeText = "Ngôn từ không phù hợp";
          break;
        case 1:
          reportTypeText = "Chỉ là tôi không thích nội dung này";
          break;
        case 2:
          reportTypeText = "Thông tin sai lệch";
          break;
        case 3:
          reportTypeText = "Vi phạm quy tắc cộng đồng";
          break;
        default:
          reportTypeText = "Không xác định";
          break;
      }

      return <div className="text-textChat">{reportTypeText}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày báo cáo",
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const formattedDateTime = formatDateTime(createdAt);
      return <div className="text-textChat">{formattedDateTime}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      return <div className="text-textChat"></div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: function Actions({ row }) {
      // const { mutateAsync: approveOrRejectRequestGroup } =
      //   useApproveOrRejectRequestGroupMutation();

      // const handleApprove = async () => {
      //   try {
      //     const payload = {
      //       groupRequestId: row.original.groupRequestId,
      //       isApproved: true,
      //     };
      //     const result = await approveOrRejectRequestGroup(payload);
      //     toast({
      //       description: result.payload.data,
      //       variant: "success",
      //     });
      //   } catch (error) {
      //     handleErrorApi({ error });
      //   }
      // };

      // const handleReject = async () => {
      //   try {
      //     const payload = {
      //       groupRequestId: row.original.groupRequestId,
      //       isApproved: false,
      //     };
      //     const result = await approveOrRejectRequestGroup(payload);
      //     toast({
      //       description: result.payload.data,
      //       variant: "success",
      //     });
      //   } catch (error) {
      //     handleErrorApi({ error });
      //   }
      // };

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Duyệt</DropdownMenuItem>
            <DropdownMenuItem>Từ chối</DropdownMenuItem>
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
