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
  formatDateTime,
  getUserIdFromLocalStorage,
  handleErrorApi,
} from "@/lib/utils";

import {
  CertificateType,
  GetAllCertificatesResponseType,
} from "@/schemaValidations/expert.schema";
import {
  useApproveCertificateMutation,
  useGetAllCertificates,
  useGetCertificateTypesQuery,
  useGetExpertProfileQuery,
  useRejectCertificateMutation,
} from "@/queries/useExpert";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

type ListCertificateItem = GetAllCertificatesResponseType["data"][0];

const ListCertificatesTableContext = createContext<{
  experienceDelete: ListCertificateItem | null;
  setExperienceDelete: (value: ListCertificateItem | null) => void;
}>({
  experienceDelete: null,
  setExperienceDelete: (value: ListCertificateItem | null) => {},
});

const RequesterNameCell = ({ userId }: { userId: string }) => {
  // Fetch thông tin chuyên gia
  const { data: expertProfile } = useGetExpertProfileQuery(userId);

  // Hiển thị tên chuyên gia
  return <div>{expertProfile?.payload.data.fullname || "Không xác định"}</div>;
};

const RequesterEmailCell = ({ userId }: { userId: string }) => {
  // Fetch thông tin chuyên gia
  const { data: expertProfile } = useGetExpertProfileQuery(userId);

  // Hiển thị email
  return <div>{expertProfile?.payload.data.email || "Không xác định"}</div>;
};

// Số lượng item trên 1 trang
const PAGE_SIZE = 10;
export default function TableListCertificate() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  const userId = getUserIdFromLocalStorage();
  // const params = Object.fromEntries(searchParam.entries())
  const [experienceDelete, setExperienceDelete] =
    useState<ListCertificateItem | null>(null);
  //tao bien lay data tu api
  const listCertificates = useGetAllCertificates();
  const data = listCertificates.data?.payload.data ?? [];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
    pageSize: PAGE_SIZE, //default page size
  });

  const { data: certificateTypesData } = useGetCertificateTypesQuery();
  const certificateTypes = certificateTypesData?.payload.data || [];

  const columns: ColumnDef<CertificateType>[] = [
    {
      id: "index",
      header: "STT",
      cell: ({ row }) => <div className="text-textChat">{row.index + 1}</div>,
    },

    {
      id: "expertProfileId",
      header: "Tên chuyên gia",
      cell: ({ row }) => {
        const userId = row.original.expertProfileId;
        return (
          <div className="text-textChat">
            <RequesterNameCell userId={userId} />
          </div>
        );
      },
    },
    {
      id: "requesterEmail",
      header: "Email",
      cell: ({ row }) => {
        const userId = row.original.expertProfileId;
        return (
          <div className="text-textChat">
            <RequesterEmailCell userId={userId} />
          </div>
        );
      },
    },

    {
      accessorKey: "certificateTypeId",
      header: "Loại chứng chỉ",
      cell: ({ row }) => {
        const certificateTypeId = row.original.certificateTypeId;

        const certificateType = certificateTypes.find(
          (type) => type.certificateTypeId === certificateTypeId
        );

        return (
          <div className="text-textChat">
            {certificateType?.name || "Không xác định"}
          </div>
        );
      },
      filterFn: (row, columnId, filterValue) => {
        const certificateTypeId = row.original.certificateTypeId;

        const certificateType = certificateTypes.find(
          (type) => type.certificateTypeId === certificateTypeId
        );

        return (
          certificateType?.name
            ?.toLowerCase()
            .includes(filterValue.toLowerCase()) || false
        );
      },
    },

    {
      accessorKey: "fileUrl",
      header: "Link chứng chỉ",
      cell: ({ row }) => {
        const fileUrl = row.original.fileUrl;

        return (
          <div className="text-textChat">
            <Link
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:text-sm md:text-xl sm:text-xl text-blue-500 hover:underline"
            >
              Xem chứng chỉ
            </Link>
          </div>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: "Ngày upload",
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as string;
        const formattedDateTime = formatDateTime(createdAt);
        return <div className="text-textChat">{formattedDateTime}</div>;
      },
    },

    {
      accessorKey: "verifiedAt",
      header: "Ngày phê duyệt",
      cell: ({ row }) => {
        const verifiedAt = row.getValue("verifiedAt") as string | null;

        if (verifiedAt === null) {
          return null;
        }

        const formattedDateTime = formatDateTime(verifiedAt);
        return <div className="text-textChat">{formattedDateTime}</div>;
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
          0: "Chờ phê duyệt",
          1: "Đã phê duyệt",
          3: "Từ chối",
        };
        const statusLabel = statusMapping[status] || "Không xác định";

        const statusColors: Record<number, string> = {
          3: "border-red-500 text-rose-500",
          1: "border-green-500 text-green-400",
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
        const { mutateAsync: approveCertificate } =
          useApproveCertificateMutation();
        const { mutateAsync: rejectCertificate } =
          useRejectCertificateMutation();

        const handleApprove = async () => {
          try {
            const payload = {
              certificateId: row.original.certificateId,
            };
            const result = await approveCertificate(payload);
            toast({
              description: result.payload.message,
              variant: "success",
            });
          } catch (error) {
            handleErrorApi({ error });
          }
        };

        const handleReject = async () => {
          try {
            const payload = {
              certificateId: row.original.certificateId,
            };
            const result = await rejectCertificate(payload);
            toast({
              description: result.payload.message,
              variant: "success",
            });
          } catch (error) {
            handleErrorApi({ error });
          }
        };

        const status: number = row.original.status;

        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {status === 0 && (
                <>
                  <DropdownMenuItem onClick={handleApprove}>
                    Duyệt
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleReject}>
                    Từ chối
                  </DropdownMenuItem>
                </>
              )}
              {status === 1 && (
                <DropdownMenuItem onClick={handleReject}>
                  Từ chối
                </DropdownMenuItem>
              )}
              {status === 3 && (
                <DropdownMenuItem onClick={handleApprove}>
                  Duyệt
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
    <ListCertificatesTableContext.Provider
      value={{
        experienceDelete,
        setExperienceDelete,
      }}
    >
      <div className="w-full">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Danh sách chứng chỉ
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 gap-4 sm:gap-2">
          <Input
            placeholder="Tìm kiếm loại chứng chỉ ..."
            value={
              (table
                .getColumn("certificateTypeId")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("certificateTypeId")
                ?.setFilterValue(event.target.value)
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
                    Chưa có chứng chỉ nào cần phê duyệt.
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
              pathname="/moderator/manage-certificates"
            />
          </div>
        </div>
      </div>
    </ListCertificatesTableContext.Provider>
  );
}
