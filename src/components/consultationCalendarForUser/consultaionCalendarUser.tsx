"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Send,
  AlertCircle,
  Filter,
  MoreHorizontal,
  Video,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ReportDialog from "@/components/consultationCalendarForUser/dialogReport";
import { useTheme } from "next-themes";

type Consultation = {
  id: string;
  expertName: string;
  expertAvatar: string;
  date: string;
  startTime: string;
  endTime: string;
  linkMeet: string;
  status: "upcoming" | "completed" | "cancelled";
};

const consultations: Consultation[] = [
  {
    id: "1",
    expertName: "Dr. Nguyễn Văn A",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-15",
    startTime: "14:00",
    endTime: "15:00",
    status: "completed",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "2",
    expertName: "Ths. Trần Thị B",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-10",
    startTime: "10:30",
    endTime: "11:30",
    status: "completed",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "3",
    expertName: "PGS.TS Lê Văn C",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-05",
    startTime: "16:00",
    endTime: "17:00",
    status: "cancelled",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "4",
    expertName: "Dr. Phạm Thị D",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-20",
    startTime: "09:00",
    endTime: "10:00",
    status: "upcoming",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "5",
    expertName: "Dr. Nguyễn Văn A",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-15",
    startTime: "14:00",
    endTime: "15:00",
    status: "completed",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "6",
    expertName: "Ths. Trần Thị B",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-10",
    startTime: "10:30",
    endTime: "11:30",
    status: "completed",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "7",
    expertName: "PGS.TS Lê Văn C",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-05",
    startTime: "16:00",
    endTime: "17:00",
    status: "cancelled",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "8",
    expertName: "Dr. Phạm Thị D",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-20",
    startTime: "09:00",
    endTime: "10:00",
    status: "upcoming",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "9",
    expertName: "Dr. Nguyễn Văn A",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-15",
    startTime: "14:00",
    endTime: "15:00",
    status: "completed",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "10",
    expertName: "Ths. Trần Thị B",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-10",
    startTime: "10:30",
    endTime: "11:30",
    status: "completed",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "11",
    expertName: "PGS.TS Lê Văn C",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-05",
    startTime: "16:00",
    endTime: "17:00",
    status: "cancelled",
    linkMeet: "https://meet.google.com/abc123",
  },
  {
    id: "12",
    expertName: "Dr. Phạm Thị D",
    expertAvatar:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    date: "2024-03-20",
    startTime: "09:00",
    endTime: "10:00",
    status: "upcoming",
    linkMeet: "https://meet.google.com/abc123",
  },
];

const reportReasons = [
  { id: "not-qualified", label: "Không đủ trình độ" },
  { id: "no-show", label: "Không tham gia tư vấn" },
  { id: "bad-attitude", label: "Thái độ không tốt" },
  { id: "not-on-time", label: "Không đúng giờ" },
];

export default function ConsultationSchedule() {
  // const [reportDialogOpen, setReportDialogOpen] = React.useState(false);
  // const dialogTriggerRef = React.useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  // const [selectedExpert, setSelectedExpert] = React.useState<string | null>(
  //   null
  // );
  const [reportText, setReportText] = React.useState("");
  const [selectedReasons, setSelectedReasons] = React.useState<string[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);

  // const handleCloseDialog = () => {
  //   setReportDialogOpen(false);
  //   // Đặt focus vào nút mở dialog sau khi đóng
  //   setTimeout(() => {
  //     dialogTriggerRef.current?.focus();
  //   }, 0);
  // };

  const sortedConsultations = React.useMemo(() => {
    const now = new Date();
    return [...consultations].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return (
        Math.abs(dateA.getTime() - now.getTime()) -
        Math.abs(dateB.getTime() - now.getTime())
      );
    });
  }, []);

  const filteredConsultations = React.useMemo(() => {
    return statusFilter.length === 0
      ? sortedConsultations
      : sortedConsultations.filter((consultation) =>
          statusFilter.includes(consultation.status)
        );
  }, [sortedConsultations, statusFilter]);

  // const handleOpenReportDialog = (expertName: string) => {
  //   setSelectedExpert(expertName);
  //   setReportDialogOpen(true);
  //   setReportText("");
  //   setSelectedReasons([]);
  // };

  const handleSendReport = () => {
    // Xử lý gửi báo cáo ở đây

    // Reset các giá trị sau khi gửi báo cáo
    setReportText("");
    setSelectedReasons([]);
  };

  // const handleReasonChange = (reasonId: string) => {
  //   setSelectedReasons((prev) =>
  //     prev.includes(reasonId)
  //       ? prev.filter((id) => id !== reasonId)
  //       : [...prev, reasonId]
  //   );
  // };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-muted-foreground">
          Lịch Tư Vấn Của Bạn
        </h1>

        {/* lọc lịch tư vấn */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="headerIcon" className="ml-auto">
              <Filter className="mr-2 h-4 w-4" />
              Lọc lịch tư vấn
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-backgroundChat">
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("upcoming")}
              onCheckedChange={() => handleStatusFilterChange("upcoming")}
            >
              Sắp diễn ra
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("completed")}
              onCheckedChange={() => handleStatusFilterChange("completed")}
            >
              Đã hoàn thành
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilter.includes("cancelled")}
              onCheckedChange={() => handleStatusFilterChange("cancelled")}
            >
              Đã hủy
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* nếu không có lịch tư vấn nào */}
      {filteredConsultations.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Chưa có lịch tư vấn</AlertTitle>
          <AlertDescription>
            Bạn chưa có lịch tư vấn nào. Hãy đặt lịch với chuyên gia để được tư
            vấn riêng.
          </AlertDescription>
        </Alert>
      ) : (
        // nếu có lịch tư vấn
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredConsultations.map((consultation) => (
            <Card
              key={consultation.id}
              className="flex flex-col relative overflow-hidden "
            >
              {consultation.status === "upcoming" && (
                <div className="absolute -right-[4.5rem] top-6 w-[15rem] h-8 rotate-45 bg-gradient-to-br from-rose-300 via-rose-300 to-rose-400 text-rose-950 text-xs font-bold flex items-center justify-center shadow-[0_5px_10px_rgba(244,63,94,0.3)] transform transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_15px_rgba(244,63,94,0.4)] before:content-[''] before:absolute before:left-0 before:top-full before:w-4 before:h-4 before:bg-rose-400 before:clip-path-[polygon(0_0,100%_100%,100%_0)] after:content-[''] after:absolute after:right-0 after:top-full after:w-4 after:h-4 after:bg-rose-400 after:clip-path-[polygon(0_100%,0_0,100%_0)]">
                  Sắp diễn ra
                </div>
              )}
              {/* Avatar, tên chuyên gia, chuyên ngành */}
              <CardHeader>
                <div className="flex gap-3 w-full">
                  <Avatar>
                    <AvatarImage
                      src={consultation.expertAvatar}
                      alt={consultation.expertName}
                    />
                    <AvatarFallback>
                      {consultation.expertName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{consultation.expertName}</CardTitle>
                    <CardDescription>Chuyên gia tư vấn tâm lý</CardDescription>
                  </div>

                  {/* nếu hoàn thành thì cho report */}
                  {consultation.status === "completed" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="ml-auto">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className={` ${
                          theme === "dark"
                            ? "bg-black text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {/* <Button
                          variant="ghost"
                          className="w-full"
                          ref={dialogTriggerRef}
                          onClick={() =>
                            handleOpenReportDialog(consultation.expertName)
                          }
                        >
                          <Send className="mr-2 h-4 w-4" />
                          <span>Gửi báo cáo</span>
                        </Button> */}

                        <ReportDialog
                          expertName={consultation.expertName}
                          reportText={reportText}
                          setReportText={setReportText}
                          selectedReasons={selectedReasons}
                          setSelectedReasons={setSelectedReasons}
                          reportReasons={reportReasons}
                          onSendReport={handleSendReport}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 opacity-70" />
                  <span className="text-sm">{consultation.date}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 opacity-70" />
                  <span className="text-sm">
                    {consultation.startTime} - {consultation.endTime}
                  </span>
                </div>
                {consultation.status === "upcoming" && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Video className="h-4 w-4 opacity-70" />
                    <Link href={consultation.linkMeet}>
                      <span className="text-sm hover:underline">
                        {consultation.linkMeet}
                      </span>
                    </Link>
                  </div>
                )}
                {consultation.status === "completed" && (
                  <Badge variant="success">Đã hoàn thành</Badge>
                )}
                {consultation.status === "cancelled" && (
                  <Badge variant="cancel">Đã hủy</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog report */}
      {/* <Dialog open={reportDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-muted-foreground">
              Gửi báo cáo cho {selectedExpert}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Hãy chia sẻ trải nghiệm của bạn về buổi tư vấn với chuyên gia. Báo
              cáo của bạn sẽ giúp chúng tôi cải thiện dịch vụ.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <Label className="text-muted-foreground">Lý do báo cáo</Label>
              {reportReasons.map((reason) => (
                <div
                  className="flex items-center space-x-2 text-muted-foreground"
                  key={reason.id}
                >
                  <Checkbox
                    id={reason.id}
                    checked={selectedReasons.includes(reason.id)}
                    onCheckedChange={() => handleReasonChange(reason.id)}
                  />
                  <Label htmlFor={reason.id}>{reason.label}</Label>
                </div>
              ))}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="report" className="text-muted-foreground">
                Nội dung báo cáo
              </Label>
              <Textarea
                id="report"
                placeholder="Nhập báo cáo của bạn ở đây..."
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                className="text-muted-foreground"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSendReport}>
              Gửi báo cáo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
