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
import React from "react";

export default function ExpertCalendarDashboard() {
  return (
    <Card className=" shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-textChat">
          Báo Cáo Hoạt Động
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-muted-foreground">
              <TableHead className="w-[100px]">Ngày</TableHead>
              <TableHead>Số Lịch Hẹn</TableHead>
              <TableHead>Tỷ Lệ Hoàn Thành</TableHead>
              <TableHead className="text-right">Trạng Thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-muted-foreground">
              <TableCell className="font-medium">09/11/2024</TableCell>
              <TableCell>8</TableCell>
              <TableCell>100%</TableCell>
              <TableCell className="text-right">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Hoàn thành
                </span>
              </TableCell>
            </TableRow>
            <TableRow className="text-muted-foreground">
              <TableCell className="font-medium">10/11/2024</TableCell>
              <TableCell>10</TableCell>
              <TableCell>90%</TableCell>
              <TableCell className="text-right">
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  Gần hoàn thành
                </span>
              </TableCell>
            </TableRow>
            <TableRow className="text-muted-foreground">
              <TableCell className="font-medium">12/11/2024</TableCell>
              <TableCell>7</TableCell>
              <TableCell>100%</TableCell>
              <TableCell className="text-right">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Hoàn thành
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
