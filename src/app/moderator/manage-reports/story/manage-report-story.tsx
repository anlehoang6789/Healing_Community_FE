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
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";
import {
  GetReportPostListResType,
  GetReportPostSchemaType,
} from "@/schemaValidations/report.schema";
import { formatDateTime, handleErrorApi } from "@/lib/utils";
import {
  useApproveOrRejectReportPostMutation,
  useGetReportPostQuery,
} from "@/queries/useReport";
import ReportStoryDetails from "@/app/moderator/manage-reports/story/report-story-details";
import { toast } from "@/hooks/use-toast";

type ManageReportStoryItem = GetReportPostListResType["data"][0];

const AccountTableContext = createContext<{
  setReportApproveId: (value: string) => void;
  reportApproveId: string | undefined;
  rejectDelete: ManageReportStoryItem | null;
  setRejectDelete: (value: ManageReportStoryItem | null) => void;
}>({
  setReportApproveId: (value: string | undefined) => {},
  reportApproveId: undefined,
  rejectDelete: null,
  setRejectDelete: (value: ManageReportStoryItem | null) => {},
});

const columns: ColumnDef<GetReportPostSchemaType>[] = [
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
    id: "postTitle",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bài viết có tiêu đề
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const postTitle = row.original.postTitle;
      const postId = row.original.postId;
      return (
        <TableCell style={{ width: "250px" }}>
          <div className="font-bold line-clamp-2">{postTitle}</div>

          {/* Dialog xem bai viet */}
          <ReportStoryDetails postId={postId} />
        </TableCell>
      );
    },
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
      const { refetch } = useGetReportPostQuery();
      const approveOrRejectReportPostMutation =
        useApproveOrRejectReportPostMutation();
      if (row.original.isApprove !== null) return null;

      const handleApproveReportPost = async () => {
        if (approveOrRejectReportPostMutation.isPending) return;
        try {
          const res = await approveOrRejectReportPostMutation.mutateAsync({
            postId: row.original.postId,
            isApprove: true,
          });
          toast({
            description: res.payload.message,
            variant: "success",
          });
          await refetch();
        } catch (error: any) {
          handleErrorApi(error);
        }
      };

      const handleRejectReportPost = async () => {
        if (approveOrRejectReportPostMutation.isPending) return;
        try {
          const res = await approveOrRejectReportPostMutation.mutateAsync({
            postId: row.original.postId,
            isApprove: false,
          });
          toast({
            description: res.payload.message,
            variant: "success",
          });
          await refetch();
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

export default function ManageReportStory() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;

  const [reportApproveId, setReportApproveId] = useState<string | undefined>();
  const [rejectDelete, setRejectDelete] =
    useState<ManageReportStoryItem | null>(null);

  const listReportPost = useGetReportPostQuery();
  const data = listReportPost.data?.payload.data ?? [];

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
    <AccountTableContext.Provider
      value={{
        reportApproveId,
        setReportApproveId,
        rejectDelete,
        setRejectDelete,
      }}
    >
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Tìm kiếm theo tiêu đề bài viết ..."
            value={
              (table.getColumn("postTitle")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("postTitle")?.setFilterValue(event.target.value)
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
            Hiển thị{" "}
            <strong>{table.getPaginationRowModel().rows.length}</strong> trong{" "}
            <strong>{data.length}</strong> kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname="/moderator/manage-reports/story"
            />
          </div>
        </div>
      </div>
    </AccountTableContext.Provider>
  );
}
