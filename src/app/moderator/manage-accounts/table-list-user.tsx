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
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import {
  GetToManageUserListResType,
  GetToManageUserType,
} from "@/schemaValidations/user.schema";
import {
  useGetToManageUser,
  useUpdateStatusUserAccount,
} from "@/queries/useUser";

type AccountItem = GetToManageUserListResType["data"][0];

const AccountTableContext = createContext<{
  experienceDelete: AccountItem | null;
  setExperienceDelete: (value: AccountItem | null) => void;
}>({
  experienceDelete: null,
  setExperienceDelete: (value: AccountItem | null) => {},
});

export const columns: ColumnDef<GetToManageUserType>[] = [
  {
    id: "userId",
    header: "STT",
    cell: ({ row }) => <div className="text-textChat">{row.index + 1}</div>,
  },
  {
    accessorKey: "fullName",
    header: "Tên hiển thị",
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên đăng ký
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-textChat font-semibold">
        {row.getValue("userName")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Số điện thoại",
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vai trò
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role: string = row.original.role;
      const roleMapping: Record<string, string> = {
        User: "Người dùng",
        Expert: "Chuyên gia",
      };
      const roleLabel = roleMapping[role] || "Không xác định";

      const roleColors: Record<string, string> = {
        User: "bg-blue-100 text-blue-800",
        Expert: "bg-green-100 text-green-800",
      };

      return (
        <span
          className={`px-2 py-1 rounded-md text-sm font-medium ${
            roleColors[role] || "bg-gray-100 text-gray-800"
          }`}
        >
          {roleLabel}
        </span>
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
        0: "Chưa kích hoạt",
        1: "Đã kích hoạt",
      };
      const statusLabel = statusMapping[status] || "Không xác định";

      const statusColors: Record<number, string> = {
        0: "border-red-500 text-rose-500",
        1: "border-green-500 text-lime-400",
      };

      return (
        <span
          className={`px-2 py-1 rounded-md text-sm font-medium border ${
            statusColors[status] || "border-gray-500 text-gray-500"
          }`}
        >
          {statusLabel}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: function Actions({ row }) {
      const status = row.original.status;
      const updateStatusUserAccount = useUpdateStatusUserAccount();
      const handleActive = async () => {
        if (updateStatusUserAccount.isPending) return;
        try {
          await updateStatusUserAccount.mutateAsync({
            userId: row.original.userId,
            status: 1,
          });
          toast({
            title: "Kích hoạt tài khoản thành công",
            variant: "success",
          });
        } catch (error: any) {
          handleErrorApi(error);
        }
      };

      const handleInactive = async () => {
        if (updateStatusUserAccount.isPending) return;
        try {
          await updateStatusUserAccount.mutateAsync({
            userId: row.original.userId,
            status: 0,
          });
          toast({
            title: "Vô hiệu hóa tài khoản thành công",
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
              <DotsHorizontalIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {status === 1 && (
              <DropdownMenuItem onClick={handleInactive}>
                Vô hiệu hóa
              </DropdownMenuItem>
            )}
            {status === 0 && (
              <DropdownMenuItem onClick={handleActive}>
                Kích hoạt
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Số lượng item trên 1 trang
const PAGE_SIZE = 10;
export default function TableListUser() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  // const params = Object.fromEntries(searchParam.entries())
  const [experienceDelete, setExperienceDelete] = useState<AccountItem | null>(
    null
  );
  //tao bien lay data tu api
  const listToManageUser = useGetToManageUser();
  const data = listToManageUser.data?.payload.data ?? [];

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
    <AccountTableContext.Provider
      value={{
        experienceDelete,
        setExperienceDelete,
      }}
    >
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-4 sm:gap-2">
          <Input
            placeholder="Tìm kiếm tên đăng ký ..."
            value={
              (table.getColumn("userName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("userName")?.setFilterValue(event.target.value)
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
            Hiển thị{" "}
            <strong>{table.getPaginationRowModel().rows.length}</strong> trong{" "}
            <strong>{data.length}</strong> kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname="/moderator/manage-accounts"
            />
          </div>
        </div>
      </div>
    </AccountTableContext.Provider>
  );
}
