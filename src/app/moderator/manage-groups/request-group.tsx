"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import { createContext, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";

import {
  GetListRequestGroupResponseType,
  GetRequestGroupType,
} from "@/schemaValidations/group.schema";
import {
  useApproveOrRejectRequestGroupMutation,
  useGetListRequestGroupQuery,
} from "@/queries/useGroup";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import { Role } from "@/constants/type";
import { formatDateTime, handleErrorApi } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type RequestGroupItem = GetListRequestGroupResponseType["data"][0];

const RequestGroupTableContext = createContext<{
  experienceDelete: RequestGroupItem | null;
  setExperienceDelete: (value: RequestGroupItem | null) => void;
}>({
  experienceDelete: null,
  setExperienceDelete: (value: RequestGroupItem | null) => {},
});

const RequesterNameCell = ({ userId }: { userId: string }) => {
  // Fetch role của người dùng
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId);

  // Fetch thông tin người dùng bình thường
  const { data: userProfile } = useGetUserProfileQuery(
    userId,
    roleByUserId?.payload.data.roleName === Role.User && !!userId
  );

  // Fetch thông tin chuyên gia
  const { data: expertProfile } = useGetExpertProfileQuery(
    userId,
    roleByUserId?.payload.data.roleName === Role.Expert && !!userId
  );

  // Kiểm tra xem người dùng có phải là chuyên gia không
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;

  // Hiển thị tên người yêu cầu
  return (
    <div>
      {isExpert
        ? expertProfile?.payload.data.fullname || "Không xác định"
        : userProfile?.payload.data.fullName ||
          userProfile?.payload.data.userName ||
          "Không xác định"}
    </div>
  );
};

const RequesterEmailCell = ({ userId }: { userId: string }) => {
  // Fetch role của người dùng
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId);

  // Fetch thông tin người dùng bình thường
  const { data: userProfile } = useGetUserProfileQuery(
    userId,
    roleByUserId?.payload.data.roleName === Role.User && !!userId
  );

  // Fetch thông tin chuyên gia
  const { data: expertProfile } = useGetExpertProfileQuery(
    userId,
    roleByUserId?.payload.data.roleName === Role.Expert && !!userId
  );

  // Kiểm tra xem người dùng có phải là chuyên gia không
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;

  // Hiển thị email
  return (
    <div>
      {isExpert
        ? expertProfile?.payload.data.email || "Không xác định"
        : userProfile?.payload.data.email || "Không xác định"}
    </div>
  );
};

export const columns: ColumnDef<GetRequestGroupType>[] = [
  {
    id: "index",
    header: "STT",
    cell: ({ row }) => row.index + 1,
  },

  {
    id: "requesterName",
    header: "Tên người yêu cầu",
    cell: ({ row }) => {
      const userId = row.original.requestedById;
      return <RequesterNameCell userId={userId} />;
    },
  },
  {
    id: "requesterEmail",
    header: "Email",
    cell: ({ row }) => {
      const userId = row.original.requestedById;
      return <RequesterEmailCell userId={userId} />;
    },
  },
  {
    accessorKey: "groupName",
    header: "Tên nhóm",
    cell: ({ row }) => (
      <div className="text-textChat">{row.getValue("groupName")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => (
      <div className="text-textChat font-semibold">
        {row.getValue("description")}
      </div>
    ),
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
    id: "actions",
    enableHiding: false,
    cell: function Actions({ row }) {
      const { mutateAsync: approveOrRejectRequestGroup } =
        useApproveOrRejectRequestGroupMutation();

      const handleApprove = async () => {
        try {
          const payload = {
            groupRequestId: row.original.groupRequestId,
            isApproved: true,
          };
          const result = await approveOrRejectRequestGroup(payload);
          toast({
            description: result.payload.data,
            variant: "success",
          });
        } catch (error) {
          handleErrorApi({ error });
        }
      };

      const handleReject = async () => {
        try {
          const payload = {
            groupRequestId: row.original.groupRequestId,
            isApproved: false,
          };
          const result = await approveOrRejectRequestGroup(payload);
          toast({
            description: result.payload.data,
            variant: "success",
          });
        } catch (error) {
          handleErrorApi({ error });
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
            <DropdownMenuItem onClick={handleApprove}>Duyệt</DropdownMenuItem>
            <DropdownMenuItem onClick={handleReject}>Từ chối</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Số lượng item trên 1 trang
const PAGE_SIZE = 10;
export default function TableRequestGroup() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  // const params = Object.fromEntries(searchParam.entries())
  const [experienceDelete, setExperienceDelete] =
    useState<RequestGroupItem | null>(null);
  //tao bien lay data tu api
  const listRequestGroup = useGetListRequestGroupQuery();
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
              pathname="/moderator/manage-groups"
            />
          </div>
        </div>
      </div>
    </RequestGroupTableContext.Provider>
  );
}
