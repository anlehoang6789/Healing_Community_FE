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
import { Calendar, Clock, AlertCircle, Video, Filter } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    expertName: "Nguyễn Văn A",
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
    expertName: "Lê Văn C",
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
    expertName: "Phạm Thị D",
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
    expertName: "Nguyễn Văn A",
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
    expertName: "Lê Văn C",
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
    expertName: "Phạm Thị D",
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
    expertName: "Nguyễn Văn A",
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
    expertName: "Trần Thị B",
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
    expertName: "Lê Văn C",
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
    expertName: "Phạm Thị D",
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

export default function ConsultationScheduleExpert() {
  const [reportDialogOpen, setReportDialogOpen] = React.useState(false);
  const dialogTriggerRef = React.useRef<HTMLButtonElement>(null);
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

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="container mx-auto">
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

      <ScrollArea className="h-[550px]">
        {/* nếu không có lịch tư vấn nào */}
        {filteredConsultations.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Chưa có lịch tư vấn</AlertTitle>
            <AlertDescription>
              Bạn chưa có lịch tư vấn nào. Hãy đặt lịch với chuyên gia để được
              tư vấn riêng.
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
                  <div className="flex gap-3 w-full items-center">
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
                    </div>
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
      </ScrollArea>
    </div>
  );
}
