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
import { createContext, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";

import {
  GetListRequestGroupByUserIdResponseType,
  GetRequestGroupType,
} from "@/schemaValidations/group.schema";
import { useGetListRequestedGroupByUserIdQuery } from "@/queries/useGroup";

import { formatDateTime, getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetAllUsers } from "@/queries/useUser";
import { UserType } from "@/schemaValidations/user.schema";
import Image from "next/image";

type RequestGroupItem = GetListRequestGroupByUserIdResponseType["data"][0];

const RequestGroupTableContext = createContext<{
  experienceDelete: RequestGroupItem | null;
  setExperienceDelete: (value: RequestGroupItem | null) => void;
}>({
  experienceDelete: null,
  setExperienceDelete: (value: RequestGroupItem | null) => {},
});

const ApproverNameCell = ({ userId }: { userId: string }) => {
  const { data: users } = useGetAllUsers();

  const findUserById = (userId: string): UserType | undefined => {
    return users?.find((user) => user.userId === userId);
  };

  // Tìm thông tin người dùng dựa trên userId
  const user = findUserById(userId);

  // Hiển thị tên người duyệt
  return <div>{user?.fullName || user?.userName || ""}</div>;
};

export const columns: ColumnDef<GetRequestGroupType>[] = [
  {
    id: "index",
    header: "STT",
    cell: ({ row }) => <div className="text-textChat">{row.index + 1}</div>,
  },

  {
    accessorKey: "requestedAt",
    header: "Ngày yêu cầu",
    cell: ({ row }) => {
      const requestedAt = row.getValue("requestedAt") as string;
      const formattedDateTime = formatDateTime(requestedAt);
      return <div className="text-textChat">{formattedDateTime}</div>;
    },
  },

  {
    accessorKey: "coverImg",
    header: "Ảnh bìa",
    cell: ({ row }) => {
      const coverImg = row.getValue("coverImg") as string | null;
      if (!coverImg) {
        // Kiểm tra nếu coverImg là null hoặc chuỗi rỗng
        return null; // Không hiển thị gì
      }
      return (
        <div className="text-textChat">
          <Image
            src={coverImg}
            alt="Ảnh bìa"
            width={80}
            height={80}
            className="w-20 h-20 rounded-lg object-cover"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "groupName",
    header: "Tên nhóm",
    cell: ({ row }) => (
      <div className="text-textChat font-semibold">
        {row.getValue("groupName")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => (
      <div className="text-textChat ">{row.getValue("description") ?? ""}</div>
    ),
  },
  {
    accessorKey: "approvedAt",
    header: "Ngày phê duyệt",
    cell: ({ row }) => {
      const approvedAt = row.getValue("approvedAt") as string | null;

      if (approvedAt === null) {
        return null;
      }

      const formattedDateTime = formatDateTime(approvedAt);
      return <div className="text-textChat">{formattedDateTime}</div>;
    },
  },

  {
    id: "approvedById",
    header: "Người phê duyệt",
    cell: ({ row }) => {
      const userId = row.original.approvedById as string;
      return (
        <div className="text-textChat">
          <ApproverNameCell userId={userId} />
        </div>
      );
    },
  },
  {
    accessorKey: "isApproved",
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
      const isApproved: boolean | null = row.original.isApproved;
      const statusMapping: Record<string, string> = {
        true: "Đã phê duyệt",
        false: "Từ chối yêu cầu",
        null: "Đang chờ phê duyệt",
      };

      // Xác định nhãn trạng thái
      const statusLabel = statusMapping[String(isApproved)] || "Không xác định";

      // Xác định màu sắc dựa trên giá trị isApproved
      const statusColors: Record<string, string> = {
        true: "border-green-500 text-green-500", // Màu xanh lá cho true
        false: "border-red-500 text-red-500", // Màu đỏ cho false
        null: "border-gray-500 text-gray-500", // Màu xám cho null
      };

      // Lấy màu sắc tương ứng, mặc định là màu xám nếu không khớp
      const statusColor =
        statusColors[String(isApproved)] || "border-gray-500 text-gray-500";

      return (
        <span
          className={`px-2 py-1 rounded-md text-sm font-medium border ${statusColor}`}
        >
          {statusLabel}
        </span>
      );
    },
  },
];

// Số lượng item trên 1 trang
const PAGE_SIZE = 5;
export default function TableRequestedGroups() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  const userId = getUserIdFromLocalStorage();
  // const params = Object.fromEntries(searchParam.entries())
  const [experienceDelete, setExperienceDelete] =
    useState<RequestGroupItem | null>(null);
  //tao bien lay data tu api
  const listRequestGroup = useGetListRequestedGroupByUserIdQuery(
    userId as string
  );
  const data = listRequestGroup.data?.payload.data ?? [];

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
    <RequestGroupTableContext.Provider
      value={{
        experienceDelete,
        setExperienceDelete,
      }}
    >
      <div className="w-full">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Danh sách yêu cầu
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-4 sm:gap-2">
          <Input
            placeholder="Tìm kiếm tên nhóm ..."
            value={
              (table.getColumn("groupName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("groupName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border overflow-x-auto max-w-full">
          <Table className="w-full ">
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
                    Chưa có yêu cầu tạo nhóm nào.
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
              pathname="/user/list-of-groups"
            />
          </div>
        </div>
      </div>
    </RequestGroupTableContext.Provider>
  );
}
