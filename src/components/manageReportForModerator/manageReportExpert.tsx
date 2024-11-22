"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DeleteAccountExpert from "@/app/moderator/manage-reports/expert/delete-account-expert";
import { Badge } from "@/components/ui/badge";
import { usePathname, useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";

type Report = {
  id: string;
  customerName: string;
  orderId: string;
  reportDate: Date;
  reasons: string[];
  expertName: string;
  content?: string;
};

const mockReports: Report[] = [
  {
    id: "1",
    customerName: "Nguyễn Văn A",
    expertName: "Nguyễn Văn B",
    orderId: "ORD001",
    reportDate: new Date("2024-03-15T14:30:00"),
    reasons: ["Không đủ trình độ", "Thái độ không tốt"],
    content: "Chuyên gia không trả lời được các câu hỏi chuyên sâu.",
  },
  {
    id: "2",
    customerName: "Trần Thị B",
    expertName: "Nguyễn Văn B",
    orderId: "ORD002",
    reportDate: new Date("2024-03-16T10:15:00"),
    reasons: ["Không tham gia tư vấn"],
  },
  {
    id: "3",
    customerName: "Lê Văn C",
    expertName: "Nguyễn Văn B",
    orderId: "ORD003",
    reportDate: new Date("2024-03-17T16:45:00"),
    reasons: ["Không đúng giờ", "Thái độ không tốt"],
    content: "Chuyên gia đến trễ 15 phút và có thái độ khó chịu.",
  },
  {
    id: "4",
    customerName: "Phạm Thị D",
    expertName: "Nguyễn Văn B",
    orderId: "ORD004",
    reportDate: new Date("2024-03-18T09:00:00"),
    reasons: ["Không đủ trình độ"],
    content: "Chuyên gia không nắm vững kiến thức trong lĩnh vực tư vấn.",
  },
  {
    id: "5",
    customerName: "Hoàng Văn E",
    expertName: "Nguyễn Văn B",
    orderId: "ORD005",
    reportDate: new Date("2024-03-19T13:30:00"),
    reasons: ["Thái độ không tốt"],
    content: "Chuyên gia có thái độ thiếu kiên nhẫn và không lắng nghe.",
  },
  {
    id: "6",
    customerName: "Đỗ Thị F",
    expertName: "Nguyễn Văn B",
    orderId: "ORD006",
    reportDate: new Date("2024-03-20T11:00:00"),
    reasons: ["Không đúng giờ", "Không tham gia tư vấn"],
    content: "Chuyên gia không xuất hiện trong buổi tư vấn đã hẹn.",
  },
  {
    id: "7",
    customerName: "Lý Văn G",
    expertName: "Nguyễn Văn B",
    orderId: "ORD007",
    reportDate: new Date("2024-03-21T15:15:00"),
    reasons: ["Không đủ trình độ", "Thái độ không tốt"],
    content: "Chuyên gia không thể giải đáp thắc mắc và tỏ ra khó chịu.",
  },
  {
    id: "8",
    customerName: "Ngô Thị H",
    expertName: "Nguyễn Văn B",
    orderId: "ORD008",
    reportDate: new Date("2024-03-22T10:30:00"),
    reasons: ["Không tham gia tư vấn"],
    content:
      "Chuyên gia hủy buổi tư vấn vào phút chót mà không thông báo trước.",
  },
  {
    id: "9",
    customerName: "Đinh Văn I",
    expertName: "Nguyễn Văn B",
    orderId: "ORD009",
    reportDate: new Date("2024-03-23T14:00:00"),
    reasons: ["Không đúng giờ"],
    content: "Chuyên gia đến trễ 30 phút so với giờ hẹn.",
  },
  {
    id: "10",
    customerName: "Bùi Thị K",
    expertName: "Nguyễn Văn B",
    orderId: "ORD010",
    reportDate: new Date("2024-03-24T16:30:00"),
    reasons: ["Thái độ không tốt", "Không đủ trình độ"],
    content:
      "Chuyên gia tỏ ra thiếu chuyên nghiệp và không có kiến thức chuyên sâu.",
  },
  {
    id: "11",
    customerName: "Trương Văn L",
    expertName: "Nguyễn Văn B",
    orderId: "ORD011",
    reportDate: new Date("2024-03-25T11:45:00"),
    reasons: ["Không tham gia tư vấn", "Thái độ không tốt"],
    content:
      "Chuyên gia không xuất hiện và không có phản hồi khi được liên hệ.",
  },
  {
    id: "12",
    customerName: "Mai Thị M",
    expertName: "Nguyễn Văn B",
    orderId: "ORD012",
    reportDate: new Date("2024-03-26T09:30:00"),
    reasons: ["Không đủ trình độ"],
    content:
      "Chuyên gia không thể cung cấp lời khuyên hữu ích cho vấn đề của tôi.",
  },
];

const formSchema = z.object({
  explanation: z.string(),
});

export default function ManageReportExpert() {
  const [selectedReport, setSelectedReport] = React.useState<Report | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pageFromParams = searchParams.get("page");
  const currentPage = pageFromParams ? parseInt(pageFromParams) : 1;

  const reportsPerPage = 8;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      explanation: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted explanation for report:", selectedReport?.id);
    console.log("Form values:", values);

    setIsDialogOpen(false);
    setSelectedReport(null);
    form.reset();
  }

  // Sort reports by date, most recent first
  const sortedReports = [...mockReports].sort(
    (a, b) => b.reportDate.getTime() - a.reportDate.getTime()
  );

  // Calculate total pages
  const totalPages = Math.ceil(sortedReports.length / reportsPerPage);

  // Get current reports
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = sortedReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  return (
    <div className="w-full bg-background h-auto p-4 max-w-7xl overflow-hidden mx-auto rounded-lg shadow-lg border">
      <h1 className="text-2xl font-bold text-muted-foreground mb-5">
        Danh sách báo cáo chuyên gia
      </h1>
      <Table>
        <TableCaption>
          Danh sách các báo cáo các chuyên gia gần đây .
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Người báo cáo</TableHead>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Tên chuyên gia</TableHead>
            <TableHead>Ngày giờ báo cáo</TableHead>
            <TableHead className="hidden md:table-cell">
              Lý do báo cáo
            </TableHead>
            <TableHead className="hidden md:table-cell">Chi tiết</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="text-muted-foreground">
                {report.customerName}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {report.orderId}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {report.expertName}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {report.reportDate.toLocaleString()}
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground w-[280px]">
                {report.reasons.join(", ")}
              </TableCell>

              {/* <TableCell className="hidden md:table-cell text-muted-foreground w-[280px]">
                <div className="flex flex-wrap gap-2">
                  {report.reasons.map((reason) => (
                    <Badge
                      key={report.id}
                      variant={
                        reason === "Không đủ trình độ"
                          ? "destructive" // Giá trị hợp lệ cho lý do này
                          : reason === "Thái độ không tốt"
                          ? "success" // Giá trị hợp lệ cho lý do này
                          : reason === "Không tham gia tư vấn"
                          ? "upcoming" // Giá trị hợp lệ cho lý do này
                          : "secondary" // Giá trị mặc định nếu không có điều kiện nào khớp
                      }
                    >
                      {reason}
                    </Badge>
                  ))}
                </div>
              </TableCell> */}

              <TableCell className="hidden md:table-cell text-muted-foreground w-[320px]">
                {report.content || "Không có"}
              </TableCell>
              <TableCell className="flex space-x-3 items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="headerIcon"
                      onClick={() => setSelectedReport(report)}
                    >
                      Nhắc nhở
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-textChat font-bold">
                        Gửi yêu cầu nộp video cho chuyên gia {report.expertName}
                      </DialogTitle>
                      <DialogDescription>
                        Vui lòng cung cấp link video và giải trình cho báo cáo
                        này.
                      </DialogDescription>
                    </DialogHeader>
                    <span className="font-semibold block text-textChat ">
                      Lý do báo cáo:
                    </span>
                    <span className="mt-[-6px] block text-muted-foreground  ">
                      {report.reasons.join(", ")}
                    </span>
                    <span className="text-textChat font-semibold">
                      Nội dung báo cáo:
                    </span>

                    <span className="text-muted-foreground mt-[-6px]">
                      {report.content || "Không có"}
                    </span>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="explanation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-textChat">
                                Nhắc nhở
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Nhập lời nhắc của bạn ở đây..."
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Giải thích chi tiết về tình huống và cách bạn xử
                                lý nếu có lần sau.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button type="submit">Gửi yêu cầu</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <DeleteAccountExpert />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem className="text-muted-foreground">
              <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index} className="text-muted-foreground">
                <PaginationLink
                  onClick={() => paginate(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem className="text-muted-foreground">
              <PaginationNext onClick={() => paginate(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )} */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-xs text-muted-foreground py-4 flex-1 ">
          Hiển thị{" "}
          <strong>
            {indexOfFirstReport + 1}-
            {Math.min(indexOfLastReport, sortedReports.length)}
          </strong>{" "}
          trong <strong>{sortedReports.length}</strong> kết quả
        </div>
        <div>
          <AutoPagination
            page={currentPage}
            pageSize={totalPages}
            pathname="/moderator/manage-reports/expert"
          />
        </div>
      </div>
    </div>
  );
}
