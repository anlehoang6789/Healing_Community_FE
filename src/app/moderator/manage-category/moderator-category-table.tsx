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
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useDeleteExpertExperienceMutation } from "@/queries/useExpert";
import { useGetAllCategoryQuery } from "@/queries/usePost";
import {
  CategoryListSchemaType,
  CategorySchemaType,
} from "@/schemaValidations/post.schema";
import ModeratorAddCategory from "@/app/moderator/manage-category/moderator-add-category";

type CategoryItem = CategoryListSchemaType["data"][0];

const CategoryTableContext = createContext<{
  setCategoryEdit: (value: string) => void;
  categoryIdEdit: string | undefined;
  categoryDelete: CategoryItem | null;
  setCategoryDelete: (value: CategoryItem | null) => void;
}>({
  setCategoryEdit: (value: string | undefined) => {},
  categoryIdEdit: undefined,
  categoryDelete: null,
  setCategoryDelete: (value: CategoryItem | null) => {},
});

export const columns: ColumnDef<CategorySchemaType>[] = [
  {
    id: "categoryId",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: "Thể loại",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setCategoryEdit, setCategoryDelete } =
        useContext(CategoryTableContext);
      const openEditCategory = () => {
        setCategoryEdit(row.original.categoryId);
      };

      const openDeleteCategory = () => {
        setCategoryDelete(row.original);
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
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openEditCategory}>Sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteCategory}>
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function AlertDialogDeleteCategory({
  categoryDelete,
  setCategoryDelete,
}: {
  categoryDelete: CategoryItem | null;
  setCategoryDelete: (value: CategoryItem | null) => void;
}) {
  const { mutateAsync } = useDeleteExpertExperienceMutation();
  const deleteCategory = async () => {
    if (categoryDelete) {
      try {
        const result = await mutateAsync(categoryDelete.categoryId);
        setCategoryDelete(null);
        toast({
          description: result.payload.message,
          variant: "success",
        });
      } catch (error) {
        handleErrorApi({ error });
      }
    }
  };

  return (
    <AlertDialog
      open={Boolean(categoryDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setCategoryDelete(null);
        }
      }}
    >
      <AlertDialogContent className="bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-textChat font-semibold">
            Xóa thể loại bài viết?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Thể loại{" "}
            <span className="bg-muted text-textChat rounded px-1 font-semibold">
              {categoryDelete?.name}
            </span>{" "}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-textChat">Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={deleteCategory}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
// Số lượng item trên 1 trang
const PAGE_SIZE = 10;
export default function ModeratorCategoryTable() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  // const params = Object.fromEntries(searchParam.entries())
  const [categoryIdEdit, setCategoryEdit] = useState<string | undefined>();
  const [categoryDelete, setCategoryDelete] = useState<CategoryItem | null>(
    null
  );
  //tao bien lay data tu api
  const listCategory = useGetAllCategoryQuery();
  const data = listCategory.data?.payload.data ?? [];

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
    <CategoryTableContext.Provider
      value={{
        categoryIdEdit,
        setCategoryEdit,
        categoryDelete,
        setCategoryDelete,
      }}
    >
      <div className="w-full">
        {/* <EditExperience
          id={categoryIdEdit}
          setId={setCategoryEdit}
          onSubmitSuccess={() => {}}
        /> */}
        <AlertDialogDeleteCategory
          categoryDelete={categoryDelete}
          setCategoryDelete={setCategoryDelete}
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-4 sm:gap-2">
          <Input
            placeholder="Tìm kiếm tên thể loại ..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="sm:ml-auto flex items-center gap-2">
            <ModeratorAddCategory />
          </div>
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
                    className="h-24 text-center"
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
              pathname="/moderator/manage-category"
            />
          </div>
        </div>
      </div>
    </CategoryTableContext.Provider>
  );
}
