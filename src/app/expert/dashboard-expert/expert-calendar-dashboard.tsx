"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { useGetActivityReportDashboardQuery } from "@/queries/useExpert";
import { ExpertActivityReportDashboardType } from "@/schemaValidations/expert.schema";
import React from "react";

const ActivityReportItem = ({
  completedAppointments,
  completionRate,
  date,
  status,
  totalAppointments,
}: ExpertActivityReportDashboardType) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Hoàn thành":
        return "bg-green-100 text-green-800";
      case "Gần hoàn thành":
        return "bg-yellow-100 text-yellow-800";
      case "Chưa hoàn thành":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <TableRow className="text-muted-foreground">
      <TableCell className="font-medium">{formatDate(date)}</TableCell>
      <TableCell className="text-center">{totalAppointments}</TableCell>
      <TableCell className="text-center">{completedAppointments}</TableCell>
      <TableCell className="text-center">{completionRate}%</TableCell>
      <TableCell className="text-xs">
        <span
          className={`inline-flex items-center rounded-full px-0.5 py-0.5 text-xs font-medium ${getStatusClasses(
            status
          )}`}
        >
          {status}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default function ExpertCalendarDashboard() {
  const { data } = useGetActivityReportDashboardQuery();
  const activityReportList = data?.payload.data || [];
  return (
    <Card className=" shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-textChat">
          Báo Cáo Hoạt Động
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-80 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-muted-foreground">
                <TableHead className="w-[100px]">Ngày</TableHead>
                <TableHead>Số Lịch Hẹn</TableHead>
                <TableHead>Lịch hẹn hoàn thành</TableHead>
                <TableHead>Tỷ Lệ Hoàn Thành</TableHead>
                <TableHead className="text-right">Trạng Thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityReportList.map((item, index) => (
                <ActivityReportItem
                  key={index}
                  completedAppointments={item.completedAppointments}
                  completionRate={item.completionRate}
                  date={item.date}
                  status={item.status}
                  totalAppointments={item.totalAppointments}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
