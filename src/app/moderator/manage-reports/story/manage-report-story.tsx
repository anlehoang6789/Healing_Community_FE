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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";

type ManageReportStoryItem = {
  id: number;
  name: string;
  nameReport: string;
  email: string;
  title: string;
  contentReport: string;
  createAt: string;
  status: string;
};

const AccountTableContext = createContext<{
  setEmployeeIdEdit: (value: number) => void;
  employeeIdEdit: number | undefined;
  employeeDelete: ManageReportStoryItem | null;
  setEmployeeDelete: (value: ManageReportStoryItem | null) => void;
}>({
  setEmployeeIdEdit: (value: number | undefined) => {},
  employeeIdEdit: undefined,
  employeeDelete: null,
  setEmployeeDelete: (value: ManageReportStoryItem | null) => {},
});

const columns: ColumnDef<ManageReportStoryItem>[] = [
  {
    id: "id",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "nameReport",
    header: "Người bị báo cáo",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nameReport")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "title",
    header: "Tiêu đề bài viết",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "contentReport",
    header: "Nội dung báo cáo",
    cell: ({ row }) => <div>{row.getValue("contentReport")}</div>,
  },
  {
    accessorKey: "createAt",
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
      <div className="lowercase">{row.getValue("createAt")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setEmployeeIdEdit, setEmployeeDelete } =
        useContext(AccountTableContext);
      const openEditEmployee = () => {
        setEmployeeIdEdit(row.original.id);
      };
      const openDeleteEmployee = () => {
        setEmployeeDelete(row.original);
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
            <DropdownMenuItem onClick={openEditEmployee}>
              Phản hồi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteEmployee}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const mockData: ManageReportStoryItem[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    nameReport: "Trần Thị B",
    email: "a@example.com",
    title: "Câu chuyện chữa lành",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-12",
    status: "Đang xử lý",
  },
  {
    id: 2,
    name: "Lê Thị C",
    nameReport: "Phạm Văn D",
    email: "c@example.com",
    title: "Bài viết B",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-10",
    status: "Đã xử lý",
  },
  {
    id: 3,
    name: "Nguyễn Văn A",
    nameReport: "Trần Thị B",
    email: "a@example.com",
    title: "Câu chuyện chữa lành",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-12",
    status: "Đang xử lý",
  },
  {
    id: 4,
    name: "Lê Thị C",
    nameReport: "Phạm Văn D",
    email: "c@example.com",
    title: "Bài viết B",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-10",
    status: "Đã xử lý",
  },
  {
    id: 5,
    name: "Nguyễn Văn A",
    nameReport: "Trần Thị B",
    email: "a@example.com",
    title: "Câu chuyện chữa lành",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-12",
    status: "Đang xử lý",
  },
  {
    id: 6,
    name: "Lê Thị C",
    nameReport: "Phạm Văn D",
    email: "c@example.com",
    title: "Bài viết B",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-10",
    status: "Đã xử lý",
  },
  {
    id: 7,
    name: "Nguyễn Văn A",
    nameReport: "Trần Thị B",
    email: "a@example.com",
    title: "Câu chuyện chữa lành",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-12",
    status: "Đang xử lý",
  },
  {
    id: 8,
    name: "Lê Thị C",
    nameReport: "Phạm Văn D",
    email: "c@example.com",
    title: "Bài viết B",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-10",
    status: "Đã xử lý",
  },
  {
    id: 9,
    name: "Nguyễn Văn A",
    nameReport: "Trần Thị B",
    email: "a@example.com",
    title: "Câu chuyện chữa lành",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-12",
    status: "Đang xử lý",
  },
  {
    id: 10,
    name: "Lê Thị C",
    nameReport: "Phạm Văn D",
    email: "c@example.com",
    title: "Bài viết B",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-10",
    status: "Đã xử lý",
  },
  {
    id: 11,
    name: "Nguyễn Văn A",
    nameReport: "Trần Thị B",
    email: "a@example.com",
    title: "Câu chuyện chữa lành",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-12",
    status: "Đang xử lý",
  },
  {
    id: 12,
    name: "Lê Thị C",
    nameReport: "Phạm Văn D",
    email: "c@example.com",
    title: "Bài viết B",
    contentReport: "Nội dung không phù hợp.",
    createAt: "2024-12-10",
    status: "Đã xử lý",
  },
];

const PAGE_SIZE = 10;

export default function ManageReportStory() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;

  const [employeeIdEdit, setEmployeeIdEdit] = useState<number | undefined>();
  const [employeeDelete, setEmployeeDelete] =
    useState<ManageReportStoryItem | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize: PAGE_SIZE,
  });

  const table = useReactTable({
    data: mockData,
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
        employeeIdEdit,
        setEmployeeIdEdit,
        employeeDelete,
        setEmployeeDelete,
      }}
    >
      <div className="w-full">
        <AlertDialog
          open={Boolean(employeeDelete)}
          onOpenChange={(value) => {
            if (!value) {
              setEmployeeDelete(null);
            }
          }}
        >
          <AlertDialogContent className="bg-backgroundChat text-red-500">
            <AlertDialogHeader>
              <AlertDialogTitle>Xóa báo cáo?</AlertDialogTitle>
              <AlertDialogDescription>
                Báo cáo của bài viết {""}
                <span className="text-red-500">
                  {employeeDelete?.title}
                </span>{" "}
                {""}
                sẽ bị xóa <b className="text-red-500">vĩnh viễn</b>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction className="bg-red-500 text-white">
                Tiếp tục
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="flex items-center py-4">
          <Input
            placeholder="Tìm kiếm theo tiêu đề bài viết ..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
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
            <strong>{mockData.length}</strong> kết quả
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
