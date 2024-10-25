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

type Consultation = {
  id: string;
  expertName: string;
  expertAvatar: string;
  date: string;
  startTime: string;
  endTime: string;
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
  },
];

const reportReasons = [
  { id: "not-qualified", label: "Không đủ trình độ" },
  { id: "no-show", label: "Không tham gia tư vấn" },
  { id: "bad-attitude", label: "Thái độ không tốt" },
  { id: "not-on-time", label: "Không đúng giờ" },
];

export default function ConsultationSchedule() {
  const [reportDialogOpen, setReportDialogOpen] = React.useState(false);
  const [selectedExpert, setSelectedExpert] = React.useState<string | null>(
    null
  );
  const [reportText, setReportText] = React.useState("");
  const [selectedReasons, setSelectedReasons] = React.useState<string[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);

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

  const handleOpenReportDialog = (expertName: string) => {
    setSelectedExpert(expertName);
    setReportDialogOpen(true);
    setReportText("");
    setSelectedReasons([]);
  };

  const handleSendReport = () => {
    console.log(`Report sent for ${selectedExpert}`);
    console.log(`Selected reasons: ${selectedReasons.join(", ")}`);
    console.log(`Report text: ${reportText}`);
    setReportDialogOpen(false);
  };

  const handleReasonChange = (reasonId: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reasonId)
        ? prev.filter((id) => id !== reasonId)
        : [...prev, reasonId]
    );
  };

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
            <Card key={consultation.id} className="flex flex-col">
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
                        className="bg-backgroundChat p-0"
                      >
                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={() =>
                            handleOpenReportDialog(consultation.expertName)
                          }
                        >
                          <Send className="mr-2 h-4 w-4" />
                          <span>Gửi báo cáo</span>
                        </Button>
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
                <Badge
                  variant={
                    consultation.status === "upcoming"
                      ? "upcoming"
                      : consultation.status === "completed"
                      ? "success"
                      : "cancel"
                  }
                >
                  {consultation.status === "upcoming"
                    ? "Sắp diễn ra"
                    : consultation.status === "completed"
                    ? "Đã hoàn thành"
                    : "Đã hủy"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog report */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
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
      </Dialog>
    </div>
  );
}
