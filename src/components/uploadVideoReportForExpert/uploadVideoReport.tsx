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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, FileVideo } from "lucide-react";
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Report = {
  id: string;
  customerName: string;
  orderId: string;
  reportDate: Date;
  reasons: string[];
  content?: string;
};

const mockReports: Report[] = [
  {
    id: "1",
    customerName: "Nguyễn Văn A",
    orderId: "ORD001",
    reportDate: new Date("2024-03-15T14:30:00"),
    reasons: ["Không đủ trình độ", "Thái độ không tốt"],
    content: "Chuyên gia không trả lời được các câu hỏi chuyên sâu.",
  },
  {
    id: "2",
    customerName: "Trần Thị B",
    orderId: "ORD002",
    reportDate: new Date("2024-03-16T10:15:00"),
    reasons: ["Không tham gia tư vấn"],
  },
  {
    id: "3",
    customerName: "Lê Văn C",
    orderId: "ORD003",
    reportDate: new Date("2024-03-17T16:45:00"),
    reasons: ["Không đúng giờ", "Thái độ không tốt"],
    content: "Chuyên gia đến trễ 15 phút và có thái độ khó chịu.",
  },
  {
    id: "4",
    customerName: "Phạm Thị D",
    orderId: "ORD004",
    reportDate: new Date("2024-03-18T09:00:00"),
    reasons: ["Không đủ trình độ"],
    content: "Chuyên gia không nắm vững kiến thức trong lĩnh vực tư vấn.",
  },
  {
    id: "5",
    customerName: "Hoàng Văn E",
    orderId: "ORD005",
    reportDate: new Date("2024-03-19T13:30:00"),
    reasons: ["Thái độ không tốt"],
    content: "Chuyên gia có thái độ thiếu kiên nhẫn và không lắng nghe.",
  },
  {
    id: "6",
    customerName: "Đỗ Thị F",
    orderId: "ORD006",
    reportDate: new Date("2024-03-20T11:00:00"),
    reasons: ["Không đúng giờ", "Không tham gia tư vấn"],
    content: "Chuyên gia không xuất hiện trong buổi tư vấn đã hẹn.",
  },
  {
    id: "7",
    customerName: "Lý Văn G",
    orderId: "ORD007",
    reportDate: new Date("2024-03-21T15:15:00"),
    reasons: ["Không đủ trình độ", "Thái độ không tốt"],
    content: "Chuyên gia không thể giải đáp thắc mắc và tỏ ra khó chịu.",
  },
  {
    id: "8",
    customerName: "Ngô Thị H",
    orderId: "ORD008",
    reportDate: new Date("2024-03-22T10:30:00"),
    reasons: ["Không tham gia tư vấn"],
    content:
      "Chuyên gia hủy buổi tư vấn vào phút chót mà không thông báo trước.",
  },
  {
    id: "9",
    customerName: "Đinh Văn I",
    orderId: "ORD009",
    reportDate: new Date("2024-03-23T14:00:00"),
    reasons: ["Không đúng giờ"],
    content: "Chuyên gia đến trễ 30 phút so với giờ hẹn.",
  },
  {
    id: "10",
    customerName: "Bùi Thị K",
    orderId: "ORD010",
    reportDate: new Date("2024-03-24T16:30:00"),
    reasons: ["Thái độ không tốt", "Không đủ trình độ"],
    content:
      "Chuyên gia tỏ ra thiếu chuyên nghiệp và không có kiến thức chuyên sâu.",
  },
  {
    id: "11",
    customerName: "Trương Văn L",
    orderId: "ORD011",
    reportDate: new Date("2024-03-25T11:45:00"),
    reasons: ["Không tham gia tư vấn", "Thái độ không tốt"],
    content:
      "Chuyên gia không xuất hiện và không có phản hồi khi được liên hệ.",
  },
  {
    id: "12",
    customerName: "Mai Thị M",
    orderId: "ORD012",
    reportDate: new Date("2024-03-26T09:30:00"),
    reasons: ["Không đủ trình độ"],
    content:
      "Chuyên gia không thể cung cấp lời khuyên hữu ích cho vấn đề của tôi.",
  },
];

const formSchema = z.object({
  videoLink: z.string().url({ message: "Vui lòng nhập một URL hợp lệ" }),
  explanation: z.string(),
});

export default function ExpertReportList() {
  const [selectedReport, setSelectedReport] = React.useState<Report | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const reportsPerPage = 8;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoLink: "",
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

  // Ensure current page is within valid range
  React.useEffect(() => {
    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Get current reports
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = sortedReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full bg-background h-auto p-4 max-w-7xl overflow-hidden mx-auto rounded-lg shadow-lg border">
      <h1 className="text-2xl font-bold text-muted-foreground mb-5">
        Danh sách báo cáo từ khách hàng
      </h1>
      <Table>
        <TableCaption>
          Danh sách các báo cáo gần đây từ khách hàng.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tên khách hàng</TableHead>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Ngày giờ báo cáo</TableHead>
            <TableHead className="hidden md:table-cell">
              Lý do báo cáo
            </TableHead>
            {/* <TableHead>Nội dung báo cáo</TableHead> */}
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
                {report.reportDate.toLocaleString()}
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {report.reasons.join(", ")}
              </TableCell>
              {/* <TableCell>{report.content || "Không có"}</TableCell> */}
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="headerIcon"
                      onClick={() => setSelectedReport(report)}
                    >
                      Giải trình
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        Giải trình báo cáo cho {report.orderId}
                      </DialogTitle>
                      <DialogDescription>
                        Vui lòng cung cấp link video và giải trình cho báo cáo
                        này.
                      </DialogDescription>
                    </DialogHeader>
                    <span className="font-semibold block md:hidden">
                      Lý do báo cáo:
                    </span>
                    <span className="mt-[-6px] block md:hidden">
                      {report.reasons.join(", ")}
                    </span>
                    <span className="font-semibold">Nội dung báo cáo:</span>
                    <span className="mt-[-6px]">
                      {report.content || "Không có"}
                    </span>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="videoLink"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link video</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://example.com/video"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Nhập link video đã record lại trong buổi meet.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="explanation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Giải trình</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Nhập giải trình của bạn ở đây..."
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Giải thích chi tiết về tình huống và cách bạn xử
                                lý.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button type="submit">Gửi giải trình</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
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
      )}
    </div>
  );
}
